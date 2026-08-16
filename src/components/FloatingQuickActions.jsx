import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calculator, ArrowUp, Sparkles } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function FloatingQuickActions({ onOpenCalculator, onOpenQuote }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop / Tablet Floating Widgets */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto">
        
        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-brand-accent shadow-lg border border-slate-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        )}

        {/* Floating Cost Calculator Pill */}
        <button
          onClick={onOpenCalculator}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold shadow-xl border border-brand-accent/40 hover:bg-brand-surface transition-all hover:scale-105 active:scale-95 group"
        >
          <Calculator size={15} className="text-brand-accent group-hover:rotate-12 transition-transform" />
          <span>Price Estimator</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </button>

        {/* Direct WhatsApp Action */}
        <a
          href={`https://wa.me/${companyData.proprietor.whatsapp}?text=Hi%20RVS%20Interior,%20I%20would%20like%20to%20get%20a%20free%20design%20estimation.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-2 border-white"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare size={26} className="fill-white" />
        </a>
      </div>

      {/* Mobile Fixed Bottom App-Style Navigation Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-2 shadow-2xl safe-area-pb">
        <div className="grid grid-cols-4 gap-1.5 items-center">
          
          {/* Call */}
          <a
            href={`tel:${companyData.contact.primaryPhone.replace(/\s+/g, '')}`}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl text-slate-700 hover:text-brand-primary active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 rounded-full bg-amber-50 text-brand-accentHover flex items-center justify-center mb-0.5 border border-brand-accent/20">
              <Phone size={14} />
            </div>
            <span className="text-[10px] font-bold">Call Now</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${companyData.proprietor.whatsapp}?text=Hi%20RVS%20Interior,%20I%20would%20like%20to%20get%20a%20free%20design%20estimation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-1.5 rounded-xl text-slate-700 hover:text-emerald-600 active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-0.5 border border-emerald-200">
              <MessageSquare size={14} />
            </div>
            <span className="text-[10px] font-bold">WhatsApp</span>
          </a>

          {/* Price Calculator */}
          <button
            onClick={onOpenCalculator}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl text-slate-700 hover:text-brand-primary active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 text-brand-primary flex items-center justify-center mb-0.5 border border-slate-200">
              <Calculator size={14} />
            </div>
            <span className="text-[10px] font-bold">Calculator</span>
          </button>

          {/* Free Quote CTA */}
          <button
            onClick={onOpenQuote}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-surface text-white active:scale-95 transition-transform shadow-xs"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 text-amber-300 flex items-center justify-center mb-0.5">
              <Sparkles size={14} />
            </div>
            <span className="text-[10px] font-bold text-amber-300">Free Quote</span>
          </button>

        </div>
      </div>
    </>
  );
}
