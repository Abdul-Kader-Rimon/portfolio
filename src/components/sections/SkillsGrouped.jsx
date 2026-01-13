import React from "react";
import { motion } from "framer-motion";
import { useGSAPAnimation } from "../../hooks/useAnimation";
import AnimatedSectionTitle from "../ui/AnimatedSectionTitle";
import SkillCard from "../ui/SkillCard";
import { skillsByCategory } from "../../data/skillsData";

const SkillsGrouped = () => {
  // GSAP only for section entrance - NO SplitText
  const { elementRef } = useGSAPAnimation({
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // Clean Framer Motion container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Category order for better visual hierarchy
  const categoryOrder = ["Frontend", "Backend", "Database", "Tools"];

  return (
    <section
      ref={elementRef}
      className="py-24 bg-gray-50 dark:bg-gray-900 relative scroll-mt-20"
      id="skills"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <AnimatedSectionTitle
          badge="Expertise"
          title='Technical <span class="text-blue-600 dark:text-blue-400">Skills</span>'
          subtitle="Technologies and tools I use to build modern, scalable web applications."
        />

        {/* Skills Cards by Category */}
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categoryOrder.map((category, categoryIndex) => {
            const skills = skillsByCategory[category] || [];
            if (skills.length === 0) return null;

            return (
              <motion.div
                key={category}
                className="mb-16 last:mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Category Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {category}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full" />
                </div>

                {/* Skills Grid for this category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {skills.map((skill, skillIndex) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={categoryIndex * 4 + skillIndex}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Continuously learning and adapting to new technologies. Passionate
            about creating efficient, scalable, and user-friendly applications
            with modern development practices.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsGrouped;
