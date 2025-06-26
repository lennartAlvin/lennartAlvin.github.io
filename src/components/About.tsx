import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scrollFadeInUp, scrollSlideInLeft, scrollSlideInRight, cardFlipIn, magneticHover, glowOnHover, staggerFadeInUp } from '@/utils/animations';
import { FaUser, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaCode, FaRocket } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  delay: number;
  index: number;
  isMobile: boolean;
}

function InfoCard({ icon, title, content, delay, index, isMobile }: InfoCardProps) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      className="relative group cursor-pointer touch-manipulation"
      {...cardFlipIn}
      transition={{ delay: delay + 0.2, duration: isMobile ? 0.5 : 0.8 }}
      whileHover={!isMobile ? {
        ...magneticHover,
        ...glowOnHover,
      } : {}}
      whileTap={{ scale: 0.98 }}
    >
      {/* Enhanced Background Effects - Simplified on mobile */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-cyber-magenta/20 rounded-xl blur-sm ${isMobile ? 'opacity-20' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}
        animate={!isMobile ? {
          background: [
            'linear-gradient(to right, rgba(0, 240, 255, 0.2), rgba(255, 0, 200, 0.2))',
            'linear-gradient(to right, rgba(255, 0, 200, 0.2), rgba(0, 255, 128, 0.2))',
            'linear-gradient(to right, rgba(0, 255, 128, 0.2), rgba(0, 240, 255, 0.2))',
          ]
        } : {}}
        transition={!isMobile ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
      />
      
      <motion.div 
        className={`relative rounded-xl backdrop-blur-lg bg-gradient-to-br from-dark-card/90 via-dark-surface/70 to-dark-card/90 border border-cyber-cyan/20 group-hover:border-cyber-cyan/40 transition-all duration-300 overflow-hidden ${
          isMobile ? 'p-4' : 'p-6'
        }`}
        whileHover={!isMobile ? { 
          borderColor: 'rgba(0, 240, 255, 0.6)',
          backgroundColor: 'rgba(30, 30, 30, 0.95)'
        } : {}}
      >
        {/* Animated Corner Accents - Simplified on mobile */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-cyan opacity-0 group-hover:opacity-100"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-magenta opacity-0 group-hover:opacity-100"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          </>
        )}
        
        <div className={`flex items-center mb-3 ${isMobile ? 'space-x-3' : 'space-x-4'}`}>
          <motion.div 
            className={`rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center relative overflow-hidden ${
              isMobile ? 'w-10 h-10' : 'w-12 h-12'
            }`}
            whileHover={!isMobile ? { 
              scale: 1.1,
              rotate: 5,
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 1), rgba(0, 128, 255, 1))'
            } : {}}
            transition={{ duration: 0.3 }}
          >
            {!isMobile && (
              <motion.div
                className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              />
            )}
            <motion.div
              whileHover={!isMobile ? { scale: 1.2, rotate: 10 } : {}}
              transition={{ duration: 0.3 }}
              className={isMobile ? 'text-sm' : ''}
            >
              {icon}
            </motion.div>
          </motion.div>
          <motion.h3 
            className={`font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta ${
              isMobile ? 'text-base' : 'text-lg'
            }`}
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
            {title}
          </motion.h3>
        </div>
        <motion.p 
          className={`text-white/80 font-rajdhani leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}
          whileHover={!isMobile ? { color: 'rgba(255, 255, 255, 0.95)' } : {}}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.p>
        
        {/* Floating Particles - Removed on mobile for performance */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyber-cyan rounded-full opacity-0 group-hover:opacity-60"
                style={{
                  top: `${20 + i * 30}%`,
                  left: `${10 + i * 20}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function About() {
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
      title: "Focus",
      content: "Building robust, maintainable solutions with modern development practices",
    },
  ];

  return (
    <motion.section
      className={`relative ${isMobile ? 'py-12 px-4' : 'py-20 max-w-7xl mx-auto px-4'}`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {/* Enhanced Background Elements - Reduced on mobile */}
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
      
      {/* Floating Orbs - Simplified on mobile */}
      <motion.div
        className={`absolute ${isMobile ? 'top-5 right-5 w-16 h-16' : 'top-10 right-10 w-32 h-32'} bg-gradient-to-r from-cyber-cyan/10 to-cyber-blue/10 rounded-full blur-xl`}
        animate={!isMobile ? {
          y: [-10, 10, -10],
          x: [-5, 5, -5],
          scale: [1, 1.1, 1],
        } : { scale: [1, 1.05, 1] }}
        transition={{
          duration: isMobile ? 4 : 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className={`absolute ${isMobile ? 'bottom-5 left-5 w-20 h-20' : 'bottom-10 left-10 w-40 h-40'} bg-gradient-to-r from-cyber-magenta/10 to-cyber-purple/10 rounded-full blur-xl`}
        animate={!isMobile ? {
          y: [10, -10, 10],
          x: [5, -5, 5],
          scale: [1, 1.2, 1],
        } : { scale: [1, 1.1, 1] }}
        transition={{
          duration: isMobile ? 5 : 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div 
          className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}
          variants={fadeInUp}
        >
          <motion.h2 
            className={`font-bold font-orbitron mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta ${
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
            About Me
          </motion.h2>
          <motion.div 
            className={`h-1 bg-gradient-to-r from-cyber-cyan to-cyber-magenta mx-auto rounded-full ${
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
            Passionate about crafting digital experiences that make a difference. 
            Here's a glimpse into my journey and what drives me as a developer.
          </motion.p>
        </motion.div>

        {/* Personal Info Cards Grid - Responsive */}
        <motion.div 
          className={`grid gap-6 ${
            isMobile 
              ? 'grid-cols-1 sm:grid-cols-2' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
          variants={staggerContainer}
        >
          {personalInfo.map((info, index) => (
            <InfoCard
              key={info.title}
              icon={info.icon}
              title={info.title}
              content={info.content}
              delay={index * 0.1}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        {/* Enhanced Stats Section - Mobile optimized */}
        <motion.div 
          className={`mt-16 ${isMobile ? 'px-2' : ''}`}
          {...scrollFadeInUp}
          transition={{ delay: 0.8 }}
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
                className={`text-center font-bold font-orbitron mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-cyan ${
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
                Quick Stats
              </motion.h3>
              
              <div className={`grid gap-6 ${
                isMobile 
                  ? 'grid-cols-2' 
                  : 'grid-cols-2 md:grid-cols-4'
              }`}>
                {[
                  { label: 'Years Experience', value: '3+', color: 'text-cyber-cyan' },
                  { label: 'Projects Completed', value: '50+', color: 'text-cyber-green' },
                  { label: 'Technologies', value: '15+', color: 'text-cyber-magenta' },
                  { label: 'Coffee Consumed', value: '∞', color: 'text-cyber-yellow' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
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
                      {stat.value}
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

        {/* CTA Section - Mobile optimized */}
        <motion.div 
          className={`text-center ${isMobile ? 'mt-12' : 'mt-16'}`}
          {...scrollFadeInUp}
          transition={{ delay: 1 }}
        >
          <motion.p 
            className={`mb-8 text-white/80 font-rajdhani ${
              isMobile ? 'text-base px-4' : 'text-lg'
            }`}
            whileHover={!isMobile ? { color: 'rgba(255, 255, 255, 0.95)' } : {}}
          >
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </motion.p>
          
          <motion.a
            href="#contact"
            className={`inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-rajdhani font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyber-cyan/25 touch-manipulation ${
              isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'
            }`}
            whileHover={!isMobile ? { 
              scale: 1.05,
              boxShadow: '0 10px 30px rgba(0, 240, 255, 0.3)'
            } : {}}
            whileTap={{ scale: 0.95 }}
          >
            <span>Let's Connect</span>
            <motion.span
              animate={!isMobile ? { x: [0, 5, 0] } : {}}
              transition={!isMobile ? { duration: 1.5, repeat: Infinity } : {}}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
