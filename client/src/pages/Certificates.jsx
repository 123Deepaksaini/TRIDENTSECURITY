import React from 'react';
import { CERTIFICATES_DATA, COMPANY_INFO } from '../data/servicesData';
import {
  Award,
  ShieldCheck,
  FileCheck2,
  CheckCircle,
  Building,
  Scale,
  Download,
  ExternalLink
} from 'lucide-react';

export default function Certificates({ setCurrentPage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-pinkTheme-100/90 border border-pinkTheme-200 shadow-sm inline-flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-primary-600" />
          Statutory Approvals & Accreditation
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-black dark:text-white tracking-tight">
          Certified Security Standards & Legal Compliance
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          Trident Security Services operates in complete compliance with the Private Security Agencies (Regulation) Act, 2005 (PSARA), ISO Quality Management Protocols, and all Indian Labor Statutes.
        </p>
      </div>

      {/* Compliance Guarantee Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white text-black dark:bg-navy-900 dark:text-white border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light dark:shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 bg-primary-50 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400 border border-primary-200 dark:border-primary-500/30 rounded-2xl flex-shrink-0">
            <Scale className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-heading font-black text-lg sm:text-xl text-black dark:text-white">
              Zero Legal Risk & Full Statutory Protection for Clients
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-0.5 font-normal">
              Direct provident fund (EPFO), medical insurance (ESIC), and state minimum wage compliance guarantee that your organization faces zero third-party labor liability.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('contact')}
          className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs whitespace-nowrap transition-all shadow-md shadow-primary-500/25 flex-shrink-0 active:scale-95 cursor-pointer"
        >
          Request Audit Dossier
        </button>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CERTIFICATES_DATA.map((cert) => (
          <div
            key={cert.id}
            className="p-8 rounded-3xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-col justify-between space-y-6 group hover:border-primary-500/60 hover:shadow-glow-blue transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-20 h-20 p-2 rounded-2xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 flex items-center justify-center">
                  <img
                    src={cert.badge}
                    alt={cert.name}
                    className="w-full h-full object-contain filter group-hover:scale-110 transition-transform"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Active & Verified
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-heading font-black text-xl text-black dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-xs font-bold text-primary-600 dark:text-primary-400">
                  {cert.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Issuing Body: {cert.issuer}
                </p>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="pt-4 border-t border-pinkTheme-100 dark:border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400 flex items-center font-medium">
                <ShieldCheck className="w-4 h-4 text-primary-600 mr-1.5" />
                Government Recognized
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">
                Madhya Pradesh Region
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
