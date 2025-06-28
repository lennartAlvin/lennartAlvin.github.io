import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { useMobile } from '@/hooks/useMobile';

interface Skill {
  name: string;
  level: number;
  color: string;
  icon?: string;
  experience?: string;
}

interface SkillsProps {
  isDark?: boolean;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
  isPaused: boolean;
  isMobile: boolean;
}

const SkillCard = ({ skill, index, isPaused, isMobile }: SkillCardProps) => {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/70 via-dark-surface/50 to-dark-card/70 border border-white/10 transition-all duration-500 cursor-pointer ${
        isMobile ? 'p-4' : 'p-6'
      }`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: isMobile ? 0.5 : 0.8, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={!isMobile ? {
        scale: 1.05,
        borderColor: skill.color + '60',
        boxShadow: `0 20px 40px ${skill.color}20`,
        y: -5
      } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${skill.color}10, transparent 60%)`,
        }}
        initial={false}
      />
      
      <div className="relative z-10">
        {/* Skill Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {skill.icon && (
              <motion.div 
                className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg flex items-center justify-center text-lg font-bold group-hover:scale-110 transition-transform duration-300`}
                style={{ 
                  backgroundColor: skill.color + '20',
                  color: skill.color,
                  border: `1px solid ${skill.color}30`
                }}
              >
                {skill.icon}
              </motion.div>
            )}
            <div>
              <motion.h3 
                className={`font-bold font-orbitron group-hover:text-white transition-colors duration-300 ${
                  isMobile ? 'text-sm' : 'text-base'
                }`}
                style={{ color: skill.color }}
              >
                {skill.name}
              </motion.h3>
              {skill.experience && (
                <p className={`text-white/60 font-rajdhani ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {skill.experience}
                </p>
              )}
            </div>
          </div>
          
          <motion.div 
            className={`font-bold font-orbitron ${isMobile ? 'text-lg' : 'text-xl'}`}
            style={{ color: skill.color }}
            animate={!isPaused && !isMobile ? {
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          >
            {skill.level}%
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div 
            className="w-full bg-white/10 rounded-full overflow-hidden"
            style={{ height: isMobile ? '6px' : '8px' }}
          >
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{ backgroundColor: skill.color }}
              initial={{ width: '0%' }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ 
                duration: isMobile ? 1 : 1.5, 
                delay: index * 0.1 + 0.3,
                ease: "easeOut"
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/30"
                animate={!isPaused && !isMobile ? {
                  x: ['-100%', '100%'],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
              />
            </motion.div>
          </div>
          
          {/* Skill Level Indicator */}
          <motion.div
            className={`absolute top-0 ${isMobile ? '-mt-6 text-xs' : '-mt-8 text-sm'} font-rajdhani font-bold pointer-events-none`}
            style={{ 
              left: `${skill.level}%`,
              color: skill.color,
              transform: 'translateX(-50%)'
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1 + 0.8 
            }}
          >
            {skill.level}%
          </motion.div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ backgroundColor: skill.color }}
        initial={false}
      />
    </motion.div>
  );
};

export default function Skills({ isDark }: SkillsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const { isMobile } = useMobile();

  const skillCategories = useMemo(() => ([
    {
      title: "Programming Languages",
      skills: [
        { name: "C#", level: 90, color: "#239120", icon: "C#", experience: "3+ years" },
        { name: "TypeScript", level: 85, color: "#3178C6", icon: "TS", experience: "2+ years" },
        { name: "JavaScript", level: 88, color: "#F7DF1E", icon: "JS", experience: "3+ years" },
        { name: "Python", level: 75, color: "#3776AB", icon: "Py", experience: "2+ years" },
        { name: "Java", level: 70, color: "#ED8B00", icon: "☕", experience: "1+ year" },
        { name: "SQL", level: 82, color: "#00758F", icon: "🗄️", experience: "3+ years" }
      ]
    },
    {
      title: "Frontend Technologies", 
      skills: [
        { name: "React", level: 88, color: "#61DAFB", icon: "⚛️", experience: "2+ years" },
        { name: "Next.js", level: 85, color: "#000000", icon: "▲", experience: "1+ year" },
        { name: "HTML/CSS", level: 92, color: "#E34F26", icon: "🎨", experience: "4+ years" },
        { name: "Tailwind CSS", level: 90, color: "#06B6D4", icon: "🎨", experience: "2+ years" },
        { name: "WinUI", level: 85, color: "#512BD4", icon: "🖥️", experience: "2+ years" },
        { name: "Blazor", level: 78, color: "#512BD4", icon: "🔥", experience: "1+ year" }
      ]
    },
    {
      title: "Backend & Cloud",
      skills: [
        { name: ".NET", level: 90, color: "#512BD4", icon: ".NET", experience: "3+ years" },
        { name: "ASP.NET Core", level: 88, color: "#512BD4", icon: "🌐", experience: "2+ years" },
        { name: "Entity Framework", level: 85, color: "#512BD4", icon: "🗃️", experience: "2+ years" },
        { name: "Azure", level: 80, color: "#0078D4", icon: "☁️", experience: "2+ years" },
        { name: "Azure DevOps", level: 82, color: "#0078D4", icon: "🔄", experience: "2+ years" },
        { name: "Docker", level: 75, color: "#2496ED", icon: "🐳", experience: "1+ year" }
      ]
    },
    {
      title: "Development Tools & Practices",
      skills: [
        { name: "Git", level: 88, color: "#F05032", icon: "📚", experience: "3+ years" },
        { name: "Visual Studio", level: 90, color: "#5C2D91", icon: "🛠️", experience: "3+ years" },
        { name: "VS Code", level: 92, color: "#007ACC", icon: "📝", experience: "4+ years" },
        { name: "Unit Testing", level: 82, color: "#25D366", icon: "🧪", experience: "2+ years" },
        { name: "Clean Architecture", level: 85, color: "#FF6B6B", icon: "🏗️", experience: "2+ years" },
        { name: "Agile/Scrum", level: 80, color: "#4ECDC4", icon: "🏃", experience: "2+ years" }
      ]
    }
  ]), []);

  const allSkills = useMemo(() => 
    skillCategories.flatMap(category => category.skills),
    [skillCategories]
  );

  return (
    <motion.section
      className={`relative ${isMobile ? 'py-12 px-4' : 'py-20 max-w-7xl mx-auto px-4'}`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      onMouseEnter={() => !isMobile && setIsPaused(false)}
      onMouseLeave={() => !isMobile && setIsPaused(false)}
    >
      {/* Enhanced Background Elements */}
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

      {/* Floating Orbs */}
      <motion.div
        className={`absolute ${isMobile ? 'top-5 right-5 w-20 h-20' : 'top-10 right-10 w-40 h-40'} bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 rounded-full blur-3xl`}
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
            className={`font-bold font-orbitron mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-purple ${
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
            Technical Skills
          </motion.h2>
          <motion.div 
            className={`h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto rounded-full ${
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
            A comprehensive overview of my technical expertise and experience across 
            various technologies, frameworks, and development practices.
          </motion.p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ 
                duration: 0.6, 
                delay: categoryIndex * 0.2 
              }}
            >
              <motion.h3 
                className={`font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-blue ${
                  isMobile ? 'text-xl' : 'text-2xl'
                }`}
                animate={!isMobile ? {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                } : {}}
                transition={!isMobile ? {
                  duration: 4 + categoryIndex,
                  repeat: Infinity,
                  ease: "linear"
                } : {}}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                {category.title}
              </motion.h3>
              
              <div className={`grid gap-6 ${
                isMobile 
                  ? 'grid-cols-1 sm:grid-cols-2' 
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={categoryIndex * 6 + skillIndex}
                    isPaused={isPaused}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Overview Stats */}
        <motion.div 
          className={`${isMobile ? 'mt-12' : 'mt-16'} text-center`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div 
            className={`rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/70 via-dark-surface/50 to-dark-card/70 border border-cyber-cyan/20 overflow-hidden ${
              isMobile ? 'p-6 mx-2' : 'p-8 max-w-4xl mx-auto'
            }`}
            whileHover={!isMobile ? {
              borderColor: 'rgba(0, 240, 255, 0.4)',
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)'
            } : {}}
          >
            <div className="absolute inset-0 cyber-grid opacity-5" />
            <div className="relative z-10">
              <motion.h3 
                className={`font-bold font-orbitron mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-green ${
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
                Skill Overview
              </motion.h3>
              
              <div className={`grid gap-6 ${
                isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'
              }`}>
                {[
                  { 
                    label: 'Total Technologies', 
                    value: allSkills.length, 
                    color: 'text-cyber-cyan',
                    suffix: '+'
                  },
                  { 
                    label: 'Average Proficiency', 
                    value: Math.round(allSkills.reduce((acc, skill) => acc + skill.level, 0) / allSkills.length), 
                    color: 'text-cyber-green',
                    suffix: '%'
                  },
                  { 
                    label: 'Expert Level (80%+)', 
                    value: allSkills.filter(skill => skill.level >= 80).length, 
                    color: 'text-cyber-magenta',
                    suffix: '+'
                  },
                  { 
                    label: 'Years Experience', 
                    value: '3', 
                    color: 'text-cyber-blue',
                    suffix: '+'
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                  >
                    <motion.div 
                      className={`font-bold font-orbitron mb-2 ${stat.color} ${
                        isMobile ? 'text-2xl' : 'text-3xl'
                      }`}
                      animate={!isMobile ? {
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      {stat.value}{stat.suffix}
                    </motion.div>
                    <div className={`text-white/70 font-rajdhani ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
