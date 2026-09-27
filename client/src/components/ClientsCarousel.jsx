import React, { useState } from 'react';
import { CLIENTS_DATA } from '../data/servicesData';
import { Sparkles, CheckCircle2, LayoutGrid, Award, ShieldCheck, Building2 } from 'lucide-react';

export default function ClientsCarousel() {
  const [showAllGrid, setShowAllGrid] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Defence & Military',
    'Govt. Higher Education',
    'Automotive & Showrooms',
    'Educational Campuses',
    'Healthcare & Multispecialty',
    'Real Estate & Townships',
    'Engineering & Construction'
  ];

  const filteredClients = selectedCategory === 'All'
    ? CLIENTS_DATA
    : CLIENTS_DATA.filter(c => 
        c.category.toLowerCase().includes(selectedCategory.toLowerCase()) || 
        selectedCategory.toLowerCase().includes(c.category.toLowerCase())
      );

  // Triple the array for seamless infinite scroll
  const marqueeItems = [...CLIENTS_DATA, ...CLIENTS_DATA, ...CLIENTS_DATA];

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-pinkTheme-50/90 via-white to-pinkTheme-50/90 dark:from-navy-950/60 dark:via-navy-900/30 dark:to-navy-950/60">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-64 bg-pinkTheme-300/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 text-primary-700 dark:text-primary-300 text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span>Verified Client Deployments</span>
              <span className="text-pinkTheme-300 dark:text-slate-600">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">200+ Institutions & Corporates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black dark:text-white tracking-tight">
              Trusted By Leading Companies & Institutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Serving prestigious Indian Defence establishments, premier universities, leading automotive dealerships, multispecialty hospitals, and industrial construction corporations.
            </p>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={() => setShowAllGrid(!showAllGrid)}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-2xl bg-white dark:bg-navy-800 hover:bg-pinkTheme-50 dark:hover:bg-navy-700 border-2 border-pinkTheme-200 dark:border-white/10 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-200 shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4 text-primary-600" />
              <span>{showAllGrid ? 'Continuous Single-Line Carousel' : 'View All 20 Clients in Grid'}</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Single Continuous Large High-Clarity Marquee (Default) */}
        {!showAllGrid ? (
          <div className="space-y-6">
            
            {/* Single Horizontal Large Track */}
            <div className="relative w-full overflow-hidden rounded-3xl bg-white dark:bg-navy-900/80 border-2 border-pinkTheme-200/90 dark:border-white/10 p-5 sm:p-6 shadow-md">
              {/* Fade Gradient Masks */}
              <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/95 to-transparent dark:from-navy-900 dark:via-navy-900/95 pointer-events-none z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/95 to-transparent dark:from-navy-900 dark:via-navy-900/95 pointer-events-none z-10" />

              <div className="animate-marquee-slow flex items-center gap-6 sm:gap-8">
                {marqueeItems.map((client, idx) => (
                  <div
                    key={`client-${client.id}-${idx}`}
                    className="group flex flex-col items-center p-5 sm:p-6 rounded-2xl bg-pinkTheme-50/40 hover:bg-white dark:bg-navy-950 dark:hover:bg-navy-800 border-2 border-pinkTheme-200/80 dark:border-white/10 hover:border-primary-500 shadow-sm hover:shadow-2xl transition-all duration-300 flex-shrink-0 cursor-default w-[280px] sm:w-[320px]"
                  >
                    {/* Extra-Large High-Impact Logo Display Stage */}
                    <div className="w-full h-32 sm:h-36 rounded-2xl bg-white p-4 flex items-center justify-center border-2 border-pinkTheme-200/70 shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <img
                        src={client.logo}
                        alt={client.name}
                        loading="lazy"
                        className="max-h-full max-w-full w-auto h-auto object-contain transition-all"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.innerHTML = `<div class="text-sm font-black text-slate-800 text-center uppercase tracking-wider">${client.name}</div>`;
                        }}
                      />
                    </div>

                    {/* Company Details Underneath */}
                    <div className="text-center w-full mt-4 space-y-1.5">
                      <h4 className="text-sm sm:text-base font-black text-black dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 min-h-[44px] flex items-center justify-center leading-snug">
                        {client.name}
                      </h4>
                      <div className="pt-1">
                        <span className="inline-block text-[11px] font-bold text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 truncate max-w-full">
                          {client.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stat Pill & Hover Hint below carousel */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400 px-2">
              <div className="flex flex-wrap items-center gap-6 font-medium">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>100% PSARA & Labour Law Compliant</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>24/7 Control Room & QRT Patrol</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold bg-white dark:bg-white/5 border border-pinkTheme-200/80 dark:border-white/10 px-3 py-1 rounded-full shadow-sm">
                💡 Mouse hover karne par carousel pause ho jayega
              </div>
            </div>
          </div>
        ) : (
          /* View Mode 2: Interactive Grid of All 20 Clients */
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                      : 'bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-300 border-2 border-pinkTheme-200 dark:border-white/10 hover:border-primary-500/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 20 Logos Grid with Extra Large Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="group p-6 rounded-3xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/90 dark:border-white/10 hover:border-primary-500 shadow-card-light dark:shadow-card-dark hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-full h-36 rounded-2xl bg-white p-4 flex items-center justify-center border-2 border-pinkTheme-200/80 shadow-md group-hover:scale-105 transition-transform overflow-hidden">
                    <img
                      src={client.logo}
                      alt={client.name}
                      loading="lazy"
                      className="max-h-full max-w-full w-auto h-auto object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `<div class="text-sm font-black text-slate-800 uppercase tracking-wider">${client.name}</div>`;
                      }}
                    />
                  </div>
                  <div className="space-y-1.5 w-full">
                    <h4 className="text-base font-black text-black dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 min-h-[44px] flex items-center justify-center leading-snug">
                      {client.name}
                    </h4>
                    <span className="inline-block text-xs font-bold text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20">
                      {client.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
