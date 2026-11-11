import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';

// Layout & Global Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CookieConsent from './components/common/CookieConsent';
import WhatsAppChatbot from './components/common/WhatsAppChatbot';
import MobileBottomActionBar from './components/common/MobileBottomActionBar';
import FloatingRequirementTab from './components/common/FloatingRequirementTab';
import PostRequirementModal from './components/common/PostRequirementModal';
import { usePsychologicalModalTrigger } from './hooks/usePsychologicalModalTrigger';

// Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function AppContent() {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = usePsychologicalModalTrigger();

  const handleOpenVisitModal = (property = null) => {
    const title = typeof property === 'string' ? property : property?.title;
    const q = new URLSearchParams();
    q.set('purpose', 'site-visit');
    if (title) q.set('property', title);
    navigate(`/contact?${q.toString()}`);
  };

  const handleOpenReqModal = () => {
    openModal();
  };

  return (
    <div className="flex flex-col min-h-screen text-slate-800 bg-[#FAF9F6] antialiased selection:bg-amber-100 selection:text-slate-900">
      <ScrollToTop />
      
      {/* Top Floating Navigation */}
      <Navbar 
        onOpenVisitModal={() => handleOpenVisitModal(null)} 
        onOpenRequirementModal={handleOpenReqModal}
      />

      {/* Main Routed Content */}
      <main className="flex-grow pb-16 md:pb-0">
        <Routes>
          <Route 
            path="/" 
            element={<HomePage onOpenVisitModal={handleOpenVisitModal} />} 
          />
          <Route 
            path="/properties" 
            element={<PropertiesPage onOpenVisitModal={handleOpenVisitModal} />} 
          />
          {/* Gracefully redirect /locations & /browse-by directly to /properties */}
          <Route path="/locations" element={<Navigate to="/properties" replace />} />
          <Route path="/browse-by" element={<Navigate to="/properties" replace />} />
          
          <Route 
            path="/property/:slug" 
            element={<PropertyDetailPage onOpenVisitModal={handleOpenVisitModal} />} 
          />
          <Route 
            path="/about" 
            element={<AboutPage onOpenVisitModal={handleOpenVisitModal} />} 
          />
          <Route 
            path="/services" 
            element={<ServicesPage />} 
          />
          <Route 
            path="/contact" 
            element={<ContactPage />} 
          />
          
          {/* Statutory & Legal Policy Routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/termsofuse" element={<TermsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<HomePage onOpenVisitModal={handleOpenVisitModal} />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Cookie Consent Banner */}
      <CookieConsent />

      {/* Floating Direct WhatsApp Action (Desktop Only) */}
      <WhatsAppChatbot />

      {/* Sticky Mobile 4-Column Bottom Action Bar (Mobile Only) */}
      <MobileBottomActionBar onOpenRequirementModal={handleOpenReqModal} />

      {/* Desktop Floating "Post Requirement" Tab */}
      <FloatingRequirementTab onClick={openModal} />

      {/* Behavioral Psychological Trigger Modal */}
      <PostRequirementModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
