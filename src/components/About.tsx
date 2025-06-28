import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scrollFadeInUp } from '@/utils/animations';
import { FaUser, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaCode, FaRocket } from 'react-icons/fa';
import { useMobile } from '@/hooks/useMobile';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  delay: number;
  index: number;
  isMobile: boolean;
}

function InfoCard({ icon, title, content, delay, index, isMobile }: InfoCardProps) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/70 via-dark-surface/50 to-dark-card/70 border border-cyber-cyan/20 transition-all duration-500 ${
        isMobile ? 'p-4' : 'p-6'
      }`}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: isMobile ? 0.5 : 0.8, 
        delay: delay + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={!isMobile ? {
        scale: 1.02,
        rotateY: 2,
        borderColor: 'rgba(0, 240, 255, 0.4)',
        boxShadow: '0 20px 40px rgba(0, 240, 255, 0.2)',
      } : {}}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 to-cyber-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
      
      <div className="relative z-10">
        <motion.div 
          className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
          whileHover={!isMobile ? { rotate: 5 } : {}}
        >
          {icon}
        </motion.div>
        
        <motion.h3 
          className={`font-bold font-orbitron mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta ${
            isMobile ? 'text-base' : 'text-lg'
          }`}
          animate={!isMobile ? {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          } : {}}
          transition={!isMobile ? {
            duration: 4 + index,
            repeat: Infinity,
            ease: "linear"
          } : {}}
          style={{
            backgroundSize: '200% 200%',
          }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className={`text-white/80 font-rajdhani leading-relaxed group-hover:text-white/90 transition-colors duration-300 ${
            isMobile ? 'text-sm' : 'text-base'
          }`}
          whileHover={!isMobile ? { x: 5 } : {}}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-magenta transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        initial={false}
      />
    </motion.div>
  );
}

export default function About() {
  const { isMobile } = useMobile();

  const personalInfo = [
    {
      icon: <FaUser className={`text-white ${isMobile ? 'text-sm' : 'text-lg'}`} />,
      title: "Profile",
      content: "24-year-old software developer passionate about creating innovative digital solutions",
    },
    {
      icon: <FaMapMarkerAlt className={`text-white ${isMobile ? 'text-sm' : 'text-lg'}`} />,
      title: "Location",
      content: "Based in Alingsås, Sweden",
    },
    {
      icon: <FaGraduationCap className={`text-white ${isMobile ? 'text-sm' : 'text-lg'}`} />,
      title: "Education",
      content: "Bachelor's degree in Information Systems from University of Borås",
    },
    {
      icon: <FaBriefcase className={`text-white ${isMobile ? 'text-sm' : 'text-lg'}`} />,
      title: "Current Role",
      content: "Software Developer at WIS, specializing in .NET, WinUI, and Azure DevOps",
    },
    {
      icon: <FaCode className={`text-white ${isMobile ? 'text-sm' : 'text-lg'}`} />,
      title: "Expertise",
      content: "Clean architecture, API integrations, automated testing, and software quality",
    },
    {
      icon: <FaRocket className={`text-white ${isMobile ? 'text-sm' : 'text-lg'}`} />,
      title: "Mission",
      content: "Building scalable solutions that make a real difference in people's lives",
    },
  ];

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
        className={`absolute ${isMobile ? 'top-5 left-5 w-24 h-24' : 'top-10 left-10 w-48 h-48'} bg-gradient-to-r from-cyber-purple/10 to-cyber-magenta/10 rounded-full blur-3xl`}
        animate={!isMobile ? {
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          scale: [1, 1.2, 1],
        } : { scale: [1, 1.1, 1] }}
        transition={{
          duration: isMobile ? 5 : 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className={`absolute ${isMobile ? 'bottom-5 right-5 w-32 h-32' : 'bottom-20 right-20 w-64 h-64'} bg-gradient-to-r from-cyber-cyan/10 to-cyber-blue/10 rounded-full blur-3xl`}
        animate={!isMobile ? {
          y: [15, -15, 15],
          x: [8, -8, 8],
          scale: [1.1, 1, 1.1],
        } : { scale: [1, 1.05, 1] }}
        transition={{
          duration: isMobile ? 6 : 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="relative z-10">
        {/* Section Header with Enhanced Animation */}
        <motion.div 
          className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}
          variants={fadeInUp}
        >
          <motion.h2 
            className={`font-bold font-orbitron mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple via-cyber-cyan to-cyber-magenta ${
              isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl lg:text-6xl'
            }`}
            animate={!isMobile ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={!isMobile ? {
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            } : {}}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className={`h-1 bg-gradient-to-r from-cyber-purple to-cyber-cyan mx-auto rounded-full ${
              isMobile ? 'w-16' : 'w-24'
            }`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} items-start`}>
          {/* Personal Introduction - Enhanced */}
          <motion.div 
            className={`${isMobile ? 'col-span-1' : 'lg:col-span-2'} space-y-6`}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className={`rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/70 via-dark-surface/50 to-dark-card/70 border border-cyber-cyan/20 overflow-hidden ${
                isMobile ? 'p-6' : 'p-8'
              }`}
              whileHover={!isMobile ? {
                borderColor: 'rgba(0, 240, 255, 0.4)',
                boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)'
              } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 cyber-grid opacity-5" />
              <div className="relative z-10">
                <motion.h3 
                  className={`font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta ${
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
                  Welcome to My Digital World
                </motion.h3>
                
                <div className={`space-y-4 text-white/80 font-rajdhani leading-relaxed ${
                  isMobile ? 'text-sm' : 'text-base'
                }`}>
                  <motion.p
                    whileHover={!isMobile ? { x: 10, color: 'rgba(255, 255, 255, 0.95)' } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    Hi there! I'm Alvin, a passionate software developer based in Sweden with a genuine love for crafting digital solutions that make a difference. My journey in technology began with curiosity and has evolved into a deep commitment to building robust, scalable applications.
                  </motion.p>
                  
                  <motion.p
                    whileHover={!isMobile ? { x: 10, color: 'rgba(255, 255, 255, 0.95)' } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    Currently working as a Software Developer at WIS, I specialize in .NET development, WinUI applications, and Azure DevOps. I'm particularly passionate about clean architecture, automated testing, and creating software that not only works but works beautifully.
                  </motion.p>
                  
                  <motion.p
                    whileHover={!isMobile ? { x: 10, color: 'rgba(255, 255, 255, 0.95)' } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or brainstorming the next innovative solution. I believe in the power of technology to transform ideas into reality, and I'm always excited about the next challenge.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Stats/Highlights - Mobile optimized */}
          <motion.div 
            className="space-y-4"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className={`rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/70 via-dark-surface/50 to-dark-card/70 border border-cyber-magenta/20 text-center ${
                isMobile ? 'p-6' : 'p-8'
              }`}
              whileHover={!isMobile ? {
                borderColor: 'rgba(161, 0, 255, 0.4)',
                boxShadow: '0 0 30px rgba(161, 0, 255, 0.2)'
              } : {}}
            >
              <motion.div 
                className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-magenta to-cyber-pink mb-2`}
                animate={!isMobile ? {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                } : {}}
                transition={!isMobile ? {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                } : {}}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                24
              </motion.div>
              <p className={`text-white/70 font-rajdhani ${isMobile ? 'text-sm' : 'text-base'}`}>
                Years Young
              </p>
            </motion.div>

            <motion.div 
              className={`rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/70 via-dark-surface/50 to-dark-card/70 border border-cyber-green/20 text-center ${
                isMobile ? 'p-6' : 'p-8'
              }`}
              whileHover={!isMobile ? {
                borderColor: 'rgba(0, 255, 128, 0.4)',
                boxShadow: '0 0 30px rgba(0, 255, 128, 0.2)'
              } : {}}
            >
              <motion.div 
                className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-cyan mb-2`}
                animate={!isMobile ? {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                } : {}}
                transition={!isMobile ? {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "linear"
                } : {}}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                3+
              </motion.div>
              <p className={`text-white/70 font-rajdhani ${isMobile ? 'text-sm' : 'text-base'}`}>
                Years Experience
              </p>
            </motion.div>

            <motion.div 
              className={`rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/70 via-dark-surface/50 to-dark-card/70 border border-cyber-blue/20 text-center ${
                isMobile ? 'p-6' : 'p-8'
              }`}
              whileHover={!isMobile ? {
                borderColor: 'rgba(0, 150, 255, 0.4)',
                boxShadow: '0 0 30px rgba(0, 150, 255, 0.2)'
              } : {}}
            >
              <motion.div 
                className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple mb-2`}
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
                ∞
              </motion.div>
              <p className={`text-white/70 font-rajdhani ${isMobile ? 'text-sm' : 'text-base'}`}>
                Learning Always
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Personal Information Cards */}
        <motion.div 
          className={`${isMobile ? 'mt-8' : 'mt-16'}`}
          variants={staggerContainer}
          transition={{ delay: 0.8 }}
        >
          <motion.h3 
            className={`text-center font-bold font-orbitron mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-green ${
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
            Get to Know Me Better
          </motion.h3>
          
          <div className={`grid gap-6 ${
            isMobile 
              ? 'grid-cols-1' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {personalInfo.map((info, index) => (
              <InfoCard
                key={info.title}
                icon={info.icon}
                title={info.title}
                content={info.content}
                delay={0.8}
                index={index}
                isMobile={isMobile}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
