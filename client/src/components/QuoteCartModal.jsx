import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SERVICES_DATA, COMPANY_INFO } from '../data/servicesData';
import { submitQuote } from '../services/api';
import confetti from 'canvas-confetti';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Clock,
  Shield,
  Send,
  CheckCircle,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function QuoteCartModal({ setCurrentPage }) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    shiftDuration,
    setShiftDuration,
    totalItemCount,
    isCartModalOpen,
    setIsCartModalOpen,
    addToCart
  } = useCart();

  const [formData, setFormData] = useState({
    customer_name: '',
    company_name: '',
    email: '',
    phone: '',
    city: 'Jabalpur',
    state: 'Madhya Pradesh',
    special_instructions: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCartModalOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in your name, email address, and contact phone number.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage('Please add at least one security service to your cart before submitting.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        ...formData,
        shift_duration: shiftDuration,
        estimated_monthly_inr: 0,
        cart_items: cartItems
      };

      const result = await submitQuote(payload);
      if (result.success) {
        setSuccessData(result);
        clearCart();
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (err) {
          // confetti optional
        }
      } else {
        setErrorMessage(result.message || 'Failed to submit quote request.');
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || `Error processing quote request. Please try calling ${COMPANY_INFO.phoneMobile} directly.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetModal = () => {
    setSuccessData(null);
    setErrorMessage('');
    setIsCartModalOpen(false);
  };

  const handleGoToAbout = () => {
    setIsCartModalOpen(false);
    if (setCurrentPage) setCurrentPage('about');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-navy-900 border-2 border-pinkTheme-300 dark:border-white/10 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-pinkTheme-50 dark:bg-navy-950 border-b-2 border-pinkTheme-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-pinkTheme-100 text-primary-600 border border-pinkTheme-200">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-black dark:text-white">
                Security Service & Deployment Request
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Configure your required security strength & receive customized proposals
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleGoToAbout}
              className="hidden sm:inline-flex items-center space-x-1 text-xs font-bold text-primary-700 dark:text-primary-400 hover:underline px-3 py-1.5 rounded-xl bg-white dark:bg-navy-900 border border-pinkTheme-200 dark:border-white/10 shadow-sm cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-primary-600" />
              <span>About Us</span>
            </button>
            <button
              onClick={resetModal}
              className="p-2 rounded-xl text-slate-400 hover:text-black dark:hover:text-white hover:bg-pinkTheme-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {successData ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-heading font-black text-black dark:text-white">
                Proposal Request Registered!
              </h4>
              <div className="inline-block p-4 rounded-2xl bg-pinkTheme-50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 font-mono text-sm space-y-1 text-black dark:text-slate-300">
                <p>
                  Reference ID: <span className="font-bold text-primary-600 dark:text-primary-400">{successData.referenceNo}</span>
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                  Status: Tailored Official Proposal Under Assessment
                </p>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto font-medium">
                Our Senior Security Operations Command in Jabalpur has received your force requirements. A Duty Officer will contact you for site verification and provide customized official commercial terms.
              </p>
              <div className="pt-4 flex justify-center space-x-3">
                <button
                  onClick={resetModal}
                  className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm transition-all cursor-pointer shadow-md"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Cart Items & Shift Selection */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-heading font-black text-black dark:text-white text-sm uppercase tracking-wider flex items-center">
                      <Shield className="w-4 h-4 text-primary-600 mr-1.5" />
                      Selected Guard & Allied Services ({cartItems.length})
                    </h4>
                    {cartItems.length > 0 && (
                      <button
                        onClick={clearCart}
                        className="text-xs text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl border-2 border-dashed border-pinkTheme-200 dark:border-slate-700 bg-pinkTheme-50/50 dark:bg-navy-950/50 space-y-3">
                      <ShoppingCart className="w-8 h-8 text-primary-400 mx-auto" />
                      <p className="text-sm text-black dark:text-slate-300 font-bold">
                        Your security cart is currently empty.
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        Choose services below or from the services page to build a customized security proposal.
                      </p>
                      <div className="pt-2 flex flex-wrap justify-center gap-2">
                        {SERVICES_DATA.slice(0, 4).map(srv => (
                          <button
                            key={srv.id}
                            onClick={() => addToCart(srv, 1)}
                            className="text-xs px-3 py-1.5 rounded-xl bg-pinkTheme-100 text-primary-700 hover:bg-primary-600 hover:text-white transition-all font-bold border border-pinkTheme-200 cursor-pointer"
                          >
                            + Add {srv.title.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-white dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 flex items-center justify-between shadow-sm"
                        >
                          <div className="space-y-1">
                            <h5 className="font-bold text-sm text-black dark:text-white">
                              {item.title}
                            </h5>
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                              Deployment: {item.category || 'Security Force'}
                            </p>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1.5 bg-pinkTheme-50 dark:bg-navy-900 rounded-xl p-1 border border-pinkTheme-200 dark:border-white/10">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-lg hover:bg-white dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold font-mono px-2 text-black dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-lg hover:bg-white dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Shift Schedule Selector */}
                <div className="p-4 rounded-2xl bg-white dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 space-y-3">
                  <label className="block text-xs font-black text-black dark:text-slate-200 uppercase tracking-wider flex items-center">
                    <Clock className="w-3.5 h-3.5 text-primary-600 mr-1.5" />
                    Operational Shift Coverage
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: '8_HOURS', label: '8 Hours', sub: 'Single Shift' },
                      { id: '12_HOURS', label: '12 Hours', sub: 'Standard Shift' },
                      { id: '24_HOURS', label: '24 Hours', sub: 'Round-The-Clock' }
                    ].map(shift => (
                      <button
                        key={shift.id}
                        type="button"
                        onClick={() => setShiftDuration(shift.id)}
                        className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                          shiftDuration === shift.id
                            ? 'bg-primary-600 text-white border-primary-600 font-bold shadow-md shadow-primary-500/25'
                            : 'bg-pinkTheme-50 dark:bg-navy-900 border-pinkTheme-200 dark:border-white/10 text-slate-800 dark:text-slate-400 hover:bg-pinkTheme-100'
                        }`}
                      >
                        <div className="text-xs font-bold">{shift.label}</div>
                        <div className={`text-[10px] ${shiftDuration === shift.id ? 'text-primary-100' : 'text-slate-500'}`}>{shift.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Force & Deployment Requirement Summary */}
                <div className="p-4 rounded-2xl bg-pinkTheme-50 dark:from-primary-950/40 dark:to-navy-950 border border-pinkTheme-200 dark:border-primary-500/20 text-black dark:text-white space-y-2.5">
                  <div className="flex justify-between items-center text-xs text-slate-700 dark:text-slate-300">
                    <span>Total Force / Personnel:</span>
                    <span className="font-extrabold text-black dark:text-white">{totalItemCount} Personnel Units</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-700 dark:text-slate-300">
                    <span>Selected Shift Cycle:</span>
                    <span className="font-bold text-primary-700 dark:text-primary-400">{shiftDuration.replace('_', ' ')}</span>
                  </div>
                  <div className="pt-2 border-t border-pinkTheme-200 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-black dark:text-slate-300 block font-bold">Commercial Quote:</span>
                      <span className="text-[10px] text-slate-600 dark:text-slate-400">Custom official rates provided after site hazard survey</span>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-primary-600 text-white shadow-sm">
                      On-Demand Proposal
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Submission Form */}
              <div className="lg:col-span-5 bg-pinkTheme-50/50 dark:bg-navy-950 p-5 rounded-2xl border border-pinkTheme-200 dark:border-white/10 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading font-black text-black dark:text-white text-sm uppercase tracking-wider mb-4 flex items-center">
                    <User className="w-4 h-4 text-primary-600 mr-1.5" />
                    Recipient / Client Details
                  </h4>

                  {errorMessage && (
                    <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} id="quote-form" className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-800 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 dark:text-slate-300 mb-1">
                        Organization / Enterprise Name
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleInputChange}
                        placeholder="e.g. Apex Industrial Park"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-slate-800 dark:text-slate-300 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. 9682165489"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-800 dark:text-slate-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="name@company.com"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-slate-800 dark:text-slate-300 mb-1">
                          Deployment City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Jabalpur"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-800 dark:text-slate-300 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Madhya Pradesh"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 dark:text-slate-300 mb-1">
                        Specific Instructions / Site Dimensions
                      </label>
                      <textarea
                        rows="2"
                        name="special_instructions"
                        value={formData.special_instructions}
                        onChange={handleInputChange}
                        placeholder="e.g. Require 2 night guards with torch & 1 gunman for main vault..."
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-900 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500"
                      />
                    </div>
                  </form>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    form="quote-form"
                    disabled={submitting || cartItems.length === 0}
                    className="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <span className="flex items-center">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Transmitting to Control Room...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Formal Quote Request
                      </span>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-600 dark:text-slate-400 mt-2 font-medium">
                    🔒 SSL Encrypted & Protected by Trident Command Gateway
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
