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
  isMobile: boolean;
}

function ProjectCard({ project, isDark, onOpen, index, isMobile }: ProjectCardProps) {
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
      { threshold: isMobile ? 0.1 : 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isMobile]);

  return (
    <motion.div
      ref={cardRef}
      onClick={onOpen}
      className={`cursor-pointer group relative overflow-hidden rounded-2xl backdrop-blur-lg transition-all duration-500 touch-manipulation ${
        isDark 
          ? 'bg-gradient-to-br from-dark-card/90 via-dark-surface/70 to-dark-card/90 border border-cyber-cyan/20' 
          : 'bg-gradient-to-br from-white/90 via-gray-50/80 to-white/90 border border-cyber-cyan/30'
      } ${!isMobile ? 'hover:scale-105 neon-glow-hover' : ''} ${
        isMobile ? 'min-h-[280px]' : ''
      }`}
      initial={{ y: 50, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ 
        duration: isMobile ? 0.4 : 0.6,
        delay: index * (isMobile ? 0.1 : 0.15),
        type: "spring",
        stiffness: 100
      }}
      whileHover={!isMobile ? {
        boxShadow: isDark
          ? '0 0 30px rgba(0,240,255,0.3), 0 0 60px rgba(161,0,255,0.2)'
          : '0 0 30px rgba(0,240,255,0.4), 0 0 60px rgba(161,0,255,0.3)',
      } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`absolute inset-0 cyber-grid ${isMobile ? 'opacity-5' : 'opacity-10 group-hover:opacity-20'} transition-opacity duration-500`} />
      
      <div className={`relative z-10 ${isMobile ? 'p-6' : 'p-8'}`}>
        <div className="flex justify-between items-start mb-4">
          <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
            <div className={`rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center ${
              isMobile ? 'w-10 h-10' : 'w-12 h-12'
            }`}>
              <FaCode className={`text-white ${isMobile ? 'text-sm' : 'text-lg'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta ${
                isMobile ? 'text-lg' : 'text-2xl'
              }`}>
                {title}
              </h3>
              {year && (
                <span className={`text-cyber-green font-rajdhani font-medium ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  {year}
                </span>
              )}
            </div>
          </div>
          {category && (
            <span className={`px-2 py-1 rounded-full bg-cyber-magenta/20 text-cyber-magenta border border-cyber-magenta/30 font-rajdhani font-medium whitespace-nowrap ${
              isMobile ? 'text-xs px-2 py-0.5' : 'text-xs px-3 py-1'
            }`}>
              {category}
            </span>
          )}
        </div>

        <p className={`mb-4 leading-relaxed font-rajdhani ${
          isDark ? 'text-white/80' : 'text-gray-700'
        } ${isMobile ? 'text-sm mb-3' : 'text-base mb-6'}`}>
          {isMobile && description.length > 120 ? `${description.slice(0, 120)}...` : description}
        </p>

        {impact && (
          <div className={`flex items-center space-x-2 rounded-lg bg-cyber-green/10 border border-cyber-green/20 ${
            isMobile ? 'mb-3 p-2' : 'mb-6 p-3'
          }`}>
            <FaRocket className={`text-cyber-green ${isMobile ? 'text-xs flex-shrink-0' : 'text-sm'}`} />
            <p className={`text-cyber-green font-medium font-rajdhani ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              {isMobile && impact.length > 60 ? `${impact.slice(0, 60)}...` : impact}
            </p>
          </div>
        )}

        <div className={`flex flex-wrap gap-2 ${isMobile ? 'mb-4' : 'mb-6'}`}>
          {technologies.slice(0, isMobile ? 4 : technologies.length).map((tech) => (
            <span
              key={tech}
              className={`rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 text-cyber-cyan border border-cyber-cyan/30 font-rajdhani font-medium hover:from-cyber-cyan/30 hover:to-cyber-purple/30 transition-all duration-300 ${
                isMobile ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
              }`}
            >
              {tech}
            </span>
          ))}
          {isMobile && technologies.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/60 font-rajdhani">
              +{technologies.length - 4} more
            </span>
          )}
        </div>

        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-4'}`}>
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 text-cyber-cyan hover:from-cyber-cyan/30 hover:to-cyber-blue/30 border border-cyber-cyan/30 font-rajdhani font-medium transition-all duration-300 touch-manipulation ${
              isMobile ? 'py-2 px-4 text-sm w-full' : 'px-4 py-2'
            }`}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
            <span>View Code</span>
          </motion.a>
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-magenta/20 to-cyber-pink/20 text-cyber-magenta hover:from-cyber-magenta/30 hover:to-cyber-pink/30 border border-cyber-magenta/30 font-rajdhani font-medium transition-all duration-300 touch-manipulation ${
                isMobile ? 'py-2 px-4 text-sm w-full' : 'px-4 py-2'
              }`}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
              <span>Live Demo</span>
            </motion.a>
          )}
        </div>
      </div>

      {!isMobile && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 via-transparent to-cyber-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </>
      )}
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
    liveUrl: '', //TODO: Add live url
    impact: 'Demonstrates advanced frontend skills with 95+ performance score',
    year: '2024',
    category: 'Frontend',
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management, secure payment processing, and admin dashboard. Features advanced search, filtering, and recommendation algorithms.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Redux'],
    githubUrl: 'https://github.com/lennartAlvin/ecommerce-platform',
    liveUrl: '', //TODO: Add live url
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                              window.innerWidth < 768 ||
                              ('ontouchstart' in window);
        setIsMobile(Boolean(isMobileDevice));
      }
    };
    
    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  return (
    <motion.section
      className={`relative ${isMobile ? 'py-12 px-4' : 'py-20 max-w-7xl mx-auto px-4'}`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {/* Enhanced Background Elements - Simplified on mobile */}
      <motion.div 
        className={`absolute inset-0 cyber-grid ${isMobile ? 'opacity-3' : 'opacity-5'}`}
        animate={!isMobile ? {
          backgroundPosition: ['0px 0px', '50px 50px', '0px 0px'],
        } : {}}
        transition={!isMobile ? {
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        } : {}}
      />

      {/* Floating Orbs - Reduced on mobile */}
      <motion.div
        className={`absolute ${isMobile ? 'top-5 left-5 w-16 h-16' : 'top-10 left-10 w-32 h-32'} bg-gradient-to-r from-cyber-purple/10 to-cyber-magenta/10 rounded-full blur-xl`}
        animate={!isMobile ? {
          y: [-15, 15, -15],
          x: [-8, 8, -8],
          scale: [1, 1.2, 1],
        } : { scale: [1, 1.1, 1] }}
        transition={{
          duration: isMobile ? 4 : 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div 
          className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}
          variants={fadeInUp}
        >
          <motion.h2 
            className={`font-bold font-orbitron mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple via-cyber-magenta to-cyber-pink ${
              isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl lg:text-6xl'
            }`}
            animate={!isMobile ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={!isMobile ? {
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            } : {}}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className={`h-1 bg-gradient-to-r from-cyber-purple to-cyber-pink mx-auto rounded-full ${
              isMobile ? 'w-16' : 'w-24'
            }`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p 
            className={`mt-6 text-white/70 font-rajdhani max-w-3xl mx-auto leading-relaxed ${
              isMobile ? 'text-sm px-2' : 'text-lg'
            }`}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            A showcase of my recent work spanning full-stack development, AI integration, 
            and modern web technologies. Each project represents a unique challenge and 
            innovative solution. {isMobile ? 'Tap to explore!' : 'Click to explore details!'}
          </motion.p>
        </motion.div>

        {/* Projects Grid - Responsive */}
        <motion.div 
          className={`grid gap-6 ${
            isMobile 
              ? 'grid-cols-1' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
          variants={staggerContainer}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              isDark={isDark}
              onOpen={() => setSelectedProject(project)}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        {/* CTA Section - Mobile optimized */}
        <motion.div 
          className={`text-center ${isMobile ? 'mt-12' : 'mt-16'}`}
          variants={fadeInUp}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className={`rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/70 via-dark-surface/50 to-dark-card/70 border border-cyber-purple/20 overflow-hidden ${
              isMobile ? 'p-6 mx-2' : 'p-8 max-w-4xl mx-auto'
            }`}
            whileHover={!isMobile ? {
              borderColor: 'rgba(161, 0, 255, 0.4)',
              boxShadow: '0 0 30px rgba(161, 0, 255, 0.2)'
            } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 cyber-grid opacity-5" />
            <div className="relative z-10">
              <motion.h3 
                className={`font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-magenta ${
                  isMobile ? 'text-xl' : 'text-2xl'
                }`}
                animate={!isMobile ? {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                } : {}}
                transition={!isMobile ? {
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                } : {}}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Want to see more?
              </motion.h3>
              <motion.p 
                className={`mb-6 text-white/80 font-rajdhani ${
                  isMobile ? 'text-sm' : 'text-lg'
                }`}
                whileHover={!isMobile ? { color: 'rgba(255, 255, 255, 0.95)' } : {}}
              >
                These projects represent just a glimpse of my work. I'm always exploring new 
                technologies and building innovative solutions. Let's discuss your next project!
              </motion.p>
              
              <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6'}`}>
                <motion.a
                  href="https://github.com/lennartAlvin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-purple/20 to-cyber-magenta/20 text-cyber-purple hover:from-cyber-purple/30 hover:to-cyber-magenta/30 border border-cyber-purple/30 font-rajdhani font-bold transition-all duration-300 touch-manipulation ${
                    isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'
                  }`}
                  whileHover={!isMobile ? { 
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(161, 0, 255, 0.3)'
                  } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                  <span>View All Projects</span>
                </motion.a>
                
                <motion.a
                  href="#contact"
                  className={`inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-rajdhani font-bold transition-all duration-300 touch-manipulation ${
                    isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'
                  }`}
                  whileHover={!isMobile ? { 
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(0, 240, 255, 0.3)'
                  } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start a Project</span>
                  <motion.span
                    animate={!isMobile ? { x: [0, 5, 0] } : {}}
                    transition={!isMobile ? { duration: 1.5, repeat: Infinity } : {}}
                  >
                    →
                  </motion.span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        >
          <div className={`max-w-4xl mx-auto ${isMobile ? 'p-4' : 'p-8'}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className={`font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta ${
                    isMobile ? 'text-2xl' : 'text-3xl'
                  }`}>
                    {selectedProject.title}
                  </h2>
                  {selectedProject.year && (
                    <span className={`text-cyber-green font-rajdhani font-medium ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}>
                      {selectedProject.year}
                    </span>
                  )}
                </div>
                {selectedProject.category && (
                  <span className={`px-3 py-1 rounded-full bg-cyber-magenta/20 text-cyber-magenta border border-cyber-magenta/30 font-rajdhani font-medium ${
                    isMobile ? 'text-xs' : 'text-sm'
                  }`}>
                    {selectedProject.category}
                  </span>
                )}
              </div>

              <p className={`text-white/80 font-rajdhani leading-relaxed ${
                isMobile ? 'text-sm' : 'text-lg'
              }`}>
                {selectedProject.description}
              </p>

              {selectedProject.impact && (
                <div className={`flex items-center space-x-2 p-4 rounded-lg bg-cyber-green/10 border border-cyber-green/20 ${
                  isMobile ? 'p-3' : 'p-4'
                }`}>
                  <FaRocket className={`text-cyber-green ${isMobile ? 'text-sm' : 'text-base'}`} />
                  <p className={`text-cyber-green font-medium font-rajdhani ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}>
                    {selectedProject.impact}
                  </p>
                </div>
              )}

              <div>
                <h3 className={`font-bold font-orbitron text-cyber-cyan mb-3 ${
                  isMobile ? 'text-lg' : 'text-xl'
                }`}>
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 text-cyber-cyan border border-cyber-cyan/30 font-rajdhani font-medium ${
                        isMobile ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'space-x-4'} pt-4`}>
                <motion.a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 text-cyber-cyan hover:from-cyber-cyan/30 hover:to-cyber-blue/30 border border-cyber-cyan/30 font-rajdhani font-bold transition-all duration-300 touch-manipulation ${
                    isMobile ? 'px-6 py-3 text-base w-full' : 'px-8 py-4 text-lg'
                  }`}
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                  <span>View Source Code</span>
                </motion.a>
                {selectedProject.liveUrl && (
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-magenta/20 to-cyber-pink/20 text-cyber-magenta hover:from-cyber-magenta/30 hover:to-cyber-pink/30 border border-cyber-magenta/30 font-rajdhani font-bold transition-all duration-300 touch-manipulation ${
                      isMobile ? 'px-6 py-3 text-base w-full' : 'px-8 py-4 text-lg'
                    }`}
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </Modal>
      )}
    </motion.section>
  );
}
