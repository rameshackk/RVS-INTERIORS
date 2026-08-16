import React, { useState } from 'react';
import { X, Sparkles, Phone, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { companyData } from '../data/companyData';

export default function QuickQuoteModal({ isOpen, onClose, defaultService }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    serviceType: defaultService || 'Interior Design & Decoration'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const record = {
      id: Date.now(),
      ...formData,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      source: 'Quick Consultation Modal'
    };

    try {
      const list = JSON.parse(localStorage.getItem('rvs_enquiries') || '[]');
      list.unshift(record);
      localStorage.setItem('rvs_enquiries', JSON.stringify(list));
    } catch (err) {}

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={30} />
            </div>
            <h3 className="text-xl font-bold text-brand-primary font-serif-luxury">
              Request Received!
            </h3>
            <p className="text-xs text-slate-600">
              Proprietor R. Stephen's supervisor will call you on <strong className="text-brand-primary">{formData.phone}</strong> within 15 minutes.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
              <img 
                src="/logo-icon.png" 
                alt="RVS Logo" 
                className="w-11 h-11 object-contain rounded-xl bg-amber-50 p-1 border border-brand-accent/40 shadow-xs shrink-0" 
              />
              <div>
                <span className="inline-block bg-amber-50 text-brand-accentHover text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-0.5">
                  Zero Cost • Free 3D Preview
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-brand-primary font-serif-luxury leading-tight">
                  Book Free Site Visit
                </h3>
              </div>
            </div>


            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                placeholder="e.g. 9710453183"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Chennai Area / Suburb</label>
              <input
                type="text"
                placeholder="e.g. Anna Nagar, Adyar, Velachery"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Service Required</label>
              <select
                value={formData.serviceType}
                onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent focus:outline-none bg-white"
              >
                {servicesData.map(s => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="Both Material & Labour Setup">Both Material & Labour Setup</option>
                <option value="Full Building Renovation">Full Building Renovation</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-brand-primary via-brand-surface to-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 border border-brand-accent/40 active:scale-95 cursor-pointer"
            >
              <Sparkles size={14} className="text-amber-400" />
              <span>Confirm Free Consultation</span>
              <ArrowRight size={14} />
            </button>


            <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck size={12} className="text-emerald-600" />
              <span>Direct Supervision by Proprietor R. Stephen</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
