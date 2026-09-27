import React, { useState } from 'react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/servicesData';
import { submitInquiry } from '../services/api';
import MapEmbed from '../components/MapEmbed';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Shield,
  MessageSquare
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: 'General Security Inquiry',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await submitInquiry(formData);
      if (response.success) {
        setSuccessMessage(response.message || 'Inquiry submitted successfully.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service_type: 'General Security Inquiry',
          message: ''
        });
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (err) { }
      } else {
        setErrorMessage(response.message || 'Failed to send message.');
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || `Error transmitting inquiry. Please call ${COMPANY_INFO.phoneMobile}.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-pinkTheme-100/90 border border-pinkTheme-200 shadow-sm inline-flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-primary-600" />
          Direct Control Room Dispatch
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-black dark:text-white tracking-tight">
          Contact Trident Security Services
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          Reach our 24/7 security duty desk in Jabalpur. We respond within 30 minutes for emergency deployments and site surveys.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Contact Info & Emergency Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light dark:shadow-card-dark space-y-6">
            <h3 className="font-heading font-black text-xl text-black dark:text-white flex items-center">
              <Shield className="w-5 h-5 text-primary-600 mr-2" />
              Central Headquarters
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3.5">
                <div className="p-2 rounded-xl bg-pinkTheme-100 text-primary-600 mt-0.5 flex-shrink-0 border border-pinkTheme-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-500 dark:text-slate-400 block text-xs uppercase tracking-wider">
                    Physical Address
                  </span>
                  <p className="text-slate-900 dark:text-slate-200 font-medium mt-0.5">
                    {COMPANY_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2 rounded-xl bg-pinkTheme-100 text-primary-600 mt-0.5 flex-shrink-0 border border-pinkTheme-200">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="font-bold text-slate-500 dark:text-slate-400 block text-xs uppercase tracking-wider">
                    Telephone Dispatch & Helpline
                  </span>
                  <div className="space-y-2 mt-1.5">
                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-pinkTheme-50/70 dark:bg-white/5 border border-pinkTheme-200/80 dark:border-white/10">
                      <div>
                        <span className="text-[10px] font-bold text-primary-700 dark:text-primary-400 block">Head Office Landline:</span>
                        <a href={`tel:${COMPANY_INFO.phoneLandline}`} className="text-sm font-extrabold text-black dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {COMPANY_INFO.phoneLandline}
                        </a>
                      </div>
                      <a href={`tel:${COMPANY_INFO.phoneLandline}`} className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-pinkTheme-200 dark:border-white/10">
                        Call Now
                      </a>
                    </div>

                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-pinkTheme-50/70 dark:bg-white/5 border border-pinkTheme-200/80 dark:border-white/10">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 block">WhatsApp & Primary Mobile:</span>
                        <a href={`tel:${COMPANY_INFO.phoneMobile}`} className="text-sm font-extrabold text-black dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {COMPANY_INFO.phoneMobile}
                        </a>
                      </div>
                      <a href={`tel:${COMPANY_INFO.phoneMobile}`} className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-pinkTheme-200 dark:border-white/10">
                        Call Now
                      </a>
                    </div>

                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-pinkTheme-50/70 dark:bg-white/5 border border-pinkTheme-200/80 dark:border-white/10">
                      <div>
                        <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 block">Operations Desk Line:</span>
                        <a href={`tel:${COMPANY_INFO.phoneSecondary}`} className="text-sm font-extrabold text-black dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {COMPANY_INFO.phoneSecondary}
                        </a>
                      </div>
                      <a href={`tel:${COMPANY_INFO.phoneSecondary}`} className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-pinkTheme-200 dark:border-white/10">
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2 rounded-xl bg-pinkTheme-100 text-primary-600 mt-0.5 flex-shrink-0 border border-pinkTheme-200">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-500 dark:text-slate-400 block text-xs uppercase tracking-wider">
                    Official Email
                  </span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-900 dark:text-slate-200 font-medium hover:text-primary-600 block mt-0.5">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 mt-0.5 flex-shrink-0 border border-emerald-500/20">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-500 dark:text-slate-400 block text-xs uppercase tracking-wider">
                    Control Room Readiness
                  </span>
                  <p className="text-emerald-700 dark:text-emerald-400 font-bold mt-0.5">
                    24 Hours / 7 Days / 365 Days Active
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  Instant WhatsApp Duty Officer
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  {COMPANY_INFO.whatsapp}
                </p>
              </div>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20"
              >
                Chat Now
              </a>
            </div>
          </div>
        </div>

        {/* Right: Interactive Inquiry Form */}
        <div className="lg:col-span-7 bg-white dark:bg-navy-900 p-8 rounded-3xl border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light dark:shadow-card-dark space-y-6">
          <div className="space-y-1">
            <h3 className="font-heading font-black text-2xl text-black dark:text-white">
              Send an Official Security Inquiry
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Provide your details and requirement overview for immediate officer response.
            </p>
          </div>

          {successMessage && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Ramesh Singh"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white text-xs focus:outline-none focus:border-primary-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 9682165489"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white text-xs focus:outline-none focus:border-primary-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@organization.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white text-xs focus:outline-none focus:border-primary-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Primary Service of Interest
                </label>
                <select
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white text-xs focus:outline-none focus:border-primary-500 focus:bg-white"
                >
                  <option value="General Security Inquiry">General Security Inquiry</option>
                  {SERVICES_DATA.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                Requirement Details / Message *
              </label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Describe your security requirements, location, duration, and any specific guard specifications..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white text-xs focus:outline-none focus:border-primary-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <span className="flex items-center">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Transmitting Message...
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Send Inquiry to Operations Team
                </span>
              )}
            </button>
          </form>
        </div>

      </div>

      {/* Embedded India Map & Branch Offices Section */}
      <div id="locations-map-section" className="space-y-6 pt-8 border-t-2 border-pinkTheme-200 dark:border-white/10">
        <div className="space-y-1">
          <span className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 status-beacon" />
            Tri-State Presence & Command Centers
          </span>
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-black dark:text-white">
            Our Operations in Madhya Pradesh, Uttar Pradesh & Uttarakhand
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
            Interactive India Map showing our state-wide command desks, direct phone lines, and physical coordinates.
          </p>
        </div>
        <MapEmbed />
      </div>

    </div>
  );
}
