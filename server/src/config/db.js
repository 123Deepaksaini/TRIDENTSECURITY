import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { hashPassword } from '../utils/hash.js';

dotenv.config();

// ─── SCHEMAS ────────────────────────────────────────────────────────────────

const adminSchema = new mongoose.Schema({
  username:      { type: String, required: true, unique: true },
  email:         { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  full_name:     { type: String, default: 'System Administrator' },
  role:          { type: String, enum: ['SUPER_ADMIN', 'SECURITY_OFFICER', 'DISPATCHER'], default: 'SECURITY_OFFICER' },
  is_active:     { type: Boolean, default: true },
  last_login:    { type: Date, default: null }
}, { timestamps: true });

const inquirySchema = new mongoose.Schema({
  name:         { type: String, required: true },
  email:        { type: String, required: true },
  phone:        { type: String, required: true },
  service_type: { type: String, default: 'General Inquiry' },
  message:      { type: String, required: true },
  status:       { type: String, enum: ['NEW', 'CONTACTED', 'IN_PROGRESS', 'RESOLVED', 'SPAM'], default: 'NEW' },
  admin_notes:  { type: String, default: null },
  ip_address:   { type: String, default: null },
  user_agent:   { type: String, default: null }
}, { timestamps: true });

const quoteSchema = new mongoose.Schema({
  reference_no:           { type: String, required: true, unique: true },
  customer_name:          { type: String, required: true },
  company_name:           { type: String, default: null },
  email:                  { type: String, required: true },
  phone:                  { type: String, required: true },
  city:                   { type: String, default: 'Jabalpur' },
  state:                  { type: String, default: 'Madhya Pradesh' },
  shift_duration:         { type: String, default: '24_HOURS' },
  estimated_monthly_inr:  { type: Number, default: 0 },
  cart_items_json:        { type: mongoose.Schema.Types.Mixed, required: true },
  special_instructions:   { type: String, default: null },
  status:                 { type: String, enum: ['PENDING_QUOTE', 'QUOTE_SENT', 'CONTRACT_SIGNED', 'REJECTED'], default: 'PENDING_QUOTE' },
  admin_notes:            { type: String, default: null },
  ip_address:             { type: String, default: null }
}, { timestamps: true });

const jobApplicationSchema = new mongoose.Schema({
  full_name:                  { type: String, required: true },
  phone:                      { type: String, required: true },
  email:                      { type: String, required: true },
  age:                        { type: Number, default: null },
  height_cm:                  { type: Number, default: null },
  applied_role:               { type: String, default: 'Security Guard' },
  experience_years:           { type: Number, default: 0 },
  is_ex_serviceman:           { type: Boolean, default: false },
  armed_license_held:         { type: Boolean, default: false },
  current_address:            { type: String, required: true },
  police_verification_status: { type: String, enum: ['VERIFIED', 'PENDING', 'NOT_APPLICABLE'], default: 'PENDING' },
  resume_summary:             { type: String, default: null },
  status:                     { type: String, enum: ['APPLICATION_RECEIVED', 'INTERVIEW_SCHEDULED', 'HIRED', 'REJECTED'], default: 'APPLICATION_RECEIVED' }
}, { timestamps: true });

const auditLogSchema = new mongoose.Schema({
  actor_type: { type: String, enum: ['SYSTEM', 'ADMIN', 'USER'], default: 'USER' },
  actor_id:   { type: mongoose.Schema.Types.Mixed, default: null },
  action:     { type: String, required: true },
  details:    { type: String, default: null },
  ip_address: { type: String, default: null }
}, { timestamps: true });

// ─── MODELS ─────────────────────────────────────────────────────────────────

export const Admin          = mongoose.model('Admin', adminSchema);
export const Inquiry        = mongoose.model('Inquiry', inquirySchema);
export const QuoteRequest   = mongoose.model('QuoteRequest', quoteSchema);
export const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export const AuditLog       = mongoose.model('AuditLog', auditLogSchema);

// ─── INIT ────────────────────────────────────────────────────────────────────

let isConnected = false;

export async function initDatabase() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not set in .env');

    await mongoose.connect(uri);
    isConnected = true;
    console.log('✅ Connected to MongoDB successfully!');

    // Seed default admin if none exists
    const existing = await Admin.findOne({});
    if (!existing) {
      const hashed = await hashPassword(process.env.ADMIN_DEFAULT_PASSWORD || 'TridentAdmin@2026!');
      await Admin.create({
        username:      process.env.ADMIN_DEFAULT_USERNAME || 'admin',
        email:         process.env.ADMIN_DEFAULT_EMAIL || 'admin@tridentsecuritys.com',
        password_hash: hashed,
        full_name:     'Trident Command Center Admin',
        role:          'SUPER_ADMIN'
      });
      console.log('👤 Default Admin seeded in MongoDB.');
    }
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  }
}

export function getDbStatus() {
  return {
    isUsingFallback: false,
    engine: 'MongoDB Atlas',
    connected: isConnected
  };
}
