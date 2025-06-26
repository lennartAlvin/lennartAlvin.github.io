import { motion, useAnimation } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { useState, useEffect } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);
  const sunControls = useAnimation();
  const sunTextControls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (isPaused) {
      sunControls.stop();
      sunTextControls.stop();
    } else {
      sunControls.start({
        rotate: 360,
        transition: { duration: 25, repeat: Infinity, ease: "linear" }
      });
      sunTextControls.start({
        rotate: -360,
        transition: { duration: 25, repeat: Infinity, ease: "linear" }
      });
    }
  }, [isPaused, sunControls, sunTextControls]);

  const getOrbitRadius = (skillIndex: number) => {
    const baseRadius = 140;
    const increment = 50;
    return baseRadius + (skillIndex % 3) * increment;
  };

  const getPlanetSize = (level: number) => {
    const minSize = 40;
    const maxSize = 60;
    return minSize + (level / 100) * (maxSize - minSize);
  };

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ minHeight: '500px', minWidth: '500px' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Category Sun */}
      <motion.div
        className={`absolute z-20 w-24 h-24 rounded-full ${category.centerColor} border-4 border-white/30 flex items-center justify-center shadow-2xl`}
        animate={sunControls}
        initial={{ rotate: 0 }}
        style={{
          boxShadow: isPaused ? 
            `0 0 30px ${category.centerColor.includes('cyan') ? 'rgba(0,240,255,0.6)' : 
                       category.centerColor.includes('magenta') ? 'rgba(255,0,200,0.6)' :
                       category.centerColor.includes('green') ? 'rgba(0,255,128,0.6)' :
                       'rgba(161,0,255,0.6)'}` :
            undefined
        }}
      >
        <motion.span 
          className="text-white font-orbitron font-bold text-xs text-center leading-tight"
          animate={sunTextControls}
          initial={{ rotate: 0 }}
        >
          {category.title.split(' ').map((word, i) => (
            <div key={i}>{word}</div>
          ))}
        </motion.span>
        
        {/* Animated glow effect when not paused */}
        {!isPaused && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                `0 0 30px ${category.centerColor.includes('cyan') ? 'rgba(0,240,255,0.6)' : 
                           category.centerColor.includes('magenta') ? 'rgba(255,0,200,0.6)' :
                           category.centerColor.includes('green') ? 'rgba(0,255,128,0.6)' :
                           'rgba(161,0,255,0.6)'}`,
                `0 0 50px ${category.centerColor.includes('cyan') ? 'rgba(0,240,255,0.9)' : 
                           category.centerColor.includes('magenta') ? 'rgba(255,0,200,0.9)' :
                           category.centerColor.includes('green') ? 'rgba(0,255,128,0.9)' :
                           'rgba(161,0,255,0.9)'}`,
                `0 0 30px ${category.centerColor.includes('cyan') ? 'rgba(0,240,255,0.6)' : 
                           category.centerColor.includes('magenta') ? 'rgba(255,0,200,0.6)' :
                           category.centerColor.includes('green') ? 'rgba(0,255,128,0.6)' :
                           'rgba(161,0,255,0.6)'}`
              ]
            }}
            transition={{
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        )}
      </motion.div>

      {/* Orbit Lines */}
      {[0, 1, 2].map((orbitIndex) => (
        <div
          key={orbitIndex}
          className={`absolute border border-dashed ${category.orbitColor} rounded-full opacity-30`}
          style={{
            width: `${(getOrbitRadius(orbitIndex) * 2)}px`,
            height: `${(getOrbitRadius(orbitIndex) * 2)}px`,
          }}
        />
      ))}

      {/* Skill Planets */}
      {category.skills.map((skill, skillIndex) => {
        const orbitRadius = getOrbitRadius(skillIndex);
        const planetSize = getPlanetSize(skill.level);
        const orbitDuration = 20 + skillIndex * 7;

        return (
          <PlanetOrbit
            key={skill.name}
            skill={skill}
            orbitRadius={orbitRadius}
            planetSize={planetSize}
            orbitDuration={orbitDuration}
            isPaused={isPaused}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
          />
        );
      })}
    </motion.div>
  );
}

function PlanetOrbit({ skill, orbitRadius, planetSize, orbitDuration, isPaused, hoveredSkill, setHoveredSkill }: {
  skill: Skill;
  orbitRadius: number;
  planetSize: number;
  orbitDuration: number;
  isPaused: boolean;
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
}) {
  const orbitControls = useAnimation();
  const planetControls = useAnimation();

  useEffect(() => {
    if (isPaused) {
      orbitControls.stop();
      planetControls.stop();
    } else {
      orbitControls.start({
        rotate: 360,
        transition: { duration: orbitDuration, repeat: Infinity, ease: "linear" }
      });
      planetControls.start({
        rotate: -360,
        transition: { duration: orbitDuration, repeat: Infinity, ease: "linear" }
      });
    }
  }, [isPaused, orbitControls, planetControls, orbitDuration]);

  return (
    <motion.div
      className="absolute z-10"
      animate={orbitControls}
      initial={{ rotate: 0 }}
      style={{
        width: `${orbitRadius * 2}px`,
        height: `${orbitRadius * 2}px`,
      }}
    >
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
        style={{
          width: `${planetSize + 20}px`,
          height: `${planetSize + 30}px`,
        }}
        whileHover={{ scale: 1.2, zIndex: 30 }}
        onHoverStart={() => setHoveredSkill(skill.name)}
        onHoverEnd={() => setHoveredSkill(null)}
        animate={planetControls}
        initial={{ rotate: 0 }}
      >
        {/* Planet */}
        <motion.div
          className={`w-full h-2/3 ${skill.color} rounded-full border-3 border-white/40 flex items-center justify-center shadow-lg`}
          style={{
            boxShadow: isPaused ? 
              `0 0 15px ${skill.color.includes('cyan') ? 'rgba(0,240,255,0.6)' : 
                         skill.color.includes('magenta') ? 'rgba(255,0,200,0.6)' :
                         skill.color.includes('green') ? 'rgba(0,255,128,0.6)' :
                         skill.color.includes('purple') ? 'rgba(161,0,255,0.6)' :
                         'rgba(0,128,255,0.6)'}` :
              undefined
          }}
        >
          {skill.icon && (
            <span className="text-white text-lg font-bold drop-shadow-lg">
              {skill.icon}
            </span>
          )}
          
          {/* Animated glow effect when not paused */}
          {!isPaused && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  `0 0 15px ${skill.color.includes('cyan') ? 'rgba(0,240,255,0.6)' : 
                             skill.color.includes('magenta') ? 'rgba(255,0,200,0.6)' :
                             skill.color.includes('green') ? 'rgba(0,255,128,0.6)' :
                             skill.color.includes('purple') ? 'rgba(161,0,255,0.6)' :
                             'rgba(0,128,255,0.6)'}`,
                  `0 0 25px ${skill.color.includes('cyan') ? 'rgba(0,240,255,0.9)' : 
                             skill.color.includes('magenta') ? 'rgba(255,0,200,0.9)' :
                             skill.color.includes('green') ? 'rgba(0,255,128,0.9)' :
                             skill.color.includes('purple') ? 'rgba(161,0,255,0.9)' :
                             'rgba(0,128,255,0.9)'}`,
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          )}
        </motion.div>
        
        {/* Skill Name Label */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-white font-rajdhani font-bold text-xs bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-white/20">
            {skill.name}
          </div>
          <div className="text-cyber-cyan text-xs font-bold mt-1">
            {skill.level}%
          </div>
        </div>
        
        {/* Enhanced Tooltip */}
        {hoveredSkill === skill.name && (
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 p-4 rounded-xl bg-dark-card/95 border-2 border-cyber-cyan/50 backdrop-blur-lg min-w-max z-50 shadow-2xl"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            style={{
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.4)'
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
              {/* Progress Bar in Tooltip */}
              <div className="w-32 h-2 bg-dark-border/50 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${skill.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

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
            Planet size indicates proficiency • Hover for detailed stats • Watch them orbit! • Use pause button to stop motion
          </p>
        </motion.div>

        {/* Pause/Play Button */}
        <motion.div 
          className="text-center mb-8"
          variants={fadeInUp}
        >
          <motion.button
            onClick={() => setIsPaused(!isPaused)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-magenta/20 border border-cyber-cyan/50 text-cyber-cyan font-rajdhani font-bold text-lg hover:from-cyber-cyan/30 hover:to-cyber-magenta/30 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)" }}
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

        {/* Legend */}
        <motion.div
          className="mt-16 text-center"
          variants={fadeInUp}
        >
          <div className="max-w-5xl mx-auto p-8 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/50 via-dark-surface/30 to-dark-card/50 border border-cyber-cyan/20">
            <h3 className="text-2xl font-bold font-orbitron mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-cyan">
              How to Navigate the Tech Universe
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm font-rajdhani">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyber-cyan to-cyber-blue rounded-full border-2 border-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">⭐</span>
                </div>
                <div>
                  <div className="text-cyber-cyan font-bold text-base">Central Star</div>
                  <div className="text-white/70">Technology Category</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyber-magenta to-cyber-pink rounded-full border-2 border-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">🪐</span>
                </div>
                <div>
                  <div className="text-cyber-magenta font-bold text-base">Orbiting Planet</div>
                  <div className="text-white/70">Individual Skill</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-4 h-4 bg-gradient-to-br from-cyber-green to-cyber-cyan rounded-full border border-white/20"></div>
                  <div className="w-6 h-6 bg-gradient-to-br from-cyber-green to-cyber-cyan rounded-full border border-white/20"></div>
                </div>
                <div>
                  <div className="text-cyber-green font-bold text-base">Planet Size</div>
                  <div className="text-white/70">Proficiency Level</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-dark-card/80 rounded border border-cyber-cyan/30 flex items-center justify-center">
                  <span className="text-cyber-cyan font-bold text-xs">💬</span>
                </div>
                <div>
                  <div className="text-cyber-cyan font-bold text-base">Hover Details</div>
                  <div className="text-white/70">Experience & Stats</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
