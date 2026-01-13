import React from "react";
import { motion } from "framer-motion";

const SkillProgressBar = ({ skill, index = 0 }) => {
  // Framer Motion variants for smooth animations
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="mb-6 last:mb-0"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Skill Name and Percentage */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <skill.icon className="text-lg" />
          </div>

          {/* Skill Name */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {skill.name}
          </h3>

          {/* Category Badge */}
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
            {skill.category}
          </span>
        </div>

        {/* Percentage */}
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
          {skill.proficiency}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          transition={{
            duration: 1.2,
            delay: index * 0.1 + 0.3,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

export default SkillProgressBar;
