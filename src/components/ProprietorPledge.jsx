import React from 'react';
import { 
  ShieldCheck, Phone, Mail, MapPin, CheckCircle2, 
  Sparkles, Award, UserCheck, MessageSquare, ArrowRight 
} from 'lucide-react';
import { companyData } from '../data/companyData';

export default function ProprietorPledge({ onOpenQuote }) {
  return (
    <section className="py-20 bg-brand-light relative border-b border-brand-lightBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-lightBorder shadow-xl relative overflow-hidden">
          
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Proprietor Profile Card */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-brand-primary via-brand-surface to-brand-primary text-white border border-brand-accent/30 shadow-lg">
              
              {/* Avatar Initial Circle */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-accent to-amber-400 text-slate-950 flex items-center justify-center font-bold text-3xl shadow-xl mb-4 border-4 border-white/20 font-serif-luxury">
                {companyData.proprietor.avatarInitial}
              </div>

              <h3 className="text-xl font-bold text-white font-serif-luxury">
                {companyData.proprietor.name}
              </h3>
              <p className="text-xs text-amber-300 font-semibold tracking-wider uppercase mt-0.5">
                {companyData.proprietor.role}
              </p>
              
              <span className="mt-3 text-[11px] text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                15+ Years Direct Authority & Site Audit Mastery
              </span>

              {/* Direct Quick Action Buttons */}
              <div className="w-full space-y-2 mt-6 pt-6 border-t border-white/10">
                <a
                  href={`tel:${companyData.contact.primaryPhone.replace(/\s+/g, '')}`}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-brand-accent to-amber-400 hover:from-amber-400 hover:to-brand-accent text-slate-950 font-bold text-xs rounded-full transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-102 active:scale-95"
                >
                  <Phone size={13} />
                  <span>Call: {companyData.contact.primaryPhone}</span>
                </a>
                <a
                  href={`https://wa.me/${companyData.proprietor.whatsapp}?text=Hi%20Stephen%20sir,%20I%20would%20like%20to%20discuss%20an%20interior/building%20project%20in%20Chennai.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-102 active:scale-95"
                >
                  <MessageSquare size={13} />
                  <span>Direct WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Guarantee & Authority Manifesto */}
            <div className="lg:col-span-8 space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-brand-accent/30 text-brand-accentHover text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck size={13} className="text-brand-accent" />
                  Proprietor's Personal Guarantee
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-primary font-serif-luxury leading-tight">
                  Single-Point Accountability Under Direct Supervision
                </h2>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/60 border border-brand-accent/30 text-xs sm:text-sm text-slate-700 leading-relaxed italic font-serif">
                "{companyData.proprietor.message}"
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-light border border-brand-lightBorder">
                  <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-primary">Direct Contractual Commitment</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Every estimate, material spec, and milestone is signed under the direct entity of RVS Builders.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-light border border-brand-lightBorder">
                  <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-primary">Zero Third-Party Subletting</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">We do not broker your job to random freelance carpenters. All teams report to our Arumbakkam head office.</p>
                  </div>
                </div>
              </div>

              {/* Office Address Callout */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-brand-accent shrink-0" />
                  <span><strong>Head Office:</strong> {companyData.contact.address}</span>
                </div>
                <button
                  onClick={onOpenQuote}
                  className="px-6 py-2.5 bg-brand-primary hover:bg-brand-surface text-white text-xs font-bold rounded-full transition-all flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 border border-brand-accent/30"
                >
                  <Sparkles size={13} className="text-amber-400" />
                  <span>Request Direct Site Visit</span>
                  <ArrowRight size={13} />
                </button>
              </div>


            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
