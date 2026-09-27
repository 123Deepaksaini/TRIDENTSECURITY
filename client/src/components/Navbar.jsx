import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO, BRANCHES_DATA } from '../data/servicesData';
import {
  Shield,
  Phone,
  Sun,
  Moon,
  ShoppingCart,
  Menu,
  X,
  Lock,
  ChevronRight,
  MapPin,
  Building2,
  Navigation
} from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const { totalItemCount, setIsCartModalOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'locations', label: 'India Map', isLocations: true },
    { id: 'quote-cart', label: 'Quote Cart', highlight: true },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    if (id === 'quote-cart') {
      setIsCartModalOpen(true);
    } else if (id === 'locations') {
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
    setMobileMenuOpen(false);
    setLocationsDropdownOpen(false);
  };

  return (
    <>
      {/* 1. TOP EMERGENCY & OPERATIONAL HUBS STATUS BAR */}
      <div className="bg-pinkTheme-100/60 dark:bg-gradient-to-r dark:from-navy-950 dark:via-primary-950/80 dark:to-navy-950 text-slate-700 dark:text-slate-300 text-xs py-2 px-3 sm:px-4 border-b border-pinkTheme-200/70 dark:border-white/5 hidden xl:block transition-colors w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">

          {/* Left: Statutory & 3 Active Hubs Indicator */}
          <div className="flex items-center space-x-3 whitespace-nowrap">
            <span className="flex items-center text-primary-700 dark:text-primary-400 font-bold">
              <Shield className="w-3.5 h-3.5 mr-1.5 text-primary-600" />
              MP PSARA Licensed & ISO 9001:2015
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>

            {/* Clickable 3 States Highlight */}
            <button
              onClick={() => handleNavClick('locations')}
              className="group flex items-center space-x-1.5 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              title="View India Map with offices across MP, UP, and Uttarakhand"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 status-beacon" />
              <span className="font-semibold text-[11px]">3 States:</span>
              <span className="text-slate-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 underline decoration-dotted">
                Madhya Pradesh (HQ) • Uttar Pradesh • Uttarakhand
              </span>
            </button>
          </div>

          {/* Right: Landline & Mobile Hotline & Admin Shortcut */}
          <div className="flex items-center space-x-3 whitespace-nowrap">
            <a
              href={`tel:${COMPANY_INFO.phoneLandline}`}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center font-bold text-slate-800 dark:text-slate-200 text-[11px]"
            >
              <Phone className="w-3.5 h-3.5 mr-1 text-primary-600" />
              <span>Landline: {COMPANY_INFO.phoneLandline}</span>
            </a>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <a
              href={`tel:${COMPANY_INFO.phoneMobile}`}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center font-bold text-slate-800 dark:text-slate-200 text-[11px]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              <span>Mobile: {COMPANY_INFO.phoneMobile}</span>
            </a>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <button
              onClick={() => setCurrentPage('admin')}
              className="flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors text-[11px] font-mono"
              title="Central Security Command Center"
            >
              <Lock className="w-3 h-3 mr-1 text-amber-500" />
              Admin Portal
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN STICKY NAVBAR */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${isScrolled
            ? 'bg-white/95 dark:bg-navy-950/95 backdrop-blur-md shadow-lg shadow-pinkTheme-500/5 border-b border-pinkTheme-200/80 dark:border-white/10 py-2.5'
            : 'bg-white/90 dark:bg-navy-900/90 backdrop-blur-sm border-b border-pinkTheme-200/60 dark:border-white/5 py-3.5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3 w-full box-border">

          {/* Brand Logo & Tagline */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group shrink-0"
          >
            <div className="relative shrink-0">
              <img
                src="https://tridentsecuritys.com/wp-content/uploads/2026/06/cropped-New-Logo-180x190.jpg"
                alt="Trident Security Services"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-xl border border-primary-500/30 shadow-md group-hover:scale-105 transition-transform bg-white"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full status-beacon" />
            </div>

            <div className="shrink-0">
              <div className="flex items-center space-x-1.5 whitespace-nowrap">
                <span className="font-heading font-extrabold text-lg sm:text-2xl tracking-tight text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  TRIDENT
                </span>
                <span className="font-heading font-semibold text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                  SECURITY
                </span>
              </div>
              <p className="text-[9px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wider uppercase whitespace-nowrap">
                Your Trusted Security Partner
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (Strict Single Line on Desktop XL) */}
          <nav className="hidden xl:flex items-center space-x-1 flex-nowrap shrink-0">
            {navItems.map((item) => {
              const active = currentPage === item.id || (item.id === 'locations' && currentPage === 'contact');

              if (item.isLocations) {
                return (
                  <div
                    key={item.id}
                    className="relative shrink-0"
                    onMouseEnter={() => setLocationsDropdownOpen(true)}
                    onMouseLeave={() => setLocationsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick('locations')}
                      className={`relative px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all duration-200 flex items-center space-x-1 whitespace-nowrap shrink-0 ${active
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10'
                          : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                      <span className="whitespace-nowrap">India Map</span>
                      <span className="ml-1 text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 whitespace-nowrap">
                        3 States
                      </span>
                    </button>

                    {/* Locations Fast Dropdown on Hover */}
                    {locationsDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-fadeIn">
                        <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 shadow-2xl p-3 space-y-2">
                          <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                            <span>Operational State Divisions</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-beacon" />
                          </div>

                          <div className="space-y-1.5">
                            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 block">
                                Madhya Pradesh (Central HQ)
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                Jabalpur HQ • Indore • Bhopal (900+ Guards)
                              </span>
                            </div>

                            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                              <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300 block">
                                Uttar Pradesh (North Division)
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                Lucknow • Noida / NCR • Kanpur (450+ Guards)
                              </span>
                            </div>

                            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block">
                                Uttarakhand (Hills & SIDCUL)
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                Dehradun • Haridwar SIDCUL • Pantnagar (200+ Guards)
                              </span>
                            </div>
                          </div>

                          <div className="pt-1 border-t border-slate-100 dark:border-white/5">
                            <button
                              onClick={() => handleNavClick('locations')}
                              className="w-full py-1.5 text-center text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center justify-center"
                            >
                              <Navigation className="w-3 h-3 mr-1" />
                              Open Interactive India Map & Beacons
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all duration-200 flex items-center whitespace-nowrap shrink-0 ${active
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10'
                      : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.highlight && (
                    <span className="ml-1 text-[9px] px-1.5 py-0.2 rounded-full bg-primary-500 text-white animate-pulse whitespace-nowrap">
                      Live
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Cart, Theme, CTA, Hamburger */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">

            {/* Interactive Security Quote Cart Button */}
            <button
              onClick={() => setIsCartModalOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-white/10 group shadow-sm shrink-0"
              title="Open Security Quote Cart"
              aria-label="Security Quote Cart"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform text-primary-500" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary-600 text-white text-[10px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/40 animate-bounce">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-white/10 shadow-sm shrink-0"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              )}
            </button>

            {/* Free Quote CTA (Visible on tablet & desktop) */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center px-3 sm:px-3.5 xl:px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white text-xs xl:text-sm font-bold shadow-md shadow-primary-500/25 hover:shadow-glow transition-all active:scale-95 whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">Get Quote</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 shrink-0" />
            </button>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 shrink-0"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 3. MOBILE & TABLET NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white dark:bg-navy-950 border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-2xl w-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${currentPage === item.id || (item.id === 'locations' && currentPage === 'contact')
                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  {item.isLocations && <MapPin className="w-4 h-4 text-primary-500" />}
                  <span>{item.label}</span>
                </div>
                {item.highlight ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-500 text-white">
                    Live
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
            ))}

            {/* Mobile 3 Hubs Quick Bar */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-white/10 space-y-2 mt-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Operational Hubs: MP • UP • Uttarakhand
              </span>
              <div className="grid grid-cols-3 gap-2">
                {BRANCHES_DATA.slice(0, 6).map(b => (
                  <button
                    key={b.id}
                    onClick={() => handleNavClick('locations')}
                    className="p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center hover:border-primary-500 transition-colors"
                  >
                    <span className="text-xs font-bold block text-slate-900 dark:text-white truncate">{b.city}</span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 block">{b.stateName.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col space-y-2.5">
              <a
                href={`tel:${COMPANY_INFO.phoneMobile}`}
                className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-primary-600 text-white font-bold text-sm shadow-md shadow-primary-500/20"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Primary Desk ({COMPANY_INFO.phoneMobile})
              </a>

              <button
                onClick={() => {
                  setCurrentPage('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-white/10"
              >
                <Lock className="w-4 h-4 mr-2 text-amber-500" />
                Admin Command Center
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
