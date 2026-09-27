import React, { useState } from 'react';
import { SERVICES_DATA, CERTIFICATES_DATA, COMPANY_INFO, TRIDENT_GALLERY_PHOTOS } from '../data/servicesData';
import { useCart } from '../context/CartContext';
import MapEmbed from '../components/MapEmbed';
import AnimatedCounter from '../components/AnimatedCounter';
import ClientsCarousel from '../components/ClientsCarousel';
import {
  Shield,
  ShieldCheck,
  Award,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Phone,
  Eye,
  Crosshair,
  Lock,
  Building2,
  FileCheck,
  ShoppingCart,
  Star,
  Zap,
  ChevronRight,
  Plus,
  Radio,
  Sparkles,
  ShieldAlert,
  Activity,
  Headphones,
  FileBadge,
  Camera,
  MapPin,
  Maximize2
} from 'lucide-react';

export default function Home({ setCurrentPage }) {
  const { addToCart, setIsCartModalOpen } = useCart();
  const [activeDeploymentTab, setActiveDeploymentTab] = useState(0);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('All');
  const [activePhotoModal, setActivePhotoModal] = useState(null);

  const deploymentOptions = [
    {
      title: 'Personal Security Officer (PSO)',
      category: 'VIP Protection',
      timing: '< 12 Hours',
      features: ['Concealed Firearm Escort', 'Fortuner / SUV Convoy Protocols', 'Close Quarter VIP Defense'],
      icon: ShieldAlert,
      badgeColor: 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400',
      image: '/images/trident_photos/trident_photo_1.jpg',
      tag: 'VIP Convoy & PSO'
    },
    {
      title: 'Manned Guarding Detachment',
      category: 'Commercial & Corporate',
      timing: '< 24 Hours',
      features: ['Full PSARA Uniform & Badge', 'Visitor & Gate Log Control', 'Hyundai & Retail Hub Security'],
      icon: ShieldCheck,
      badgeColor: 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-400',
      image: '/images/trident_photos/trident_photo_4.jpg',
      tag: 'Commercial Guard Cadre'
    },
    {
      title: 'Armed Guard / Gunman',
      category: 'Armed Force',
      timing: '< 24 Hours',
      features: ['Licensed 12 Bore / .32 Firearm', 'Ex-Military & Police Cadre', 'Periodic Firearm & Range Drills'],
      icon: Crosshair,
      badgeColor: 'text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-400',
      image: '/images/trident_photos/trident_photo_2.jpg',
      tag: 'Armed Force Cadre'
    },
    {
      title: 'Institutional Detachments',
      category: 'Educational & Industrial',
      timing: '< 24 Hours',
      features: ['Gyan Ganga College Cadre', 'Supervised Detachments', 'Perimeter & Campus Security'],
      icon: Building2,
      badgeColor: 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-500/10 dark:border-purple-500/30 dark:text-purple-400',
      image: '/images/trident_photos/trident_photo_7.jpg',
      tag: 'Institutional Lineup'
    }
  ];

  const currentDeploy = deploymentOptions[activeDeploymentTab];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">

      {/* 1. HERO SECTION (PINK BACKGROUND, BLACK HEADINGS, ROYAL BLUE ACCENTS) */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">

        {/* Subtle Pink & Blue Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-pinkTheme-200/40 via-pinkTheme-100/20 to-transparent pointer-events-none -z-10" />
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-pinkTheme-400/15 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* LEFT COLUMN: HERO HEADLINE & ACTIONS (Span 7) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

              {/* Top Operational Status Pill */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-navy-900 border border-pinkTheme-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 status-beacon" />
                <span className="text-slate-700 dark:text-slate-300">Ex-Servicemen Enterprise</span>
                <span className="text-pinkTheme-300 dark:text-slate-600">•</span>
                <span className="text-primary-600 dark:text-primary-400 font-extrabold">MP PSARA Licensed</span>
                <span className="text-pinkTheme-300 dark:text-slate-600">•</span>
                <span className="text-slate-700 dark:text-slate-300">ISO 9001:2015</span>
              </div>

              {/* Main Punchy Black Headline with Royal Blue Accent */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-black dark:text-white leading-[1.12]">
                Security Services <br />
                <span className="text-black dark:text-white">for </span>
                <span className="text-gradient-blue">Your Safety & Protection.</span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                When it comes to security, we are best in staying on-guard, tight, and responsible to exceed client expectations. Elite armed guarding, VIP personal escorting, and electronic surveillance across <strong className="text-black dark:text-white font-bold">Madhya Pradesh</strong>, <strong className="text-black dark:text-white font-bold">Uttar Pradesh</strong>, and <strong className="text-black dark:text-white font-bold">Uttarakhand</strong>.
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3.5">
                <button
                  onClick={() => setIsCartModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-primary-500/25 hover:shadow-glow flex items-center justify-center space-x-2 transition-all group active:scale-95 cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Build Custom Force Cart</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setCurrentPage('services')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold text-sm sm:text-base border border-slate-300 dark:border-white/10 transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5 text-primary-600 dark:text-primary-500" />
                  <span>Explore All Services</span>
                </button>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>100% Police Verified Cadre</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/20 text-blue-700 dark:text-blue-400">
                  <Zap className="w-4 h-4" />
                  <span>24/7 Mobile QRT Patrol</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-500/20 text-amber-700 dark:text-amber-400">
                  <Building2 className="w-4 h-4" />
                  <span>7 Command Hubs</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: INTERACTIVE LIGHT-MODE COMMAND & DEPLOYMENT HUB (Span 5) */}
            <div className="lg:col-span-5 relative">

              {/* Card Container */}
              <div className="relative rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-7 space-y-6">

                {/* Hub Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                        Central Command Hub
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Jabalpur Operations & Rapid Dispatch
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    Live Force
                  </span>
                </div>

                {/* Force Category Selectors */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Select Force Deployment Category:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {deploymentOptions.map((opt, idx) => {
                      const Icon = opt.icon;
                      const isSelected = activeDeploymentTab === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveDeploymentTab(idx)}
                          className={`p-2.5 rounded-xl border text-left transition-all flex items-center space-x-2 cursor-pointer ${isSelected
                              ? 'bg-primary-50 dark:bg-primary-500/15 border-primary-500/60 shadow-sm text-primary-700 dark:text-primary-300'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-navy-950 dark:hover:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                            }`}
                        >
                          <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'}`} />
                          <span className="text-xs font-bold truncate">{opt.title.split(' ')[0]} {opt.title.split(' ')[1] || ''}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Category Feature Details Card */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-white/10 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${currentDeploy.badgeColor}`}>
                        {currentDeploy.category}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white mt-1">
                        {currentDeploy.title}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-medium">Deployment ETA</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        {currentDeploy.timing}
                      </span>
                    </div>
                  </div>

                  {/* Real Trident Cadre Photo Thumbnail (Full Width Coverage) */}
                  <div className="relative h-48 w-full rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-950 group">
                    <img
                      src={currentDeploy.image}
                      alt={currentDeploy.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-bold text-white z-20">
                      <span className="bg-primary-600/90 px-2 py-0.5 rounded backdrop-blur-sm truncate">
                        {currentDeploy.tag}
                      </span>
                      <span className="text-[10px] text-slate-200 font-normal">Authentic Trident Force</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {currentDeploy.features.map((feat, i) => (
                      <div key={i} className="flex items-center text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Control Room Line & Action Button */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
                    <div className="flex items-center space-x-2">
                      <Headphones className="w-4 h-4 text-primary-500" />
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Duty Officer Hot-Line:</span>
                    </div>
                    <a
                      href={`tel:${COMPANY_INFO.phoneMobile}`}
                      className="font-mono font-bold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {COMPANY_INFO.phoneMobile}
                    </a>
                  </div>

                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-primary-600 dark:hover:bg-primary-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Request Emergency On-Site Force Survey</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* Quick Stats Highlights Counters */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'Trained Personnel', target: 1500, suffix: '+', icon: Users },
              { label: 'Active Deployments', target: 250, suffix: '+', icon: Building2 },
              { label: 'Client Satisfaction', target: 99.4, decimals: 1, suffix: '%', icon: Star },
              { label: 'Emergency Response', target: 15, prefix: '< ', suffix: ' Min', icon: Zap }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/80 dark:border-white/10 shadow-card-light dark:shadow-card-dark text-center space-y-1 hover:border-primary-500/60 hover:shadow-lg transition-all"
                >
                  <Icon className="w-5 h-5 text-primary-600 mx-auto mb-1" />
                  <div className="font-heading font-black text-2xl sm:text-3xl text-black dark:text-white">
                    <AnimatedCounter
                      target={stat.target}
                      decimals={stat.decimals || 0}
                      prefix={stat.prefix || ''}
                      suffix={stat.suffix || ''}
                      duration={2200}
                    />
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. STATUTORY ACCREDITATIONS & LICENSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-white text-slate-900 dark:bg-navy-900 dark:text-white border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light dark:shadow-2xl relative overflow-hidden space-y-6">

          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-pinkTheme-100 dark:border-white/10">
            <div className="space-y-1.5">
              <span className="text-xs font-extrabold text-primary-600 dark:text-primary-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                Government Verified & Statutory Compliances
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-black dark:text-white tracking-tight">
                Statutory Licenses & Accreditations
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                100% compliance with Central & MP State PSARA, Labour Laws, ESIC, EPFO, GST & ISO 9001:2015.
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('certificates')}
              className="inline-flex items-center space-x-1 text-xs sm:text-sm font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors flex-shrink-0 cursor-pointer"
            >
              <span>View All Official Certificates</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Full-Width Large Horizontal Ticker */}
          <div className="relative w-full overflow-hidden py-2">
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/95 to-transparent dark:from-navy-900 dark:via-navy-900/95 pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/95 to-transparent dark:from-navy-900 dark:via-navy-900/95 pointer-events-none z-10" />

            <div className="animate-marquee-slow flex items-center gap-6">
              {[...CERTIFICATES_DATA, ...CERTIFICATES_DATA, ...CERTIFICATES_DATA].map((cert, index) => (
                <div
                  key={`${cert.id}-${index}`}
                  onClick={() => setCurrentPage('certificates')}
                  className="group flex items-center space-x-5 cursor-pointer p-5 sm:p-6 rounded-2xl bg-pinkTheme-50/50 hover:bg-white dark:bg-navy-950 dark:hover:bg-navy-800 border-2 border-pinkTheme-200/90 dark:border-white/10 hover:border-primary-500 shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 min-w-[340px] sm:min-w-[400px] max-w-[440px]"
                  title={cert.title}
                >
                  {/* Extra Large Full-Color License Badge Box */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-3 flex items-center justify-center border-2 border-pinkTheme-200/80 shadow-md group-hover:scale-105 group-hover:shadow-lg transition-transform flex-shrink-0 overflow-hidden">
                    <img
                      src={cert.badge}
                      alt={cert.name}
                      className="max-h-full max-w-full w-auto h-auto object-contain filter group-hover:contrast-105 transition-all"
                    />
                  </div>

                  {/* License Typography & Authority */}
                  <div className="text-left flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-base sm:text-lg font-black text-black dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 block transition-colors leading-snug">
                        {cert.name}
                      </span>
                      <span className="text-xs text-emerald-500 font-black">✓</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block truncate mt-1">
                      {cert.title}
                    </span>
                    <span className="inline-block text-[10px] font-bold text-primary-700 dark:text-primary-300 px-2.5 py-0.5 rounded-md bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mt-2">
                      {cert.issuer || 'Govt. Authorized'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. TRUSTED BY LEADING COMPANIES CAROUSEL */}
      <ClientsCarousel />

      {/* 4. CORE SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest flex items-center">
              <Shield className="w-3.5 h-3.5 mr-1" />
              Tailored Protection Force
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white mt-1">
              Our Security & Allied Solutions
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('services')}
            className="inline-flex items-center text-sm font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors group"
          >
            <span>View Complete Service Matrix</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="rounded-3xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/80 dark:border-white/10 shadow-card-light dark:shadow-card-dark overflow-hidden flex flex-col justify-between group hover:border-primary-500/60 hover:shadow-glow transition-all duration-300"
            >
              {/* Service Image with Category Badge (Full Width Coverage) */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-[center_15%] sm:object-top group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                  onError={(e) => {
                    e.target.src = service.fallbackImage;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white border border-slate-200/60 dark:border-white/10 shadow-sm z-20">
                  {service.category}
                </span>
                {service.popular && (
                  <span className="absolute top-4 right-4 text-[11px] font-bold px-3 py-1 rounded-full bg-primary-600 text-white shadow-md z-20">
                    High Demand
                  </span>
                )}
              </div>

              {/* Service Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-heading font-black text-xl text-black dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Key Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Card Footer: Add to Cart Button */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 px-2.5 py-1 rounded-lg">
                    Custom Deployment
                  </span>

                  <button
                    onClick={() => addToCart(service, 1)}
                    className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-500/25 hover:shadow-glow transition-all flex items-center space-x-1.5 active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add To Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AUTHENTIC GROUND DEPLOYMENTS & FORCE GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-primary-600" />
              Live Field Cadre & Ground Operations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white mt-1">
              Authentic Deployments & Force Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Real photographs of Trident Security Force personnel on active duty across colleges, corporate centers, VIP convoys, luxury showrooms, and commercial complexes.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Manned Guarding', 'VIP Protection', 'Institutional', 'Facility & Allied', 'Supervisory Cadre'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedGalleryCategory === cat
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
                    : 'bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:bg-pinkTheme-100/60 border border-pinkTheme-200/80 dark:border-white/10'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRIDENT_GALLERY_PHOTOS.filter((photo) =>
            selectedGalleryCategory === 'All' ? true : photo.category === selectedGalleryCategory
          ).map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoModal(photo)}
              className="group relative rounded-3xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light dark:shadow-card-dark overflow-hidden cursor-pointer hover:border-primary-500/80 hover:shadow-glow transition-all duration-300"
            >
              {/* Photo Image Container (Full Width Coverage) */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-950">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-[center_15%] sm:object-top group-hover:scale-108 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur-md text-slate-900 dark:text-white border border-pinkTheme-200 dark:border-white/10 shadow-sm">
                    {photo.category}
                  </span>
                  <span className="p-1.5 rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1 text-white z-20">
                  <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400 font-semibold">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                  <h4 className="font-heading font-black text-sm text-white group-hover:text-primary-300 transition-colors leading-snug">
                    {photo.title}
                  </h4>
                </div>
              </div>

              {/* Photo Description Box */}
              <div className="p-4 bg-white dark:bg-navy-900 flex items-center justify-between border-t border-pinkTheme-100 dark:border-white/5">
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal for Full View */}
        {activePhotoModal && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
            onClick={() => setActivePhotoModal(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white dark:bg-navy-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-pinkTheme-200 dark:border-white/10 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 min-h-[300px] max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activePhotoModal.url}
                  alt={activePhotoModal.title}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setActivePhotoModal(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center text-lg font-bold cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-2 bg-white dark:bg-navy-900 border-t border-pinkTheme-100 dark:border-white/10">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400 px-2.5 py-1 rounded-md bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20">
                    {activePhotoModal.category}
                  </span>
                  <span className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {activePhotoModal.location}
                  </span>
                </div>
                <h3 className="font-heading font-black text-xl text-black dark:text-white">
                  {activePhotoModal.title}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {activePhotoModal.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 6. WHY CHOOSE TRIDENT / EX-SERVICEMEN HERITAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-white via-pinkTheme-50/60 to-white dark:from-slate-900 dark:via-navy-950 dark:to-slate-900 text-slate-900 dark:text-white p-8 sm:p-14 border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light dark:shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 border border-primary-500/20 dark:border-primary-500/30">
                <Award className="w-3.5 h-3.5 mr-1" />
                Ex-Servicemen Enterprise Heritage
              </span>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-black dark:text-white">
                Simply, Reliable Trident Security Services.
              </h2>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                Being serious about safety and security is not merely spending a lot of money; it’s about approaching security in a personalized and innovative way to meet diverse expectations. That’s precisely what Trident Security Services does.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    title: 'Ex-Servicemen Leadership',
                    desc: 'Founded and supervised by defence veterans with unmatched operational discipline.'
                  },
                  {
                    title: 'Statutory Compliances',
                    desc: 'Strict adherence to EPF, ESIC, Minimum Wages Act, and MP PSARA regulations.'
                  },
                  {
                    title: 'Advanced Training Cadre',
                    desc: 'Guards undergo periodic weapon, fire safety, and electronic gadget drills.'
                  },
                  {
                    title: '24/7 Mobile QRT Patrol',
                    desc: 'Dedicated rapid response squads on standby for client emergency dispatch.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white dark:bg-white/5 border border-pinkTheme-200/80 dark:border-white/10 space-y-1 shadow-sm">
                    <h4 className="font-heading font-bold text-sm text-primary-600 dark:text-primary-400 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500" />
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-white/5 p-6 rounded-2xl border-2 border-pinkTheme-200/90 dark:border-white/10 space-y-6 text-center shadow-card-light dark:shadow-none">
              <div className="space-y-2">
                <Shield className="w-12 h-12 text-primary-600 mx-auto" />
                <h3 className="font-heading font-black text-xl text-black dark:text-white">
                  Need Immediate Guard Deployment?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct dispatch from Jabalpur Central Control Room within 24 hours.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-pinkTheme-50/50 dark:bg-slate-950/60 border border-pinkTheme-200/80 dark:border-white/10 text-left space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Head Office Landline:</span>
                  <a href={`tel:${COMPANY_INFO.phoneLandline}`} className="text-black dark:text-white font-extrabold hover:text-primary-600">{COMPANY_INFO.phoneLandline}</a>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Primary / WhatsApp:</span>
                  <a href={`tel:${COMPANY_INFO.phoneMobile}`} className="text-black dark:text-white font-extrabold hover:text-primary-600">{COMPANY_INFO.phoneMobile}</a>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Operations Line:</span>
                  <a href={`tel:${COMPANY_INFO.phoneSecondary}`} className="text-black dark:text-white font-extrabold hover:text-primary-600">{COMPANY_INFO.phoneSecondary}</a>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>PSARA Jurisdiction:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Madhya Pradesh State</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm transition-all shadow-lg shadow-primary-500/25 active:scale-95 cursor-pointer"
              >
                Connect With Duty Officer
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE MAP & TRI-STATE OPERATIONAL NETWORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 status-beacon" />
            Strategic Tri-State Network & Command Centers
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white">
            Operational Presence: Madhya Pradesh, Uttar Pradesh & Uttarakhand
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Explore our state-wide command footprint on the interactive India Map below, or inspect individual branch coordinates and get driving directions.
          </p>
        </div>

        <MapEmbed />
      </section>

    </div>
  );
}

