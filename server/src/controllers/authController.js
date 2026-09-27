import { dbQuery } from '../config/db.js';
import { verifyPassword, hashPassword, validatePasswordStrength } from '../utils/hash.js';
import { generateToken } from '../middleware/auth.js';

// In-memory failed login tracking for rapid IP/account lockout defense
const failedLoginAttempts = new Map();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function login(req, res) {
  try {
    const { usernameOrEmail, password } = req.body;
    const clientIp = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

    if (!usernameOrEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username/Email and password are required.'
      });
    }

    // Check IP lockout
    const attemptRecord = failedLoginAttempts.get(clientIp);
    if (attemptRecord && attemptRecord.count >= MAX_FAILED_ATTEMPTS) {
      const timeRemaining = Math.ceil((attemptRecord.lockedUntil - Date.now()) / 1000 / 60);
      if (Date.now() < attemptRecord.lockedUntil) {
        return res.status(429).json({
          success: false,
          message: `Security Lockout: Too many failed authorization attempts from this IP. Please wait ${timeRemaining} minutes.`
        });
      } else {
        failedLoginAttempts.delete(clientIp);
      }
    }

    const cleanIdentifier = String(usernameOrEmail).trim();

    const admins = await dbQuery(
      'SELECT * FROM admins WHERE username = ? OR email = ? LIMIT 1',
      [cleanIdentifier, cleanIdentifier]
    );

    // Timing-attack mitigation: run dummy verify if user not found
    if (!admins || admins.length === 0) {
      await verifyPassword(password, '$2b$12$e8Y5tGfK79tqRZZvP8/F7.DummyHashForTimingAttackDefense2026');
      
      recordFailedAttempt(clientIp);
      await logSecurityEvent('ANONYMOUS', null, 'FAILED_LOGIN_UNKNOWN_USER', `Attempted user: ${cleanIdentifier}`, clientIp);

      return res.status(401).json({
        success: false,
        message: 'Access Denied: Invalid administrator credentials.'
      });
    }

    const admin = admins[0];

    if (!admin.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: This administrator account has been disabled.'
      });
    }

    const isPasswordValid = await verifyPassword(password, admin.password_hash);

    if (!isPasswordValid) {
      recordFailedAttempt(clientIp);
      await logSecurityEvent('ADMIN_USER', admin.id, 'FAILED_LOGIN_PASSWORD_MISMATCH', `User: ${admin.username}`, clientIp);

      return res.status(401).json({
        success: false,
        message: 'Access Denied: Invalid administrator credentials.'
      });
    }

    // Successful login: reset failed counter
    failedLoginAttempts.delete(clientIp);

    // Update last login
    await dbQuery('UPDATE admins SET last_login = NOW() WHERE id = ?', [admin.id]);

    // Audit log successful login
    await logSecurityEvent('ADMIN', admin.id, 'ADMIN_LOGIN_SUCCESS', `Admin ${admin.username} authorized`, clientIp);

    const token = generateToken(admin);

    res.json({
      success: true,
      message: 'Authentication successful. Welcome to Trident Command Center.',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({
      success: false,
      message: 'An internal authentication security error occurred.'
    });
  }
}

export async function getCurrentAdmin(req, res) {
  res.json({
    success: true,
    admin: req.admin
  });
}

function recordFailedAttempt(ip) {
  const current = failedLoginAttempts.get(ip) || { count: 0, lockedUntil: 0 };
  current.count += 1;
  if (current.count >= MAX_FAILED_ATTEMPTS) {
    current.lockedUntil = Date.now() + LOCKOUT_WINDOW_MS;
  }
  failedLoginAttempts.set(ip, current);
}

async function logSecurityEvent(actorType, actorId, action, details, ip) {
  try {
    await dbQuery(
      'INSERT INTO audit_logs (actor_type, actor_id, action, details, ip_address) VALUES (?, ?, ?, ?, ?)',
      [actorType, actorId, action, details, ip]
    );
  } catch (err) {
    // Non-blocking log
  }
}

