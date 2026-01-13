import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";

const AnimatedButton = ({
  children,
  href,
  onClick,
  variant = "primary", // primary, secondary, ghost, magnetic
  size = "md", // sm, md, lg
  icon,
  className = "",
  disabled = false,
  loading = false,
  animationType = "default", // default, magnetic, ripple, glow, morphing
  ...props
}) => {
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);

  // Framer Motion values for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  // Variant styles
  const variants = {
    primary:
      "bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/25",
    secondary:
      "bg-transparent border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-primary hover:text-primary",
    ghost:
      "bg-transparent text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10",
    magnetic:
      "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:shadow-xl",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3.5 text-base",
    lg: "px-10 py-4 text-lg",
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || animationType !== "magnetic") return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;

      x.set(deltaX);
      y.set(deltaY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    if (animationType === "magnetic") {
      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [animationType, x, y]);

  // Ripple effect
  const createRipple = (e) => {
    if (animationType !== "ripple" || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  // Animation variants
  const buttonVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow:
        variant === "primary"
          ? "0 10px 30px -10px rgba(0, 194, 255, 0.25)"
          : "none",
    },
    hover: {
      scale: 1.02,
      y: -2,
      boxShadow:
        variant === "primary"
          ? "0 20px 40px -10px rgba(0, 194, 255, 0.4)"
          : "0 10px 30px -10px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
      y: 0,
      transition: { duration: 0.1 },
    },
  };

  const glowVariants = {
    rest: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={(e) => {
        if (animationType === "ripple") createRipple(e);
        if (onClick) onClick(e);
      }}
      className={`
        relative inline-flex items-center justify-center gap-2 font-semibold rounded-lg
        transition-all duration-300 overflow-hidden group
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      variants={buttonVariants}
      initial="rest"
      whileHover={!disabled ? "hover" : "rest"}
      whileTap={!disabled ? "tap" : "rest"}
      style={animationType === "magnetic" ? { x: springX, y: springY } : {}}
      disabled={disabled}
      {...props}
    >
      {/* Glow effect */}
      {animationType === "glow" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/50 to-blue-600/50 blur-xl"
          variants={glowVariants}
        />
      )}

      {/* Background shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Icon */}
      {icon && !loading && (
        <motion.i
          className={icon}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
      )}

      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Morphing background for special effect */}
      {animationType === "morphing" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Particle effects */}
      {variant === "primary" && (
        <>
          <div className="absolute top-1 right-2 w-1 h-1 bg-white/30 rounded-full animate-ping" />
          <div
            className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </>
      )}
    </Component>
  );
};

// Add CSS for ripple animation
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

export default AnimatedButton;
