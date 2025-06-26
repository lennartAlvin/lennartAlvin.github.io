import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import Modal from './Modal';

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  impact?: string;
  liveUrl?: string;
  year?: string;
  category?: string;
}

interface ProjectCardProps {
  project: Project;
  isDark: boolean;
  onOpen: () => void;
  index: number;
}

function ProjectCard({ project, isDark, onOpen, index }: ProjectCardProps) {
  const { title, description, technologies, githubUrl, impact, liveUrl, year, category } = project;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onClick={onOpen}
      className={`masonry-item cursor-pointer group relative overflow-hidden rounded-2xl backdrop-blur-lg ${
        isDark 
          ? 'bg-gradient-to-br from-dark-card/90 via-dark-surface/70 to-dark-card/90 border border-cyber-cyan/20' 
          : 'bg-gradient-to-br from-white/90 via-gray-50/80 to-white/90 border border-cyber-cyan/30'
      } transition-all duration-500 hover:scale-105 neon-glow-hover`}
      initial={{ y: 50, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        boxShadow: isDark
          ? '0 0 30px rgba(0,240,255,0.3), 0 0 60px rgba(161,0,255,0.2)'
          : '0 0 30px rgba(0,240,255,0.4), 0 0 60px rgba(161,0,255,0.3)',
      }}
    >
      <div className="absolute inset-0 cyber-grid opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
      
      <div className="relative p-8 z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center">
              <FaCode className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta">
                {title}
              </h3>
              {year && (
                <span className="text-sm text-cyber-green font-rajdhani font-medium">
                  {year}
                </span>
              )}
            </div>
          </div>
          {category && (
            <span className="px-3 py-1 rounded-full text-xs bg-cyber-magenta/20 text-cyber-magenta border border-cyber-magenta/30 font-rajdhani font-medium">
              {category}
            </span>
          )}
        </div>

        <p className={`mb-6 leading-relaxed font-rajdhani ${
          isDark ? 'text-white/80' : 'text-gray-700'
        }`}>
          {description}
        </p>

        {impact && (
          <div className="mb-6 flex items-center space-x-2 p-3 rounded-lg bg-cyber-green/10 border border-cyber-green/20">
            <FaRocket className="text-cyber-green text-sm" />
            <p className="text-cyber-green font-medium font-rajdhani text-sm">
              {impact}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 text-cyber-cyan border border-cyber-cyan/30 font-rajdhani font-medium hover:from-cyber-cyan/30 hover:to-cyber-purple/30 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-4">
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 text-cyber-cyan hover:from-cyber-cyan/30 hover:to-cyber-blue/30 border border-cyber-cyan/30 font-rajdhani font-medium transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub className="w-4 h-4" />
            <span>Code</span>
          </motion.a>
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-magenta/20 to-cyber-pink/20 text-cyber-magenta hover:from-cyber-magenta/30 hover:to-cyber-pink/30 border border-cyber-magenta/30 font-rajdhani font-medium transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt className="w-4 h-4" />
              <span>Live</span>
            </motion.a>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 via-transparent to-cyber-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}

interface ProjectsProps {
  isDark: boolean;
}

const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description: 'A cutting-edge portfolio showcasing modern web development with futuristic design, advanced animations, and interactive elements. Built with Next.js and enhanced with custom cursor effects and particle backgrounds.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Canvas API'],
    githubUrl: 'https://github.com/lennartAlvin/Portfolio',
    liveUrl: 'https://danielspatzek.com',
    impact: 'Demonstrates advanced frontend skills with 95+ performance score',
    year: '2024',
    category: 'Frontend',
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management, secure payment processing, and admin dashboard. Features advanced search, filtering, and recommendation algorithms.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Redux'],
    githubUrl: 'https://github.com/lennartAlvin/ecommerce-platform',
    liveUrl: 'https://demo-ecommerce.com',
    impact: 'Handles 10k+ transactions monthly with 99.9% uptime',
    year: '2024',
    category: 'Full-Stack',
  },
  {
    title: 'AI Chat Application',
    description: 'Real-time chat application integrated with OpenAI GPT models. Features include voice recognition, file sharing, message encryption, and intelligent conversation summarization.',
    technologies: ['React', 'Socket.io', 'OpenAI API', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/lennartAlvin/ai-chat-app',
    impact: 'Serves 1000+ active users with advanced AI capabilities',
    year: '2024',
    category: 'AI/ML',
  },
  {
    title: 'Crypto Trading Dashboard',
    description: 'Advanced cryptocurrency trading dashboard with real-time price charts, portfolio tracking, and automated trading strategies. Features WebSocket connections for live market data.',
    technologies: ['Vue.js', 'Chart.js', 'WebSocket', 'Python', 'FastAPI'],
    githubUrl: 'https://github.com/lennartAlvin/crypto-dashboard',
    impact: 'Manages $50k+ in trading volume with automated strategies',
    year: '2023',
    category: 'FinTech',
  },
];

export default function Projects({ isDark }: ProjectsProps) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <motion.section
      className="py-20 relative"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="relative z-10">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-5xl font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-magenta mx-auto rounded-full" />
          <p className={`mt-6 text-lg font-rajdhani ${
            isDark ? 'text-white/70' : 'text-gray-600'
          }`}>
            Showcasing innovation through code and creativity
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={staggerContainer}
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              isDark={isDark} 
              onOpen={() => setActive(project)}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      <Modal isOpen={active !== null} onClose={() => setActive(null)}>
        {active && (
          <div className="max-w-2xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center">
                <FaCode className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-3xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta">
                  {active.title}
                </h3>
                {active.year && (
                  <span className="text-cyber-green font-rajdhani font-medium">
                    {active.year} • {active.category}
                  </span>
                )}
              </div>
            </div>
            
            <p className="mb-6 text-white/80 font-rajdhani leading-relaxed text-lg">
              {active.description}
            </p>
            
            {active.impact && (
              <div className="mb-6 p-4 rounded-lg bg-cyber-green/10 border border-cyber-green/30">
                <div className="flex items-center space-x-2 mb-2">
                  <FaRocket className="text-cyber-green" />
                  <span className="font-orbitron font-bold text-cyber-green">Impact</span>
                </div>
                <p className="text-cyber-green/90 font-rajdhani">{active.impact}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-8">
              {active.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-sm bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30 font-rajdhani font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex space-x-4">
              <motion.a
                href={active.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 text-cyber-cyan hover:from-cyber-cyan/30 hover:to-cyber-blue/30 border border-cyber-cyan/30 font-rajdhani font-medium transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="w-5 h-5" />
                <span>View Code</span>
              </motion.a>
              {active.liveUrl && (
                <motion.a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyber-magenta/20 to-cyber-pink/20 text-cyber-magenta hover:from-cyber-magenta/30 hover:to-cyber-pink/30 border border-cyber-magenta/30 font-rajdhani font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt className="w-5 h-5" />
                  <span>Live Demo</span>
                </motion.a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </motion.section>
  );
}
