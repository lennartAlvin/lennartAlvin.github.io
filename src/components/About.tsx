import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { FaUser, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaCode, FaRocket } from 'react-icons/fa';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  delay: number;
}

function InfoCard({ icon, title, content, delay }: InfoCardProps) {
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-cyber-magenta/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 rounded-xl backdrop-blur-lg bg-gradient-to-br from-dark-card/90 via-dark-surface/70 to-dark-card/90 border border-cyber-cyan/20 group-hover:border-cyber-cyan/40 transition-all duration-300">
        <div className="flex items-center space-x-4 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-lg font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta">
            {title}
          </h3>
        </div>
        <p className="text-white/80 font-rajdhani leading-relaxed">
          {content}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const personalInfo = [
    {
      icon: <FaUser className="text-white text-lg" />,
      title: "Profile",
      content: "24-year-old software developer passionate about creating innovative digital solutions",
    },
    {
      icon: <FaMapMarkerAlt className="text-white text-lg" />,
      title: "Location",
      content: "Based in Alingsås, Sweden",
    },
    {
      icon: <FaGraduationCap className="text-white text-lg" />,
      title: "Education",
      content: "Bachelor's degree in Information Systems from University of Borås",
    },
    {
      icon: <FaBriefcase className="text-white text-lg" />,
      title: "Current Role",
      content: "Software Developer at WIS, specializing in .NET, WinUI, and Azure DevOps",
    },
    {
      icon: <FaCode className="text-white text-lg" />,
      title: "Expertise",
      content: "Clean architecture, API integrations, automated testing, and software quality",
    },
    {
      icon: <FaRocket className="text-white text-lg" />,
      title: "Focus",
      content: "Building robust, maintainable solutions with modern development practices",
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
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-magenta mx-auto rounded-full" />
          <p className="mt-6 text-lg text-white/70 font-rajdhani max-w-3xl mx-auto">
            Crafting digital experiences through code, innovation, and continuous learning
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={staggerContainer}
        >
          {personalInfo.map((info, index) => (
            <InfoCard
              key={info.title}
              icon={info.icon}
              title={info.title}
              content={info.content}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          variants={fadeInUp}
        >
          <div className="max-w-4xl mx-auto p-8 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/50 via-dark-surface/30 to-dark-card/50 border border-cyber-green/20">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-green to-cyber-cyan flex items-center justify-center">
                <FaCode className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="text-2xl font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-cyan">
              My Philosophy
            </h3>
            <p className="text-lg text-white/80 font-rajdhani leading-relaxed">
              I believe in writing code that not only works but stands the test of time. 
              My approach combines technical excellence with practical problem-solving, 
              always keeping user experience and system maintainability at the forefront. 
              Whether it's integrating complex APIs or architecting scalable solutions, 
              I strive to deliver software that makes a real difference.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
