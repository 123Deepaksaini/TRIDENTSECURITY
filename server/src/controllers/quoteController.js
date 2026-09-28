import { QuoteRequest } from '../config/db.js';
import { apiCache } from '../utils/cache.js';
import { encryptData } from '../utils/crypto.js';

export async function submitQuoteRequest(req, res) {
  try {
    const { customer_name, company_name, email, phone, city, state, shift_duration, estimated_monthly_inr, cart_items, special_instructions } = req.body;

    if (!customer_name || !email || !phone || !cart_items || cart_items.length === 0) {
      return res.status(400).json({ success: false, message: 'Name, email, phone number, and at least one service item in cart are required.' });
    }

    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceNo = `TRD-${new Date().getFullYear()}-${randomHex}`;
    const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    const sanitizedBudget = Number(estimated_monthly_inr) || 0;
    const sanitizedNotes = special_instructions ? String(special_instructions).trim().slice(0, 3000) : null;

    await QuoteRequest.create({
      reference_no:          referenceNo,
      customer_name:         String(customer_name).trim().slice(0, 100),
      company_name:          company_name ? String(company_name).trim().slice(0, 150) : 'Individual / Private',
      email:                 encryptData(String(email).trim().toLowerCase().slice(0, 120)),
      phone:                 encryptData(String(phone).trim().slice(0, 20)),
      city:                  String(city || 'Jabalpur').trim().slice(0, 100),
      state:                 String(state || 'Madhya Pradesh').trim().slice(0, 100),
      shift_duration:        String(shift_duration || '24_HOURS').slice(0, 50),
      estimated_monthly_inr: sanitizedBudget,
      cart_items_json:       cart_items,
      special_instructions:  sanitizedNotes ? encryptData(sanitizedNotes) : null,
      ip_address:            ip
    });

    apiCache.del('admin_metrics');

    res.status(201).json({
      success: true,
      message: 'Security Service Quote Request registered successfully!',
      referenceNo,
      estimatedMonthly: sanitizedBudget
    });
  } catch (err) {
    console.error('Submit Quote Error:', err);
    res.status(500).json({ success: false, message: 'Failed to register quote request. Please contact 0761-4035967.' });
  }
}
