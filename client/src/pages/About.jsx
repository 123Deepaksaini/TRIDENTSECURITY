import React from 'react';
import { COMPANY_INFO, CERTIFICATES_DATA, BRANCHES_DATA, TRIDENT_GALLERY_PHOTOS } from '../data/servicesData';
import { useCart } from '../context/CartContext';
import ClientsCarousel from '../components/ClientsCarousel';
import MapEmbed from '../components/MapEmbed';
import {
  Shield,
  Award,
  Users,
  CheckCircle2,
  Clock,
  Building2,
  ChevronRight,
  Phone,
  MessageSquare,
  FileCheck,
  Target,
  Eye,
  Lock,
  Zap,
  MapPin,
  Sparkles,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';

export default function About({ setCurrentPage }) {
  const { setIsCartModalOpen } = useCart();

  const coreValues = [
    {
      icon: Shield,
      title: 'Ex-Servicemen Discipline',
      desc: 'Founded and steered by defence veterans who instill military-grade precision, vigilance, and ethical integrity into every security officer.'
    },
    {
      icon: FileCheck,
      title: '100% Statutory Compliances',
      desc: 'Complete legal adherence to MP PSARA, Central Labour Acts, EPF, ESIC, GST, and ISO 9001:2015 certification.'
    },
    {
      icon: Target,
      title: 'Rigorous Tactical Training',
      desc: 'Pre-deployment and quarterly refresher training in firefighting, unarmed combat, emergency evacuation, and electronic security devices.'
    },
    {
      icon: Zap,
      title: '24/7 Rapid Response QRT',
      desc: 'Dedicated Mobile Quick Reaction Teams stationed across Jabalpur, Indore, and Bhopal ready for emergency client dispatch.'
    }
  ];

  const milestones = [
    { year: '2015', title: 'Foundation', desc: 'Started by Ex-Servicemen officers in Jabalpur with 25 disciplined guards.' },
    { year: '2018', title: 'State-Wide Expansion', desc: 'Acquired MP PSARA License and expanded deployment across 10+ districts.' },
    { year: '2021', title: 'Tri-State Network', desc: 'Extended operational footprint to Uttar Pradesh & Uttarakhand commercial hubs.' },
    { year: 'Present', title: '500+ Strong Force Cadre', desc: 'Protecting prestigious colleges, auto showrooms, banks, and VIP convoys.' }
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      
      {/* 1. HERO BANNER */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-pinkTheme-200/40 via-pinkTheme-100/20 to-transparent pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <span className="text-xs font-extrabold text-primary-700 dark:text-primary-300 uppercase tracking-widest px-4 py-1.5 rounded-full bg-pinkTheme-100/90 border border-pinkTheme-200 shadow-sm inline-flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary-600" />
              About Trident Security Force & Cadre
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black dark:text-white tracking-tight leading-tight">
              An Ex-Servicemen Enterprise <br />
              <span className="text-gradient-blue">Guarding Central India With Honor.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Headquartered in Jabalpur (M.P.), Trident Security Services was founded by retired defence veterans to deliver uncompromising safety, armed protection, and professional facility management.
            </p>
          </div>
        </div>
      </section>

      {/* 2. REAL PHOTO SHOWCASE & COMPANY STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Real Deployment Image with Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-2xl bg-slate-950 group">
              <img
                src="/images/trident_photos/trident_photo_7.jpg"
                alt="Trident Security Force Lineup at Gyan Ganga College"
                className="w-full h-[400px] sm:h-[460px] object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white z-20 space-y-1">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-primary-600">
                  Real Ground Deployment
                </span>
                <h4 className="font-heading font-black text-lg text-white">
                  Gyan Ganga College Security Detachment & Cadre
                </h4>
                <p className="text-xs text-slate-200 font-medium">
                  500+ uniformed, police-verified security personnel active across Madhya Pradesh.
                </p>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-xl hidden sm:flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/20 text-primary-600 flex items-center justify-center font-black text-xl">
                10+
              </div>
              <div>
                <p className="text-xs font-black text-black dark:text-white">Years of Service</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Zero Security Breaches</p>
              </div>
            </div>
          </div>

          {/* Right: Company Profile Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-primary-600 uppercase tracking-widest">
                Our Heritage & Vision
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white leading-tight">
                Built on Trust, Military Vigilance, & Total Compliance.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Trident Security Services operates under the direct leadership of ex-defence veterans. We understand that security is not just about placing a person in uniform—it is about preemptive threat intelligence, quick communication, physical fitness, and lawful compliance.
            </p>

            <div className="space-y-3">
              {[
                'Central & MP State PSARA Approved Private Security Agency',
                'ISO 9001:2015 Quality Management Certified Operations',
                'Full PF, ESIC, Minimum Wages & Labour Law Adherence',
                'Direct Supervision by Retired Defence Commissioned & JCO Officers'
              ].map((point, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentPage('certificates')}
                className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center space-x-2"
              >
                <Award className="w-4 h-4" />
                <span>View Govt. Licenses</span>
              </button>
              <button
                onClick={() => setIsCartModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/90 dark:border-white/10 hover:border-primary-500 text-black dark:text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4 text-primary-600" />
                <span>Build Force Quote</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FOUR CORE OPERATIONAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
            Core Strengths
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white">
            Why Leading Institutions Choose Trident
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light dark:shadow-card-dark space-y-3 hover:border-primary-500/80 hover:shadow-glow transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-pinkTheme-100 dark:bg-primary-500/20 text-primary-600 flex items-center justify-center border border-pinkTheme-200">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-lg text-black dark:text-white">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. JOURNEY & MILESTONES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
              Growth & Proven Track Record
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-black dark:text-white">
              Our Journey of Vigilance
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200/80 dark:border-white/10 space-y-2 relative"
              >
                <span className="text-2xl font-black text-primary-600 dark:text-primary-400 font-heading">
                  {m.year}
                </span>
                <h4 className="font-bold text-sm text-black dark:text-white">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal font-medium">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLIENTS CAROUSEL */}
      <ClientsCarousel />

      {/* 6. TRI-STATE OPERATIONAL MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
            Strategic Footprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white">
            Operational Hubs Across MP, UP & Uttarakhand
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Central Command in Jabalpur with active supervisory nodes in Indore, Bhopal, Gwalior, and Varanasi.
          </p>
        </div>
        <MapEmbed />
      </section>

    </div>
  );
}
