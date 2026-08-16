import React from 'react';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';
import { brandPartners } from '../data/brandPartners';

export default function BrandPartnersSection() {
  return (
    <section className="py-16 bg-white relative border-b border-brand-lightBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] font-bold text-brand-accent uppercase tracking-widest block mb-1">
            Certified Materials & Hardware
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-primary tracking-tight font-serif-luxury">
            Engineered with World-Class Brands
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every screw, hinge, laminate, wire, and paint coat is 100% authentic with warranty certificates.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brandPartners.map((brand, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-brand-light border border-brand-lightBorder hover:border-brand-accent/50 hover:bg-white transition-all duration-300 text-center flex flex-col justify-between shadow-xs hover:shadow-md group"
            >
              <div>
                <span className="inline-block bg-white text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-slate-200 uppercase tracking-wider mb-2">
                  {brand.badge}
                </span>
                <h4 className="text-sm font-bold text-brand-primary group-hover:text-brand-accent transition-colors font-serif-luxury">
                  {brand.name}
                </h4>
                <p className="text-[10px] text-brand-accentHover font-semibold mt-0.5">
                  {brand.category}
                </p>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-200/60 line-clamp-1">
                {brand.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
