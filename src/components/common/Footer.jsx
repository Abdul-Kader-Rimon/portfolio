import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    {
      href: "https://github.com/Abdul-Kader-Rimon",
      icon: "fab fa-github",
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/abdul-kader-rimon",
      icon: "fab fa-linkedin-in",
      label: "LinkedIn",
    },
    { href: "#", icon: "fab fa-twitter", label: "Twitter" },
    {
      href: "https://www.facebook.com/abdul.kader.rimon.2025",
      icon: "fab fa-facebook-f",
      label: "Facebook",
    },
  ];

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="py-12 bg-background-light dark:bg-background-dark relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg dark:shadow-none border border-gray-200 dark:border-gray-800 p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <motion.div
              className="flex items-center justify-center md:justify-start gap-2 mb-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                R
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Ri<span className="text-primary">Mon</span>
              </span>
            </motion.div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 Abdul Kader. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-8">
            {navLinks.map((link, index) => (
              <motion.li key={link.href}>
                <motion.a
                  href={link.href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              </motion.li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <i className={social.icon}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
