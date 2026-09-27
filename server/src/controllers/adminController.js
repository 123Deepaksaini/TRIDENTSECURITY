import { dbQuery } from '../config/db.js';
import { apiCache } from '../utils/cache.js';
import { decryptObjectFields } from '../utils/crypto.js';

export async function getDashboardMetrics(req, res) {
  try {
    const cached = apiCache.get('admin_metrics');
    if (cached) {
      return res.json({ success: true, ...cached, fromCache: true });
    }

    const rawInquiries = await dbQuery('SELECT * FROM inquiries ORDER BY created_at DESC');
    const rawQuotes = await dbQuery('SELECT * FROM quote_requests ORDER BY created_at DESC');
    const rawApplications = await dbQuery('SELECT * FROM job_applications ORDER BY created_at DESC');
    const logs = await dbQuery('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 20');

    // Secure Decryption for Admin View
    const inquiries = decryptObjectFields(rawInquiries, ['phone', 'email', 'message']);
    const quotes = decryptObjectFields(rawQuotes, ['phone', 'email', 'special_instructions']);
    const applications = decryptObjectFields(rawApplications, ['phone', 'email', 'current_address', 'resume_summary']);

    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter(i => i.status === 'NEW').length;
    const totalQuotes = quotes.length;
    const pendingQuotes = quotes.filter(q => q.status === 'PENDING_QUOTE').length;
    const totalApplications = applications.length;
    const exServicemenCount = applications.filter(a => a.is_ex_serviceman).length;

    const totalEstimatedPipeline = quotes.reduce((acc, q) => acc + (Number(q.estimated_monthly_inr) || 0), 0);

    const data = {
      metrics: {
        totalInquiries,
        newInquiries,
        totalQuotes,
        pendingQuotes,
        totalApplications,
        exServicemenCount,
        totalEstimatedPipeline
      },
      recentInquiries: inquiries.slice(0, 10),
      recentQuotes: quotes.slice(0, 10),
      recentApplications: applications.slice(0, 10),
      recentLogs: logs
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
    const rawInquiries = await dbQuery('SELECT * FROM inquiries ORDER BY created_at DESC');
    const inquiries = decryptObjectFields(rawInquiries, ['phone', 'email', 'message']);
    res.json({ success: true, inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load inquiries.' });
  }
}

export async function updateInquiryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;
    await dbQuery('UPDATE inquiries SET status = ?, admin_notes = ? WHERE id = ?', [status, admin_notes || null, id]);
    apiCache.del('admin_metrics');
    res.json({ success: true, message: 'Inquiry status updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
}

export async function deleteInquiry(req, res) {
  try {
    const { id } = req.params;
    await dbQuery('DELETE FROM inquiries WHERE id = ?', [id]);
    apiCache.del('admin_metrics');
    res.json({ success: true, message: 'Inquiry record removed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete record.' });
  }
}

export async function getAllQuotes(req, res) {
  try {
    const rawQuotes = await dbQuery('SELECT * FROM quote_requests ORDER BY created_at DESC');
    const quotes = decryptObjectFields(rawQuotes, ['phone', 'email', 'special_instructions']);
    res.json({ success: true, quotes });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load quotes.' });
  }
}

export async function updateQuoteStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;
    await dbQuery('UPDATE quote_requests SET status = ?, admin_notes = ? WHERE id = ?', [status, admin_notes || null, id]);
    apiCache.del('admin_metrics');
    res.json({ success: true, message: 'Quote status updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update quote status.' });
  }
}

export async function deleteQuote(req, res) {
  try {
    const { id } = req.params;
    await dbQuery('DELETE FROM quote_requests WHERE id = ?', [id]);
    apiCache.del('admin_metrics');
    res.json({ success: true, message: 'Quote request deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete quote.' });
  }
}

export async function getAllApplications(req, res) {
  try {
    const rawApplications = await dbQuery('SELECT * FROM job_applications ORDER BY created_at DESC');
    const applications = decryptObjectFields(rawApplications, ['phone', 'email', 'current_address', 'resume_summary']);
    res.json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load applications.' });
  }
}

export async function updateApplicationStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await dbQuery('UPDATE job_applications SET status = ? WHERE id = ?', [status, id]);
    apiCache.del('admin_metrics');
    res.json({ success: true, message: 'Application status updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update application.' });
  }
}

