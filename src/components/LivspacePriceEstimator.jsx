import React, { useState, useMemo } from 'react';
import { 
  Calculator, Check, Sparkles, Home, Building, 
  Utensils, Layers, Briefcase, ArrowRight, ShieldCheck, 
  Download, MessageSquare, Phone, Info, RefreshCw 
} from 'lucide-react';
import { propertyTypes, finishTiers, scopeOptions } from '../data/costEstimatorData';
import { companyData } from '../data/companyData';

export default function LivspacePriceEstimator({ onBookQuoteWithData }) {
  const [selectedProperty, setSelectedProperty] = useState("2bhk");
  const [selectedTier, setSelectedTier] = useState("premium");
  const [sqFt, setSqFt] = useState(1050);
  const [selectedScopes, setSelectedScopes] = useState([
    "kitchen", "wardrobes", "falseCeiling", "livingDecor", "painting"
  ]);

  // Handle Property Change and update suggested sqft
  const handlePropertyChange = (propId) => {
    setSelectedProperty(propId);
    const prop = propertyTypes.find(p => p.id === propId);
    if (prop) {
      setSqFt(prop.baseSqFt);
    }
  };

  // Toggle Scope Item
  const toggleScope = (scopeId) => {
    if (selectedScopes.includes(scopeId)) {
      if (selectedScopes.length > 1) {
        setSelectedScopes(selectedScopes.filter(id => id !== scopeId));
      }
    } else {
      setSelectedScopes([...selectedScopes, scopeId]);
    }
  };

  // Calculate Real-Time Price
  const calculation = useMemo(() => {
    const prop = propertyTypes.find(p => p.id === selectedProperty) || propertyTypes[1];
    const tier = finishTiers.find(t => t.id === selectedTier) || finishTiers[1];

    // Base scope price additions
    let scopeTotal = 0;
    selectedScopes.forEach(sId => {
      const item = scopeOptions.find(o => o.id === sId);
      if (item) {
        scopeTotal += item.priceAdd;
      }
    });

    // Ratio based on sqft deviation from base
    const sqFtRatio = sqFt / prop.baseSqFt;
    const adjustedScopePrice = scopeTotal * (0.6 + 0.4 * sqFtRatio);
    
    // Total estimated raw cost
    const totalEstimate = Math.round((prop.basePrice * (sqFt / prop.baseSqFt) * 0.4 + adjustedScopePrice) * tier.multiplier);

    // Approximate EMI per month for 3 years
    const emiMonthly = Math.round(totalEstimate / 36 * 1.08);

    // Price per sq.ft
    const pricePerSqFt = Math.round(totalEstimate / sqFt);

    return {
      total: totalEstimate,
      emi: emiMonthly,
      perSqFt: pricePerSqFt,
      tierName: tier.name,
      propName: prop.label
    };
  }, [selectedProperty, selectedTier, sqFt, selectedScopes]);

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSendWhatsApp = () => {
    const text = `Hi RVS Interior! I calculated an estimate on your website for my *${calculation.propName}* (${sqFt} sq.ft) with *${calculation.tierName} Finish*. Estimated budget is *${formatINR(calculation.total)}*. I would like to schedule a free site measurement and final itemized quotation.`;
    window.open(`https://wa.me/${companyData.proprietor.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="cost-calculator" className="py-12 sm:py-20 bg-white relative border-b border-brand-lightBorder">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-brand-accent/30 text-brand-accentHover text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <Calculator size={12} className="text-brand-accent" />
            <span>Livspace-Style Cost Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-serif-luxury">
            Estimate Your Interior & Renovation Budget
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-base font-light">
            Instant, transparent price breakdown for Chennai homes. Includes 100% genuine materials, master carpenters, and turnkey execution.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left / Center: Interactive Inputs */}
          <div className="lg:col-span-8 bg-brand-light rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-brand-lightBorder shadow-xs space-y-6 sm:space-y-8">
            
            {/* Step 1: Select Property Type */}
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <label className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-primary text-white text-[10px] sm:text-[11px] flex items-center justify-center font-bold">1</span>
                  Select Property Type
                </label>
                <span className="text-[11px] sm:text-xs text-brand-accentHover font-semibold">
                  {propertyTypes.find(p => p.id === selectedProperty)?.label}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {propertyTypes.map((prop) => (
                  <button
                    key={prop.id}
                    onClick={() => handlePropertyChange(prop.id)}
                    className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all relative active:scale-98 ${
                      selectedProperty === prop.id
                        ? 'bg-white border-brand-accent shadow-sm ring-2 ring-brand-accent/20'
                        : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    {prop.popular && (
                      <span className="absolute -top-1.5 right-1.5 bg-brand-accent text-white text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                    <span className="block font-bold text-[11px] sm:text-sm text-slate-800 leading-tight">
                      {prop.label}
                    </span>
                    <span className="block text-[9px] sm:text-[11px] text-slate-400 mt-0.5">
                      Avg. {prop.baseSqFt} sq.ft
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Adjust Built-up Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <label className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-primary text-white text-[10px] sm:text-[11px] flex items-center justify-center font-bold">2</span>
                  Carpet / Built-up Area
                </label>
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm font-extrabold text-brand-primary">
                  {sqFt} <span className="text-[10px] sm:text-xs font-normal text-slate-500">sq.ft</span>
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="4000"
                step="50"
                value={sqFt}
                onChange={(e) => setSqFt(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-accent touch-pan-x"
              />
              <div className="flex justify-between text-[9px] sm:text-[10px] text-slate-400 mt-1 font-medium">
                <span>100 sq.ft</span>
                <span>1,500 sq.ft</span>
                <span>4,000 sq.ft</span>
              </div>
            </div>

            {/* Step 3: Finish & Material Tier */}
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <label className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-primary text-white text-[10px] sm:text-[11px] flex items-center justify-center font-bold">3</span>
                  Choose Finish & Material Tier
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {finishTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all flex flex-col justify-between relative active:scale-98 ${
                      selectedTier === tier.id
                        ? 'bg-white border-brand-accent shadow-sm ring-2 ring-brand-accent/20'
                        : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-1.5 right-2 sm:right-3 bg-brand-accent text-white text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs sm:text-sm text-brand-primary">{tier.name}</span>
                        {selectedTier === tier.id && (
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-brand-accent text-white flex items-center justify-center">
                            <Check size={9} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-brand-accentHover font-semibold block mt-0.5">
                        {tier.tagline}
                      </span>
                      <ul className="mt-2 sm:mt-3 space-y-1 text-[10px] sm:text-[11px] text-slate-600">
                        {tier.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <Check size={11} className="text-brand-accent shrink-0 mt-0.5" />
                            <span className="line-clamp-1 sm:line-clamp-none">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Include / Exclude Scope Items */}
            <div>
              <label className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-primary text-white text-[10px] sm:text-[11px] flex items-center justify-center font-bold">4</span>
                Customize Scope of Works
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {scopeOptions.map((scope) => {
                  const isChecked = selectedScopes.includes(scope.id);
                  return (
                    <button
                      key={scope.id}
                      onClick={() => toggleScope(scope.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border flex items-center justify-between transition-all active:scale-98 ${
                        isChecked 
                          ? 'bg-amber-50/70 border-brand-accent/40 text-brand-primary' 
                          : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-md flex items-center justify-center border shrink-0 ${
                          isChecked ? 'bg-brand-accent border-brand-accent text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <Check size={10} strokeWidth={3} />}
                        </div>
                        <span className="text-[11px] sm:text-xs font-semibold text-left">{scope.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Estimate Card (Livspace-style floating card) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-brand-primary via-brand-surface to-brand-primary text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-brand-accent/30 sticky top-20 sm:top-24">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-700/60">
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-widest text-brand-accent">
                  Live Quotation
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">Estimated Budget</h3>
              </div>
              <span className="bg-brand-accent/20 text-brand-accent border border-brand-accent/40 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">
                Zero Hidden Cost
              </span>
            </div>

            {/* Total Price Display */}
            <div className="py-4 sm:py-6 text-center space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Turnkey Investment Estimate</span>
              <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-serif-luxury">
                {formatINR(calculation.total)}
              </div>
              <span className="text-[11px] sm:text-xs text-amber-300/90 font-medium block">
                (~ {formatINR(calculation.perSqFt)} / sq.ft all-inclusive)
              </span>
            </div>

            {/* Summary List */}
            <div className="space-y-2 py-3 sm:py-4 border-y border-slate-700/60 text-[11px] sm:text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Property:</span>
                <span className="font-semibold text-white">{calculation.propName} ({sqFt} sq.ft)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tier:</span>
                <span className="font-semibold text-amber-300">{calculation.tierName} Finish</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Works:</span>
                <span className="font-semibold text-white">{selectedScopes.length} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dual Provision:</span>
                <span className="font-semibold text-emerald-400">100% Material + Labour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">EMI (36 mo):</span>
                <span className="font-semibold text-white">From {formatINR(calculation.emi)} / mo</span>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="py-3 space-y-1 text-[10px] sm:text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-brand-accent shrink-0" />
                <span>10-Year Warranty with BWP Marine Ply</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={12} className="text-brand-accent shrink-0" />
                <span>Direct Supervision by R. Stephen</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => onBookQuoteWithData({
                  property: calculation.propName,
                  sqFt,
                  tier: calculation.tierName,
                  estimatedPrice: formatINR(calculation.total)
                })}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-accent via-amber-400 to-amber-500 hover:from-amber-400 hover:to-brand-accent text-slate-950 font-extrabold rounded-full shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider active:scale-95 border border-white/20"
              >
                <Sparkles size={14} />
                <span>Book Free Visit & Lock Quote</span>
              </button>

              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 text-xs active:scale-95 shadow-sm"
              >
                <MessageSquare size={14} />
                <span>Send via WhatsApp</span>
              </button>
            </div>


            <p className="text-[9px] sm:text-[10px] text-slate-400 text-center mt-2.5">
              *Final quote confirmed after free physical laser measurement in Chennai.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
