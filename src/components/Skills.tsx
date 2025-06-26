import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { useState, useCallback, useMemo } from 'react';

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
}

function SolarSystem({ category, index, isPaused }: SolarSystemProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const handleSkillHover = useCallback((skillName: string | null) => {
    setHoveredSkill(skillName);
  }, []);

  const orbitRadii = useMemo(() => {
    const baseRadius = 140;
    const increment = 50;
    return [0, 1, 2].map(i => baseRadius + i * increment);
  }, []);

  const planetSizes = useMemo(() => {
    return category.skills.map(skill => {
      const minSize = 40;
      const maxSize = 60;
      return minSize + (skill.level / 100) * (maxSize - minSize);
    });
  }, [category.skills]);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ minHeight: '500px', minWidth: '500px' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Orbit Lines - Static for better performance */}
      {orbitRadii.map((radius, orbitIndex) => (
        <div
          key={orbitIndex}
          className={`absolute border border-dashed ${category.orbitColor} rounded-full opacity-30`}
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            willChange: 'transform',
          }}
        />
      ))}

      {/* Category Sun - CSS Animation */}
      <div
        className={`solar-sun-rotation absolute z-20 w-24 h-24 rounded-full ${category.centerColor} border-4 border-white/30 flex items-center justify-center`}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
          willChange: 'transform',
          boxShadow: `0 0 30px ${getCategoryGlow(category.centerColor)}`,
        }}
      >
        <span 
          className="solar-sun-text-rotation text-white font-orbitron font-bold text-xs text-center leading-tight"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {category.title.split(' ').map((word, i) => (
            <div key={i}>{word}</div>
          ))}
        </span>
      </div>

      {/* Skill Planets - Optimized */}
      {category.skills.map((skill, skillIndex) => {
        const orbitRadius = orbitRadii[skillIndex % 3];
        const planetSize = planetSizes[skillIndex];
        const orbitDuration = 20 + skillIndex * 5;

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
          />
        );
      })}
    </motion.div>
  );
}

const PlanetOrbit = ({ skill, orbitRadius, planetSize, orbitDuration, isPaused, hoveredSkill, onHover }: {
  skill: Skill;
  orbitRadius: number;
  planetSize: number;
  orbitDuration: number;
  isPaused: boolean;
  hoveredSkill: string | null;
  onHover: (skill: string | null) => void;
}) => {
  const handleMouseEnter = useCallback(() => onHover(skill.name), [onHover, skill.name]);
  const handleMouseLeave = useCallback(() => onHover(null), [onHover]);

  // Get CSS class for orbit duration
  const getOrbitClass = (duration: number) => {
    if (duration <= 22) return 'solar-orbit-20s';
    if (duration <= 27) return 'solar-orbit-25s';
    if (duration <= 32) return 'solar-orbit-30s';
    if (duration <= 37) return 'solar-orbit-35s';
    if (duration <= 42) return 'solar-orbit-40s';
    return 'solar-orbit-45s';
  };

  const getCounterOrbitClass = (duration: number) => {
    if (duration <= 22) return 'solar-counter-orbit-20s';
    if (duration <= 27) return 'solar-counter-orbit-25s';
    if (duration <= 32) return 'solar-counter-orbit-30s';
    if (duration <= 37) return 'solar-counter-orbit-35s';
    if (duration <= 42) return 'solar-counter-orbit-40s';
    return 'solar-counter-orbit-45s';
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
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${getCounterOrbitClass(orbitDuration)}`}
        style={{
          width: `${planetSize + 20}px`,
          height: `${planetSize + 30}px`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Planet */}
        <div
          className={`solar-planet w-full h-2/3 ${skill.color} rounded-full border-3 border-white/40 flex items-center justify-center transition-all duration-300 hover:scale-110`}
          style={{
            boxShadow: `0 0 15px ${getSkillGlow(skill.color)}`,
            willChange: 'transform, box-shadow',
          }}
        >
          {skill.icon && (
            <span className="text-white text-lg font-bold drop-shadow-lg">
              {skill.icon}
            </span>
          )}
        </div>
        
        {/* Skill Name Label */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-white font-rajdhani font-bold text-xs bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-white/20">
            {skill.name}
          </div>
          <div className="text-cyber-cyan text-xs font-bold mt-1">
            {skill.level}%
          </div>
        </div>
        
        {/* Optimized Tooltip */}
        {hoveredSkill === skill.name && (
          <motion.div
            className="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-4 p-4 rounded-xl bg-dark-card/95 border-2 border-cyber-cyan/50 backdrop-blur-lg min-w-max z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
            }}
          >
            <div className="text-center">
              <div className="text-cyber-cyan font-orbitron font-bold text-lg mb-2">
                {skill.name}
              </div>
              <div className="flex items-center justify-center space-x-4 mb-3">
                <div className="text-center">
                  <div className="text-white/90 font-rajdhani text-sm">Proficiency</div>
                  <div className="text-cyber-green font-bold text-xl">{skill.level}%</div>
                </div>
                {skill.experience && (
                  <div className="text-center">
                    <div className="text-white/90 font-rajdhani text-sm">Experience</div>
                    <div className="text-cyber-magenta font-bold text-lg">{skill.experience}</div>
                  </div>
                )}
              </div>
              {/* Simple Progress Bar */}
              <div className="w-32 h-2 bg-dark-border/50 rounded-full overflow-hidden">
                <div
                  className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Utility functions for glow colors
const getCategoryGlow = (colorClass: string): string => {
  if (colorClass.includes('cyan')) return 'rgba(0,240,255,0.6)';
  if (colorClass.includes('magenta')) return 'rgba(255,0,200,0.6)';
  if (colorClass.includes('green')) return 'rgba(0,255,128,0.6)';
  return 'rgba(161,0,255,0.6)';
};

const getSkillGlow = (colorClass: string): string => {
  if (colorClass.includes('cyan')) return 'rgba(0,240,255,0.4)';
  if (colorClass.includes('magenta')) return 'rgba(255,0,200,0.4)';
  if (colorClass.includes('green')) return 'rgba(0,255,128,0.4)';
  if (colorClass.includes('purple')) return 'rgba(161,0,255,0.4)';
  return 'rgba(0,128,255,0.4)';
};

interface SkillsProps {
  isDark: boolean;
}

export default function Skills({ isDark }: SkillsProps) {
  const [isPaused, setIsPaused] = useState(false);
  
  const skillSystems: SkillCategory[] = [
    {
      title: "Frontend Universe",
      centerColor: "bg-gradient-to-br from-cyber-cyan to-cyber-blue",
      orbitColor: "border-cyber-cyan/30",
      skills: [
        { name: "React", level: 85, color: "bg-gradient-to-br from-cyber-cyan to-cyber-blue", icon: "⚛️", experience: "3+ years" },
        { name: "TypeScript", level: 88, color: "bg-gradient-to-br from-cyber-blue to-cyber-purple", icon: "TS", experience: "2+ years" },
        { name: "Next.js", level: 80, color: "bg-gradient-to-br from-cyber-purple to-cyber-magenta", icon: "▲", experience: "2+ years" },
        { name: "Tailwind", level: 90, color: "bg-gradient-to-br from-cyber-cyan to-cyber-green", icon: "🎨", experience: "3+ years" },
        { name: "CSS3", level: 92, color: "bg-gradient-to-br from-cyber-green to-cyber-cyan", icon: "🎯", experience: "4+ years" },
        { name: "HTML5", level: 95, color: "bg-gradient-to-br from-cyber-magenta to-cyber-pink", icon: "📝", experience: "4+ years" },
      ],
    },
    {
      title: "Backend Galaxy",
      centerColor: "bg-gradient-to-br from-cyber-magenta to-cyber-pink",
      orbitColor: "border-cyber-magenta/30",
      skills: [
        { name: "C#", level: 90, color: "bg-gradient-to-br from-cyber-magenta to-cyber-pink", icon: "C#", experience: "4+ years" },
        { name: ".NET Core", level: 88, color: "bg-gradient-to-br from-cyber-purple to-cyber-magenta", icon: "🔷", experience: "3+ years" },
        { name: "ASP.NET", level: 85, color: "bg-gradient-to-br from-cyber-blue to-cyber-purple", icon: "🌐", experience: "3+ years" },
        { name: "Entity Framework", level: 80, color: "bg-gradient-to-br from-cyber-cyan to-cyber-blue", icon: "🗄️", experience: "2+ years" },
        { name: "SQL Server", level: 82, color: "bg-gradient-to-br from-cyber-green to-cyber-cyan", icon: "📊", experience: "3+ years" },
        { name: "APIs", level: 90, color: "bg-gradient-to-br from-cyber-pink to-cyber-magenta", icon: "🔗", experience: "3+ years" },
      ],
    },
    {
      title: "DevOps Constellation",
      centerColor: "bg-gradient-to-br from-cyber-green to-cyber-cyan",
      orbitColor: "border-cyber-green/30",
      skills: [
        { name: "Azure DevOps", level: 80, color: "bg-gradient-to-br from-cyber-green to-cyber-cyan", icon: "☁️", experience: "2+ years" },
        { name: "Git", level: 88, color: "bg-gradient-to-br from-cyber-cyan to-cyber-blue", icon: "🌿", experience: "4+ years" },
        { name: "CI/CD", level: 75, color: "bg-gradient-to-br from-cyber-blue to-cyber-purple", icon: "🔄", experience: "2+ years" },
        { name: "Docker", level: 60, color: "bg-gradient-to-br from-cyber-purple to-cyber-magenta", icon: "🐳", experience: "1+ year" },
        { name: "Testing", level: 85, color: "bg-gradient-to-br from-cyber-magenta to-cyber-pink", icon: "🧪", experience: "3+ years" },
      ],
    },
  ];

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  return (
    <motion.section
      className="py-20 relative max-w-7xl mx-auto px-4"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="relative z-10">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-5xl font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta">
            Tech Stack Solar System
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-magenta mx-auto rounded-full" />
          <p className="mt-6 text-lg text-white/70 font-rajdhani max-w-3xl mx-auto">
            Explore my technical universe where skills orbit around expertise domains
          </p>
          <p className="mt-3 text-sm text-cyber-cyan font-rajdhani">
            Planet size indicates proficiency • Hover for detailed stats • Watch them orbit!
          </p>
        </motion.div>

        {/* Pause/Play Button */}
        <motion.div 
          className="text-center mb-8"
          variants={fadeInUp}
        >
          <motion.button
            onClick={togglePause}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-magenta/20 border border-cyber-cyan/50 text-cyber-cyan font-rajdhani font-bold text-lg hover:from-cyber-cyan/30 hover:to-cyber-magenta/30 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPaused ? "▶️ Resume Orbits" : "⏸️ Pause Orbits"}
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-16 justify-items-center">
          {skillSystems.map((system, index) => (
            <SolarSystem
              key={system.title}
              category={system}
              index={index}
              isPaused={isPaused}
            />
          ))}
        </div>

        {/* Simplified Legend */}
        <motion.div
          className="mt-16 text-center"
          variants={fadeInUp}
        >
          <div className="max-w-4xl mx-auto p-6 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/50 to-dark-surface/30 border border-cyber-cyan/20">
            <h3 className="text-xl font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-cyan">
              Navigation Guide
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-rajdhani">
              <div className="text-center">
                <div className="w-8 h-8 bg-gradient-to-br from-cyber-cyan to-cyber-blue rounded-full mx-auto mb-2"></div>
                <div className="text-cyber-cyan font-bold">Central Star</div>
                <div className="text-white/70">Category</div>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 bg-gradient-to-br from-cyber-magenta to-cyber-pink rounded-full mx-auto mb-2"></div>
                <div className="text-cyber-magenta font-bold">Planet</div>
                <div className="text-white/70">Skill</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center space-x-1 mb-2">
                  <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
                  <div className="w-5 h-5 bg-cyber-green rounded-full"></div>
                </div>
                <div className="text-cyber-green font-bold">Size</div>
                <div className="text-white/70">Proficiency</div>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 bg-dark-card border border-cyber-cyan/30 rounded mx-auto mb-2 flex items-center justify-center">
                  <span className="text-cyber-cyan text-xs">💬</span>
                </div>
                <div className="text-cyber-cyan font-bold">Hover</div>
                <div className="text-white/70">Details</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
