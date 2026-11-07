import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * usePsychologicalModalTrigger (High-Converting CRO Engine)
 * 
 * Auto-triggers for website visitors using proven behavioral psychological hooks:
 * 1. Dwell Timer: Auto-triggers after 6 seconds of browsing.
 * 2. Exit-Intent: Triggers when desktop cursor moves towards top browser window/tabs.
 * 3. Scroll-Up Velocity: Triggers when visitor scrolls down > 180px and rapidly scrolls up (seeking back button).
 * 4. User-Friendly Session Frequency: Honors session dismissal so visitors aren't spammed after closing.
 */
export function usePsychologicalModalTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hasTriggeredRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const maxScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const mountTimeRef = useRef(0);

  // Initialize mount timestamp cleanly on route change
  useEffect(() => {
    mountTimeRef.current = Date.now();
    lastScrollTimeRef.current = Date.now();
    hasTriggeredRef.current = false;
  }, [location.pathname]);

  const triggerModal = useCallback((_reason = 'behavioral') => {
    if (hasTriggeredRef.current) return;

    // Check if previously dismissed in this session or already submitted
    try {
      if (sessionStorage.getItem('pg_post_req_dismissed')) return;
      if (localStorage.getItem('pg_requirement_submitted')) return;
    } catch {
      // ignore storage errors
    }

    // Exclude contact page and legal policy pages
    const isExcluded = [
      '/contact', 
      '/privacy-policy', 
      '/privacy',
      '/terms-and-conditions', 
      '/terms',
      '/cookie-policy', 
      '/cookies',
      '/refund-policy', 
      '/anti-ai-standards'
    ].some(p => location.pathname === p || location.pathname.startsWith(`${p}/`));
    
    if (isExcluded) return;

    // Ensure page has been rendered for at least 600ms
    if (mountTimeRef.current && (Date.now() - mountTimeRef.current < 600)) return;

    hasTriggeredRef.current = true;
    setIsOpen(true);
  }, [location.pathname]);

  // Manual trigger (always opens on click, bypassing auto-dismiss limits)
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('pg_post_req_dismissed', 'true');
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // 1. DWELL TIMER: Triggers after 6 seconds on page
    const dwellTimer = setTimeout(() => {
      triggerModal('dwell_timer_6s');
    }, 6000);

    // 2. SCROLL-UP VELOCITY TRIGGER
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = Date.now();
      const timeDelta = now - lastScrollTimeRef.current;

      if (currentScrollY > maxScrollYRef.current) {
        maxScrollYRef.current = currentScrollY;
      }

      // If visitor scrolled past 180px and rapidly flicks up by > 40px
      if (maxScrollYRef.current > 180) {
        const scrollDelta = lastScrollYRef.current - currentScrollY;
        if (scrollDelta > 40 && timeDelta < 400) {
          triggerModal('scroll_up_velocity');
        }
      }

      lastScrollYRef.current = currentScrollY;
      lastScrollTimeRef.current = now;
    };

    // 3. DESKTOP EXIT-INTENT TRIGGER (cursor leaves viewport top)
    const handleMouseLeave = (e) => {
      if ((e.clientY <= 25 || e.clientY <= 0) && (!e.relatedTarget || e.relatedTarget === null)) {
        triggerModal('exit_intent');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(dwellTimer);
    };
  }, [triggerModal, location.pathname]);

  return {
    isOpen,
    openModal,
    closeModal
  };
}
