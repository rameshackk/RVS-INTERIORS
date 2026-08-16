import React from 'react';
import { 
  PackageCheck, Users, ShieldCheck, CheckCircle2, 
  Sparkles, ArrowRight, Truck, Award, Hammer 
} from 'lucide-react';
import { companyData } from '../data/companyData';

export default function DualProvisionSection({ onOpenQuote }) {
  const materialHighlights = [
    { title: "Genuine BWP 710 Plywood", desc: "Greenply / CenturyPly boiling water proof boards with anti-termite core certification." },
    { title: "Branded Emulsions & Enamels", desc: "Asian Paints Royale, Apex Ultima & PU finishes with complete surface preparation." },
    { title: "German Hardware & Runners", desc: "Hettich, Hafele & Ebco soft-close hinges, tandem boxes, and hydraulic stays." },
    { title: "Heavy Duty Concealed Wiring", desc: "Havells & Finolex FRLS cables, Legrand modular switchboards, and MCB protection." }
  ];

  const labourHighlights = [
    { title: "Direct Payroll Artisans", desc: "100% in-house master carpenters, masons, electricians, and painters — zero unvetted third-party contractors." },
    { title: "Proprietor Supervision", desc: "R. Stephen personally audits line-level leveling, carcass alignment, and waterproofing slopes." },
    { title: "Milestone Timelines", desc: "Strict adherence to the 45-day move-in guarantee with dedicated daily site progress tracking." },
    { title: "Post-Work Deep Cleaning", desc: "Complete space sanitization, sawdust vacuuming, and polish cleanup before handing over keys." }
  ];

  return (
    <section id="dual-provision" className="py-20 bg-gradient-to-b from-brand-primary via-brand-surface to-brand-primary text-white relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <PackageCheck size={13} className="text-brand-accent" />
            The RVS Quality Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-serif-luxury">
            Dual Provision: Certified Raw Materials + Expert Labour
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Eliminate multi-vendor coordination headaches. We supply 100% authentic materials with verifiable brand invoices and deploy certified tradesmen under single-point accountability.
          </p>
        </div>

        {/* Dual Provision Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          
          {/* Left Card: 100% Certified Materials */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-brand-accent/40 transition-all flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-accent">
                  <PackageCheck size={26} />
                </div>
                <div>
                  <span className="text-[10px] text-brand-accent uppercase font-bold tracking-widest block">
                    Pillar 1
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif-luxury">
                    100% Certified Raw Materials
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {materialHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>All material specs written in contract</span>
              <span className="text-amber-300 font-semibold">Zero Fake Duplicates</span>
            </div>
          </div>

          {/* Right Card: Seasoned In-House Labour */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-brand-accent/40 transition-all flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Users size={26} />
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 uppercase font-bold tracking-widest block">
                    Pillar 2
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif-luxury">
                    Seasoned Skilled Workforce
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {labourHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Supervised by R. Stephen</span>
              <span className="text-emerald-400 font-semibold">100% In-House</span>
            </div>
          </div>

        </div>

        {/* CTA Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-accent/20 via-white/5 to-brand-accent/20 border border-brand-accent/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-serif-luxury">
              Want a Hassle-Free Material + Labour Estimate?
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Receive a line-by-line itemized quote detailing exact timber, paint grades, and labour charges.
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="px-8 py-4 bg-gradient-to-r from-brand-accent via-amber-400 to-amber-500 hover:from-amber-400 hover:to-brand-accent text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-full shadow-xl transition-all shrink-0 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 border border-white/20"
          >
            <Sparkles size={15} />
            <span>Request Dual Provision Quote</span>
            <ArrowRight size={14} />
          </button>
        </div>


      </div>
    </section>
  );
}
