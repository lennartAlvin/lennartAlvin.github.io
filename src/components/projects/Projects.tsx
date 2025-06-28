import { motion } from 'framer-motion';
import { useState } from 'react';
import { ProjectsProps, Project } from '@/types/project';
import { projects } from '@/data/projects';
import { useMobile } from '@/hooks/useMobile';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ProjectCard } from './ProjectCard';
import Modal from '../Modal';

export const Projects = ({ isDark }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isMobile } = useMobile();
  const { staggerContainer, fadeInUp, floatingOrb, getOptimizedClasses } = useOptimizedAnimations();

  const sectionSubtitle = `
    A showcase of my recent work spanning full-stack development, AI integration, 
    and modern web technologies. Each project represents a unique challenge and 
    innovative solution. ${isMobile ? 'Tap to explore!' : 'Click to explore details!'}
  `.trim();

  return (
    <motion.section
      className={getOptimizedClasses(`relative ${isMobile ? 'py-12 px-4' : 'py-20 max-w-7xl mx-auto px-4'}`)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <ProjectsBackground isMobile={isMobile} />

      <div className="relative z-10">
        <SectionHeader
          title="Featured Projects"
          subtitle={sectionSubtitle}
        />

        <ProjectsGrid 
          projects={projects}
          isDark={isDark}
          onProjectSelect={setSelectedProject}
        />

        <ProjectsCTA isDark={isDark} isMobile={isMobile} />
      </div>

      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        >
          <ProjectModalContent project={selectedProject} />
        </Modal>
      )}
    </motion.section>
  );
};

const ProjectsBackground = ({ isMobile }: { isMobile: boolean }) => (
  <>
    {/* Cyber Grid Background */}
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

    {/* Floating Orb */}
    <motion.div
      className={`absolute ${isMobile ? 'top-5 left-5 w-16 h-16' : 'top-10 left-10 w-32 h-32'} bg-gradient-to-r from-cyber-purple/10 to-cyber-magenta/10 rounded-full blur-xl`}
      {...(isMobile ? { animate: { scale: [1, 1.1, 1] } } : {})}
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
  </>
);

const ProjectsGrid = ({ 
  projects, 
  isDark, 
  onProjectSelect 
}: {
  projects: Project[];
  isDark: boolean;
  onProjectSelect: (project: Project) => void;
}) => {
  const { isMobile } = useMobile();
  const { staggerContainer } = useOptimizedAnimations();

  return (
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
          key={project.id}
          project={project}
          isDark={isDark}
          onOpen={() => onProjectSelect(project)}
          index={index}
        />
      ))}
    </motion.div>
  );
};

const ProjectsCTA = ({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) => {
  const { fadeInUp } = useOptimizedAnimations();

  return (
    <motion.div 
      className={`text-center ${isMobile ? 'mt-12' : 'mt-16'}`}
      {...fadeInUp}
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
            className={`text-white/70 font-rajdhani mb-6 ${
              isMobile ? 'text-sm' : 'text-base'
            }`}
          >
            These are just highlights from my portfolio. I have many more projects 
            showcasing different technologies and creative solutions.
          </motion.p>
          <motion.a
            href="https://github.com/lennartAlvin"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-purple/20 to-cyber-magenta/20 text-cyber-purple hover:from-cyber-purple/30 hover:to-cyber-magenta/30 border border-cyber-purple/30 font-rajdhani font-medium transition-all duration-300 touch-manipulation ${
              isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'
            }`}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Projects</span>
            <span>→</span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectModalContent = ({ project }: { project: Project }) => {
  const { isMobile } = useMobile();
  
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className={`font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta ${
            isMobile ? 'text-2xl' : 'text-3xl'
          }`}>
            {project.title}
          </h3>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-cyber-green font-rajdhani font-medium">{project.year}</span>
            <span className="text-cyber-magenta font-rajdhani">{project.category}</span>
          </div>
        </div>
      </div>

      <p className="text-white/80 font-rajdhani text-lg leading-relaxed">
        {project.description}
      </p>

      {project.impact && (
        <div className="flex items-center space-x-3 p-4 rounded-lg bg-cyber-green/10 border border-cyber-green/20">
          <span className="text-cyber-green text-xl">🚀</span>
          <p className="text-cyber-green font-medium font-rajdhani">
            {project.impact}
          </p>
        </div>
      )}

      <div>
        <h4 className="font-semibold font-orbitron text-cyber-cyan mb-3">Technologies Used</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 text-cyber-cyan border border-cyber-cyan/30 font-rajdhani font-medium text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-4 pt-4">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 text-cyber-cyan hover:from-cyber-cyan/30 hover:to-cyber-blue/30 border border-cyber-cyan/30 font-rajdhani font-medium transition-all duration-300"
        >
          <span>View Code</span>
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyber-magenta/20 to-cyber-pink/20 text-cyber-magenta hover:from-cyber-magenta/30 hover:to-cyber-pink/30 border border-cyber-magenta/30 font-rajdhani font-medium transition-all duration-300"
          >
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default Projects; 