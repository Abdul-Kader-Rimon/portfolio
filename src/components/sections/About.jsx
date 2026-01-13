import React from "react";
import { motion } from "framer-motion";
import { useGSAPAnimation } from "../../hooks/useAnimation";
import profileImage from "../../assets/images/profile.jpg";

const About = () => {
  // GSAP ONLY for section-level reveal animation
  const { elementRef } = useGSAPAnimation({
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  return (
    <section
      ref={elementRef}
      className="py-24 bg-white dark:bg-gray-900 relative scroll-mt-20"
      id="about"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            About Me
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Passionate Developer & Problem Solver
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm a dedicated Full Stack Developer with a passion for creating
              innovative web solutions that make a real impact. With expertise
              spanning both frontend and backend technologies. <br />
              <br /> I enjoy tackling complex challenges and turning ideas into
              reality. My approach combines technical excellence with
              user-centered design, ensuring that every project not only
              functions flawlessly but also delivers an exceptional user
              experience. I'm constantly learning and adapting to new
              technologies to stay at the forefront of web development.
              <br /> <br /> When I'm not coding, you'll find me exploring new
              technologies, contributing to open-source projects, or sharing
              knowledge with the developer community. I believe in continuous
              growth and the power of collaboration to build better software.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  2+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  20+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Projects Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  20+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Technologies
                </div>
              </div>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-70"></div>

            {/* Profile Image Container with Framer Motion subtle float */}
            <motion.div
              className="relative z-10 mx-auto max-w-md"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
                {/* Your Profile Image */}
                <div className="aspect-[4/5]">
                  <img
                    src={profileImage}
                    alt="Professional Developer Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Subtle overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-20"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-center gap-3"
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wide">
                    Available for
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    New Projects
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
