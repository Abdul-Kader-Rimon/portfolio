import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/**
 * @deprecated Use useLenis hook instead for proper React integration
 * This function is kept for backward compatibility
 */
export const initSmoothScroll = () => {
  console.warn("initSmoothScroll is deprecated. Use useLenis hook instead.");
  return null;
};

/**
 * Animate section reveal on scroll
 * @param {HTMLElement} element - Element to animate
 * @param {Object} options - Animation options
 */
export const animateSection = (element, options = {}) => {
  const {
    y = 100,
    opacity = 0,
    duration = 1,
    ease = "power2.out",
    start = "top 80%",
    end = "bottom 20%",
    toggleActions = "play none none reverse",
  } = options;

  gsap.fromTo(
    element,
    {
      y,
      opacity,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        toggleActions,
      },
    }
  );
};

/**
 * Animate elements staggered on scroll
 * @param {NodeList|Array} elements - Elements to animate
 * @param {Object} options - Animation options
 */
export const animateStagger = (elements, options = {}) => {
  const {
    y = 50,
    opacity = 0,
    duration = 0.8,
    stagger = 0.2,
    ease = "power2.out",
    start = "top 85%",
  } = options;

  gsap.fromTo(
    elements,
    {
      y,
      opacity,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: elements[0],
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
};

/**
 * Create a parallax effect
 * @param {HTMLElement} element - Element to animate
 * @param {Object} options - Animation options
 */
export const createParallax = (element, options = {}) => {
  const { yPercent = -50, ease = "none" } = options;

  gsap.to(element, {
    yPercent,
    ease,
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

/**
 * Animate progress bars
 * @param {HTMLElement} element - Progress bar element
 * @param {number} width - Target width percentage
 */
export const animateProgressBar = (element, width) => {
  gsap.fromTo(
    element,
    {
      width: 0,
    },
    {
      width: `${width}%`,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

/**
 * Create typing animation effect
 * @param {HTMLElement} element - Text element
 * @param {string} text - Text to type
 * @param {Object} options - Animation options
 */
export const createTypingAnimation = (element, text, options = {}) => {
  const { duration = 2, ease = "none" } = options;

  const tl = gsap.timeline();

  tl.to(element, {
    duration,
    ease,
    text: {
      value: text,
      delimiter: "",
    },
  });

  return tl;
};

/**
 * Cleanup all GSAP animations and ScrollTriggers
 */
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf("*");
};

/**
 * Advanced Hero Section Animations
 * @param {HTMLElement} container - Hero container element
 */
export const animateHeroSection = (container) => {
  const tl = gsap.timeline({ delay: 0.5 });

  // Animate hero elements with stagger
  tl.fromTo(
    container.querySelectorAll(".hero-text-1"),
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
  )
    .fromTo(
      container.querySelectorAll(".hero-text-2"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      container.querySelectorAll(".hero-text-3"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      container.querySelectorAll(".hero-buttons"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.2"
    )
    .fromTo(
      container.querySelectorAll(".hero-social"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

  // Animate hero image
  gsap.fromTo(
    container.querySelectorAll(".hero-image"),
    { scale: 1.1, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.8 }
  );

  return tl;
};

/**
 * Professional Card Reveal Animation
 * @param {NodeList|Array} cards - Card elements
 * @param {Object} options - Animation options
 */
export const animateCards = (cards, options = {}) => {
  const {
    y = 60,
    opacity = 0,
    duration = 0.8,
    stagger = 0.15,
    ease = "power2.out",
    start = "top 85%",
  } = options;

  gsap.fromTo(
    cards,
    {
      y,
      opacity,
      scale: 0.95,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: cards[0],
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
};

/**
 * Magnetic Button Effect
 * @param {HTMLElement} button - Button element
 */
export const createMagneticButton = (button) => {
  const handleMouseMove = (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  button.addEventListener("mousemove", handleMouseMove);
  button.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    button.removeEventListener("mousemove", handleMouseMove);
    button.removeEventListener("mouseleave", handleMouseLeave);
  };
};

/**
 * Text Reveal Animation
 * @param {HTMLElement} element - Text element
 * @param {Object} options - Animation options
 */
export const animateTextReveal = (element, options = {}) => {
  const { duration = 1, ease = "power2.out", start = "top 80%" } = options;

  // Split text into words and wrap each in a span
  const text = element.textContent;
  const words = text.split(" ");
  element.innerHTML = words
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");

  const wordElements = element.querySelectorAll(".word");

  gsap.fromTo(
    wordElements,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger: 0.1,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
};

/**
 * Smooth Page Transitions
 * @param {HTMLElement} outgoingPage - Current page element
 * @param {HTMLElement} incomingPage - New page element
 */
export const createPageTransition = (outgoingPage, incomingPage) => {
  const tl = gsap.timeline();

  tl.to(outgoingPage, {
    opacity: 0,
    y: -50,
    duration: 0.5,
    ease: "power2.in",
  }).fromTo(
    incomingPage,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }
  );

  return tl;
};

/**
 * Scroll Progress Indicator
 * @param {HTMLElement} indicator - Progress indicator element
 */
export const createScrollProgress = (indicator) => {
  gsap.to(indicator, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
};
