import { Inquiry } from '../config/db.js';
import { apiCache } from '../utils/cache.js';
import { encryptData } from '../utils/crypto.js';

export async function submitInquiry(req, res) {
  try {
    const { name, email, phone, service_type, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please provide your name, valid email, phone number, and message.' });
    }

    const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    const ua = (req.headers['user-agent'] || '').slice(0, 255);

    const inquiry = await Inquiry.create({
      name:         String(name).trim().slice(0, 100),
      email:        encryptData(String(email).trim().toLowerCase().slice(0, 120)),
      phone:        encryptData(String(phone).trim().slice(0, 20)),
      service_type: String(service_type || 'General Security Inquiry').trim().slice(0, 100),
      message:      encryptData(String(message).trim().slice(0, 3000)),
      status:       'NEW',
      ip_address:   ip,
      user_agent:   ua
    });

    apiCache.del('admin_metrics');

    res.status(201).json({
      success: true,
      message: 'Thank you! Your security inquiry has been securely received. Our officer will contact you within 30 minutes.',
      inquiryId: inquiry._id
    });
  } catch (err) {
    console.error('Submit Inquiry Error:', err);
    res.status(500).json({ success: false, message: 'Failed to process inquiry. Please call us directly at 0761-4035967.' });
  }
}
