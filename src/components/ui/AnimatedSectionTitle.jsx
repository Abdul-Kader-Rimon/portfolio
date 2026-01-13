import React from "react";
import { motion } from "framer-motion";

const AnimatedSectionTitle = ({ badge, title, subtitle, className = "" }) => {
  // Clean Framer Motion variants - NO GSAP SplitText
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={`text-center mb-16 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase mb-4 relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          {/* Animated dot */}
          <motion.span
            className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {badge}

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}

      {/* Title - Clean React rendering without DOM manipulation */}
      <motion.h2
        className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        variants={itemVariants}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative line */}
      <motion.div
        className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6 rounded-full"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 80, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
};

export default AnimatedSectionTitle;
