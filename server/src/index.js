import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import { generalLimiter } from './middleware/rateLimiter.js';
import { securitySanitizer } from './middleware/sanitize.js';
import apiRouter from './routes/api.js';
import { initDatabase } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIST_PATH = join(__dirname, '../../client/dist');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Hardening: Disable Express signature header
app.disable('x-powered-by');

// Security Middleware: Helmet with comprehensive hardening
app.use(helmet({
  contentSecurityPolicy: false, // Dev/hybrid mode compatibility for external maps & fonts
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  crossOriginEmbedderPolicy: false,
  frameguard: { action: 'deny' }, // Prevent Clickjacking attacks
  noSniff: true, // Prevent MIME-type sniffing
  hsts: {
    maxAge: 31536000, // 1 Year Strict Transport Security
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// Performance: Response compression
app.use(compression());

// CORS Configuration (Strict Whitelist + Development Fallback)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server or local tools
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('CORS blocked by Trident Security Gateway.'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
}));

// Request Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Request Body Parsers with safe payload limits (prevents Denial-of-Service through large memory buffers)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Apply Automatic Input Sanitization & Injection Defense across all requests
app.use(securitySanitizer);

// Trust proxy when behind reverse proxy / load balancer (Nginx / Cloudflare)
app.set('trust proxy', 1);

// Apply General Rate Limiter across all APIs
app.use('/api', generalLimiter);

// Mount API Gateway
app.use('/api', apiRouter);

// Serve React Frontend (if built)
if (existsSync(DIST_PATH)) {
  app.use(express.static(DIST_PATH));
  app.get('*', (req, res) => {
    res.sendFile(join(DIST_PATH, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ name: 'TRIDENT SECURITY SERVICES API GATEWAY', version: '2.0.0', status: 'ONLINE' });
  });
  app.use((req, res) => {
    res.status(404).json({ success: false, message: `Resource ${req.originalUrl} not found.` });
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Gateway Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Security Gateway Server Error'
  });
});

// Start Server
async function startServer() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`🛡️ Trident Security Gateway Server running on http://localhost:${PORT}`);
    console.log(`🔒 Security active: Helmet, Bcrypt, Rate Limiting, JWT Auth`);
  });
}

startServer();

export default app;
