import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layout & Global Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MobileBottomBar from './components/common/MobileBottomBar';
import CookieConsent from './components/common/CookieConsent';
import ScheduleVisitModal from './components/common/ScheduleVisitModal';
import WhatsAppChatbot from './components/common/WhatsAppChatbot';
import PostRequirementModal from './components/common/PostRequirementModal';
import FloatingRequirementTab from './components/common/FloatingRequirementTab';
import { usePsychologicalModalTrigger } from './hooks/usePsychologicalModalTrigger';

// Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LegalPoliciesPage from './pages/LegalPoliciesPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function AppContent() {
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState(null);

  // Intelligent Behavioral & Psychological Popup Trigger
  const {
    isOpen: isReqModalOpen,
    openModal: handleOpenReqModal,
    closeModal: handleCloseReqModal
  } = usePsychologicalModalTrigger();

  const handleOpenVisitModal = (property = null) => {
    setSelectedPropertyForModal(property);
    setIsVisitModalOpen(true);
  };

  const handleCloseVisitModal = () => {
    setIsVisitModalOpen(false);
    setSelectedPropertyForModal(null);
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
      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={<HomePage onOpenVisitModal={handleOpenVisitModal} />} 
          />
          <Route 
            path="/properties" 
            element={<PropertiesPage onOpenVisitModal={handleOpenVisitModal} />} 
          />
          <Route 
            path="/property/:slug" 
            element={<PropertyDetailPage onOpenVisitModal={handleOpenVisitModal} />} 
          />
          <Route 
            path="/about" 
            element={<AboutPage onOpenVisitModal={handleOpenVisitModal} />} 
          />
          <Route 
            path="/contact" 
            element={<ContactPage />} 
          />
          
          {/* Statutory & Legal Policy Routes */}
          <Route path="/privacy-policy" element={<LegalPoliciesPage />} />
          <Route path="/terms-and-conditions" element={<LegalPoliciesPage />} />
          <Route path="/cookie-policy" element={<LegalPoliciesPage />} />
          <Route path="/refund-policy" element={<LegalPoliciesPage />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<HomePage onOpenVisitModal={handleOpenVisitModal} />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Pinned Mobile Bottom Bar (< 768px) */}
      <MobileBottomBar 
        onOpenVisitModal={() => handleOpenVisitModal(null)} 
        onOpenRequirementModal={handleOpenReqModal}
      />

      {/* Cookie Consent Banner */}
      <CookieConsent />

      {/* Free Cab Site Visit Modal */}
      <ScheduleVisitModal
        isOpen={isVisitModalOpen}
        onClose={handleCloseVisitModal}
        property={selectedPropertyForModal}
      />

      {/* Floating Interactive WhatsApp Chatbot */}
      <WhatsAppChatbot onOpenVisitModal={() => handleOpenVisitModal(null)} />

      {/* Persistent Floating Requirement Tab (Desktop) */}
      <FloatingRequirementTab onClick={handleOpenReqModal} />

      {/* Behavioral & Psychological Post Requirement Modal */}
      <PostRequirementModal
        isOpen={isReqModalOpen}
        onClose={handleCloseReqModal}
      />
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
