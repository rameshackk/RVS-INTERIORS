import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, Calculator, ShieldCheck, Clock, 
  Award, CheckCircle2, Star, Phone, Home, Play, ChevronRight 
} from 'lucide-react';
import { companyData } from '../data/companyData';
import { projectAssets } from '../assets';

export default function HeroSection({ onOpenCalculator, onOpenQuote }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroBanners = [
    {
      image: projectAssets.projMasterBedroomWardrobe,
      title: "Master Bedroom Wardrobes & LED Ceiling",
      location: "Anna Nagar, Chennai",
      tag: "Luxury Carpentry"
    },
    {
      image: projectAssets.projCommercialOffice,
      title: "Parallel Modular Acrylic Kitchen",
      location: "Arumbakkam, Chennai",
      tag: "Modular Kitchens"
    },
    {
      image: projectAssets.projKidsBedroomStudy,
      title: "Natural Wood Veneer Wardrobes",
      location: "Velachery, Chennai",
      tag: "Veneer Finish"
    },
    {
      image: projectAssets.projWardrobeGlass,
      title: "Corporate Turnkey Office Fitout",
      location: "OMR IT Corridor, Chennai",
      tag: "Commercial Space"
    }
  ];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroBanners.length]);

  return (
    <section id="hero" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center bg-brand-light overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(197,154,90,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(197,154,90,0.05)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:48px_48px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Copy & Value Props */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-brand-accent/30 text-brand-accentHover text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <Sparkles size={12} className="text-brand-accent animate-pulse shrink-0" />
                <span>Livspace Quality • Direct Pricing</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 text-amber-300 text-[11px] sm:text-xs font-semibold">
                <Star size={11} className="fill-amber-400 text-amber-400 shrink-0" />
                <span>4.9/5 Rating in Chennai</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-primary leading-[1.18] sm:leading-[1.12] font-serif-luxury">
                Luxury Interiors & Renovations in <span className="gold-gradient-text italic font-serif">Chennai</span>
              </h1>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-2xl font-light">
                Interior decor, modular carpentry, painting, civil alterations, and building renovation with <strong className="text-brand-primary font-semibold">100% genuine branded materials</strong> under the direct authority and personal supervision of <strong className="text-brand-accentHover font-semibold">R. Stephen</strong>.
              </p>
            </div>

            {/* Quick Guarantees Pill Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2">
              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-white border border-brand-lightBorder shadow-xs">
                <ShieldCheck size={16} className="text-brand-accent shrink-0" />
                <span className="text-[10px] sm:text-xs font-bold text-slate-800 leading-tight">10-Yr Warranty</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-white border border-brand-lightBorder shadow-xs">
                <Clock size={16} className="text-brand-accent shrink-0" />
                <span className="text-[10px] sm:text-xs font-bold text-slate-800 leading-tight">45-Day Handover</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-white border border-brand-lightBorder shadow-xs">
                <Award size={16} className="text-brand-accent shrink-0" />
                <span className="text-[10px] sm:text-xs font-bold text-slate-800 leading-tight">0% Hidden Cost</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenCalculator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-primary via-brand-surface to-brand-primary hover:opacity-95 rounded-full shadow-lg hover:shadow-brand-accent/25 active:scale-95 transition-all group border border-brand-accent/30"
              >
                <Calculator size={16} className="text-brand-accent group-hover:rotate-12 transition-transform" />
                <span>Calculate Your Interior Cost</span>
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm font-bold text-brand-primary bg-amber-50 hover:bg-amber-100 border border-brand-accent/60 rounded-full shadow-sm active:scale-95 transition-all"
              >
                <Sparkles size={16} className="text-brand-accent" />
                <span>Book Free 3D Consultation</span>
              </button>
            </div>


            {/* Footprint Counter */}
            <div className="pt-4 sm:pt-6 border-t border-brand-lightBorder/80 grid grid-cols-3 gap-2 sm:gap-6 text-slate-600 text-xs text-center sm:text-left">
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-brand-primary font-serif-luxury block">550+</span>
                <span className="text-[10px] sm:text-xs leading-tight text-slate-500">Homes Delivered</span>
              </div>
              <div className="border-x border-slate-200 px-1">
                <span className="text-xl sm:text-2xl font-extrabold text-brand-accent font-serif-luxury block">100%</span>
                <span className="text-[10px] sm:text-xs leading-tight text-slate-500">In-House Artisans</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-800 font-serif-luxury block">₹0</span>
                <span className="text-[10px] sm:text-xs leading-tight text-slate-500">Free Site Audit</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Carousel Card */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white bg-slate-900 group">
              
              {/* Carousel Image Container */}
              <div className="relative h-[280px] sm:h-[440px] w-full overflow-hidden">
                {heroBanners.map((banner, index) => (
                  <div
                    key={banner.title}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  >
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  </div>
                ))}
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-white shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="inline-block bg-brand-accent/20 text-brand-accentHover text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider mb-0.5">
                      {heroBanners[currentSlide].tag}
                    </span>
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {heroBanners[currentSlide].title}
                    </h2>
                    <p className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Home size={10} className="text-brand-accent shrink-0" />
                      <span className="truncate">{heroBanners[currentSlide].location}</span>
                    </p>
                  </div>
                  <a
                    href="#portfolio"
                    className="p-2 sm:p-2.5 rounded-xl bg-brand-primary text-white hover:bg-brand-surface transition-colors shrink-0 shadow-xs"
                    aria-label="View portfolio"
                  >
                    <ChevronRight size={14} />
                  </a>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-1.5 mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-slate-100">
                  {heroBanners.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? 'w-6 sm:w-8 bg-brand-accent' : 'w-2 bg-slate-200'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Live Badge Top Left */}
              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-black/65 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
                <span>Free Site Visits Active</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
