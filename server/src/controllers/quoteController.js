import { dbQuery } from '../config/db.js';
import { apiCache } from '../utils/cache.js';
import { encryptData } from '../utils/crypto.js';

export async function submitQuoteRequest(req, res) {
  try {
    const {
      customer_name,
      company_name,
      email,
      phone,
      city,
      state,
      shift_duration,
      estimated_monthly_inr,
      cart_items,
      special_instructions
    } = req.body;

    if (!customer_name || !email || !phone || !cart_items || cart_items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone number, and at least one service item in cart are required.'
      });
    }

    // Generate unique reference number like TRD-2026-A8F2
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceNo = `TRD-${new Date().getFullYear()}-${randomHex}`;

    const sanitizedName = String(customer_name).trim().slice(0, 100);
    const sanitizedCompany = company_name ? String(company_name).trim().slice(0, 150) : 'Individual / Private';
    const sanitizedEmail = String(email).trim().toLowerCase().slice(0, 120);
    const sanitizedPhone = String(phone).trim().slice(0, 20);
    const sanitizedCity = String(city || 'Jabalpur').trim().slice(0, 100);
    const sanitizedState = String(state || 'Madhya Pradesh').trim().slice(0, 100);
    const sanitizedShift = String(shift_duration || '24_HOURS').slice(0, 50);
    const sanitizedBudget = Number(estimated_monthly_inr) || 0;
    const cartJson = JSON.stringify(cart_items);
    const sanitizedNotes = special_instructions ? String(special_instructions).trim().slice(0, 3000) : null;
    const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

    // Cryptographic Field-Level Encryption (AES-256-GCM)
    const encryptedPhone = encryptData(sanitizedPhone);
    const encryptedEmail = encryptData(sanitizedEmail);
    const encryptedNotes = sanitizedNotes ? encryptData(sanitizedNotes) : null;

    await dbQuery(
      `INSERT INTO quote_requests 
      (reference_no, customer_name, company_name, email, phone, city, state, shift_duration, estimated_monthly_inr, cart_items_json, special_instructions, ip_address) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        referenceNo,
        sanitizedName,
        sanitizedCompany,
        encryptedEmail,
        encryptedPhone,
        sanitizedCity,
        sanitizedState,
        sanitizedShift,
        sanitizedBudget,
        cartJson,
        encryptedNotes,
        ip
      ]
    );

    apiCache.del('admin_metrics');

    res.status(201).json({
      success: true,
      message: 'Security Service Quote Request registered and encrypted successfully!',
      referenceNo,
      estimatedMonthly: sanitizedBudget
    });
  } catch (err) {
    console.error('Submit Quote Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to register quote request. Please contact 0761-4035967.'
    });
  }
}

