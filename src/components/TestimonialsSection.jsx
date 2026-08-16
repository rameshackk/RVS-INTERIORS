import React from 'react';
import { Star, Quote, MapPin, CheckCircle2, Award } from 'lucide-react';
import { testimonialsData } from '../data/testimonialsData';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white relative border-b border-brand-lightBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-brand-accent/30 text-brand-accentHover text-xs font-bold uppercase tracking-wider mb-3">
            <Star size={13} className="fill-brand-accent text-brand-accent" />
            Verified Chennai Homeowner Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-serif-luxury">
            Client Satisfaction is Our Supreme Benchmark
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-light">
            Read how homeowners across Anna Nagar, Adyar, Velachery, Porur, and OMR rate our precision craftsmanship and timely delivery.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((review) => (
            <div
              key={review.id}
              className="bg-brand-light rounded-3xl p-8 border border-brand-lightBorder hover:border-brand-accent/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Rating Stars & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] bg-white text-slate-600 font-semibold px-2 py-0.5 rounded-full border border-slate-200">
                    {review.badge}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-700 leading-relaxed italic font-serif">
                  "{review.text}"
                </p>
              </div>

              {/* Author Details */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-brand-surface text-amber-300 flex items-center justify-center font-bold text-sm shadow-inner border border-brand-accent/30 font-serif-luxury">
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-primary">{review.name}</h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin size={10} className="text-brand-accent" />
                      {review.location}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                  <CheckCircle2 size={11} /> Verified
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
