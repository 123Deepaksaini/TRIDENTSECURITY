import React, { useState } from 'react';
import { submitCareer } from '../services/api';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  Award,
  Shield,
  CheckCircle2,
  AlertCircle,
  Send,
  UserCheck,
  FileBadge
} from 'lucide-react';

export default function Careers() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    age: '',
    height_cm: '',
    applied_role: 'Security Guard',
    experience_years: '1',
    is_ex_serviceman: false,
    armed_license_held: false,
    current_address: '',
    resume_summary: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.phone || !formData.email || !formData.current_address) {
      setErrorMessage('Please fill in your name, contact phone, email, and current residential address.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await submitCareer(formData);
      if (res.success) {
        setSuccessMessage(res.message);
        setFormData({
          full_name: '',
          phone: '',
          email: '',
          age: '',
          height_cm: '',
          applied_role: 'Security Guard',
          experience_years: '1',
          is_ex_serviceman: false,
          armed_license_held: false,
          current_address: '',
          resume_summary: ''
        });
        try {
          confetti({ particleCount: 70, spread: 60 });
        } catch (err) {}
      } else {
        setErrorMessage(res.message || 'Failed to submit application.');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Error submitting application.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-pinkTheme-100/90 border border-pinkTheme-200 shadow-sm inline-flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-primary-600" />
          Guard Cadre & Officer Recruitment
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-black dark:text-white tracking-tight">
          Join the Elite Trident Security Force
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          We offer disciplined working conditions, on-time statutory PF & ESIC benefits, accommodation support, and rapid career promotion for dedicated guards, bouncers, and ex-servicemen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Perks & Requirements */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white text-black dark:bg-navy-900 dark:text-white border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light dark:shadow-xl space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-pinkTheme-100 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400 border border-pinkTheme-200 dark:border-primary-500/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-black dark:text-white">
                  Ex-Servicemen & Veteran Priority
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Special allowances for Indian Armed Forces veterans
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-800 dark:text-slate-200">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-primary-600 mr-1 flex-shrink-0" />
                <span className="font-medium">Prompt 1st-of-month salary disbursement with EPF & ESIC</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-primary-600 mr-1 flex-shrink-0" />
                <span className="font-medium">Free uniform kit, security duty boots, and badges</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-primary-600 mr-1 flex-shrink-0" />
                <span className="font-medium">Comprehensive Fire-Fighting & First-Aid training</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-primary-600 mr-1 flex-shrink-0" />
                <span className="font-medium">Duty post rotation & overtime incentives</span>
              </div>
            </div>

            <div className="pt-4 border-t border-pinkTheme-100 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-bold text-black dark:text-white">Physical Baseline Criteria:</p>
              <p>• Minimum Height: 168 cm (Male) / 155 cm (Female)</p>
              <p>• Age Bracket: 18 - 45 Years (Relaxation for Ex-Servicemen)</p>
              <p>• Clear police background verification record required</p>
            </div>
          </div>

          {/* Authentic Cadre Photo Showcase */}
          <div className="rounded-3xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/90 dark:border-white/10 p-4 shadow-card-light overflow-hidden space-y-3">
            <div className="relative h-60 w-full rounded-2xl overflow-hidden border border-pinkTheme-100 dark:border-white/10 bg-slate-950 group">
              <img 
                src="/images/trident_photos/trident_photo_7.jpg" 
                alt="Trident Security Guard Detachment Lineup" 
                className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 text-white z-20">
                <span className="text-[10px] font-bold bg-primary-600 px-2 py-0.5 rounded">Active Deployment</span>
                <p className="text-xs font-bold mt-1">Gyan Ganga College Security Detachment</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium px-1">
              Join over 500+ uniformed security professionals serving premier institutions and corporate hubs across Central India.
            </p>
          </div>
        </div>

        {/* Right: Application Form */}
        <div className="lg:col-span-7 bg-white dark:bg-navy-900 p-8 rounded-3xl border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light dark:shadow-card-dark space-y-6">
          <div className="space-y-1">
            <h3 className="font-heading font-black text-2xl text-black dark:text-white">
              Candidate Enrollment Form
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Submit your profile for instant review by Trident HR Recruitment desk.
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
                  Full Candidate Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Vikramaditya Singh"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Contact Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 9682165489"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  placeholder="candidate@email.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Age (Years)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="28"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height_cm"
                  value={formData.height_cm}
                  onChange={handleChange}
                  placeholder="175"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Position Applied For
                </label>
                <select
                  name="applied_role"
                  value={formData.applied_role}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500 focus:bg-white"
                >
                  <option value="Security Guard">Security Guard (Manned)</option>
                  <option value="Armed Guard / Gunman">Armed Guard / Gunman</option>
                  <option value="Personal Security Officer (PSO)">Personal Security Officer (PSO / Bouncer)</option>
                  <option value="Field Security Supervisor">Field Security Supervisor</option>
                  <option value="CCTV Control Room Operator">CCTV Control Room Operator</option>
                  <option value="Housekeeping Staff / Supervisor">Housekeeping Staff / Supervisor</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Security Experience (Years)
                </label>
                <input
                  type="number"
                  name="experience_years"
                  value={formData.experience_years}
                  onChange={handleChange}
                  placeholder="2"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Special Checkboxes */}
            <div className="p-4 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 space-y-2">
              <label className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_ex_serviceman"
                  checked={formData.is_ex_serviceman}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
                />
                <span className="font-bold">I am an Ex-Serviceman (Army / Navy / Air Force / Paramilitary / Police)</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="armed_license_held"
                  checked={formData.armed_license_held}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
                />
                <span className="font-medium">I hold an active, valid Central or State Firearm Gun License (for Armed roles)</span>
              </label>
            </div>

            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                Current Residential Address *
              </label>
              <textarea
                rows="2"
                name="current_address"
                value={formData.current_address}
                onChange={handleChange}
                required
                placeholder="Enter complete address, City, District, and Pincode..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Submitting Application...' : 'Submit Application to HR Recruitment'}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
