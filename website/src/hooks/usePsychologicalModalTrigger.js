import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * usePsychologicalModalTrigger (Aggressive CRO Engine)
 * 
 * Auto-triggers for website visitors using proven behavioral psychological hooks:
 * 1. Fast Timer: Auto-pops after 5 seconds of browsing.
 * 2. Exit-Intent: Pops when desktop cursor moves towards top tabs/close button.
 * 3. Scroll-Up Velocity: Pops when user scrolls down > 150px and flicks up.
 * 4. Testing-Friendly: Cleans up obsolete permanent locks so it triggers reliably on refresh.
 */
export function usePsychologicalModalTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hasTriggeredRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const maxScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const mountTimeRef = useRef(Date.now());

  // Clean up any old permanent lockout keys from past testing sessions on mount
  useEffect(() => {
    try {
      localStorage.removeItem('pg_requirement_submitted');
      localStorage.removeItem('pg_post_req_dismissed_until');
      sessionStorage.removeItem('pg_post_req_dismissed');
    } catch {
      // ignore
    }
  }, []);

  // Reset trigger state on route change so user on another page can still trigger exit intent / dwell
  useEffect(() => {
    hasTriggeredRef.current = false;
    mountTimeRef.current = Date.now();
  }, [location.pathname]);

  const triggerModal = useCallback((reason = 'behavioral') => {
    if (hasTriggeredRef.current) return;
    
    // Quick 500ms initial safety lockout so page finishes rendering
    if (Date.now() - mountTimeRef.current < 500) return;

    hasTriggeredRef.current = true;
    setIsOpen(true);
  }, []);

  // Manual launcher (can always be triggered by buttons or floating tab)
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // 1. FAST DWELL TIMER: Triggers automatically after 5 seconds on page
    const dwellTimer = setTimeout(() => {
      triggerModal('aggressive_timer_5s');
    }, 5000);

    // 2. SCROLL-UP VELOCITY TRIGGER
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = Date.now();
      const timeDelta = now - lastScrollTimeRef.current;

      if (currentScrollY > maxScrollYRef.current) {
        maxScrollYRef.current = currentScrollY;
      }

      // If user scrolled past 150px and scrolls up by > 40px
      if (maxScrollYRef.current > 150) {
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
