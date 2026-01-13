// React Icons imports
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiVite,
} from "react-icons/si";

// Enhanced skills data with descriptions for card-based layout
export const skillsData = [
  // Frontend Skills
  {
    name: "HTML5",
    icon: FaHtml5,
    category: "Frontend",
    description: "Semantic markup & modern web standards",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  {
    name: "CSS3",
    icon: FaCss3Alt,
    category: "Frontend",
    description: "Advanced styling & responsive design",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    name: "JavaScript",
    icon: FaJs,
    category: "Frontend",
    description: "Modern ES6+ & asynchronous programming",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
  },
  {
    name: "React",
    icon: FaReact,
    category: "Frontend",
    description: "Component-based UI development",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
    borderColor: "border-cyan-200 dark:border-cyan-800",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    category: "Frontend",
    description: "Full-stack React framework",
    color: "text-gray-900 dark:text-white",
    bgColor: "bg-gray-50 dark:bg-gray-800/20",
    borderColor: "border-gray-200 dark:border-gray-700",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    category: "Frontend",
    description: "Utility-first CSS framework",
    color: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    borderColor: "border-teal-200 dark:border-teal-800",
  },

  // Backend Skills
  {
    name: "Node.js",
    icon: FaNodeJs,
    category: "Backend",
    description: "Server-side JavaScript runtime",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
  },
  {
    name: "Express.js",
    icon: SiExpress,
    category: "Backend",
    description: "Fast & minimalist web framework",
    color: "text-gray-700 dark:text-gray-300",
    bgColor: "bg-gray-50 dark:bg-gray-800/20",
    borderColor: "border-gray-200 dark:border-gray-700",
  },

  // Database Skills
  {
    name: "MongoDB",
    icon: SiMongodb,
    category: "Database",
    description: "NoSQL document database",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
  },

  // Tools
  {
    name: "Git",
    icon: FaGitAlt,
    category: "Tools",
    description: "Version control & collaboration",
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    category: "Tools",
    description: "Code hosting & project management",
    color: "text-gray-900 dark:text-white",
    bgColor: "bg-gray-50 dark:bg-gray-800/20",
    borderColor: "border-gray-200 dark:border-gray-700",
  },
  {
    name: "Vite",
    icon: SiVite,
    category: "Tools",
    description: "Fast build tool & dev server",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
];

// Group skills by category
export const skillsByCategory = skillsData.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {});

// Get skills by category
export const getSkillsByCategory = (category) => {
  return skillsData.filter((skill) => skill.category === category);
};

// Get all categories
export const getCategories = () => {
  return [...new Set(skillsData.map((skill) => skill.category))];
};
