import React, { useState } from 'react';
import { COMPANY_INFO, CERTIFICATES_DATA, SERVICES_DATA, BRANCHES_DATA, STATES_PRESENCE_DATA } from '../data/servicesData';
import { useCart } from '../context/CartContext';
import {
  Shield,
  MapPin,
  Phone,
  Award,
  CheckCircle2,
  ChevronRight,
  Lock,
  MessageSquare,
  Headphones,
  Radio,
  Sparkles,
  Send,
  Check,
  Navigation,
  ExternalLink
} from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  const { setIsCartModalOpen } = useCart();
  const [callbackNumber, setCallbackNumber] = useState('');
  const [callbackRequested, setCallbackRequested] = useState(false);

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (callbackNumber.trim()) {
      setCallbackRequested(true);
      setTimeout(() => {
        setCallbackRequested(false);
        setCallbackNumber('');
      }, 5000);
    }
  };

  const handleNavClick = (id) => {
    if (id === 'locations') {
      setCurrentPage('contact');
      setTimeout(() => {
        const mapElem = document.getElementById('locations-map-section');
        if (mapElem) {
          mapElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setCurrentPage(id);
    }
  };

  return (
    <footer className="bg-pinkTheme-100/60 text-slate-800 dark:bg-slate-950 dark:text-slate-300 border-t-2 border-pinkTheme-200 dark:border-slate-800/80 relative overflow-hidden transition-colors">
      
      {/* Background ambient lighting accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pinkTheme-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. TOP PRE-FOOTER CTA BANNER */}
      <div className="relative border-b-2 border-pinkTheme-200 dark:border-slate-800/80 bg-gradient-to-b from-pinkTheme-100/90 to-pinkTheme-50/70 dark:from-slate-900/90 dark:to-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="rounded-3xl bg-gradient-to-r from-primary-900 via-slate-900 to-navy-950 dark:from-primary-950/70 dark:via-slate-900/90 dark:to-navy-950/90 border-2 border-pinkTheme-300/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
            
            {/* Ambient inner glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-xs font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-primary-400" />
                <span>24/7 Rapid Deployment Command • MP Jurisdiction</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
                Require Immediate Security Force or Site Survey?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Connect directly with our 24/7 Duty Desk across Jabalpur HQ, Indore, or Bhopal, or configure custom guard detachments through our instant quote builder.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 w-full lg:w-auto">
              <a
                href={`tel:${COMPANY_INFO.phoneMobile}`}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-primary-500/30 flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95"
              >
                <Headphones className="w-4 h-4" />
                <span>Call Duty Desk</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Trident%20Security,%20I%20need%20information%20regarding%20security%20deployment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>

              <button
                onClick={() => setIsCartModalOpen(true)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-primary-400" />
                <span>Custom Proposal</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 2. STATUTORY ACCREDITATIONS CAROUSEL BAR */}
      <div className="border-b-2 border-pinkTheme-200 dark:border-slate-800/80 py-6 bg-white/80 dark:bg-slate-950/90 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3">
          <div className="flex items-center justify-center space-x-3">
            <span className="w-8 h-[2px] bg-primary-500/50" />
            <p className="text-center text-[11px] uppercase tracking-widest text-black dark:text-slate-300 font-extrabold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Statutory Accreditations, PSARA License & Government Registrations
            </p>
            <span className="w-8 h-[2px] bg-primary-500/50" />
          </div>
        </div>

        {/* Horizontal Ticker with Gradient Fade Edges */}
        <div className="relative w-full overflow-hidden py-1.5">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 pointer-events-none z-10" />

          {/* Infinite Marquee Track */}
          <div className="animate-marquee-slow flex items-center gap-5 sm:gap-6">
            {[...CERTIFICATES_DATA, ...CERTIFICATES_DATA, ...CERTIFICATES_DATA, ...CERTIFICATES_DATA].map((cert, index) => (
              <div
                key={`${cert.id}-${index}`}
                onClick={() => setCurrentPage('certificates')}
                className="group flex items-center space-x-3.5 px-4 sm:px-5 py-3 rounded-2xl bg-white hover:bg-pinkTheme-50 dark:bg-white/[0.04] dark:hover:bg-white/[0.09] border-2 border-pinkTheme-200/90 dark:border-white/10 hover:border-primary-500/70 transition-all duration-300 cursor-pointer flex-shrink-0 shadow-sm hover:shadow-md hover:-translate-y-0.5 min-w-[240px]"
                title={`${cert.name} - ${cert.title}`}
              >
                <div className="w-12 h-12 rounded-xl bg-pinkTheme-50/60 dark:bg-slate-900 p-1.5 flex items-center justify-center border border-pinkTheme-200 dark:border-white/10 group-hover:border-primary-500/40 transition-colors flex-shrink-0 shadow-sm overflow-hidden">
                  <img
                    src={cert.badge}
                    alt={cert.name}
                    className="w-full h-full object-contain filter group-hover:contrast-105 group-hover:scale-110 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs sm:text-sm font-black text-black dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                      {cert.name}
                    </span>
                    <span className="text-xs text-primary-600 font-black flex-shrink-0">✓</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block max-w-[180px] truncate leading-tight mt-0.5">
                    {cert.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MAIN MULTI-COLUMN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 relative z-10">
        
        {/* Column 1: Brand, Mission & Fast Callback (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border-2 border-pinkTheme-200 dark:border-primary-500/30 p-1.5 flex items-center justify-center shadow-md">
              <Shield className="w-7 h-7 text-primary-600" />
            </div>
            <div>
              <span className="font-heading font-black text-2xl text-black dark:text-white tracking-tight">
                TRIDENT
              </span>
              <p className="text-xs text-primary-600 dark:text-primary-400 font-black uppercase tracking-wider">
                Security Services
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            An Ex-Servicemen enterprise governed by veteran military discipline. Delivering certified armed guarding, VIP personal protection, CCTV surveillance, and specialized facility management across Madhya Pradesh.
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-pinkTheme-200 dark:border-white/10 flex items-center space-x-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="text-black dark:text-slate-200 font-bold">MP PSARA Licensed</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-pinkTheme-200 dark:border-white/10 flex items-center space-x-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0" />
              <span className="text-black dark:text-slate-200 font-bold">ISO 9001:2015</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-pinkTheme-200 dark:border-white/10 flex items-center space-x-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="text-black dark:text-slate-200 font-bold">ESIC & EPF Compliant</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-pinkTheme-200 dark:border-white/10 flex items-center space-x-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span className="text-black dark:text-slate-200 font-bold">MSME Registered</span>
            </div>
          </div>

          {/* Quick Instant Callback Form */}
          <div className="pt-2 space-y-2">
            <label className="block text-[11px] font-black uppercase tracking-wider text-black dark:text-slate-300">
              Request Instant 10-Min Callback
            </label>
            {callbackRequested ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center space-x-2 font-bold">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>Call request dispatched to Duty Desk!</span>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="flex gap-2">
                <input
                  type="tel"
                  value={callbackNumber}
                  onChange={(e) => setCallbackNumber(e.target.value)}
                  placeholder="Enter 10-digit mobile..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/[0.05] border border-pinkTheme-200 dark:border-white/10 text-xs text-black dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs flex items-center space-x-1 transition-all shadow-md flex-shrink-0 active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Call Me</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Column 2: Security Services (Span 3) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-black dark:text-white font-heading font-black text-sm uppercase tracking-wider flex items-center">
            <Shield className="w-4 h-4 text-primary-600 mr-2" />
            Security Solutions
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {SERVICES_DATA.map((service) => (
              <li key={service.id}>
                <button
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left flex items-center group text-slate-800 dark:text-slate-200 font-medium cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-primary-600 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors flex-shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform">{service.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Quick Navigation (Span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-black dark:text-white font-heading font-black text-sm uppercase tracking-wider flex items-center">
            <Award className="w-4 h-4 text-primary-600 mr-2" />
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'services', label: 'Security Solutions' },
              { id: 'certificates', label: 'Statutory Licenses' },
              { id: 'locations', label: 'Locations & Maps' },
              { id: 'careers', label: 'Careers & Recruitment' },
              { id: 'contact', label: 'Contact Us' }
            ].map((nav) => (
              <li key={nav.id}>
                <button
                  onClick={() => handleNavClick(nav.id)}
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center text-slate-800 dark:text-slate-200 font-medium group cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-primary-600 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors flex-shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform">{nav.label}</span>
                </button>
              </li>
            ))}
            <li className="pt-2">
              <button
                onClick={() => setCurrentPage('admin')}
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center text-slate-800 dark:text-slate-300 font-mono text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-white/[0.03] border border-pinkTheme-200 dark:border-white/10 shadow-sm cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 mr-1.5 text-amber-600 flex-shrink-0" />
                <span>Admin Gateway</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: 3 OPERATIONAL STATES (Span 3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-black dark:text-white font-heading font-black text-sm uppercase tracking-wider flex items-center">
              <MapPin className="w-4 h-4 text-primary-600 mr-2" />
              Operational States
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              3 States • 7 Hubs
            </span>
          </div>

          <div className="space-y-2.5">
            {STATES_PRESENCE_DATA.map((state) => (
              <div
                key={state.id}
                className="p-3 rounded-2xl bg-white dark:bg-white/[0.03] border border-pinkTheme-200 dark:border-white/10 space-y-1.5 shadow-sm hover:border-primary-500/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className="w-2 h-2 rounded-full status-beacon"
                      style={{ backgroundColor: state.accentColor }}
                    />
                    <span className="font-extrabold text-xs text-black dark:text-white">
                      {state.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono font-bold">
                    {state.activeGuards}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 leading-snug">
                  {state.keyZones.slice(0, 3).join(' • ')}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-pinkTheme-100 dark:border-white/5 text-[11px]">
                  <a
                    href={`tel:${state.hotline}`}
                    className="font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center"
                  >
                    <Phone className="w-3 h-3 mr-1 text-primary-600" />
                    <span>{state.hotline}</span>
                  </a>
                  <button
                    onClick={() => handleNavClick('locations')}
                    className="text-[10px] text-primary-600 dark:text-primary-400 font-bold hover:underline flex items-center cursor-pointer"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* View full India Map button */}
            <button
              onClick={() => handleNavClick('locations')}
              className="w-full py-2.5 rounded-xl bg-pinkTheme-200/80 dark:bg-white/5 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500/10 text-slate-900 dark:text-slate-200 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all border border-pinkTheme-300/80 dark:border-white/10 cursor-pointer shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5 text-primary-600 group-hover:text-white" />
              <span>Explore India State Radar Map</span>
            </button>
          </div>
        </div>

      </div>

      {/* 4. BOTTOM COPYRIGHT & JURISDICTION FOOTER */}
      <div className="border-t-2 border-pinkTheme-200 dark:border-slate-800/80 py-6 bg-pinkTheme-200/50 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          
          <div className="space-y-1">
            <p className="font-bold text-black dark:text-slate-200">
              © {new Date().getFullYear()} TRIDENT SECURITY SERVICES. All Rights Reserved.
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Licensed under Private Security Agencies (Regulation) Act, 2005 • Govt. of Madhya Pradesh.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-700 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              SSL 256-Bit Encrypted
            </span>
            <span>•</span>
            <span className="hover:text-black dark:hover:text-slate-200 cursor-pointer" onClick={() => setCurrentPage('certificates')}>
              PSARA License Valid
            </span>
            <span>•</span>
            <span className="hover:text-black dark:hover:text-slate-200 cursor-pointer" onClick={() => handleNavClick('locations')}>
              3 Hubs in MP
            </span>
            <span>•</span>
            <button onClick={() => setCurrentPage('admin')} className="hover:text-primary-600 dark:hover:text-primary-400 font-mono text-[11px] underline cursor-pointer">
              Admin Login
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
