import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * usePsychologicalModalTrigger
 * 
 * Intelligent behavioral trigger engine based on conversion rate optimization (CRO):
 * 1. Scroll-up velocity after deep engagement (scrolled > 450px then rapid upward scroll)
 * 2. Desktop exit-intent detection (cursor rapidly leaving top of viewport)
 * 3. High-intent dwell timer (45 seconds with active page engagement)
 * 4. Frequency capping & respect (session/localStorage snooze on dismissal or submission)
 */
export function usePsychologicalModalTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const hasTriggeredRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const maxScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const mountTimeRef = useRef(Date.now());

  // Check if previously submitted or dismissed
  const isSuppressed = useCallback(() => {
    try {
      if (localStorage.getItem('pg_requirement_submitted') === 'true') return true;
      if (sessionStorage.getItem('pg_post_req_dismissed') === 'true') return true;

      const dismissedUntil = localStorage.getItem('pg_post_req_dismissed_until');
      if (dismissedUntil && Number(dismissedUntil) > Date.now()) return true;
    } catch (e) {
      // ignore storage errors
    }
    return false;
  }, []);

  const triggerModal = useCallback((reason = 'behavioral') => {
    if (hasTriggeredRef.current || isSuppressed()) return;
    
    // Minimum 7-second initial lockout to prevent jarring the user
    if (Date.now() - mountTimeRef.current < 7000) return;

    hasTriggeredRef.current = true;
    setIsOpen(true);
  }, [isSuppressed]);

  // Manual launcher (can always be triggered by user clicks)
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Snooze auto-popup for this session & next 24 hours
    try {
      sessionStorage.setItem('pg_post_req_dismissed', 'true');
      localStorage.setItem('pg_post_req_dismissed_until', String(Date.now() + 24 * 60 * 60 * 1000));
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    if (isSuppressed()) return;

    // 1. SCROLL-UP VELOCITY TRIGGER
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = Date.now();
      const timeDelta = now - lastScrollTimeRef.current;

      // Update max scroll reached
      if (currentScrollY > maxScrollYRef.current) {
        maxScrollYRef.current = currentScrollY;
      }

      // Check for deep engagement (scrolled down at least 450px)
      // and sudden upward scroll velocity (> 120px up within 300ms)
      if (maxScrollYRef.current > 450) {
        const scrollDelta = lastScrollYRef.current - currentScrollY;
        if (scrollDelta > 80 && timeDelta < 350) {
          triggerModal('scroll_up_velocity');
        }
      }

      lastScrollYRef.current = currentScrollY;
      lastScrollTimeRef.current = now;
    };

    // 2. DESKTOP EXIT-INTENT TRIGGER
    const handleMouseLeave = (e) => {
      // If mouse cursor moves towards top tabs/URL bar with upward vector
      if (e.clientY <= 12 && e.relatedTarget === null) {
        triggerModal('exit_intent');
      }
    };

    // 3. ENGAGED DWELL TIMER (42 SECONDS + AT LEAST 250PX SCROLL)
    const dwellTimer = setTimeout(() => {
      if (maxScrollYRef.current > 250) {
        triggerModal('engaged_dwell_time');
      }
    }, 42000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(dwellTimer);
    };
  }, [triggerModal, isSuppressed]);

  return {
    isOpen,
    openModal,
    closeModal
  };
}
