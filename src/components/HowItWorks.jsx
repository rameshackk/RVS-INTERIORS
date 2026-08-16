import React from 'react';
import { 
  ClipboardCheck, Eye, FileSpreadsheet, 
  Hammer, Key, Sparkles, CheckCircle2, ArrowRight 
} from 'lucide-react';

export default function HowItWorks({ onOpenQuote }) {
  const steps = [
    {
      step: "01",
      title: "Free Site Visit & Laser Measurement",
      desc: "Our senior supervisor visits your property in Chennai to measure dimensions, inspect structural walls, and note plumbing/electrical lines.",
      icon: "ClipboardCheck"
    },
    {
      step: "02",
      title: "2D Layout & 3D Design Preview",
      desc: "We formulate ergonomic space plans, modular wardrobe drawings, and realistic 3D kitchen visuals matching your aesthetic taste.",
      icon: "Eye"
    },
    {
      step: "03",
      title: "Transparent Itemized Quotation",
      desc: "Receive a transparent line-by-line contract detailing exact timber grades (BWP 710), hardware brands, and zero hidden surcharge fees.",
      icon: "FileSpreadsheet"
    },
    {
      step: "04",
      title: "Execution Under R. Stephen",
      desc: "In-house carpenters, masons, and painters execute works under strict on-site supervisor checkpoints and daily progress sharing.",
      icon: "Hammer"
    },
    {
      step: "05",
      title: "Deep Clean & 45-Day Handover",
      desc: "Complete post-work sawdust and polish cleaning, joint quality inspection, handover of keys, and 10-Year Warranty certification.",
      icon: "Key"
    }
  ];

  const getIcon = (name) => {
    switch (name) {
      case 'ClipboardCheck': return <ClipboardCheck size={24} className="text-brand-accent" />;
      case 'Eye': return <Eye size={24} className="text-brand-accent" />;
      case 'FileSpreadsheet': return <FileSpreadsheet size={24} className="text-brand-accent" />;
      case 'Hammer': return <Hammer size={24} className="text-brand-accent" />;
      case 'Key': return <Key size={24} className="text-brand-accent" />;
      default: return <Sparkles size={24} className="text-brand-accent" />;
    }
  };

  return (
    <section className="py-20 bg-brand-light relative border-b border-brand-lightBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-brand-accent/30 text-brand-accentHover text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-brand-accent" />
            Seamless 5-Step Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-serif-luxury">
            How Your Dream Home Comes to Life
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-light">
            From initial site consultation to key handover, our streamlined 45-day turnkey workflow guarantees peace of mind at every stage.
          </p>
        </div>

        {/* Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="bg-white rounded-3xl p-6 border border-brand-lightBorder shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Step Number Top */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-extrabold font-serif-luxury gold-gradient-text">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-brand-accent/20 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                    {getIcon(item.icon)}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-brand-primary group-hover:text-brand-accent transition-colors font-serif-luxury leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-brand-accent uppercase tracking-wider">
                <CheckCircle2 size={11} />
                <span>Stage {idx + 1} Cleared</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Trigger */}
        <div className="mt-12 sm:mt-16 text-center">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-primary via-brand-surface to-brand-primary hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 border border-brand-accent/30"
          >
            <Sparkles size={15} className="text-amber-400" />
            <span>Schedule Step 01: Free Site Visit in Chennai</span>
            <ArrowRight size={15} />
          </button>
        </div>


      </div>
    </section>
  );
}
