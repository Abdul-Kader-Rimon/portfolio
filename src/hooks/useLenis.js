import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Professional Lenis smooth scrolling hook
 * Optimized for 1:1 mouse wheel responsiveness with zero lag
 */
export const useLenis = () => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings for instant response
    lenisRef.current = new Lenis({
      // Reduced duration for instant response
      duration: 0.8,
      // Optimized easing for natural feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Core settings
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      // Mouse settings for 1:1 response
      mouseMultiplier: 1.2,
      // Touch settings
      smoothTouch: false,
      touchMultiplier: 2,
      // Performance settings
      infinite: false,
      // Advanced settings for responsiveness
      lerp: 0.1, // Lower lerp for more responsive feel
      wheelMultiplier: 1,
      normalizeWheel: true,
    });

    // Configure ScrollTrigger to use Lenis as scroller
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenisRef.current?.scrollTo(value, { immediate: true });
        }
        return lenisRef.current?.scroll ?? 0;
      },
      scrollLeft() {
        return 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // Sync Lenis with ScrollTrigger
    lenisRef.current.on("scroll", (e) => {
      ScrollTrigger.update();
    });

    // Prevent browser's native smooth scrolling
    document.documentElement.style.scrollBehavior = "auto";

    // RAF loop for smooth animation
    const raf = (time) => {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    // Refresh ScrollTrigger after Lenis is ready
    ScrollTrigger.refresh();

    // Handle anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const targetId = target.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          lenisRef.current?.scrollTo(targetElement, {
            offset: -80,
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Cleanup function
    return () => {
      // Cancel RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Remove event listeners
      document.removeEventListener("click", handleAnchorClick);

      // Destroy Lenis
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }

      // Reset scroll behavior
      document.documentElement.style.scrollBehavior = "";

      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Return Lenis instance for external control
  return lenisRef.current;
};

/**
 * Hook for scroll-to functionality
 */
export const useScrollTo = () => {
  const lenis = useLenis();

  const scrollTo = (target, options = {}) => {
    if (!lenis) return;

    const defaultOptions = {
      offset: 0,
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    };

    lenis.scrollTo(target, { ...defaultOptions, ...options });
  };

  const scrollToTop = () => {
    scrollTo(0, { duration: 0.8 });
  };

  return { scrollTo, scrollToTop };
};
