import React, { useState } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle2, MapPin, Clock } from 'lucide-react';
import { beforeAfterShowcases } from '../data/portfolioData';

export default function BeforeAfterSlider({ onOpenQuote }) {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100 percentage

  const current = beforeAfterShowcases[activeTab] || beforeAfterShowcases[0];

  return (
    <section className="py-12 sm:py-20 bg-brand-light relative border-b border-brand-lightBorder">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-brand-accent/30 text-brand-accentHover text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <Sparkles size={12} className="text-brand-accent" />
            <span>Transformation Proof</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-serif-luxury">
            Before & After: Real Chennai Transformations
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-base font-light">
            Slide left-right to witness how our structural alterations and modular woodwork revitalize dated spaces.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-2 mb-6 sm:mb-8">
          {beforeAfterShowcases.map((showcase, idx) => (
            <button
              key={showcase.id}
              onClick={() => { setActiveTab(idx); setSliderPos(50); }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-sm font-bold transition-all ${
                activeTab === idx
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {showcase.title.split('→')[0].trim()}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-brand-lightBorder shadow-lg max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Visual Slider Container */}
            <div className="lg:col-span-7">
              <div className="relative h-[240px] sm:h-[380px] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-inner select-none border border-slate-100">
                
                {/* Background: After Image */}
                <img
                  src={current.afterImage}
                  alt="After transformation"
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                />

                {/* Foreground: Before Image with clip-path */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={current.beforeImage}
                    alt="Before transformation"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/15"></div>
                </div>


                {/* Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-brand-accent text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <MoveHorizontal size={16} />
                  </div>
                </div>

                {/* Badges */}
                <span className="absolute top-3 left-3 bg-black/75 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
                  BEFORE
                </span>
                <span className="absolute top-3 right-3 bg-brand-primary/90 text-amber-300 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none border border-brand-accent/30">
                  AFTER (RVS)
                </span>

                {/* Range Input on Top */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 touch-pan-x"
                  aria-label="Before after comparison slider"
                />
              </div>

              <p className="text-[10px] sm:text-[11px] text-slate-400 text-center mt-2 font-medium flex items-center justify-center gap-1">
                <MoveHorizontal size={12} className="text-brand-accent" />
                Slide or tap left-right to compare
              </p>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              <span className="inline-block bg-brand-accent/15 text-brand-accentHover text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Case Study
              </span>
              <h3 className="text-base sm:text-2xl font-bold text-brand-primary leading-snug font-serif-luxury">
                {current.title}
              </h3>
              
              <div className="flex items-center gap-3 text-[11px] sm:text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-brand-accent" />
                  {current.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-brand-accent" />
                  {current.duration}
                </span>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Scope of Works:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {current.scope}
                </p>
              </div>

              <div className="p-3 bg-amber-50/70 border border-brand-accent/30 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold text-brand-primary">
                    {current.costSaved}
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenQuote}
                className="w-full py-3 px-4 bg-brand-primary hover:bg-brand-surface text-white text-xs font-bold rounded-xl shadow transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles size={13} className="text-amber-400" />
                <span>Enquire Similar Renovation</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
