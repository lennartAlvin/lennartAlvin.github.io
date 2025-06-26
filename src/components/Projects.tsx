import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { FaGithub } from 'react-icons/fa';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  isDark: boolean;
  impact?: string;
}

function ProjectCard({ title, description, technologies, githubUrl, isDark, impact }: ProjectCardProps) {
  return (
    <motion.div
      className={`p-8 rounded-xl ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-sm`}
      variants={{
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: isDark
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{description}</p>
      {impact && (
        <div className="mb-6 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <p className="text-green-600 dark:text-green-400 font-medium">{impact}</p>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
      <motion.a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaGithub className="w-5 h-5" />
        <span>View on GitHub</span>
      </motion.a>
    </motion.div>
  );
}

interface ProjectsProps {
  isDark: boolean;
}

export default function Projects({ isDark }: ProjectsProps) {
  return (
    <motion.section
      className="py-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-gray-900 dark:text-white"
        variants={fadeInUp}
      >
        Featured Projects
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={staggerContainer}
      >
        <ProjectCard
          title="Portfolio Website"
          description="A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features dark mode support, smooth animations, and a clean, professional design showcasing my full-stack development skills."
          technologies={['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']}
          githubUrl="https://github.com/lennartAlvin/Portfolio"
          isDark={isDark}
          impact="Personal project demonstrating modern web development practices"
        />
      </motion.div>
    </motion.section>
  );
}
