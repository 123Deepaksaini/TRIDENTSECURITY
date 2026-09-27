import { dbQuery } from '../config/db.js';
import { apiCache } from '../utils/cache.js';
import { encryptData } from '../utils/crypto.js';

export async function submitInquiry(req, res) {
  try {
    const { name, email, phone, service_type, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name, valid email, phone number, and message.'
      });
    }

    // Input sanitization
    const sanitizedName = String(name).trim().slice(0, 100);
    const sanitizedEmail = String(email).trim().toLowerCase().slice(0, 120);
    const sanitizedPhone = String(phone).trim().slice(0, 20);
    const sanitizedService = String(service_type || 'General Security Inquiry').trim().slice(0, 100);
    const sanitizedMessage = String(message).trim().slice(0, 3000);

    // Cryptographic Field-Level Encryption (AES-256-GCM)
    const encryptedPhone = encryptData(sanitizedPhone);
    const encryptedEmail = encryptData(sanitizedEmail);
    const encryptedMessage = encryptData(sanitizedMessage);

    const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    const ua = (req.headers['user-agent'] || '').slice(0, 255);

    const result = await dbQuery(
      'INSERT INTO inquiries (name, email, phone, service_type, message, status, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [sanitizedName, encryptedEmail, encryptedPhone, sanitizedService, encryptedMessage, 'NEW', ip, ua]
    );

    // Invalidate admin cache so new counts reflect immediately
    apiCache.del('admin_metrics');

    res.status(201).json({
      success: true,
      message: 'Thank you! Your security inquiry has been securely encrypted and received. Our officer will contact you within 30 minutes.',
      inquiryId: result.insertId
    });
  } catch (err) {
    console.error('Submit Inquiry Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to process inquiry. Please call us directly at 0761-4035967.'
    });
  }
}

