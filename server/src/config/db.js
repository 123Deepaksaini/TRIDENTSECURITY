import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { hashPassword } from '../utils/hash.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const LOCAL_STORE_PATH = path.join(DATA_DIR, 'local_store.json');

let pool = null;
let isUsingFallback = false;

// In-Memory / File Store for seamless fallback
let localStore = {
  admins: [],
  inquiries: [],
  quote_requests: [],
  job_applications: [],
  audit_logs: []
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (fs.existsSync(LOCAL_STORE_PATH)) {
    try {
      const data = fs.readFileSync(LOCAL_STORE_PATH, 'utf-8');
      localStore = JSON.parse(data);
    } catch (err) {
      console.warn('⚠️ Could not load local store, initializing fresh store:', err.message);
    }
  }
}

function persistLocalStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(localStore, null, 2), 'utf-8');
  } catch (err) {
    console.error('❌ Failed to persist local store:', err.message);
  }
}

export async function initDatabase() {
  ensureDataDir();

  const defaultAdminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'TridentAdmin@2026!';
  const defaultAdminHashed = await hashPassword(defaultAdminPassword);

  // Initialize Default Admin in Fallback Store
  if (localStore.admins.length === 0) {
    localStore.admins.push({
      id: 1,
      username: process.env.ADMIN_DEFAULT_USERNAME || 'admin',
      email: process.env.ADMIN_DEFAULT_EMAIL || 'admin@tridentsecuritys.com',
      password_hash: defaultAdminHashed,
      full_name: 'Trident Command Center Admin',
      role: 'SUPER_ADMIN',
      is_active: 1,
      last_login: null,
      created_at: new Date().toISOString()
    });
    persistLocalStore();
  }

  try {
    console.log(`🔌 Attempting connection to MySQL at ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}...`);

    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'trident_security_db',
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 50,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });

    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database successfully!');

    // Initialize Tables in MySQL
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`admins\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`username\` VARCHAR(50) NOT NULL UNIQUE,
        \`email\` VARCHAR(100) NOT NULL UNIQUE,
        \`password_hash\` VARCHAR(255) NOT NULL,
        \`full_name\` VARCHAR(100) NOT NULL DEFAULT 'System Administrator',
        \`role\` ENUM('SUPER_ADMIN', 'SECURITY_OFFICER', 'DISPATCHER') NOT NULL DEFAULT 'SECURITY_OFFICER',
        \`is_active\` BOOLEAN NOT NULL DEFAULT TRUE,
        \`last_login\` DATETIME NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`inquiries\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`name\` VARCHAR(100) NOT NULL,
        \`email\` VARCHAR(120) NOT NULL,
        \`phone\` VARCHAR(20) NOT NULL,
        \`service_type\` VARCHAR(100) NOT NULL DEFAULT 'General Inquiry',
        \`message\` TEXT NOT NULL,
        \`status\` ENUM('NEW', 'CONTACTED', 'IN_PROGRESS', 'RESOLVED', 'SPAM') NOT NULL DEFAULT 'NEW',
        \`admin_notes\` TEXT NULL,
        \`ip_address\` VARCHAR(45) NULL,
        \`user_agent\` VARCHAR(255) NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`quote_requests\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`reference_no\` VARCHAR(30) NOT NULL UNIQUE,
        \`customer_name\` VARCHAR(100) NOT NULL,
        \`company_name\` VARCHAR(150) NULL,
        \`email\` VARCHAR(120) NOT NULL,
        \`phone\` VARCHAR(20) NOT NULL,
        \`city\` VARCHAR(100) NOT NULL DEFAULT 'Jabalpur',
        \`state\` VARCHAR(100) NOT NULL DEFAULT 'Madhya Pradesh',
        \`shift_duration\` VARCHAR(50) NOT NULL DEFAULT '24_HOURS',
        \`estimated_monthly_inr\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
        \`cart_items_json\` JSON NOT NULL,
        \`special_instructions\` TEXT NULL,
        \`status\` ENUM('PENDING_QUOTE', 'QUOTE_SENT', 'CONTRACT_SIGNED', 'REJECTED') NOT NULL DEFAULT 'PENDING_QUOTE',
        \`admin_notes\` TEXT NULL,
        \`ip_address\` VARCHAR(45) NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`job_applications\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`full_name\` VARCHAR(100) NOT NULL,
        \`phone\` VARCHAR(20) NOT NULL,
        \`email\` VARCHAR(120) NOT NULL,
        \`age\` INT NULL,
        \`height_cm\` INT NULL,
        \`applied_role\` VARCHAR(100) NOT NULL DEFAULT 'Security Guard',
        \`experience_years\` INT NOT NULL DEFAULT 0,
        \`is_ex_serviceman\` BOOLEAN NOT NULL DEFAULT FALSE,
        \`armed_license_held\` BOOLEAN NOT NULL DEFAULT FALSE,
        \`current_address\` TEXT NOT NULL,
        \`police_verification_status\` ENUM('VERIFIED', 'PENDING', 'NOT_APPLICABLE') DEFAULT 'PENDING',
        \`resume_summary\` TEXT NULL,
        \`status\` ENUM('APPLICATION_RECEIVED', 'INTERVIEW_SCHEDULED', 'HIRED', 'REJECTED') NOT NULL DEFAULT 'APPLICATION_RECEIVED',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`audit_logs\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`actor_type\` ENUM('SYSTEM', 'ADMIN', 'USER') NOT NULL DEFAULT 'USER',
        \`actor_id\` INT NULL,
        \`action\` VARCHAR(100) NOT NULL,
        \`details\` TEXT NULL,
        \`ip_address\` VARCHAR(45) NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Seed default admin if table is empty
    const [existingAdmins] = await connection.query('SELECT id FROM admins LIMIT 1');
    if (existingAdmins.length === 0) {
      await connection.query(
        'INSERT INTO admins (username, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, ?)',
        [
          process.env.ADMIN_DEFAULT_USERNAME || 'admin',
          process.env.ADMIN_DEFAULT_EMAIL || 'admin@tridentsecuritys.com',
          defaultAdminHashed,
          'Trident Command Center Admin',
          'SUPER_ADMIN'
        ]
      );
      console.log('👤 Default Admin seeded in MySQL.');
    }

    connection.release();
    isUsingFallback = false;
  } catch (err) {
    console.warn(`⚠️ MySQL Connection Warning: ${err.message}`);
    console.log('🔄 Activating high-resilience Local Data Engine (zero-downtime fallback mode).');
    isUsingFallback = true;
  }
}

/**
 * Universal query runner supporting both MySQL and Local Resilient Engine
 */
export async function dbQuery(sql, params = []) {
  if (!isUsingFallback && pool) {
    try {
      const [rows] = await pool.query(sql, params);
      return rows;
    } catch (err) {
      console.error('MySQL Query Error, falling back to local store:', err.message);
    }
  }

  // Fallback Engine implementation
  ensureDataDir();
  const sqlLower = sql.toLowerCase();

  if (sqlLower.startsWith('select')) {
    if (sqlLower.includes('admins')) {
      if (sqlLower.includes('where username = ? or email = ?')) {
        const u = params[0];
        const e = params[1];
        return localStore.admins.filter(a => a.username === u || a.email === e);
      }
      if (sqlLower.includes('where id = ?')) {
        return localStore.admins.filter(a => a.id === Number(params[0]));
      }
      return localStore.admins;
    }

    if (sqlLower.includes('inquiries')) {
      return [...localStore.inquiries].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    if (sqlLower.includes('quote_requests')) {
      return [...localStore.quote_requests].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    if (sqlLower.includes('job_applications')) {
      return [...localStore.job_applications].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    if (sqlLower.includes('audit_logs')) {
      return [...localStore.audit_logs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return [];
  }

  if (sqlLower.startsWith('insert into')) {
    const id = Date.now();
    const now = new Date().toISOString();

    if (sql.includes('inquiries')) {
      const [name, email, phone, service_type, message, status, ip, ua] = params;
      const record = { id, name, email, phone, service_type, message, status: status || 'NEW', admin_notes: null, ip_address: ip, user_agent: ua, created_at: now };
      localStore.inquiries.push(record);
      persistLocalStore();
      return { insertId: id, affectedRows: 1 };
    }

    if (sql.includes('quote_requests')) {
      const [ref, name, company, email, phone, city, state, shift, budget, cartJson, notes, ip] = params;
      const record = {
        id,
        reference_no: ref,
        customer_name: name,
        company_name: company,
        email,
        phone,
        city: city || 'Jabalpur',
        state: state || 'Madhya Pradesh',
        shift_duration: shift || '24_HOURS',
        estimated_monthly_inr: budget || 0,
        cart_items_json: typeof cartJson === 'string' ? JSON.parse(cartJson) : cartJson,
        special_instructions: notes,
        status: 'PENDING_QUOTE',
        admin_notes: null,
        ip_address: ip,
        created_at: now
      };
      localStore.quote_requests.push(record);
      persistLocalStore();
      return { insertId: id, affectedRows: 1 };
    }

    if (sql.includes('job_applications')) {
      const [fullName, phone, email, age, height, role, exp, isEx, hasLicense, address, notes] = params;
      const record = {
        id,
        full_name: fullName,
        phone,
        email,
        age: Number(age) || null,
        height_cm: Number(height) || null,
        applied_role: role || 'Security Guard',
        experience_years: Number(exp) || 0,
        is_ex_serviceman: Boolean(isEx),
        armed_license_held: Boolean(hasLicense),
        current_address: address,
        police_verification_status: 'PENDING',
        resume_summary: notes,
        status: 'APPLICATION_RECEIVED',
        created_at: now
      };
      localStore.job_applications.push(record);
      persistLocalStore();
      return { insertId: id, affectedRows: 1 };
    }

    if (sql.includes('audit_logs')) {
      const [actorType, actorId, action, details, ip] = params;
      const record = { id, actor_type: actorType, actor_id: actorId, action, details, ip_address: ip, created_at: now };
      localStore.audit_logs.push(record);
      persistLocalStore();
      return { insertId: id, affectedRows: 1 };
    }
  }

  if (sqlLower.startsWith('update')) {
    if (sqlLower.includes('inquiries')) {
      const id = Number(params[params.length - 1]);
      const record = localStore.inquiries.find(r => r.id === id);
      if (record) {
        if (params.length === 3) {
          record.status = params[0];
          record.admin_notes = params[1];
        } else if (params.length === 2) {
          record.status = params[0];
        }
        persistLocalStore();
        return { affectedRows: 1 };
      }
    }

    if (sqlLower.includes('quote_requests')) {
      const id = Number(params[params.length - 1]);
      const record = localStore.quote_requests.find(r => r.id === id);
      if (record) {
        record.status = params[0];
        if (params.length >= 3) record.admin_notes = params[1];
        persistLocalStore();
        return { affectedRows: 1 };
      }
    }

    if (sqlLower.includes('job_applications')) {
      const id = Number(params[params.length - 1]);
      const record = localStore.job_applications.find(r => r.id === id);
      if (record) {
        record.status = params[0];
        persistLocalStore();
        return { affectedRows: 1 };
      }
    }

    if (sqlLower.includes('admins')) {
      const id = Number(params[params.length - 1]);
      const record = localStore.admins.find(r => r.id === id);
      if (record) {
        record.last_login = new Date().toISOString();
        persistLocalStore();
        return { affectedRows: 1 };
      }
    }
  }

  if (sqlLower.startsWith('delete from')) {
    if (sqlLower.includes('inquiries')) {
      const id = Number(params[0]);
      localStore.inquiries = localStore.inquiries.filter(r => r.id !== id);
      persistLocalStore();
      return { affectedRows: 1 };
    }
    if (sqlLower.includes('quote_requests')) {
      const id = Number(params[0]);
      localStore.quote_requests = localStore.quote_requests.filter(r => r.id !== id);
      persistLocalStore();
      return { affectedRows: 1 };
    }
    if (sql.includes('job_applications')) {
      const id = Number(params[0]);
      localStore.job_applications = localStore.job_applications.filter(r => r.id !== id);
      persistLocalStore();
      return { affectedRows: 1 };
    }
  }

  return { affectedRows: 0 };
}

export function getDbStatus() {
  return {
    isUsingFallback,
    engine: isUsingFallback ? 'Local Resilient Engine' : 'MySQL Database Engine',
    connected: true
  };
}
