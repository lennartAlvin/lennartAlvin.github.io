import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { useState, useCallback, useMemo, useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
  color: string;
  icon?: string;
  experience?: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
  centerColor: string;
  orbitColor: string;
}

interface SolarSystemProps {
  category: SkillCategory;
  index: number;
  isPaused: boolean;
  isMobile: boolean;
}

function SolarSystem({ category, index, isPaused, isMobile }: SolarSystemProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const handleSkillHover = useCallback((skillName: string | null) => {
    if (!isMobile) { // Disable hover effects on mobile
      setHoveredSkill(skillName);
    }
  }, [isMobile]);

  const handleSkillTap = useCallback((skillName: string) => {
    if (isMobile) {
      setHoveredSkill(hoveredSkill === skillName ? null : skillName);
    }
  }, [isMobile, hoveredSkill]);

  // Responsive sizing based on screen size
  const getResponsiveSizing = useMemo(() => {
    if (isMobile) {
      return {
        containerSize: 280,
        baseRadius: 80,
        increment: 35,
        sunSize: 16, // w-16 h-16
        minPlanetSize: 28,
        maxPlanetSize: 40
      };
    }
    return {
      containerSize: 500,
      baseRadius: 140,
      increment: 50,
      sunSize: 24, // w-24 h-24
      minPlanetSize: 40,
      maxPlanetSize: 60
    };
  }, [isMobile]);

  const orbitRadii = useMemo(() => {
    const { baseRadius, increment } = getResponsiveSizing;
    return [0, 1, 2].map(i => baseRadius + i * increment);
  }, [getResponsiveSizing]);

  const planetSizes = useMemo(() => {
    const { minPlanetSize, maxPlanetSize } = getResponsiveSizing;
    return category.skills.map(skill => {
      return minPlanetSize + (skill.level / 100) * (maxPlanetSize - minPlanetSize);
    });
  }, [category.skills, getResponsiveSizing]);

  return (
    <motion.div
      className="relative flex items-center justify-center mx-auto"
      style={{ 
        minHeight: `${getResponsiveSizing.containerSize}px`, 
        minWidth: `${getResponsiveSizing.containerSize}px`,
        maxWidth: `${getResponsiveSizing.containerSize}px` 
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Orbit Lines - Static for better performance */}
      {orbitRadii.map((radius, orbitIndex) => (
        <div
          key={orbitIndex}
          className={`absolute border border-dashed ${category.orbitColor} rounded-full ${isMobile ? 'opacity-20' : 'opacity-30'}`}
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            willChange: 'transform',
          }}
        />
      ))}

      {/* Category Sun - CSS Animation */}
      <div
        className={`solar-sun-rotation absolute z-20 ${isMobile ? 'w-16 h-16' : 'w-24 h-24'} rounded-full ${category.centerColor} border-4 border-white/30 flex items-center justify-center touch-manipulation`}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
          willChange: 'transform',
          boxShadow: `0 0 ${isMobile ? '20px' : '30px'} ${getCategoryGlow(category.centerColor)}`,
          animationDuration: isMobile ? '30s' : '25s', // Slower on mobile
        }}
      >
        <span 
          className={`solar-sun-text-rotation text-white font-orbitron font-bold ${isMobile ? 'text-xs' : 'text-xs'} text-center leading-tight`}
          style={{ 
            animationPlayState: isPaused ? 'paused' : 'running',
            animationDuration: isMobile ? '30s' : '25s'
          }}
        >
          {category.title.split(' ').map((word, i) => (
            <div key={i}>{isMobile && word.length > 6 ? word.slice(0, 6) : word}</div>
          ))}
        </span>
      </div>

      {/* Skill Planets - Optimized */}
      {category.skills.map((skill, skillIndex) => {
        const orbitRadius = orbitRadii[skillIndex % 3];
        const planetSize = planetSizes[skillIndex];
        const orbitDuration = (isMobile ? 25 : 20) + skillIndex * (isMobile ? 8 : 5); // Slower on mobile

        return (
          <PlanetOrbit
            key={skill.name}
            skill={skill}
            orbitRadius={orbitRadius}
            planetSize={planetSize}
            orbitDuration={orbitDuration}
            isPaused={isPaused}
            hoveredSkill={hoveredSkill}
            onHover={handleSkillHover}
            onTap={handleSkillTap}
            isMobile={isMobile}
          />
        );
      })}
    </motion.div>
  );
}

const PlanetOrbit = ({ skill, orbitRadius, planetSize, orbitDuration, isPaused, hoveredSkill, onHover, onTap, isMobile }: {
  skill: Skill;
  orbitRadius: number;
  planetSize: number;
  orbitDuration: number;
  isPaused: boolean;
  hoveredSkill: string | null;
  onHover: (skill: string | null) => void;
  onTap: (skill: string) => void;
  isMobile: boolean;
}) => {
  const handleMouseEnter = useCallback(() => onHover(skill.name), [onHover, skill.name]);
  const handleMouseLeave = useCallback(() => onHover(null), [onHover]);
  const handleTouchStart = useCallback(() => onTap(skill.name), [onTap, skill.name]);

  // Get CSS class for orbit duration
  const getOrbitClass = (duration: number) => {
    if (duration <= 27) return 'solar-orbit-25s';
    if (duration <= 32) return 'solar-orbit-30s';
    if (duration <= 37) return 'solar-orbit-35s';
    if (duration <= 42) return 'solar-orbit-40s';
    if (duration <= 47) return 'solar-orbit-45s';
    return 'solar-orbit-50s';
  };

  const getCounterOrbitClass = (duration: number) => {
    if (duration <= 27) return 'solar-counter-orbit-25s';
    if (duration <= 32) return 'solar-counter-orbit-30s';
    if (duration <= 37) return 'solar-counter-orbit-35s';
    if (duration <= 42) return 'solar-counter-orbit-40s';
    if (duration <= 47) return 'solar-counter-orbit-45s';
    return 'solar-counter-orbit-50s';
  };

  return (
    <div
      className={`absolute z-10 ${getOrbitClass(orbitDuration)}`}
      style={{
        width: `${orbitRadius * 2}px`,
        height: `${orbitRadius * 2}px`,
        animationPlayState: isPaused ? 'paused' : 'running',
        willChange: 'transform',
      }}
    >
      <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${getCounterOrbitClass(orbitDuration)} touch-manipulation`}
        style={{
          width: `${planetSize + (isMobile ? 15 : 20)}px`,
          height: `${planetSize + (isMobile ? 20 : 30)}px`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
      >
        {/* Planet */}
        <div
          className={`solar-planet w-full ${isMobile ? 'h-3/4' : 'h-2/3'} ${skill.color} rounded-full border-3 border-white/40 flex items-center justify-center transition-all duration-300 ${!isMobile ? 'hover:scale-110' : ''}`}
          style={{
            boxShadow: `0 0 ${isMobile ? '10px' : '15px'} ${getSkillGlow(skill.color)}`,
            willChange: 'transform, box-shadow',
          }}
        >
          {skill.icon && (
            <span className={`text-white ${isMobile ? 'text-sm' : 'text-lg'} font-bold drop-shadow-lg`}>
              {skill.icon}
            </span>
          )}
        </div>
        
        {/* Skill Name Label */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <div className={`text-white font-rajdhani font-bold ${isMobile ? 'text-xs px-1 py-0.5' : 'text-xs px-2 py-1'} bg-black/60 rounded backdrop-blur-sm border border-white/20 max-w-20 truncate`}>
            {isMobile && skill.name.length > 8 ? skill.name.slice(0, 8) : skill.name}
          </div>
          <div className={`text-cyber-cyan ${isMobile ? 'text-xs' : 'text-xs'} font-bold mt-1`}>
            {skill.level}%
          </div>
        </div>
        
        {/* Optimized Tooltip */}
        {hoveredSkill === skill.name && (
          <motion.div
            className={`tooltip absolute ${isMobile ? 'top-full left-1/2 transform -translate-x-1/2 mt-2' : 'top-full left-1/2 transform -translate-x-1/2 mt-4'} p-3 rounded-xl bg-dark-card/95 border-2 border-cyber-cyan/50 backdrop-blur-lg min-w-max z-50 max-w-xs`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
            }}
          >
            <div className="text-center">
              <div className={`text-cyber-cyan font-orbitron font-bold ${isMobile ? 'text-sm' : 'text-lg'} mb-2`}>
                {skill.name}
              </div>
              <div className={`text-white/80 font-rajdhani ${isMobile ? 'text-xs' : 'text-sm'} mb-2`}>
                Proficiency: {skill.level}%
              </div>
              {skill.experience && (
                <div className={`text-cyber-cyan/80 font-rajdhani ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {skill.experience}
                </div>
              )}
              {isMobile && (
                <div className="text-white/60 font-rajdhani text-xs mt-2">
                  Tap to close
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const getCategoryGlow = (colorClass: string): string => {
  const glowMap: { [key: string]: string } = {
    'bg-gradient-to-br from-cyber-cyan to-cyber-blue': 'rgba(0, 240, 255, 0.6)',
    'bg-gradient-to-br from-cyber-purple to-cyber-magenta': 'rgba(161, 0, 255, 0.6)',
    'bg-gradient-to-br from-cyber-green to-cyber-cyan': 'rgba(0, 255, 128, 0.6)',
  };
  return glowMap[colorClass] || 'rgba(0, 240, 255, 0.6)';
};

const getSkillGlow = (colorClass: string): string => {
  const glowMap: { [key: string]: string } = {
    'bg-gradient-to-br from-cyber-cyan to-cyber-blue': 'rgba(0, 240, 255, 0.4)',
    'bg-gradient-to-br from-cyber-purple to-cyber-magenta': 'rgba(161, 0, 255, 0.4)',
    'bg-gradient-to-br from-cyber-green to-cyber-cyan': 'rgba(0, 255, 128, 0.4)',
  };
  return glowMap[colorClass] || 'rgba(0, 240, 255, 0.4)';
};

interface SkillsProps {
  isDark: boolean;
}

export default function Skills({ isDark }: SkillsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection with more comprehensive checks
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                              window.innerWidth < 768 ||
                              ('ontouchstart' in window) ||
                              (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
        setIsMobile(Boolean(isMobileDevice));
      }
    };
    
    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      centerColor: "bg-gradient-to-br from-cyber-cyan to-cyber-blue",
      orbitColor: "border-cyber-cyan/30",
      skills: [
        { name: "React", level: 90, color: "bg-gradient-to-br from-blue-500 to-blue-600", icon: "⚛️", experience: "3+ years" },
        { name: "TypeScript", level: 85, color: "bg-gradient-to-br from-blue-600 to-blue-700", icon: "📘", experience: "2+ years" },
        { name: "Next.js", level: 80, color: "bg-gradient-to-br from-gray-800 to-black", icon: "▲", experience: "1+ years" },
        { name: "Tailwind", level: 95, color: "bg-gradient-to-br from-teal-400 to-teal-500", icon: "🎨", experience: "2+ years" },
        { name: "HTML/CSS", level: 95, color: "bg-gradient-to-br from-orange-500 to-red-500", icon: "🌐", experience: "4+ years" },
        { name: "JavaScript", level: 90, color: "bg-gradient-to-br from-yellow-400 to-yellow-500", icon: "⚡", experience: "4+ years" },
      ]
    },
    {
      title: "Backend",
      centerColor: "bg-gradient-to-br from-cyber-purple to-cyber-magenta",
      orbitColor: "border-cyber-purple/30",
      skills: [
        { name: "C#", level: 90, color: "bg-gradient-to-br from-purple-600 to-purple-700", icon: "#️⃣", experience: "3+ years" },
        { name: ".NET", level: 85, color: "bg-gradient-to-br from-purple-500 to-indigo-600", icon: "🔷", experience: "3+ years" },
        { name: "Node.js", level: 75, color: "bg-gradient-to-br from-green-600 to-green-700", icon: "🟢", experience: "2+ years" },
        { name: "Python", level: 70, color: "bg-gradient-to-br from-blue-500 to-yellow-500", icon: "🐍", experience: "1+ years" },
        { name: "SQL Server", level: 80, color: "bg-gradient-to-br from-red-600 to-red-700", icon: "🗄️", experience: "2+ years" },
        { name: "MongoDB", level: 70, color: "bg-gradient-to-br from-green-500 to-green-600", icon: "🍃", experience: "1+ years" },
      ]
    },
    {
      title: "DevOps Tools",
      centerColor: "bg-gradient-to-br from-cyber-green to-cyber-cyan",
      orbitColor: "border-cyber-green/30",
      skills: [
        { name: "Azure", level: 75, color: "bg-gradient-to-br from-blue-500 to-blue-600", icon: "☁️", experience: "2+ years" },
        { name: "Docker", level: 70, color: "bg-gradient-to-br from-blue-400 to-blue-500", icon: "🐳", experience: "1+ years" },
        { name: "Git", level: 90, color: "bg-gradient-to-br from-orange-500 to-red-500", icon: "📚", experience: "3+ years" },
        { name: "DevOps", level: 65, color: "bg-gradient-to-br from-purple-500 to-pink-500", icon: "🔄", experience: "1+ years" },
        { name: "Testing", level: 80, color: "bg-gradient-to-br from-green-500 to-teal-500", icon: "🧪", experience: "2+ years" },
        { name: "CI/CD", level: 70, color: "bg-gradient-to-br from-indigo-500 to-purple-500", icon: "🚀", experience: "1+ years" },
      ]
    },
  ];

  return (
    <motion.section
      className={`py-12 sm:py-20 relative ${isMobile ? 'px-4' : 'max-w-7xl mx-auto px-4'}`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {/* Enhanced Background Elements */}
      <motion.div 
        className="absolute inset-0 cyber-grid opacity-5"
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px', '0px 0px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Section Header */}
      <motion.div 
        className="text-center mb-12 sm:mb-20"
        {...fadeInUp}
        transition={{ delay: 0.2 }}
      >
        <motion.h2 
          className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl md:text-6xl'} font-bold font-orbitron mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta`}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        >
          Technical Skills
        </motion.h2>
        <motion.p 
          className={`${isMobile ? 'text-base px-2' : 'text-lg md:text-xl'} text-white/70 font-rajdhani max-w-3xl mx-auto leading-relaxed`}
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          Explore my technical expertise through interactive solar systems. Each planet represents a skill, 
          orbiting around core technology categories. {isMobile ? 'Tap planets for details!' : 'Hover over planets for detailed information!'}
        </motion.p>
        
        {/* Mobile-friendly pause control */}
        <motion.button
          onClick={() => setIsPaused(!isPaused)}
          className={`mt-6 px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 text-cyber-cyan hover:from-cyber-cyan/30 hover:to-cyber-blue/30 border border-cyber-cyan/30 font-rajdhani font-medium transition-all duration-300 touch-manipulation ${isMobile ? 'text-sm' : 'text-base'}`}
          {...fadeInUp}
          transition={{ delay: 0.6 }}
          whileHover={!isMobile ? { scale: 1.05 } : {}}
          whileTap={{ scale: 0.95 }}
        >
          {isPaused ? 'Resume Orbits' : 'Pause Orbits'}
        </motion.button>
      </motion.div>

      {/* Solar Systems Grid - Responsive */}
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-8'} justify-items-center`}>
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            {...fadeInUp}
            transition={{ delay: 0.8 + index * 0.2 }}
            className="w-full flex justify-center"
          >
            <SolarSystem 
              category={category} 
              index={index} 
              isPaused={isPaused}
              isMobile={isMobile}
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile Performance Notice */}
      {isMobile && (
        <motion.div
          className="mt-8 text-center"
          {...fadeInUp}
          transition={{ delay: 1.4 }}
        >
          <p className="text-xs text-white/50 font-rajdhani">
            Animations optimized for mobile performance
          </p>
        </motion.div>
      )}
    </motion.section>
  );
}
