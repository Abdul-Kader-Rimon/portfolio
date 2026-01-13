import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedProjectCard = ({ project, index = 0, className = "" }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]));

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Card entrance animation with 3D effect
    gsap.fromTo(
      card,
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
        rotateX: 20,
        z: -100,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        z: 0,
        duration: 1,
        ease: "power3.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Image parallax effect
    gsap.to(imageRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, [index]);

  // Handle mouse move for 3D tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      ref={cardRef}
      className={`group rounded-2xl bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-500 flex flex-col relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileHover={{
        boxShadow: "0 25px 50px -12px rgba(0, 194, 255, 0.25)",
        borderColor: "rgba(0, 194, 255, 0.3)",
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[16/10]">
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/10 to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Project Image */}
        <motion.img
          ref={imageRef}
          alt={project.title}
          className="w-full h-full object-cover"
          src={project.imageUrl}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Floating Action Buttons */}
        <motion.div
          className="absolute top-4 right-4 flex gap-2 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.a
            href={project.liveUrl}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-external-link-alt text-sm"></i>
          </motion.a>
          <motion.a
            href={project.githubUrl}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-800 hover:text-white transition-colors shadow-lg"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fab fa-github text-sm"></i>
          </motion.a>
        </motion.div>
      </div>

      {/* Content */}
      <div
        className="p-6 flex flex-col flex-1"
        style={{ transform: "translateZ(50px)" }}
      >
        <motion.h3
          className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors"
          variants={childVariants}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1"
          variants={childVariants}
        >
          {project.description}
        </motion.p>

        {/* Technologies */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          variants={childVariants}
        >
          {project.technologies.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="px-3 py-1 rounded-md text-xs font-medium bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: techIndex * 0.1, duration: 0.3 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(0, 194, 255, 0.1)",
                borderColor: "rgba(0, 194, 255, 0.3)",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-800"
          variants={childVariants}
        >
          <motion.a
            href={project.liveUrl}
            className="flex-1 text-center py-2.5 bg-primary text-white rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 relative overflow-hidden"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            {/* Button shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">Live Demo</span>
          </motion.a>

          <motion.a
            href={project.githubUrl}
            className="flex-1 text-center py-2.5 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary rounded-lg text-sm font-semibold transition-colors"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <i className="fab fa-github mr-2"></i>Code
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default AnimatedProjectCard;
