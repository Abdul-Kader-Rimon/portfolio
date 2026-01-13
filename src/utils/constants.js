// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Animation Configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
  },
  easing: {
    easeOut: "power2.out",
    easeInOut: "power2.inOut",
    bounce: "back.out(1.7)",
  },
};

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Social Media Links
export const SOCIAL_LINKS = {
  github: "https://github.com/Abdul-Kader-Rimon",
  linkedin: "https://www.linkedin.com/in/abdul-kader-rimon",
  twitter: "https://twitter.com/",
  facebook: "https://www.facebook.com/abdul.kader.rimon.2025",
  email: "mailto:mdr78995@gmail.com",
  phone: "tel:+8801642728613",
};

// Navigation Items
export const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Portfolio" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

// Form Validation Rules
export const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 200,
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
};
