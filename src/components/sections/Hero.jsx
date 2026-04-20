import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAPAnimation } from "../../hooks/useAnimation";
import AnimatedButton from "../ui/AnimatedButton";
import { FaReact, FaJs } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import profileImage from "../../assets/images/profile.jpg";

const Hero = () => {
  const heroRef = useRef(null);
  const { elementRef } = useGSAPAnimation({
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  useEffect(() => {
    // Hero text animation timeline
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      ".hero-text-1",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
      .fromTo(
        ".hero-text-2",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".hero-text-3",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".hero-buttons",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(
        ".hero-social",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

    // Image animation
    gsap.fromTo(
      ".hero-image",
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.8 }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const socialLinks = [
    {
      href: "https://www.facebook.com/abdul.kader.rimon.2025",
      icon: "fab fa-facebook-f",
      label: "Facebook",
    },
    {
      href: "https://github.com/Abdul-Kader-Rimon",
      icon: "fab fa-github",
      label: "GitHub",
    },
    { href: "#", icon: "fab fa-twitter", label: "Twitter" },
    {
      href: "https://www.linkedin.com/in/abdul-kader-rimon",
      icon: "fab fa-linkedin-in",
      label: "LinkedIn",
    },
  ];

  const skills = [
    {
      icon: FaJs,
      color: "text-yellow-500 hover:text-yellow-400",
      title: "JavaScript",
      bgColor: "hover:bg-yellow-50 dark:hover:bg-yellow-900/20",
    },
    {
      icon: SiTailwindcss,
      color: "text-cyan-500 hover:text-cyan-400",
      title: "Tailwind CSS",
      bgColor: "hover:bg-cyan-50 dark:hover:bg-cyan-900/20",
    },
    {
      icon: FaReact,
      color: "text-blue-500 hover:text-blue-400",
      title: "React",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
  ];

  return (
    <section
      ref={elementRef}
      className="relative pt-20 lg:pt-28 pb-16 lg:pb-0 min-h-screen flex items-center"
      id="home"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-6">
              <p className="hero-text-1 text-sm font-semibold tracking-widest text-primary uppercase opacity-0">
                Welcome to my world
              </p>

              <h1 className="hero-text-2 text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight opacity-0">
                Hi, I'm <span>Abdul Kader</span>
                <br />
                <span className="block mt-2">
                  a <span className="text-primary">Full Stack Developer.</span>
                </span>
              </h1>

              <p className="hero-text-3 text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed opacity-0">
                Building scalable web applications with modern technologies.
              </p>

              <div className="hero-buttons flex flex-wrap gap-4 pt-4 opacity-0">
                <AnimatedButton
                  href="/images/RESUME.pdf"
                  download="Abdul_Kader_Resume.pdf"
                  variant="primary"
                  size="lg"
                  animationType="glow"
                  icon="fas fa-download"
                >
                  Download Resume
                </AnimatedButton>

                <AnimatedButton
                  href="#projects"
                  variant="secondary"
                  size="lg"
                  animationType="magnetic"
                >
                  View Projects
                </AnimatedButton>

                <AnimatedButton
                  href="#contact"
                  variant="ghost"
                  size="lg"
                  animationType="ripple"
                >
                  Contact Me
                </AnimatedButton>
              </div>
            </div>

            <div className="hero-social grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 opacity-0">
              {/* Social Links */}
              <div>
                <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 font-semibold">
                  Find Me On
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target={social.href !== "#" ? "_blank" : undefined}
                      rel={
                        social.href !== "#" ? "noopener noreferrer" : undefined
                      }
                      className="w-12 h-12 rounded-lg bg-white dark:bg-surface-dark shadow-card border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300"
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <i className={`${social.icon} text-lg`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 font-semibold">
                  Best Skill On
                </p>
                <div className="flex gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className={`w-12 h-12 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center group cursor-default transition-all duration-300 ${skill.bgColor}`}
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={skill.title}
                    >
                      <skill.icon
                        className={`text-xl ${skill.color} group-hover:scale-110 transition-all duration-300`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10 h-full w-full lg:hidden"></div>
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/5] md:aspect-square lg:aspect-[3/4]">
              <div className="absolute bottom-0 w-full h-3/4 bg-surface-dark rounded-xl shadow-card lg:hidden"></div>
              <img
                alt="Portrait of Professional Developer"
                className="hero-image relative z-10 object-cover w-full h-full rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 mask-image-gradient opacity-0"
                src={profileImage}
              />

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute bottom-10 -left-6 z-20 bg-white dark:bg-surface-dark px-6 py-4 rounded-xl shadow-glow border border-gray-100 dark:border-gray-700 hidden md:flex items-center gap-4"
              >
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  2+
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Years of
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    Experience
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
