import React from 'react';
import { 
  Phone, Mail, MapPin, Shield, Sparkles, 
  ArrowUp, Lock, Heart, CheckCircle2 
} from 'lucide-react';
import { companyData } from '../data/companyData';
import { servicesData } from '../data/servicesData';
import { brandAssets } from '../assets';

export default function Footer({ onOpenAdmin, onSelectService }) {

  return (
    <footer className="bg-brand-dark text-slate-400 text-xs border-t border-slate-800 pb-20 sm:pb-0">
      
      {/* Top Banner */}
      <div className="bg-brand-primary border-b border-slate-800/80 py-6 sm:py-8">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent block mb-1">
              Chennai's Turnkey Interior Specialist
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif-luxury">
              Ready to Transform Your Living or Work Space?
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Free on-site laser measurement and itemized quote across all Chennai localities.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${companyData.contact.primaryPhone.replace(/\s+/g, '')}`}
              className="px-6 py-3 bg-gradient-to-r from-brand-accent to-amber-400 hover:from-amber-400 hover:to-brand-accent text-slate-950 font-bold rounded-full transition-all shadow-md flex items-center gap-2 hover:scale-105 active:scale-95 text-xs"
            >
              <Phone size={14} />
              <span>Call: {companyData.contact.primaryPhone}</span>
            </a>
            <a
              href="#cost-calculator"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all border border-white/20 hover:scale-105 active:scale-95 text-xs"
            >
              Calculate Interior Cost
            </a>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Authority */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={brandAssets.logoCropped} 
                alt="RVS Interiors Logo" 
                className="w-14 h-14 object-contain rounded-2xl bg-white p-1.5 border border-brand-accent/40 shadow-sm" 
              />

              <div className="flex flex-col">
                <span className="text-lg font-bold text-white font-serif-luxury leading-tight">
                  RVS <span className="text-brand-accent">INTERIORS</span> & BUILDERS
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                  Home & Interior Design • Since 2016
                </span>
              </div>
            </div>


            <p className="text-slate-400 leading-relaxed">
              Chennai's premier turnkey interior and general building renovation contractor, led by <strong className="text-white">R. Stephen (Proprietor & Director)</strong>. We engineer bespoke modular wardrobes, parallel kitchens, false ceilings, and structural alterations with 100% genuine branded materials.
            </p>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-amber-300/90 font-serif italic">
              "{companyData.motto}"
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-brand-accent pl-2.5">
              Our Turnkey Services
            </h4>
            <ul className="space-y-2 pt-1">
              {servicesData.map(s => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={() => onSelectService && onSelectService(s.formValue)}
                    className="hover:text-brand-accent transition-colors text-slate-400 hover:translate-x-1 inline-block transform duration-150"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#dual-provision" className="text-amber-300 hover:underline">
                  Material + Labour Dual Solution
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Chennai Locations */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-brand-accent pl-2.5">
              Service Areas
            </h4>
            <ul className="space-y-1.5 pt-1 text-slate-400">
              {companyData.serviceAreas.slice(0, 8).map((area, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-brand-accent"></span>
                  <span>{area}</span>
                </li>
              ))}
              <li className="text-brand-accent font-semibold pt-1">
                + All Chennai Suburbs
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-brand-accent pl-2.5">
              Headquarters
            </h4>
            <div className="space-y-2.5 pt-1 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-brand-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {companyData.contact.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-brand-accent shrink-0" />
                <a href={`tel:${companyData.contact.primaryPhone.replace(/\s+/g, '')}`} className="text-white font-bold hover:text-brand-accent">
                  {companyData.contact.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-brand-accent shrink-0" />
                <a href={`mailto:${companyData.contact.email}`} className="hover:text-brand-accent">
                  {companyData.contact.email}
                </a>
              </div>
              <div className="pt-2">
                <span className="inline-block bg-white/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded border border-white/10">
                  Site Visits 7 Days a Week
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} RVS INTERIOR & BUILDERS. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors font-semibold py-1.5 px-4 rounded-full bg-white/5 border border-white/10 hover:border-brand-accent/40 active:scale-95"
            >
              <Lock size={12} className="text-brand-accent" />
              <span>Proprietor Admin (R. Stephen)</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
