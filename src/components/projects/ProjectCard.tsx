import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket } from 'react-icons/fa';
import { ProjectCardProps } from '@/types/project';
import { useMobile } from '@/hooks/useMobile';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';

export const ProjectCard = ({ project, isDark, onOpen, index }: ProjectCardProps) => {
  const { title, description, technologies, githubUrl, impact, liveUrl, year, category } = project;
  const { isMobile } = useMobile();
  const { getHoverProps } = useOptimizedAnimations();
  const { elementRef, isVisible } = useIntersectionObserver();

  const cardClasses = `
    cursor-pointer group relative overflow-hidden rounded-2xl backdrop-blur-lg 
    transition-all duration-500 touch-manipulation
    ${isDark 
      ? 'bg-gradient-to-br from-dark-card/90 via-dark-surface/70 to-dark-card/90 border border-cyber-cyan/20' 
      : 'bg-gradient-to-br from-white/90 via-gray-50/80 to-white/90 border border-cyber-cyan/30'
    }
    ${!isMobile ? 'hover:scale-105 neon-glow-hover' : ''}
    ${isMobile ? 'min-h-[280px]' : ''}
  `.replace(/\s+/g, ' ').trim();

  const truncateText = (text: string, maxLength: number) => 
    isMobile && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <motion.div
      ref={elementRef}
      onClick={onOpen}
      className={cardClasses}
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
        <ProjectHeader 
          title={title}
          year={year}
          category={category}
          isMobile={isMobile}
        />

        <ProjectDescription 
          description={truncateText(description, 120)}
          impact={impact ? truncateText(impact, 60) : undefined}
          isDark={isDark}
          isMobile={isMobile}
        />

        <ProjectTechnologies 
          technologies={technologies}
          isMobile={isMobile}
        />

        <ProjectActions 
          githubUrl={githubUrl}
          liveUrl={liveUrl}
          isMobile={isMobile}
        />
      </div>

      {!isMobile && <ProjectBackgroundEffects />}
    </motion.div>
  );
};

const ProjectHeader = ({ title, year, category, isMobile }: {
  title: string;
  year: string;
  category: string;
  isMobile: boolean;
}) => (
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
        <span className={`text-cyber-green font-rajdhani font-medium ${
          isMobile ? 'text-xs' : 'text-sm'
        }`}>
          {year}
        </span>
      </div>
    </div>
    <Badge variant="category" size={isMobile ? 'sm' : 'md'}>
      {category}
    </Badge>
  </div>
);

const ProjectDescription = ({ description, impact, isDark, isMobile }: {
  description: string;
  impact?: string;
  isDark: boolean;
  isMobile: boolean;
}) => (
  <>
    <p className={`mb-4 leading-relaxed font-rajdhani ${
      isDark ? 'text-white/80' : 'text-gray-700'
    } ${isMobile ? 'text-sm mb-3' : 'text-base mb-6'}`}>
      {description}
    </p>

    {impact && (
      <div className={`flex items-center space-x-2 rounded-lg bg-cyber-green/10 border border-cyber-green/20 ${
        isMobile ? 'mb-3 p-2' : 'mb-6 p-3'
      }`}>
        <FaRocket className={`text-cyber-green ${isMobile ? 'text-xs flex-shrink-0' : 'text-sm'}`} />
        <p className={`text-cyber-green font-medium font-rajdhani ${
          isMobile ? 'text-xs' : 'text-sm'
        }`}>
          {impact}
        </p>
      </div>
    )}
  </>
);

const ProjectTechnologies = ({ technologies, isMobile }: {
  technologies: string[];
  isMobile: boolean;
}) => {
  const displayTechnologies = isMobile ? technologies.slice(0, 4) : technologies;
  const remainingCount = technologies.length - 4;

  return (
    <div className={`flex flex-wrap gap-2 ${isMobile ? 'mb-4' : 'mb-6'}`}>
      {displayTechnologies.map((tech) => (
        <Badge key={tech} variant="tech" size={isMobile ? 'sm' : 'md'}>
          {tech}
        </Badge>
      ))}
      {isMobile && remainingCount > 0 && (
        <Badge variant="info" size="sm">
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
};

const ProjectActions = ({ githubUrl, liveUrl, isMobile }: {
  githubUrl: string;
  liveUrl?: string;
  isMobile: boolean;
}) => (
  <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-4'}`}>
    <Button
      variant="primary"
      size={isMobile ? 'sm' : 'md'}
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      icon={<FaGithub />}
      fullWidth={isMobile}
      onClick={(e) => e.stopPropagation()}
    >
      View Code
    </Button>
    
    {liveUrl && (
      <Button
        variant="secondary"
        size={isMobile ? 'sm' : 'md'}
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        icon={<FaExternalLinkAlt />}
        fullWidth={isMobile}
        onClick={(e) => e.stopPropagation()}
      >
        Live Demo
      </Button>
    )}
  </div>
);

const ProjectBackgroundEffects = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 via-transparent to-cyber-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  </>
); 