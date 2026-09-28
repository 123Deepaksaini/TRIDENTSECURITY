import { Admin, AuditLog } from '../config/db.js';
import { verifyPassword } from '../utils/hash.js';
import { generateToken } from '../middleware/auth.js';

const failedLoginAttempts = new Map();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000;

export async function login(req, res) {
  try {
    const { usernameOrEmail, password } = req.body;
    const clientIp = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ success: false, message: 'Username/Email and password are required.' });
    }

    const attemptRecord = failedLoginAttempts.get(clientIp);
    if (attemptRecord && attemptRecord.count >= MAX_FAILED_ATTEMPTS && Date.now() < attemptRecord.lockedUntil) {
      const timeRemaining = Math.ceil((attemptRecord.lockedUntil - Date.now()) / 1000 / 60);
      return res.status(429).json({ success: false, message: `Security Lockout: Too many failed attempts. Please wait ${timeRemaining} minutes.` });
    }

    const cleanIdentifier = String(usernameOrEmail).trim();
    const admin = await Admin.findOne({ $or: [{ username: cleanIdentifier }, { email: cleanIdentifier }] });

    if (!admin) {
      await verifyPassword(password, '$2b$12$e8Y5tGfK79tqRZZvP8/F7.DummyHashForTimingAttackDefense2026');
      recordFailedAttempt(clientIp);
      return res.status(401).json({ success: false, message: 'Access Denied: Invalid administrator credentials.' });
    }

    if (!admin.is_active) {
      return res.status(403).json({ success: false, message: 'Access Denied: This administrator account has been disabled.' });
    }

    const isPasswordValid = await verifyPassword(password, admin.password_hash);
    if (!isPasswordValid) {
      recordFailedAttempt(clientIp);
      return res.status(401).json({ success: false, message: 'Access Denied: Invalid administrator credentials.' });
    }

    failedLoginAttempts.delete(clientIp);
    admin.last_login = new Date();
    await admin.save();

    await AuditLog.create({ actor_type: 'ADMIN', actor_id: admin._id, action: 'ADMIN_LOGIN_SUCCESS', details: `Admin ${admin.username} authorized`, ip_address: clientIp });

    const token = generateToken(admin);

    res.json({
      success: true,
      message: 'Authentication successful. Welcome to Trident Command Center.',
      token,
      admin: { id: admin._id, username: admin.username, email: admin.email, full_name: admin.full_name, role: admin.role }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: 'An internal authentication error occurred.' });
  }
}

export async function getCurrentAdmin(req, res) {
  res.json({ success: true, admin: req.admin });
}

function recordFailedAttempt(ip) {
  const current = failedLoginAttempts.get(ip) || { count: 0, lockedUntil: 0 };
  current.count += 1;
  if (current.count >= MAX_FAILED_ATTEMPTS) current.lockedUntil = Date.now() + LOCKOUT_WINDOW_MS;
  failedLoginAttempts.set(ip, current);
}
