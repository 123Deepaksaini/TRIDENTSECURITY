import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Master Encryption Key (32-byte / 256-bit key for AES-256-GCM)
const RAW_KEY = process.env.ENCRYPTION_KEY || 'trident_military_grade_encryption_master_key_2026_aes256';
const MASTER_KEY = crypto.createHash('sha256').update(RAW_KEY).digest(); // Exactly 32 bytes

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96-bit IV recommended for GCM
const AUTH_TAG_LENGTH = 16; // 128-bit authentication tag

/**
 * Encrypt any text/string using AES-256-GCM with authentication tag and dynamic IV
 * @param {string} text - Plaintext to encrypt
 * @returns {string} - Combined safe string: `enc:iv:authTag:ciphertext`
 */
export function encryptData(text) {
  if (text === null || text === undefined || text === '') {
    return text;
  }

  try {
    const stringValue = typeof text === 'string' ? text : JSON.stringify(text);
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, MASTER_KEY, iv, {
      authTagLength: AUTH_TAG_LENGTH
    });

    let encrypted = cipher.update(stringValue, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    // Format: enc:<iv_hex>:<authTag_hex>:<cipher_hex>
    return `enc:${iv.toString('hex')}:${authTag}:${encrypted}`;
  } catch (err) {
    console.error('Encryption Failure:', err);
    return text; // Safe fallback
  }
}

/**
 * Decrypt an AES-256-GCM encrypted payload with authentication verification
 * @param {string} cipherText - Payload in format `enc:iv:authTag:ciphertext`
 * @returns {string} - Decrypted plaintext or original if not encrypted
 */
export function decryptData(cipherText) {
  if (!cipherText || typeof cipherText !== 'string' || !cipherText.startsWith('enc:')) {
    return cipherText;
  }

  try {
    const parts = cipherText.split(':');
    if (parts.length !== 4) {
      return cipherText;
    }

    const [, ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, MASTER_KEY, iv, {
      authTagLength: AUTH_TAG_LENGTH
    });

    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (err) {
    // If decryption or auth tag fails (tampered payload or wrong key)
    console.error('Decryption Authentication Verification Failed (Tampered or Invalid):', err.message);
    return '[ENCRYPTED_RESTRICTED_DATA]';
  }
}

/**
 * Encrypt sensitive fields in an object (e.g. phone, email, customer_name, message)
 * @param {Object} obj 
 * @param {Array<string>} fieldsToEncrypt 
 * @returns {Object}
 */
export function encryptObjectFields(obj, fieldsToEncrypt = ['phone', 'email', 'message', 'special_instructions', 'current_address']) {
  if (!obj || typeof obj !== 'object') return obj;
  const cloned = { ...obj };

  for (const field of fieldsToEncrypt) {
    if (cloned[field] !== undefined && cloned[field] !== null) {
      cloned[field] = encryptData(String(cloned[field]));
    }
  }

  return cloned;
}

/**
 * Decrypt sensitive fields in an object or array of objects for authorized admin view
 * @param {Object|Array} data 
 * @param {Array<string>} fieldsToDecrypt 
 * @returns {Object|Array}
 */
export function decryptObjectFields(data, fieldsToDecrypt = ['phone', 'email', 'message', 'special_instructions', 'current_address']) {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map(item => decryptObjectFields(item, fieldsToDecrypt));
  }

  if (typeof data !== 'object') return data;
  const cloned = { ...data };

  for (const field of fieldsToDecrypt) {
    if (cloned[field] !== undefined && cloned[field] !== null) {
      cloned[field] = decryptData(String(cloned[field]));
    }
  }

  return cloned;
}

/**
 * Cryptographic constant-time string equality check to prevent timing attacks
 * @param {string} a 
 * @param {string} b 
 * @returns {boolean}
 */
export function timingSafeMatch(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}
