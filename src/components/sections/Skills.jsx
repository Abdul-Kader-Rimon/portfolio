import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPAnimation } from "../../hooks/useAnimation";
import AnimatedSectionTitle from "../ui/AnimatedSectionTitle";
import SkillCard from "../ui/SkillCard";
import { skillsData, skillsByCategory } from "../../data/skillsData";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsGridRef = useRef(null);
  const skillCardsRef = useRef([]);

  // GSAP only for section entrance - NO SplitText
  const { elementRef } = useGSAPAnimation({
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  useEffect(() => {
    // GSAP ScrollTrigger animation for skill cards - eye-catching entrance
    const cards = skillCardsRef.current;
    let floatingTimelines = [];

    if (cards.length > 0) {
      // Set initial state for all cards - dramatic for wow effect
      gsap.set(cards, {
        opacity: 0,
        y: 60, // Clear upward movement
        scale: 0.9, // Noticeable scale change
      });

      // Create eye-catching entrance animation
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: skillsGridRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Animate cards with clear, visible stagger
      entranceTl.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8, // Strong but smooth timing
        ease: "expo.out", // Strong but smooth easing
        stagger: {
          amount: 0.8, // Clear stagger (0.15-0.25s per card)
          from: "start",
          ease: "power2.out",
        },
      });

      // Function to create column-wise infinite floating animation
      const createColumnFloating = () => {
        // Kill existing floating animations
        floatingTimelines.forEach((tl) => tl.kill());
        floatingTimelines = [];

        // Group cards by columns based on current grid layout
        const cardsPerRow =
          window.innerWidth >= 1280
            ? 4
            : window.innerWidth >= 1024
            ? 3
            : window.innerWidth >= 640
            ? 2
            : 1;

        const columns = [];
        for (let col = 0; col < cardsPerRow; col++) {
          const columnCards = [];
          for (let i = col; i < cards.length; i += cardsPerRow) {
            if (cards[i]) columnCards.push(cards[i]);
          }
          if (columnCards.length > 0) columns.push(columnCards);
        }

        // Create infinite floating animation for each column
        columns.forEach((columnCards, columnIndex) => {
          const floatingTl = gsap.timeline({ repeat: -1, yoyo: true });

          // Refined subtle column-wise floating parameters
          floatingTl.to(columnCards, {
            y: 8, // Subtle but visible vertical movement (±6-10px range)
            scale: 0.997 + columnIndex * 0.0015, // Subtle breathing effect (0.997-1.003)
            rotation: columnIndex % 2 === 0 ? 0.35 : -0.35, // Gentle rotation (±0.3-0.5deg)
            duration: 4.3 + columnIndex * 0.1, // Smooth timing per column (4.3-4.6s)
            ease: "power1.inOut", // Buttery smooth easing
            delay: columnIndex * 0.03, // Tiny stagger between columns (0.02-0.05s)
          });

          floatingTimelines.push(floatingTl);
        });
      };

      // Start column floating after entrance animation completes
      entranceTl.call(createColumnFloating);

      // Simple debounce function for resize handling
      let resizeTimeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createColumnFloating, 300);
      };
      window.addEventListener("resize", handleResize);

      // Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === skillsGridRef.current) {
            trigger.kill();
          }
        });
        // Kill all floating timelines
        floatingTimelines.forEach((tl) => tl.kill());
        gsap.killTweensOf(cards);
        // Clear resize timeout and remove event listener
        clearTimeout(resizeTimeout);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Function to add card refs
  const addToRefs = (el) => {
    if (el && !skillCardsRef.current.includes(el)) {
      skillCardsRef.current.push(el);
    }
  };

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

        {/* Skills Cards Grid */}
        <div className="max-w-6xl mx-auto" ref={skillsGridRef}>
          {/* All Skills in One Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skillsData.map((skill, index) => (
              <div key={skill.name} ref={addToRefs}>
                <SkillCard skill={skill} index={index} />
              </div>
            ))}
          </div>
        </div>

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

export default Skills;
