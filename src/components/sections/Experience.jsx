import React from "react";
import { motion } from "framer-motion";
import { useGSAPAnimation } from "../../hooks/useAnimation";

const Experience = () => {
  const { elementRef } = useGSAPAnimation({
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  const experiences = [
    {
      period: "2025",
      title: "Full-Stack Web Development Projects",
      company: "Programming Hero: Complete Web Development Course",
      description:
        "Led frontend development of personal and course-based projects using React and TypeScript. Optimized application performance and improved load times through clean, efficient code. Built interactive dashboards, responsive user interfaces, and reusable components.",
      current: true,
    },
    {
      period: "2024",
      title: "Frontend Web Development & Team Collaboration",
      company: "Hablu Programmer: Journey of Frontend Web Development",
      description:
        "Collaborated with team members on course-based projects, practicing real-world teamwork and project coordination. Developed responsive websites and dynamic UIs while following design specifications. Gained hands-on experience in HTML, CSS, JavaScript, and modern frontend frameworks, applying team feedback to improve code quality.",
      current: false,
    },
  ];

  const education = [
    {
      period: "Currently Studying",
      title: "B.Sc. in Physics",
      company: "National University, Bangladesh",
      description:
        "Currently pursuing a Bachelor of Science in Physics, gaining strong foundational knowledge in classical physics, modern physics, mathematics, and analytical problem-solving. Developing critical thinking and research-oriented skills through comprehensive theoretical and practical coursework.",
      current: true,
      type: "academic",
    },
    {
      period: "2025",
      title: "Complete Web Development Course",
      company: "Programming Hero",
      description:
        "Comprehensive full-stack training covering frontend and backend fundamentals, React, modern JavaScript, API integration, authentication, database basics, and real-world project-based development workflows.",
      current: false,
      type: "professional",
    },
    {
      period: "2024",
      title: "Journey of Frontend Web Development",
      company: "Hablu Programmer",
      description:
        "Strong foundations in HTML, CSS, JavaScript, responsive design, modern UI practices, component-based development, and hands-on frontend projects demonstrating practical skills.",
      current: false,
      type: "professional",
    },
  ];

  const TimelineItem = ({ item, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <span
        className={`absolute -left-[42px] top-6 h-5 w-5 rounded-full border-4 border-white dark:border-background-dark shadow-sm ${
          item.current
            ? "bg-primary"
            : item.type === "academic"
            ? "bg-green-500 dark:bg-green-400 group-hover:bg-primary"
            : "bg-blue-500 dark:bg-blue-400 group-hover:bg-primary"
        } transition-colors`}
      ></span>

      <motion.div
        className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-xs font-bold tracking-wider uppercase block ${
              item.current
                ? "text-primary"
                : "text-gray-500 dark:text-gray-400 group-hover:text-primary"
            } transition-colors`}
          >
            {item.period}
          </span>
          {item.type && (
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                item.type === "academic"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
              }`}
            >
              {item.type === "academic" ? "Academic" : "Professional"}
            </span>
          )}
        </div>

        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {item.title}
        </h4>

        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
          {item.company}
        </p>

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );

  return (
    <section
      ref={elementRef}
      className="py-24 bg-background-light dark:bg-background-dark relative scroll-mt-20"
      id="experience"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-primary"></span> Career
            Path
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience & <span className="text-primary">Education</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            My professional journey and academic background that shaped my
            skills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Professional Experience */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <i className="fas fa-briefcase"></i>
              </span>
              Development Experience & Projects
            </h3>

            <div className="space-y-8 relative border-l-2 border-gray-200 dark:border-gray-800 ml-5 pl-8 pb-2">
              {experiences.map((experience, index) => (
                <TimelineItem key={index} item={experience} index={index} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <i className="fas fa-graduation-cap"></i>
              </span>
              Education & Training
            </h3>

            <div className="space-y-8 relative border-l-2 border-gray-200 dark:border-gray-800 ml-5 pl-8 pb-2">
              {education.map((edu, index) => (
                <TimelineItem key={index} item={edu} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
