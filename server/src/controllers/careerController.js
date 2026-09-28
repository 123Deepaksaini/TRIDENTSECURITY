import { JobApplication } from '../config/db.js';
import { apiCache } from '../utils/cache.js';
import { encryptData } from '../utils/crypto.js';

export async function submitApplication(req, res) {
  try {
    const { full_name, phone, email, age, height_cm, applied_role, experience_years, is_ex_serviceman, armed_license_held, current_address, resume_summary } = req.body;

    if (!full_name || !phone || !email || !current_address) {
      return res.status(400).json({ success: false, message: 'Full name, contact phone, email, and address are required.' });
    }

    const sanitizedNotes = resume_summary ? String(resume_summary).trim().slice(0, 2000) : null;

    const application = await JobApplication.create({
      full_name:          String(full_name).trim().slice(0, 100),
      phone:              encryptData(String(phone).trim().slice(0, 20)),
      email:              encryptData(String(email).trim().toLowerCase().slice(0, 120)),
      age:                Number(age) || null,
      height_cm:          Number(height_cm) || null,
      applied_role:       String(applied_role || 'Security Guard').slice(0, 100),
      experience_years:   Number(experience_years) || 0,
      is_ex_serviceman:   Boolean(is_ex_serviceman),
      armed_license_held: Boolean(armed_license_held),
      current_address:    encryptData(String(current_address).trim().slice(0, 1000)),
      resume_summary:     sanitizedNotes ? encryptData(sanitizedNotes) : null
    });

    apiCache.del('admin_metrics');

    res.status(201).json({
      success: true,
      message: 'Your job application has been submitted to Trident HR Recruitment. We will call you for interview and verification.',
      applicationId: application._id
    });
  } catch (err) {
    console.error('Submit Application Error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit application. Please visit our Jabalpur office.' });
  }
}
