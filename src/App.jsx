import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LivspacePriceEstimator from './components/LivspacePriceEstimator';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import ServicesGrid from './components/ServicesGrid';
import DualProvisionSection from './components/DualProvisionSection';
import DesignShowcase from './components/DesignShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import BrandPartnersSection from './components/BrandPartnersSection';
import ProprietorPledge from './components/ProprietorPledge';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import AdminEnquiriesModal from './components/AdminEnquiriesModal';
import QuickQuoteModal from './components/QuickQuoteModal';
import FloatingQuickActions from './components/FloatingQuickActions';
import Footer from './components/Footer';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isQuickQuoteOpen, setIsQuickQuoteOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);
  const [prefillContactData, setPrefillContactData] = useState(null);

  // When user clicks "Calculate Cost" or "Book Quote from Estimator"
  const handleScrollToCalculator = () => {
    const el = document.getElementById('cost-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuoteModal = (serviceName) => {
    setSelectedServiceForModal(serviceName || null);
    setIsQuickQuoteOpen(true);
  };

  const handleSelectServiceFromGrid = (serviceName) => {
    setPrefillContactData({ serviceType: serviceName });
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProjectFromPortfolio = (project) => {
    setPrefillContactData({
      title: project.title,
      serviceType: project.category === 'carpentry' ? 'Carpentry Works' : 'Interior Design',
      message: `I am interested in designing something similar to: "${project.title}" (${project.location || 'Chennai'}). Please provide a quotation.`
    });
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookFromCalculator = (calcData) => {
    setPrefillContactData({
      property: calcData.property,
      estimatedPrice: calcData.estimatedPrice,
      message: `Calculated from Website Estimator: ${calcData.property} (${calcData.sqFt} sq.ft) with ${calcData.tier} finish. Estimated total budget: ${calcData.estimatedPrice}. Please schedule a free site laser measurement.`
    });
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark flex flex-col font-sans selection:bg-brand-accent selection:text-white">
      {/* Navigation Header */}
      <Navbar
        onOpenCalculator={handleScrollToCalculator}
        onOpenQuote={() => handleOpenQuoteModal()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <HeroSection
          onOpenCalculator={handleScrollToCalculator}
          onOpenQuote={() => handleOpenQuoteModal()}
        />

        <LivspacePriceEstimator
          onBookQuoteWithData={handleBookFromCalculator}
        />

        <BeforeAfterSlider
          onOpenQuote={() => handleOpenQuoteModal("Civil & Interior Renovation")}
        />

        <ServicesGrid
          onSelectService={handleSelectServiceFromGrid}
        />

        <DualProvisionSection
          onOpenQuote={() => handleOpenQuoteModal("Material & Labour Dual Provision")}
        />

        <DesignShowcase
          onSelectProject={handleSelectProjectFromPortfolio}
        />

        <WhyChooseUs
          onOpenQuote={() => handleOpenQuoteModal()}
        />

        <HowItWorks
          onOpenQuote={() => handleOpenQuoteModal()}
        />

        <BrandPartnersSection />

        <ProprietorPledge
          onOpenQuote={() => handleOpenQuoteModal()}
        />

        <TestimonialsSection />

        <FAQSection
          onOpenQuote={() => handleOpenQuoteModal()}
        />

        <ContactSection
          prefillData={prefillContactData}
          onClearPrefill={() => setPrefillContactData(null)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectService={handleSelectServiceFromGrid}
      />

      {/* Modals & Floating CTAs */}
      <AdminEnquiriesModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <QuickQuoteModal
        isOpen={isQuickQuoteOpen}
        onClose={() => setIsQuickQuoteOpen(false)}
        defaultService={selectedServiceForModal}
      />

      <FloatingQuickActions
        onOpenCalculator={handleScrollToCalculator}
        onOpenQuote={() => handleOpenQuoteModal()}
      />
    </div>
  );
}
