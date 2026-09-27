import { dbQuery } from '../config/db.js';
import { apiCache } from '../utils/cache.js';
import { encryptData } from '../utils/crypto.js';

export async function submitApplication(req, res) {
  try {
    const {
      full_name,
      phone,
      email,
      age,
      height_cm,
      applied_role,
      experience_years,
      is_ex_serviceman,
      armed_license_held,
      current_address,
      resume_summary
    } = req.body;

    if (!full_name || !phone || !email || !current_address) {
      return res.status(400).json({
        success: false,
        message: 'Full name, contact phone, email, and address are required.'
      });
    }

    const sanitizedName = String(full_name).trim().slice(0, 100);
    const sanitizedPhone = String(phone).trim().slice(0, 20);
    const sanitizedEmail = String(email).trim().toLowerCase().slice(0, 120);
    const sanitizedRole = String(applied_role || 'Security Guard').slice(0, 100);
    const sanitizedAddress = String(current_address).trim().slice(0, 1000);
    const sanitizedNotes = resume_summary ? String(resume_summary).trim().slice(0, 2000) : null;

    // Cryptographic Field-Level Encryption (AES-256-GCM)
    const encryptedPhone = encryptData(sanitizedPhone);
    const encryptedEmail = encryptData(sanitizedEmail);
    const encryptedAddress = encryptData(sanitizedAddress);
    const encryptedNotes = sanitizedNotes ? encryptData(sanitizedNotes) : null;

    const result = await dbQuery(
      `INSERT INTO job_applications 
      (full_name, phone, email, age, height_cm, applied_role, experience_years, is_ex_serviceman, armed_license_held, current_address, resume_summary) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sanitizedName,
        encryptedPhone,
        encryptedEmail,
        Number(age) || null,
        Number(height_cm) || null,
        sanitizedRole,
        Number(experience_years) || 0,
        Boolean(is_ex_serviceman),
        Boolean(armed_license_held),
        encryptedAddress,
        encryptedNotes
      ]
    );

    apiCache.del('admin_metrics');

    res.status(201).json({
      success: true,
      message: 'Your job application has been securely encrypted and submitted to Trident HR Recruitment cell. We will call you for interview and verification.',
      applicationId: result.insertId
    });
  } catch (err) {
    console.error('Submit Application Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please visit our Jabalpur office with your original documents.'
    });
  }
}

