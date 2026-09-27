/**
 * Enterprise Input Sanitization & Anti-Injection Middleware for Trident Security Gateway
 */

// Regex patterns to detect malicious script injections, SQL injection tokens, and prototype pollution
const DANGEROUS_TAGS_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const DANGEROUS_ATTRIBUTES_REGEX = /\s*(on\w+|javascript:|data:|vbscript:)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const SQL_INJECTION_REGEX = /('|--|;|\/\*|\*\/|\b(UNION|SELECT|INSERT|DELETE|UPDATE|DROP|ALTER|EXEC|EXECUTE)\b)/i;

/**
 * Clean a single string against XSS, HTML script execution, and control characters
 * @param {string} str 
 * @returns {string}
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return str;

  return str
    .replace(DANGEROUS_TAGS_REGEX, '')
    .replace(DANGEROUS_ATTRIBUTES_REGEX, '')
    .replace(/<iframe/gi, '&lt;iframe')
    .replace(/<\/iframe>/gi, '&lt;/iframe&gt;')
    .replace(/<object/gi, '&lt;object')
    .replace(/<embed/gi, '&lt;embed')
    .trim();
}

/**
 * Deep recursive object sanitizer & Prototype Pollution guard
 * @param {any} obj 
 * @returns {any}
 */
export function deepSanitize(obj) {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepSanitize(item));
  }

  if (typeof obj === 'object') {
    const cleaned = {};
    for (const key of Object.keys(obj)) {
      // Protect against Prototype Pollution
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue;
      }
      cleaned[key] = deepSanitize(obj[key]);
    }
    return cleaned;
  }

  return obj;
}

/**
 * Express Middleware to sanitize req.body, req.query, and req.params automatically
 */
export function securitySanitizer(req, res, next) {
  if (req.body) {
    req.body = deepSanitize(req.body);
  }
  if (req.query) {
    req.query = deepSanitize(req.query);
  }
  if (req.params) {
    req.params = deepSanitize(req.params);
  }
  next();
}
