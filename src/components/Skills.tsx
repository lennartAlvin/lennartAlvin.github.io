import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { useState } from 'react';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  isDark: boolean;
  index: number;
}

function SkillCategory({ title, skills, isDark, index }: SkillCategoryProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isLearning = title === 'Currently Learning';
  
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 to-cyber-magenta/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className={`relative p-6 rounded-xl backdrop-blur-lg transition-all duration-300 ${
        isLearning
          ? 'bg-gradient-to-br from-cyber-magenta/20 via-cyber-pink/10 to-cyber-magenta/20 border border-cyber-magenta/30 group-hover:border-cyber-magenta/50'
          : 'bg-gradient-to-br from-dark-card/90 via-dark-surface/70 to-dark-card/90 border border-cyber-cyan/20 group-hover:border-cyber-cyan/40'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isLearning 
                ? 'bg-gradient-to-br from-cyber-magenta to-cyber-pink' 
                : 'bg-gradient-to-br from-cyber-cyan to-cyber-blue'
            }`}>
              <span className="text-white text-lg font-bold">
                {title.charAt(0)}
              </span>
            </div>
            <h3 className="text-xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta">
              {title}
            </h3>
          </div>
          {isLearning && (
            <motion.span
              className="px-3 py-1 rounded-full text-xs font-medium bg-cyber-magenta/20 text-cyber-magenta border border-cyber-magenta/30 font-rajdhani"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Learning
            </motion.span>
          )}
        </div>

        <div className="space-y-4">
          {skills.map((skill, skillIndex) => (
            <div key={skill.name} className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/90 font-rajdhani font-medium">
                  {skill.name}
                </span>
                <span className="text-cyber-cyan text-sm font-bold">
                  {skill.level}%
                </span>
              </div>
              
              <div className="relative h-2 bg-dark-border/30 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute top-0 left-0 h-full rounded-full ${skill.color}`}
                  initial={{ width: 0 }}
                  animate={isHovered ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ 
                    delay: skillIndex * 0.1,
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse opacity-50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface SkillsProps {
  isDark: boolean;
}

export default function Skills({ isDark }: SkillsProps) {
  const skillCategories = [
    {
      title: "Backend Development",
      skills: [
        { name: "C# / .NET 8", level: 90, color: "bg-gradient-to-r from-cyber-cyan to-cyber-blue" },
        { name: "ASP.NET Core", level: 85, color: "bg-gradient-to-r from-cyber-cyan to-cyber-blue" },
        { name: "Entity Framework", level: 80, color: "bg-gradient-to-r from-cyber-cyan to-cyber-blue" },
        { name: "RESTful APIs", level: 88, color: "bg-gradient-to-r from-cyber-cyan to-cyber-blue" },
        { name: "SQL Server", level: 82, color: "bg-gradient-to-r from-cyber-cyan to-cyber-blue" },
      ],
    },
    {
      title: "Frontend Development",
      skills: [
        { name: "React/Next.js", level: 85, color: "bg-gradient-to-r from-cyber-purple to-cyber-magenta" },
        { name: "TypeScript", level: 88, color: "bg-gradient-to-r from-cyber-purple to-cyber-magenta" },
        { name: "Tailwind CSS", level: 90, color: "bg-gradient-to-r from-cyber-purple to-cyber-magenta" },
        { name: "HTML5/CSS3", level: 92, color: "bg-gradient-to-r from-cyber-purple to-cyber-magenta" },
        { name: "WinUI/XAML", level: 75, color: "bg-gradient-to-r from-cyber-purple to-cyber-magenta" },
      ],
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: "Azure DevOps", level: 80, color: "bg-gradient-to-r from-cyber-green to-cyber-cyan" },
        { name: "Git/GitHub", level: 88, color: "bg-gradient-to-r from-cyber-green to-cyber-cyan" },
        { name: "CI/CD", level: 75, color: "bg-gradient-to-r from-cyber-green to-cyber-cyan" },
        { name: "MSIX", level: 70, color: "bg-gradient-to-r from-cyber-green to-cyber-cyan" },
      ],
    },
    {
      title: "Testing & Quality",
      skills: [
        { name: "xUnit", level: 85, color: "bg-gradient-to-r from-cyber-blue to-cyber-purple" },
        { name: "AutoFixture", level: 80, color: "bg-gradient-to-r from-cyber-blue to-cyber-purple" },
        { name: "Moq", level: 82, color: "bg-gradient-to-r from-cyber-blue to-cyber-purple" },
        { name: "TDD", level: 78, color: "bg-gradient-to-r from-cyber-blue to-cyber-purple" },
      ],
    },
    {
      title: "Integration & APIs",
      skills: [
        { name: "REST APIs", level: 90, color: "bg-gradient-to-r from-cyber-magenta to-cyber-pink" },
        { name: "Payment Gateways", level: 75, color: "bg-gradient-to-r from-cyber-magenta to-cyber-pink" },
        { name: "Azure Services", level: 70, color: "bg-gradient-to-r from-cyber-magenta to-cyber-pink" },
        { name: "Third-party APIs", level: 85, color: "bg-gradient-to-r from-cyber-magenta to-cyber-pink" },
      ],
    },
    {
      title: "Currently Learning",
      skills: [
        { name: "Cloud Architecture", level: 60, color: "bg-gradient-to-r from-cyber-pink to-cyber-magenta" },
        { name: "Microservices", level: 55, color: "bg-gradient-to-r from-cyber-pink to-cyber-magenta" },
        { name: "Docker", level: 50, color: "bg-gradient-to-r from-cyber-pink to-cyber-magenta" },
        { name: "System Design", level: 65, color: "bg-gradient-to-r from-cyber-pink to-cyber-magenta" },
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
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-magenta mx-auto rounded-full" />
          <p className="mt-6 text-lg text-white/70 font-rajdhani max-w-3xl mx-auto">
            Expertise across the full-stack development lifecycle
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
        >
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              skills={category.skills}
              isDark={isDark}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
