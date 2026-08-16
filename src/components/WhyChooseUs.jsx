import React from 'react';
import { 
  ShieldCheck, Award, PackageCheck, Clock, 
  BadgePercent, Sparkles, CheckCircle2, Star, UserCheck 
} from 'lucide-react';
import { companyData } from '../data/companyData';

export default function WhyChooseUs({ onOpenQuote }) {
  const getIcon = (name) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck size={26} className="text-brand-accent" />;
      case 'Award': return <Award size={26} className="text-brand-accent" />;
      case 'PackageCheck': return <PackageCheck size={26} className="text-brand-accent" />;
      case 'Clock': return <Clock size={26} className="text-brand-accent" />;
      case 'BadgePercent': return <BadgePercent size={26} className="text-brand-accent" />;
      case 'Sparkles': return <Sparkles size={26} className="text-brand-accent" />;
      default: return <CheckCircle2 size={26} className="text-brand-accent" />;
    }
  };

  return (
    <section id="why-rvs" className="py-20 bg-white relative border-b border-brand-lightBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-brand-accent/30 text-brand-accentHover text-xs font-bold uppercase tracking-wider mb-3">
            <Award size={13} className="text-brand-accent" />
            The Gold Standard of Reliability
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-serif-luxury">
            Why Discerning Chennai Clients Choose RVS
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-light">
            We bridge the gap between expensive multi-tier interior chains and unreliable local subcontractors. Enjoy turnkey luxury with 100% direct accountability.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companyData.usps.map((usp, idx) => (
            <div
              key={idx}
              className="bg-brand-light rounded-3xl p-8 border border-brand-lightBorder hover:border-brand-accent/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-primary transition-all duration-300 shadow-sm">
                  {getIcon(usp.icon)}
                </div>

                <h3 className="text-lg font-bold text-brand-primary group-hover:text-brand-accent transition-colors font-serif-luxury">
                  {usp.title}
                </h3>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {usp.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-[11px] font-semibold text-emerald-600">
                <CheckCircle2 size={13} />
                <span>Standard on all Chennai projects</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="mt-16 bg-gradient-to-r from-brand-primary via-brand-surface to-brand-primary rounded-3xl p-8 text-white shadow-xl border border-brand-accent/30">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {companyData.stats.map((stat, i) => (
              <div key={i} className="pt-4 md:pt-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif-luxury">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-[11px] text-slate-300 mt-1 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
