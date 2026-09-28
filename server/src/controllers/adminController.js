import { Inquiry, QuoteRequest, JobApplication, AuditLog } from '../config/db.js';
import { apiCache } from '../utils/cache.js';
import { decryptObjectFields } from '../utils/crypto.js';

export async function getDashboardMetrics(req, res) {
  try {
    const cached = apiCache.get('admin_metrics');
    if (cached) return res.json({ success: true, ...cached, fromCache: true });

    const [rawInquiries, rawQuotes, rawApplications, logs] = await Promise.all([
      Inquiry.find().sort({ createdAt: -1 }).lean(),
      QuoteRequest.find().sort({ createdAt: -1 }).lean(),
      JobApplication.find().sort({ createdAt: -1 }).lean(),
      AuditLog.find().sort({ createdAt: -1 }).limit(20).lean()
    ]);

    const inquiries    = decryptObjectFields(rawInquiries, ['phone', 'email', 'message']);
    const quotes       = decryptObjectFields(rawQuotes, ['phone', 'email', 'special_instructions']);
    const applications = decryptObjectFields(rawApplications, ['phone', 'email', 'current_address', 'resume_summary']);

    const data = {
      metrics: {
        totalInquiries:          inquiries.length,
        newInquiries:            inquiries.filter(i => i.status === 'NEW').length,
        totalQuotes:             quotes.length,
        pendingQuotes:           quotes.filter(q => q.status === 'PENDING_QUOTE').length,
        totalApplications:       applications.length,
        exServicemenCount:       applications.filter(a => a.is_ex_serviceman).length,
        totalEstimatedPipeline:  quotes.reduce((acc, q) => acc + (Number(q.estimated_monthly_inr) || 0), 0)
      },
      recentInquiries:    inquiries.slice(0, 10),
      recentQuotes:       quotes.slice(0, 10),
      recentApplications: applications.slice(0, 10),
      recentLogs:         logs
    };

    apiCache.set('admin_metrics', data, 15000);
    res.json({ success: true, ...data, fromCache: false });
  } catch (err) {
    console.error('Metrics Error:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve dashboard metrics.' });
  }
}

export async function getAllInquiries(req, res) {
  try {
    const raw = await Inquiry.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, inquiries: decryptObjectFields(raw, ['phone', 'email', 'message']) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load inquiries.' });
  }
}

export async function updateInquiryStatus(req, res) {
  try {
    const { status, admin_notes } = req.body;
    await Inquiry.findByIdAndUpdate(req.params.id, { status, admin_notes: admin_notes || null });
    apiCache.del('admin_metrics');
    res.json({ success: true, message: 'Inquiry status updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
}

export async function deleteInquiry(req, res) {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    apiCache.del('admin_metrics');
    res.json({ success: true, message: 'Inquiry record removed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete record.' });
  }
}

export async function getAllQuotes(req, res) {
  try {
    const raw = await QuoteRequest.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, quotes: decryptObjectFields(raw, ['phone', 'email', 'special_instructions']) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load quotes.' });
  }
}

export async function updateQuoteStatus(req, res) {
  try {
    const { status, admin_notes } = req.body;
    await QuoteRequest.findByIdAndUpdate(req.params.id, { status, admin_notes: admin_notes || null });
    apiCache.del('admin_metrics');
    res.json({ success: true, message: 'Quote status updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update quote status.' });
  }
}

export async function deleteQuote(req, res) {
  try {
    await QuoteRequest.findByIdAndDelete(req.params.id);
    apiCache.del('admin_metrics');
    res.json({ success: true, message: 'Quote request deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete quote.' });
  }
}

export async function getAllApplications(req, res) {
  try {
    const raw = await JobApplication.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, applications: decryptObjectFields(raw, ['phone', 'email', 'current_address', 'resume_summary']) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load applications.' });
  }
}

export async function updateApplicationStatus(req, res) {
  try {
    await JobApplication.findByIdAndUpdate(req.params.id, { status: req.body.status });
    apiCache.del('admin_metrics');
    res.json({ success: true, message: 'Application status updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update application.' });
  }
}
