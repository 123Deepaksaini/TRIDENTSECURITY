import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { useCart } from '../context/CartContext';
import {
  Shield,
  Search,
  Filter,
  CheckCircle2,
  Plus,
  ShoppingCart,
  Phone,
  ArrowRight,
  Info
} from 'lucide-react';
import ClientsCarousel from '../components/ClientsCarousel';

export default function Services({ setCurrentPage }) {
  const { addToCart, setIsCartModalOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Manned Guarding', 'VIP Protection', 'Electronic Security', 'Facility & Allied'];

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      service.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Facility & Allied' && (service.category.includes('Facility') || service.category.includes('Allied')));

    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-pinkTheme-100/90 border border-pinkTheme-200 shadow-sm inline-flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-primary-600" />
          Professional Force Deployments
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-black dark:text-white tracking-tight">
          Comprehensive Security & Facility Solutions
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          From armed ex-servicemen guard detachments to corporate CCTV networks and housekeeping squads, Trident delivers certified excellence backed by legal PSARA licenses.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30 ring-2 ring-primary-400/50'
                  : 'bg-pinkTheme-50 dark:bg-navy-950 text-slate-800 dark:text-slate-200 hover:bg-pinkTheme-100 dark:hover:bg-white/10 border border-pinkTheme-200/70 dark:border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search security services..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-pinkTheme-50/60 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-xs text-black dark:text-white focus:outline-none focus:border-primary-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-3xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-card-light dark:shadow-card-dark overflow-hidden flex flex-col justify-between group hover:border-primary-500/70 hover:shadow-glow-blue transition-all duration-300"
          >
            {/* Image Header (Full Width Coverage) */}
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
              <span className="absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-black dark:text-white border border-pinkTheme-200 dark:border-white/10 shadow-sm z-20">
                {service.category}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-heading font-black text-xl text-black dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {service.fullDescription || service.shortDescription}
                </p>
              </div>

              {/* Service Features */}
              <div className="space-y-1.5 pt-3 border-t border-pinkTheme-100 dark:border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Service Highlights
                </p>
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center text-xs text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" />
                    <span className="truncate font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-pinkTheme-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-bold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-500/10 px-2.5 py-1 rounded-lg border border-primary-200 dark:border-primary-500/20">
                  Standard & Custom Deployment
                </span>

                <button
                  onClick={() => addToCart(service, 1)}
                  className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-500/25 flex items-center space-x-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add To Quote Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trusted Clients Section */}
      <ClientsCarousel />

      {/* Floating Bottom Quote Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary-900 via-slate-900 to-navy-950 dark:from-navy-950 dark:via-primary-950 dark:to-navy-950 text-white border-2 border-pinkTheme-300/40 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
            Need a Multi-Site Or Custom Industrial Deployment?
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Our Senior Security Surveyors will conduct a comprehensive on-site threat assessment free of cost.
          </p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-end">
          <button
            onClick={() => setIsCartModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-white text-navy-950 hover:bg-slate-100 font-bold text-xs transition-all flex items-center space-x-1.5 shadow-md active:scale-95 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 text-primary-600" />
            <span>Open Quote Cart</span>
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs transition-all shadow-md shadow-primary-500/30 active:scale-95 cursor-pointer"
          >
            Request Site Survey
          </button>
        </div>
      </div>

    </div>
  );
}
