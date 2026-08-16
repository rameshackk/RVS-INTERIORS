import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, 
  Sparkles, Clock, AlertCircle, MessageSquare, 
  ShieldCheck, ArrowRight, User, Hash, Home 
} from 'lucide-react';
import { companyData } from '../data/companyData';
import { servicesData } from '../data/servicesData';
import { leadService } from '../services/leadService';

export default function ContactSection({ prefillData, onClearPrefill }) {

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    serviceType: 'Interior Design',
    propertyType: '2 BHK',
    estimatedBudget: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        serviceType: prefillData.serviceType || prev.serviceType,
        propertyType: prefillData.property || prev.propertyType,
        estimatedBudget: prefillData.estimatedPrice || prev.estimatedBudget,
        message: prefillData.message || (prefillData.title ? `Interested in similar work: ${prefillData.title}` : prev.message)
      }));
    }
  }, [prefillData]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      errs.name = "Please enter your full name (at least 3 characters)";
    }
    if (!formData.phone.trim() || !/^[0-9+\s-]{10,14}$/.test(formData.phone.trim())) {
      errs.phone = "Please enter a valid 10-digit mobile number";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.serviceType) {
      errs.serviceType = "Please select a service type";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);

      const enquiryRecord = {
        ...formData,
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        source: 'Website Lead Form'
      };

      // Save to Backend Excel Spreadsheet & Local Storage
      await leadService.submitLead(enquiryRecord);

      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        if (onClearPrefill) onClearPrefill();
      }, 500);
    }
  };


  const handleWhatsAppSend = () => {
    const text = `*New Interior Enquiry - RVS Interior*%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Location:* ${formData.location || 'Chennai'}%0A*Service:* ${formData.serviceType}%0A*Property:* ${formData.propertyType}%0A*Estimated Budget:* ${formData.estimatedBudget || 'Not specified'}%0A*Requirement:* ${formData.message || 'Free site consultation'}`;
    window.open(`https://wa.me/${companyData.proprietor.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-white relative border-b border-brand-lightBorder">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-brand-accent/30 text-brand-accentHover text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <Sparkles size={12} className="text-brand-accent" />
            <span>Free Consultation Booking</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-serif-luxury">
            Book Your Free 30-Min Design Visit
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-base font-light">
            Fill in your project requirements below. Proprietor R. Stephen's team will conduct a free laser site audit in Chennai and provide an itemized quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Office & Direct Contact Details */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            <div className="bg-brand-light rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-brand-lightBorder shadow-xs space-y-4 sm:space-y-6">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-brand-accent block mb-0.5">
                  Arumbakkam Headquarters
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-brand-primary font-serif-luxury">
                  RVS Interior & Builders
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Serving the entire Chennai metropolitan area with 100% in-house teams.
                </p>
              </div>

              {/* Contact Info Items */}
              <div className="space-y-3 sm:space-y-4 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-accent shrink-0 shadow-xs">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-slate-900">Head Office Address</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-0.5">
                      {companyData.contact.address}
                    </p>
                    <span className="text-[9px] sm:text-[10px] text-brand-accentHover font-semibold block mt-0.5">
                      {companyData.contact.landmark}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-accent shrink-0 shadow-xs">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-slate-900">Direct Phone Consultation</h4>
                    <div className="text-[11px] sm:text-xs text-slate-600 mt-0.5 space-y-0.5">
                      <div>Primary: <a href={`tel:${companyData.contact.primaryPhone.replace(/\s+/g, '')}`} className="font-bold text-brand-primary hover:text-brand-accent">{companyData.contact.primaryPhone}</a></div>
                      <div>Secondary: <a href={`tel:${companyData.contact.secondaryPhone.replace(/\s+/g, '')}`} className="font-semibold text-brand-primary hover:text-brand-accent">{companyData.contact.secondaryPhone}</a></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-accent shrink-0 shadow-xs">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-slate-900">Official Email</h4>
                    <a href={`mailto:${companyData.contact.email}`} className="text-[11px] sm:text-xs text-slate-600 hover:text-brand-accent block mt-0.5 font-medium">
                      {companyData.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-accent shrink-0 shadow-xs">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-slate-900">Working Hours</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                      {companyData.contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Areas Pill Grid */}
              <div className="pt-3 border-t border-slate-200/80">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Chennai Zones Covered:
                </span>
                <div className="flex flex-wrap gap-1">
                  {companyData.serviceAreas.slice(0, 8).map((area, idx) => (
                    <span
                      key={idx}
                      className="bg-white text-slate-700 text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200"
                    >
                      {area}
                    </span>
                  ))}
                  <span className="text-[9px] sm:text-[10px] text-brand-accentHover font-bold px-1 py-0.5">
                    + All Suburbs
                  </span>
                </div>
              </div>

            </div>

            {/* Map Embed Card */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-lightBorder shadow-xs h-44 sm:h-52 w-full relative">
              <iframe
                title="RVS Interior Office Location Map"
                src={companyData.contact.googleMapsEmbed}
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>

          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-brand-lightBorder shadow-lg relative">
            
            {submitSuccess ? (
              <div className="py-8 sm:py-12 text-center space-y-3 sm:space-y-4 animate-fade-in">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-primary font-serif-luxury">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-brand-primary">{formData.name}</strong>. Proprietor R. Stephen's office has received your requirement. A senior supervisor will call you on <strong className="text-brand-primary">{formData.phone}</strong> to confirm your free site visit.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
                  <button
                    onClick={handleWhatsAppSend}
                    className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow active:scale-95"
                  >
                    <MessageSquare size={14} />
                    <span>Send Copy via WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        location: '',
                        serviceType: 'Interior Design',
                        propertyType: '2 BHK',
                        estimatedBudget: '',
                        message: ''
                      });
                    }}
                    className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors active:scale-95"
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-brand-accent block mb-0.5">
                    Free Consultation Form
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-brand-primary font-serif-luxury">
                    Request Free Estimate & Site Measurement
                  </h3>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-800 mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 transition-all ${
                        errors.name ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-accent/30 focus:border-brand-accent'
                      }`}
                    />
                    {errors.name && <span className="text-[10px] sm:text-[11px] text-red-500 mt-0.5 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-800 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="e.g. 9710453183"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 transition-all ${
                        errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-accent/30 focus:border-brand-accent'
                      }`}
                    />
                    {errors.phone && <span className="text-[10px] sm:text-[11px] text-red-500 mt-0.5 block">{errors.phone}</span>}
                  </div>
                </div>

                {/* Email & Chennai Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-800 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      inputMode="email"
                      placeholder="e.g. ramesh@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 transition-all ${
                        errors.email ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-accent/30 focus:border-brand-accent'
                      }`}
                    />
                    {errors.email && <span className="text-[10px] sm:text-[11px] text-red-500 mt-0.5 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-800 mb-1">
                      Property Location in Chennai
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anna Nagar, Adyar, Velachery"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all"
                    />
                  </div>
                </div>

                {/* Service Type & Property Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-800 mb-1">
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent bg-white"
                    >
                      {servicesData.map(s => (
                        <option key={s.id} value={s.formValue}>{s.title}</option>
                      ))}
                      <option value="Both Material & Labour Setup">Both Material & Labour Setup</option>
                      <option value="Full Building Renovation">Full Building Renovation</option>
                      <option value="Other Repairs">Other Repairs / Small Works</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-800 mb-1">
                      Property Size / Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent bg-white"
                    >
                      <option value="1 BHK">1 BHK Home</option>
                      <option value="2 BHK">2 BHK Home</option>
                      <option value="3 BHK">3 BHK Home</option>
                      <option value="4 BHK / Villa">4 BHK / Villa</option>
                      <option value="Kitchen Only">Kitchen Only</option>
                      <option value="Wardrobes Only">Wardrobes Only</option>
                      <option value="Commercial Office">Commercial Office</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Budget / Notes */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-800 mb-1">
                    Project Description / Special Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe your layout requirements, preferred wood finish, timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent resize-none"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-brand-primary via-brand-surface to-brand-primary hover:opacity-95 text-white font-extrabold rounded-full shadow-lg hover:shadow-brand-accent/25 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-50 active:scale-95 cursor-pointer border border-brand-accent/40"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Booking Consultation...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} className="text-amber-400" />
                        <span>Book Free Site Visit & Lock Quote</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>


                <div className="flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] text-slate-400 pt-1 text-center flex-wrap">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-600" /> 100% Free Site Visit
                  </span>
                  <span>•</span>
                  <span>Zero Obligation</span>
                  <span>•</span>
                  <span>R. Stephen Direct Supervision</span>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
