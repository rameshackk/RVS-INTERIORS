import React, { useState } from 'react';
import { 
  Sparkles, MapPin, Clock, Layers, Maximize2, 
  X, Check, ArrowRight, MessageSquare, Phone 
} from 'lucide-react';
import { portfolioCategories, portfolioData } from '../data/portfolioData';
import { companyData } from '../data/companyData';

export default function DesignShowcase({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImageModal, setSelectedImageModal] = useState(null);

  const filteredProjects = activeCategory === "all"
    ? portfolioData
    : portfolioData.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-12 sm:py-20 bg-brand-light relative border-b border-brand-lightBorder">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-brand-accent/30 text-brand-accentHover text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <Sparkles size={12} className="text-brand-accent" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-serif-luxury">
            Completed Projects & Design Catalog
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-base font-light">
            Showcase of modular wardrobes, acrylic kitchens, corporate offices, and civil renovations delivered across Chennai.
          </p>
        </div>

        {/* Category Filter Pills - Horizontally scrollable on mobile */}
        <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center gap-2 mb-8 sm:mb-12 no-scrollbar px-1">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                activeCategory === cat.id
                  ? 'bg-brand-primary text-white shadow-sm ring-2 ring-brand-accent/30'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-lightBorder shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-52 sm:h-64 overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                {/* Category Badge */}
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-brand-primary/95 text-amber-300 text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded border border-brand-accent/30 tracking-wider uppercase">
                  {project.categoryLabel}
                </span>

                {/* Zoom Trigger Button */}
                <button
                  onClick={() => setSelectedImageModal(project)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-black/60 text-white hover:bg-brand-accent hover:text-slate-950 transition-colors backdrop-blur-sm"
                  aria-label="View photo high resolution"
                >
                  <Maximize2 size={13} />
                </button>

                {/* Location Pill */}
                <div className="absolute bottom-2.5 left-3 sm:bottom-3 sm:left-4 flex items-center gap-1 text-white text-[11px] sm:text-xs font-semibold drop-shadow">
                  <MapPin size={12} className="text-brand-accent" />
                  <span>{project.location}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-brand-primary leading-snug group-hover:text-brand-accent transition-colors font-serif-luxury">
                    {project.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Materials & Specs */}
                  <div className="mt-2.5 sm:mt-3.5 p-2.5 sm:p-3 rounded-xl bg-brand-light border border-brand-lightBorder text-[10px] sm:text-[11px] text-slate-700">
                    <span className="font-bold text-slate-900 block mb-0.5">Key Materials Used:</span>
                    <span className="text-slate-600 line-clamp-1">{project.materials}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-600 text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <Clock size={11} />
                    {project.timeline}
                  </span>
                  <button
                    onClick={() => onSelectProject(project)}
                    className="text-[11px] sm:text-xs font-bold text-brand-primary hover:text-brand-accent flex items-center gap-1 transition-colors group/btn"
                  >
                    <span>Enquire Similar</span>
                    <ArrowRight size={12} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-14 text-center">
          <button
            onClick={() => onSelectProject({ title: "Custom Interior Requirement" })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-brand-primary hover:bg-brand-surface text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95"
          >
            <Sparkles size={14} className="text-brand-accent" />
            <span>Have a Custom Layout? Book Free 3D Design</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImageModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 relative flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-3 sm:p-4 px-4 sm:px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="min-w-0 pr-2">
                <span className="text-[9px] sm:text-[10px] font-bold text-brand-accent uppercase tracking-wider">
                  {selectedImageModal.categoryLabel}
                </span>
                <h3 className="text-xs sm:text-base font-bold text-brand-primary font-serif-luxury truncate">
                  {selectedImageModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedImageModal(null)}
                className="p-1.5 sm:p-2 rounded-full hover:bg-slate-200 text-slate-600 transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative bg-slate-950 flex items-center justify-center overflow-hidden max-h-[45vh] sm:max-h-[55vh]">
              <img
                src={selectedImageModal.image}
                alt={selectedImageModal.title}
                className="max-h-[45vh] sm:max-h-[55vh] w-auto object-contain"
              />
            </div>

            {/* Modal Details & Action */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-2.5 sm:space-y-3 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs">
                <span className="flex items-center gap-1 text-slate-500">
                  <MapPin size={12} className="text-brand-accent" />
                  <strong>Location:</strong> {selectedImageModal.location}
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <Clock size={12} />
                  <strong>Timeline:</strong> {selectedImageModal.timeline}
                </span>
              </div>

              <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed">
                {selectedImageModal.description}
              </p>

              <div className="p-2.5 sm:p-3 bg-amber-50/70 border border-brand-accent/20 rounded-xl text-[10px] sm:text-xs">
                <strong className="text-brand-primary block mb-0.5">Authentic Specifications:</strong>
                <span className="text-slate-600">{selectedImageModal.materials}</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
                <button
                  onClick={() => {
                    const text = `Hi RVS Interior! I saw the "${selectedImageModal.title}" (${selectedImageModal.location}) on your portfolio. Can you give me an estimate for similar work?`;
                    window.open(`https://wa.me/${companyData.proprietor.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                >
                  <MessageSquare size={13} />
                  <span>WhatsApp Query</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedImageModal(null);
                    onSelectProject(selectedImageModal);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-brand-primary hover:bg-brand-surface text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={13} className="text-brand-accent" />
                  <span>Get Line-Item Quote</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
