import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Calculator, Menu, X, Shield, 
  Sparkles, ArrowRight, MessageSquare, Clock, CheckCircle2 
} from 'lucide-react';
import { companyData } from '../data/companyData';
import { brandAssets } from '../assets';

export default function Navbar({ onOpenCalculator, onOpenQuote }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
      
      const sections = ['hero', 'services', 'portfolio', 'cost-calculator', 'dual-provision', 'why-rvs', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero", id: "hero" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Portfolio", href: "#portfolio", id: "portfolio" },
    { label: "Cost Estimator", href: "#cost-calculator", id: "cost-calculator", badge: "LIVE" },
    { label: "Dual Provision", href: "#dual-provision", id: "dual-provision" },
    { label: "Why RVS", href: "#why-rvs", id: "why-rvs" },
    { label: "Reviews", href: "#testimonials", id: "testimonials" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-brand-primary text-slate-300 text-[11px] border-b border-brand-subtle/60 relative z-40 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 lg:gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin size={12} className="text-brand-accent shrink-0" />
              <span>Arumbakkam, Chennai - 106</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-brand-accent transition-colors">
              <Mail size={12} className="text-brand-accent shrink-0" />
              <a href={`mailto:${companyData.contact.email}`}>{companyData.contact.email}</a>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-amber-300/90 font-medium text-[10px] bg-brand-surface/80 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              <Shield size={11} className="text-amber-400" />
              Direct Authority & Supervision by R. Stephen
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[10px]">Call:</span>
              <a 
                href={`tel:${companyData.contact.primaryPhone.replace(/\s+/g, '')}`} 
                className="text-brand-accent hover:text-amber-300 font-bold tracking-wide transition-colors flex items-center gap-1"
              >
                <Phone size={11} className="text-brand-accent" />
                {companyData.contact.primaryPhone}
              </a>
            </div>
            <span className="text-slate-600">|</span>
            <a 
              href={`https://wa.me/${companyData.proprietor.whatsapp}?text=Hi%20RVS%20Interior,%20I%20would%20like%20to%20get%20a%20free%20design%20estimation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageSquare size={11} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-brand-lightBorder' 
            : 'bg-white/90 backdrop-blur-sm py-3.5 border-b border-brand-lightBorder/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <a href="#hero" className="flex items-center gap-2.5 shrink-0 group">
            <img 
              src={brandAssets.logoIcon} 
              alt="RVS Interiors Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-xl bg-amber-50/60 p-1 border border-brand-accent/40 group-hover:scale-105 transition-transform duration-300 shadow-xs" 
            />

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-brand-primary font-serif-luxury leading-none">
                  RVS <span className="text-brand-accent">INTERIORS</span>
                </span>
              </div>
              <span className="text-[9px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
                Home & Interior Design • Chennai
              </span>
            </div>
          </a>


          {/* Desktop Nav Links - Styled as Rounded Pill Buttons */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-xs'
                      : 'bg-slate-100/70 hover:bg-amber-100/80 text-slate-700 hover:text-brand-primary border border-slate-200/60 hover:border-brand-accent/40'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[8px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                      isActive ? 'bg-amber-400 text-slate-950' : 'bg-amber-500 text-white animate-pulse'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs Desktop - Rounded Pill Buttons */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-brand-primary bg-amber-50 hover:bg-amber-100 border border-brand-accent/50 shadow-xs hover:shadow-sm transition-all hover:scale-105 active:scale-95 group"
            >
              <Calculator size={13} className="text-brand-accent group-hover:rotate-12 transition-transform" />
              <span>Price Calculator</span>
            </button>

            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-brand-primary via-brand-surface to-brand-primary hover:opacity-95 shadow-md hover:shadow-brand-accent/20 transition-all hover:scale-105 active:scale-95 border border-brand-accent/30"
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>Free 3D Quote</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenCalculator}
              className="px-2.5 py-1.5 rounded-full text-[11px] font-bold text-brand-primary bg-amber-50 border border-brand-accent/40 flex items-center gap-1"
            >
              <Calculator size={12} className="text-brand-accent" />
              <span>Calc</span>
            </button>

            <button
              onClick={onOpenQuote}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold text-white bg-brand-primary shadow-xs flex items-center gap-1"
            >
              <Sparkles size={12} className="text-amber-400" />
              <span>Quote</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-700 hover:text-brand-accent hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-brand-lightBorder px-4 pt-3 pb-6 shadow-2xl space-y-3 animate-fade-in max-h-[82vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenCalculator(); }}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-full bg-amber-50 text-brand-primary border border-brand-accent/30 text-xs font-bold active:scale-95 transition-transform"
              >
                <Calculator size={14} className="text-brand-accent" />
                <span>Price Estimator</span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-full bg-brand-primary text-white text-xs font-bold active:scale-95 transition-transform shadow"
              >
                <Sparkles size={14} className="text-amber-400" />
                <span>Free 3D Visit</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`inline-flex items-center justify-between px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-brand-primary text-white shadow-xs w-full'
                        : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-brand-accent w-full'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                        {link.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-2 bg-slate-50 p-3 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Direct Consultation:</span>
                <a href={`tel:${companyData.contact.primaryPhone.replace(/\s+/g, '')}`} className="font-bold text-brand-primary text-xs">
                  {companyData.contact.primaryPhone}
                </a>
              </div>
              <div className="flex items-start gap-1.5 text-[10px] text-slate-500">
                <MapPin size={12} className="text-brand-accent shrink-0 mt-0.5" />
                <span>#5/11, Kalainar St, Rani Anna Nagar, Arumbakkam - 106</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
