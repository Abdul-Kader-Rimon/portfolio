import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { animateSection, animateStagger } from "../services/animations";

/**
 * Hook for managing animation states and loading
 * @returns {Object} Animation state and utilities
 */
export const useAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for animations to initialize
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced from 1500ms to 500ms for faster loading

    return () => clearTimeout(timer);
  }, []);

  return {
    isLoading,
  };
};

/**
 * Hook for scroll-triggered animations
 * @param {Object} options - Animation options
 * @returns {Object} Ref and inView state
 */
export const useScrollAnimation = (options = {}) => {
  const { threshold = 0.1, triggerOnce = true } = options;
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  return { ref, inView };
};

/**
 * Hook for GSAP section animations
 * @param {Object} animationOptions - GSAP animation options
 * @returns {Object} Element ref
 */
export const useGSAPAnimation = (animationOptions = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      animateSection(elementRef.current, animationOptions);
    }
  }, []);

  return { elementRef };
};

/**
 * Hook for staggered animations
 * @param {Object} animationOptions - GSAP stagger options
 * @returns {Object} Container ref and function to add elements
 */
export const useStaggerAnimation = (animationOptions = {}) => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  const addElement = (element) => {
    if (element && !elementsRef.current.includes(element)) {
      elementsRef.current.push(element);
    }
  };

  useEffect(() => {
    if (elementsRef.current.length > 0) {
      animateStagger(elementsRef.current, animationOptions);
    }
  }, []);

  return { containerRef, addElement };
};

/**
 * Hook for managing hover animations
 * @param {Object} hoverOptions - Hover animation options
 * @returns {Object} Mouse event handlers
 */
export const useHoverAnimation = (hoverOptions = {}) => {
  const { scale = 1.05, duration = 0.3, ease = "power2.out" } = hoverOptions;

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale,
      duration,
      ease,
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration,
      ease,
    });
  };

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
};
