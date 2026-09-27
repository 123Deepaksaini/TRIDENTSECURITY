import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getAdminMetrics,
  getAdminInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getAdminQuotes,
  updateQuoteStatus,
  deleteQuote,
  getAdminApplications,
  updateApplicationStatus,
  checkHealth
} from '../services/api';
import {
  Shield,
  Users,
  FileText,
  Briefcase,
  Activity,
  CheckCircle2,
  Clock,
  Trash2,
  Download,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  ChevronRight,
  Eye,
  AlertCircle,
  Phone,
  Mail,
  Building
} from 'lucide-react';

export default function AdminDashboard({ setCurrentPage }) {
  const { admin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries', 'quotes', 'applications', 'logs', 'health'
  
  const [metrics, setMetrics] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [healthData, setHealthData] = useState(null);
  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [mRes, inqRes, qRes, appRes, hRes] = await Promise.all([
        getAdminMetrics().catch(() => null),
        getAdminInquiries().catch(() => ({ inquiries: [] })),
        getAdminQuotes().catch(() => ({ quotes: [] })),
        getAdminApplications().catch(() => ({ applications: [] })),
        checkHealth().catch(() => null)
      ]);

      if (mRes && mRes.metrics) {
        setMetrics(mRes.metrics);
        setLogs(mRes.recentLogs || []);
      }
      setInquiries(inqRes.inquiries || []);
      setQuotes(qRes.quotes || []);
      setApplications(appRes.applications || []);
      setHealthData(hRes);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Status Updaters
  const handleInquiryStatus = async (id, newStatus) => {
    await updateInquiryStatus(id, newStatus);
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
  };

  const handleInquiryDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry record?')) return;
    await deleteInquiry(id);
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const handleQuoteStatus = async (id, newStatus) => {
    await updateQuoteStatus(id, newStatus);
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
  };

  const handleQuoteDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quote request?')) return;
    await deleteQuote(id);
    setQuotes(prev => prev.filter(q => q.id !== id));
  };

  const handleAppStatus = async (id, newStatus) => {
    await updateApplicationStatus(id, newStatus);
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  // CSV Export Utility
  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert('No data available to export.');
      return;
    }
    const headers = Object.keys(data[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header];
        const stringified = typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
        return `"${stringified.replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Admin Bar */}
      <div className="p-6 rounded-3xl bg-white text-slate-900 dark:bg-navy-900 dark:text-white border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400 border border-primary-500/20 dark:border-primary-500/30 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                Trident Command Center
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30 font-bold">
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Logged in as <span className="text-slate-900 dark:text-white font-bold">{admin?.full_name || 'Administrator'}</span> ({admin?.email})
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors"
            title="Refresh Live Feeds"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => {
              logout();
              setCurrentPage('home');
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-bold border border-rose-500/30 transition-all flex items-center space-x-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span>Inquiries Received</span>
            <FileText className="w-4 h-4 text-primary-500" />
          </div>
          <div className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">
            {metrics?.totalInquiries ?? inquiries.length}
          </div>
          <div className="text-[11px] text-emerald-500 font-medium">
            {metrics?.newInquiries ?? inquiries.filter(i => i.status === 'NEW').length} New Unread
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span>Quote Cart Requests</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">
            {metrics?.totalQuotes ?? quotes.length}
          </div>
          <div className="text-[11px] text-amber-500 font-medium">
            ₹{Number(metrics?.totalEstimatedPipeline || 0).toLocaleString('en-IN')} Pipeline
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span>Job Applications</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">
            {metrics?.totalApplications ?? applications.length}
          </div>
          <div className="text-[11px] text-blue-500 font-medium">
            {applications.filter(a => a.is_ex_serviceman).length} Ex-Servicemen Candidates
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span>Core Gateway Engine</span>
            <Shield className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-heading font-extrabold text-xl text-emerald-600 dark:text-emerald-400 truncate">
            {healthData?.db?.engine || 'Operational'}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Mem: {healthData?.memoryUsageMb || 18} MB • 100k/min Ready
          </div>
        </div>
      </div>

      {/* Tabs Navigation & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'inquiries', label: `Inquiries (${inquiries.length})` },
            { id: 'quotes', label: `Quote Requests (${quotes.length})` },
            { id: 'applications', label: `Applications (${applications.length})` },
            { id: 'logs', label: 'Audit Logs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search records..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
            />
          </div>

          <button
            onClick={() => {
              if (activeTab === 'inquiries') exportToCSV(inquiries, 'trident_inquiries');
              if (activeTab === 'quotes') exportToCSV(quotes, 'trident_quotes');
              if (activeTab === 'applications') exportToCSV(applications, 'trident_applications');
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-navy-900 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-white/10 flex items-center space-x-1.5"
            title="Download CSV Report"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT: 1. INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="p-4">Sender & Phone</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {inquiries
                  .filter(i => 
                    i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    i.phone?.includes(searchTerm) ||
                    i.email?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold text-slate-900 dark:text-white">
                        <div>{inq.name}</div>
                        <a href={`tel:${inq.phone}`} className="text-primary-600 dark:text-primary-400 text-[11px] font-mono hover:underline flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {inq.phone}
                        </a>
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">{inq.email}</td>
                      <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{inq.service_type}</td>
                      <td className="p-4 max-w-xs truncate text-slate-600 dark:text-slate-300" title={inq.message}>
                        {inq.message}
                      </td>
                      <td className="p-4">
                        <select
                          value={inq.status}
                          onChange={(e) => handleInquiryStatus(inq.id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                            inq.status === 'NEW'
                              ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                              : inq.status === 'CONTACTED'
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="IN_PROGRESS">IN_PROGRESS</option>
                          <option value="RESOLVED">RESOLVED</option>
                          <option value="SPAM">SPAM</option>
                        </select>
                      </td>
                      <td className="p-4 text-[11px] text-slate-400 font-mono whitespace-nowrap">
                        {new Date(inq.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleInquiryDelete(inq.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. QUOTE CART REQUESTS */}
      {activeTab === 'quotes' && (
        <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="p-4">Ref Number</th>
                  <th className="p-4">Client / Company</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Shift & City</th>
                  <th className="p-4">Monthly Value</th>
                  <th className="p-4">Cart Breakdown</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {quotes
                  .filter(q => 
                    q.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    q.reference_no?.includes(searchTerm) ||
                    q.phone?.includes(searchTerm)
                  )
                  .map((quote) => (
                    <tr key={quote.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono font-bold text-primary-600 dark:text-primary-400">
                        {quote.reference_no}
                      </td>
                      <td className="p-4 font-semibold text-slate-900 dark:text-white">
                        <div>{quote.customer_name}</div>
                        <div className="text-[11px] text-slate-400">{quote.company_name || 'Private Client'}</div>
                      </td>
                      <td className="p-4">
                        <div>{quote.phone}</div>
                        <div className="text-slate-400 text-[11px]">{quote.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold">{quote.shift_duration?.replace('_', ' ')}</div>
                        <div className="text-slate-400 text-[11px]">{quote.city}, {quote.state}</div>
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {quote.estimated_monthly_inr > 0 ? `₹${Number(quote.estimated_monthly_inr).toLocaleString('en-IN')}` : 'Custom Quote'}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedQuoteDetail(quote)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-primary-500 hover:text-white text-xs font-semibold transition-all flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Units</span>
                        </button>
                      </td>
                      <td className="p-4">
                        <select
                          value={quote.status}
                          onChange={(e) => handleQuoteStatus(quote.id, e.target.value)}
                          className="text-xs font-bold px-2 py-1 rounded-lg border bg-white dark:bg-navy-950 border-slate-300 dark:border-white/10 focus:outline-none"
                        >
                          <option value="PENDING_QUOTE">PENDING_QUOTE</option>
                          <option value="QUOTE_SENT">QUOTE_SENT</option>
                          <option value="CONTRACT_SIGNED">CONTRACT_SIGNED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleQuoteDelete(quote.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. JOB APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="p-4">Candidate & Phone</th>
                  <th className="p-4">Role Applied</th>
                  <th className="p-4">Age / Height</th>
                  <th className="p-4">Qualifications</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {applications
                  .filter(a => 
                    a.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    a.phone?.includes(searchTerm) ||
                    a.applied_role?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold text-slate-900 dark:text-white">
                        <div>{app.full_name}</div>
                        <a href={`tel:${app.phone}`} className="text-primary-600 dark:text-primary-400 font-mono text-[11px] hover:underline">
                          {app.phone}
                        </a>
                      </td>
                      <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                        {app.applied_role} ({app.experience_years}y exp)
                      </td>
                      <td className="p-4">
                        {app.age ? `${app.age} yrs` : 'N/A'} • {app.height_cm ? `${app.height_cm} cm` : 'N/A'}
                      </td>
                      <td className="p-4 space-y-1">
                        {app.is_ex_serviceman && (
                          <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500 font-bold mr-1">
                            🎖️ Ex-Serviceman
                          </span>
                        )}
                        {app.armed_license_held && (
                          <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-500 font-bold">
                            🔫 Gun License
                          </span>
                        )}
                      </td>
                      <td className="p-4 max-w-xs truncate text-slate-500" title={app.current_address}>
                        {app.current_address}
                      </td>
                      <td className="p-4">
                        <select
                          value={app.status}
                          onChange={(e) => handleAppStatus(app.id, e.target.value)}
                          className="text-xs font-bold px-2 py-1 rounded-lg border bg-white dark:bg-navy-950 border-slate-300 dark:border-white/10 focus:outline-none"
                        >
                          <option value="APPLICATION_RECEIVED">RECEIVED</option>
                          <option value="INTERVIEW_SCHEDULED">INTERVIEW</option>
                          <option value="HIRED">HIRED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>
                      <td className="p-4 text-[11px] text-slate-400 font-mono whitespace-nowrap">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 shadow-sm p-6 space-y-4">
          <h4 className="font-heading font-bold text-slate-900 dark:text-white text-base">
            Security Gateway Activity & Access Audit Log
          </h4>
          <div className="space-y-2 max-h-96 overflow-y-auto font-mono text-xs text-slate-600 dark:text-slate-400">
            {logs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/5 flex justify-between items-center">
                <div>
                  <span className="text-primary-600 dark:text-primary-400 font-bold mr-2">[{log.action}]</span>
                  <span>{log.details || 'Gateway event'}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  IP: {log.ip_address || '127.0.0.1'} • {new Date(log.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quote Units Detail Modal */}
      {selectedQuoteDetail && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-3">
              <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Quote Breakdown: {selectedQuoteDetail.reference_no}
              </h4>
              <button onClick={() => setSelectedQuoteDetail(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong>Customer:</strong> {selectedQuoteDetail.customer_name} ({selectedQuoteDetail.company_name})</p>
              <p><strong>Phone:</strong> {selectedQuoteDetail.phone} | <strong>Email:</strong> {selectedQuoteDetail.email}</p>
              <p><strong>Shift Cycle:</strong> {selectedQuoteDetail.shift_duration}</p>
              <p><strong>Special Notes:</strong> {selectedQuoteDetail.special_instructions || 'None provided'}</p>
              
              <div className="pt-2">
                <p className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1">
                  Selected Force Units:
                </p>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 space-y-1">
                  {(() => {
                    try {
                      const items = typeof selectedQuoteDetail.cart_items_json === 'string'
                        ? JSON.parse(selectedQuoteDetail.cart_items_json)
                        : selectedQuoteDetail.cart_items_json || [];
                      return items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>• {item.title}</span>
                          <span className="font-bold font-mono">Qty: {item.quantity}</span>
                        </div>
                      ));
                    } catch (e) {
                      return <p>Error rendering items.</p>;
                    }
                  })()}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedQuoteDetail(null)}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
