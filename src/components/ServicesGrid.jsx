import React, { useState } from 'react';
import { 
  LayoutDashboard, Layers, Utensils, Paintbrush, 
  Hammer, Droplets, Zap, Building, Check, ArrowRight, 
  Sparkles, ShieldCheck, ChevronDown, ChevronUp 
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function ServicesGrid({ onSelectService }) {
  const [expandedId, setExpandedId] = useState(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard size={24} className="text-brand-accent" />;
      case 'Layers': return <Layers size={24} className="text-brand-accent" />;
      case 'Utensils': return <Utensils size={24} className="text-brand-accent" />;
      case 'Paintbrush': return <Paintbrush size={24} className="text-brand-accent" />;
      case 'Hammer': return <Hammer size={24} className="text-brand-accent" />;
      case 'Droplets': return <Droplets size={24} className="text-brand-accent" />;
      case 'Zap': return <Zap size={24} className="text-brand-accent" />;
      case 'Building': return <Building size={24} className="text-brand-accent" />;
      default: return <Sparkles size={24} className="text-brand-accent" />;
    }
  };


  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-20 bg-white relative border-b border-brand-lightBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-brand-accent/30 text-brand-accentHover text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck size={13} className="text-brand-accent" />
            End-to-End Turnkey Execution
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-serif-luxury">
            Comprehensive Interior & Civil Building Services
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-light">
            All kinds of interior and building alteration works undertaken in Chennai under the direct engineering supervision of Proprietor R. Stephen.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                className="bg-brand-light rounded-3xl p-6 border border-brand-lightBorder hover:border-brand-accent/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Icon & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-primary transition-all duration-300 shadow-sm">
                      {getIcon(service.icon)}
                    </div>
                    {service.popular && (
                      <span className="bg-brand-accent/15 text-brand-accentHover text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border border-brand-accent/30">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-brand-primary group-hover:text-brand-accent transition-colors font-serif-luxury">
                    {service.title}
                  </h3>
                  <p className="text-xs text-brand-accentHover font-semibold mt-0.5">
                    {service.tagline}
                  </p>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Pricing indication */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Starting from:</span>
                    <span className="font-bold text-brand-primary">{service.startingPrice}</span>
                  </div>

                  {/* Features List (Collapsible on mobile or always cleanly visible) */}
                  <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-200/80">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Highlights:
                    </div>
                    {service.features.slice(0, isExpanded ? 6 : 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                        <Check size={13} className="text-brand-accent shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {service.features.length > 3 && (
                    <button
                      onClick={() => toggleExpand(service.id)}
                      className="mt-2 text-[11px] font-bold text-brand-accentHover hover:underline flex items-center gap-1"
                    >
                      {isExpanded ? (
                        <>Show less <ChevronUp size={12} /></>
                      ) : (
                        <>+{service.features.length - 3} more features <ChevronDown size={12} /></>
                      )}
                    </button>
                  )}
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Across Chennai</span>
                  <button
                    onClick={() => onSelectService(service.formValue)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-brand-accent group/btn transition-colors"
                  >
                    <span>Get Free Quote</span>
                    <ArrowRight size={13} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
