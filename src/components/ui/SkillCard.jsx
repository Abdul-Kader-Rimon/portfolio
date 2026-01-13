import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const SkillCard = ({ skill, index = 0 }) => {
  const cardRef = useRef(null);
  const shineRef = useRef(null);

  // Individual card floating animation removed - now handled by row-based floating in Skills.jsx
  // This keeps the card component clean and focused on hover interactions only

  // Premium blue-themed hover variants
  const cardHoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    },
    hover: {
      scale: 1.07, // Scale up (1.06-1.08 range)
      y: -8, // Lift card upward
      boxShadow:
        "0 25px 50px -12px rgba(59, 130, 246, 0.25), 0 10px 10px -5px rgba(37, 99, 235, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30, // Smoother hover-out
        duration: 0.4,
      },
    },
  };

  // Premium blue background gradient animation
  const blueBackgroundVariants = {
    rest: {
      opacity: 0,
      background:
        "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)",
    },
    hover: {
      opacity: 1,
      background: [
        "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)",
        "linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(29, 78, 216, 0.15) 100%)",
        "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)",
      ],
      transition: {
        opacity: {
          duration: 0.3,
          ease: "easeOut",
        },
        background: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
  };

  // Soft blue glow effect
  const blueGlowVariants = {
    rest: {
      opacity: 0,
      scale: 1,
    },
    hover: {
      opacity: 0.6,
      scale: 1.03,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Shine overlay animation (keeping existing)
  const shineVariants = {
    rest: {
      x: "-100%",
      opacity: 0,
    },
    hover: {
      x: "100%",
      opacity: [0, 0.4, 0], // Reduced opacity for premium feel
      transition: {
        duration: 1.2, // Slower for premium feel
        ease: "easeInOut",
      },
    },
  };

  // Icon hover animation - smooth and premium
  const iconHoverVariants = {
    rest: {
      rotate: 0,
      scale: 1,
    },
    hover: {
      rotate: [0, -8, 8, 0], // Smooth rotation
      scale: [1, 1.15, 1.1], // Premium pop effect
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20,
        duration: 0.7,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className={`skill-card group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border ${skill.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 cursor-default overflow-hidden`}
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={cardHoverVariants}
    >
      {/* Premium blue glow around card */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-blue-500/15 to-blue-600/20 blur-md"
        variants={blueGlowVariants}
        style={{ zIndex: -1 }}
      />

      {/* Premium blue gradient background on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        variants={blueBackgroundVariants}
      />

      {/* Shine overlay effect */}
      <motion.div
        ref={shineRef}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent -skew-x-12 pointer-events-none"
        variants={shineVariants}
      />

      {/* Original background gradient overlay (keeping for compatibility) */}
      <div
        className={`absolute inset-0 ${skill.bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}
      />

      {/* Card content */}
      <div className="relative z-10">
        {/* Icon container with premium hover animation */}
        <motion.div
          className={`w-14 h-14 rounded-xl ${skill.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
          variants={iconHoverVariants}
        >
          <skill.icon className={`text-2xl ${skill.color}`} />
        </motion.div>

        {/* Skill name */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
          {skill.name}
        </h3>

        {/* Category badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${skill.bgColor} ${skill.color} border ${skill.borderColor}`}
          >
            {skill.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
          {skill.description}
        </p>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="absolute bottom-4 right-6 w-4 h-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 opacity-10 group-hover:opacity-30 transition-opacity duration-300" />
      </div>

      {/* Enhanced blue border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/30 opacity-0 group-hover:opacity-60 transition-opacity duration-400 pointer-events-none" />
    </motion.div>
  );
};

export default SkillCard;
