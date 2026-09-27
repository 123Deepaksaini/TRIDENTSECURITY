import express from 'express';
import { formSubmissionLimiter, authLimiter } from '../middleware/rateLimiter.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { login, getCurrentAdmin } from '../controllers/authController.js';
import { submitInquiry } from '../controllers/inquiryController.js';
import { submitQuoteRequest } from '../controllers/quoteController.js';
import { submitApplication } from '../controllers/careerController.js';
import {
  getDashboardMetrics,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getAllQuotes,
  updateQuoteStatus,
  deleteQuote,
  getAllApplications,
  updateApplicationStatus
} from '../controllers/adminController.js';
import { getDbStatus } from '../config/db.js';

const router = express.Router();

// --- PUBLIC HEALTH & SYSTEM INFO ---
router.get('/health', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    service: 'Trident Security Core API Gateway',
    timestamp: new Date().toISOString(),
    db: getDbStatus(),
    memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
  });
});

// --- PUBLIC SUBMISSIONS ---
router.post('/inquiries', formSubmissionLimiter, submitInquiry);
router.post('/quotes', formSubmissionLimiter, submitQuoteRequest);
router.post('/careers', formSubmissionLimiter, submitApplication);

// --- AUTHENTICATION ---
router.post('/auth/login', authLimiter, login);
router.get('/auth/me', requireAdminAuth, getCurrentAdmin);

// --- PROTECTED ADMIN ROUTES ---
router.get('/admin/metrics', requireAdminAuth, getDashboardMetrics);

// Inquiries Management
router.get('/admin/inquiries', requireAdminAuth, getAllInquiries);
router.patch('/admin/inquiries/:id', requireAdminAuth, updateInquiryStatus);
router.delete('/admin/inquiries/:id', requireAdminAuth, deleteInquiry);

// Quotes Management
router.get('/admin/quotes', requireAdminAuth, getAllQuotes);
router.patch('/admin/quotes/:id', requireAdminAuth, updateQuoteStatus);
router.delete('/admin/quotes/:id', requireAdminAuth, deleteQuote);

// Applications Management
router.get('/admin/applications', requireAdminAuth, getAllApplications);
router.patch('/admin/applications/:id', requireAdminAuth, updateApplicationStatus);

export default router;
