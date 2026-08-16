import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare } from 'lucide-react';
import { faqData } from '../data/testimonialsData';
import { companyData } from '../data/companyData';

export default function FAQSection({ onOpenQuote }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-brand-light relative border-b border-brand-lightBorder">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-brand-accent/30 text-brand-accentHover text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle size={13} className="text-brand-accent" />
            Transparent Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-serif-luxury">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-light">
            Got questions about turnkey execution, material authenticity, site visits, or warranties in Chennai? Here is everything you need to know.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-brand-lightBorder overflow-hidden shadow-xs hover:border-brand-accent/40 transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-brand-primary font-serif-luxury pr-4">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 bg-brand-primary text-brand-accent' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-amber-50/20 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-brand-lightBorder shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-brand-primary">Still have a specific query about your home?</h4>
            <p className="text-xs text-slate-500 mt-0.5">Proprietor R. Stephen is directly available for phone & WhatsApp consultations.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${companyData.proprietor.whatsapp}?text=Hi%20Stephen%20sir,%20I%20have%20a%20question%20regarding%20my%20interior%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <MessageSquare size={13} />
              <span>WhatsApp Us</span>
            </a>
            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 bg-brand-primary hover:bg-brand-surface text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95 border border-brand-accent/30"
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>Book Site Visit</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

