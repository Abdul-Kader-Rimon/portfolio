import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGSAPAnimation } from "../../hooks/useAnimation";
import AnimatedSectionTitle from "../ui/AnimatedSectionTitle";
import AnimatedProjectCard from "../ui/AnimatedProjectCard";
import AnimatedButton from "../ui/AnimatedButton";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const { elementRef } = useGSAPAnimation({
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  // Placeholder projects data (will be replaced with API call)
  const placeholderProjects = [
    {
      _id: "1",
      title: "E-Learn Platform",
      description:
        "A full-stack online learning platform connecting instructors and learners. Explore, enroll, and manage courses with a responsive and interactive UI.",
      technologies: [
        "React",
        "Node.js",
        "Vite",
        "MongoDB",
        "Tailwind CSS",
        "DaisyUI",
        "Framer Motion",
        "Firebase",
        "Axios",
        "React Router",
      ],
      imageUrl:
        "https://i.ibb.co.com/S4B3k8YT/Screenshot-2026-01-13-112004.png",
      liveUrl: "https://e-learn-akr.netlify.app/",
      githubUrl: "https://github.com/Abdul-Kader-Rimon/e-learn",
      featured: true,
    },

    {
      _id: "2",
      title: "BloodCare",
      description:
        "A user-friendly MERN stack Blood Donation platform connecting donors, volunteers, and admins for seamless donation management.",
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Vite",
        "Express.js",
        "MongoDB",
        "Firebase Authentication",
        "Stripe",
      ],
      imageUrl:
        "https://i.ibb.co.com/0VskvYjR/Screenshot-2026-01-13-112851.png",
      liveUrl: "https://bloodcare-akr.netlify.app/",
      githubUrl: "https://github.com/Abdul-Kader-Rimon/assignment11",
      featured: true,
    },
    {
      _id: "3",
      title: "GAMEHUB",
      description:
        "A dynamic platform connecting gamers with indie game developers. Users can explore, interact, and access a curated game library through a responsive and immersive UI.",
      technologies: [
        "React",
        "React Router",
        "Vite",
        "React Spinners",
        "Firebase",
        "Tailwind CSS",
        "DaisyUI",
      ],
      imageUrl: "https://i.ibb.co/d03srczw/Screenshot-2026-01-13-113322.png",
      liveUrl: "https://game-hub-19833.web.app/",
      githubUrl: "https://github.com/Abdul-Kader-Rimon/gamehub",
      featured: true,
    },
  ];

  useEffect(() => {
    // Simulate API call - will be replaced with actual API
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const response = await api.get('/projects')
        // setProjects(response.data)

        // Simulate loading delay
        setTimeout(() => {
          setProjects(placeholderProjects);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(placeholderProjects);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section
        className="py-24 bg-white dark:bg-surface-dark relative scroll-mt-20"
        id="projects"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={elementRef}
      className="py-24 bg-white dark:bg-surface-dark relative scroll-mt-20"
      id="projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSectionTitle
          badge="Portfolio"
          title='Featured <span class="text-primary">Projects</span>'
          subtitle="A selection of projects that demonstrate my technical skills and problem-solving abilities."
          animationType="typewriter"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedProjectCard
              key={project._id}
              project={project}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <AnimatedButton
            href="#"
            variant="secondary"
            size="lg"
            animationType="magnetic"
            icon="fas fa-arrow-right"
          >
            View All Projects
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default Projects;
