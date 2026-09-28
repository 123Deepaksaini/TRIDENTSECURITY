import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Admin } from '../config/db.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'trident_super_secure_secret_jwt_2026';

/**
 * Verify JWT token from Authorization header or cookies
 */
export async function requireAdminAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. No bearer token provided.'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select('-password_hash');

    if (!admin || !admin.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized or deactivated administrator account.'
      });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session token. Please log in again.'
    });
  }
}

/**
 * Generate a signed JWT token
 */
export function generateToken(admin) {
  return jwt.sign(
    {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}
