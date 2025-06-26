import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, heroEntrance, scrollFadeInUp, parallaxFloat, parallaxSlow, typewriterEffect } from '@/utils/animations';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const roles = ['Software Developer', 'Full-Stack Engineer', 'Problem Solver', 'Code Architect'];
  const [currentRole, setCurrentRole] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), isMobile ? 100 : 200); // Shorter glitch on mobile
    }, isMobile ? 8000 : 5000); // Less frequent on mobile

    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    const typeRole = () => {
      const role = roles[currentRole];
      let index = 0;
      const typeInterval = setInterval(() => {
        setTypedText(role.slice(0, index));
        index++;
        if (index > role.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            const deleteInterval = setInterval(() => {
              setTypedText(role.slice(0, index));
              index--;
              if (index < 0) {
                clearInterval(deleteInterval);
                setCurrentRole((prev) => (prev + 1) % roles.length);
              }
            }, isMobile ? 30 : 50); // Faster on mobile
          }, isMobile ? 1500 : 2000); // Shorter pause on mobile
        }
      }, isMobile ? 80 : 100); // Faster typing on mobile
    };

    typeRole();
  }, [currentRole, isMobile]);

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 overflow-hidden"
      {...heroEntrance}
    >
      {/* Enhanced Cyber Grid Background with Parallax - Reduced on mobile */}
      <motion.div 
        className={`absolute inset-0 cyber-grid ${isMobile ? 'opacity-5' : 'opacity-10'}`}
        {...(isMobile ? {} : parallaxSlow)}
      />
      
      {/* Enhanced Floating Orbs with Parallax - Simplified on mobile */}
      <motion.div 
        className={`absolute ${isMobile ? 'top-10 left-10 w-32 h-32' : 'top-20 left-20 w-64 h-64'} bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 rounded-full blur-3xl`}
        {...(isMobile ? { animate: { y: [-10, 10, -10], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } } } : parallaxFloat)}
      />
      <motion.div 
        className={`absolute ${isMobile ? 'bottom-10 right-10 w-48 h-48' : 'bottom-20 right-20 w-96 h-96'} bg-gradient-to-r from-cyber-magenta/20 to-cyber-purple/20 rounded-full blur-3xl`}
        animate={{
          y: [isMobile ? -15 : -30, isMobile ? 15 : 30, isMobile ? -15 : -30],
          x: [isMobile ? -8 : -15, isMobile ? 8 : 15, isMobile ? -8 : -15],
          scale: [1, isMobile ? 1.05 : 1.1, 1],
          transition: {
            duration: isMobile ? 6 : 8,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      />
      <motion.div 
        className={`absolute top-1/2 left-1/4 ${isMobile ? 'w-16 h-16' : 'w-32 h-32'} bg-gradient-to-r from-cyber-green/30 to-cyber-cyan/30 rounded-full blur-2xl`}
        animate={{
          y: [isMobile ? -8 : -15, isMobile ? 8 : 15, isMobile ? -8 : -15],
          rotate: [0, 360],
          transition: {
            y: { duration: isMobile ? 4 : 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: isMobile ? 15 : 20, repeat: Infinity, ease: "linear" }
          }
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        <motion.div 
          className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Greeting with enhanced animation */}
          <motion.div 
            className="text-cyber-cyan font-rajdhani text-base sm:text-lg font-medium"
            {...scrollFadeInUp}
            whileHover={!isMobile ? { x: 10, transition: { duration: 0.3 } } : {}}
          >
            Hello, I'm
          </motion.div>

          {/* Main Title with Enhanced Glitch Effect - Responsive text */}
          <motion.h1 
            className={`font-bold font-orbitron leading-tight ${
              isMobile 
                ? 'text-3xl sm:text-4xl' 
                : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
            } ${glitchActive ? 'animate-glitch' : ''}`}
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: isMobile ? 0.8 : 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2 
            }}
            whileHover={!isMobile ? { 
              scale: 1.02,
              transition: { duration: 0.3 }
            } : {}}
          >
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta"
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
              Alvin
            </motion.span>
            <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-magenta via-cyber-pink to-cyber-cyan"
              animate={!isMobile ? {
                backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
              } : {}}
              transition={!isMobile ? {
                duration: 5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              } : {}}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Lennarthsson
            </motion.span>
          </motion.h1>

          {/* Enhanced Typed Role with Typewriter Effect - Responsive */}
          <motion.div 
            className={`font-rajdhani text-white/80 flex items-center justify-center lg:justify-start overflow-hidden ${
              isMobile 
                ? 'text-lg sm:text-xl h-8 sm:h-10' 
                : 'text-xl sm:text-2xl md:text-3xl h-10 sm:h-12'
            }`}
            {...scrollFadeInUp}
            transition={{ delay: 0.4 }}
          >
            <span className="text-cyber-green mr-2">{'>'}</span>
            <motion.div
              className="font-mono relative"
              {...(isMobile ? {} : typewriterEffect)}
            >
              {typedText}
              <motion.span 
                className="text-cyber-cyan ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Enhanced Description - Responsive */}
          <motion.p 
            className={`text-white/70 font-rajdhani leading-relaxed max-w-2xl mx-auto lg:mx-0 ${
              isMobile 
                ? 'text-sm sm:text-base px-2 sm:px-0' 
                : 'text-base sm:text-lg md:text-xl'
            }`}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={!isMobile ? { 
              color: 'rgba(255, 255, 255, 0.9)',
              transition: { duration: 0.3 }
            } : {}}
          >
            Crafting digital experiences with cutting-edge technology. 
            Specializing in full-stack development with a passion for clean code, 
            innovative solutions, and user-centric design.
          </motion.p>

          {/* Enhanced Tech Stack Highlights - Responsive */}
          <motion.div 
            className={`flex flex-wrap gap-2 sm:gap-3 ${isMobile ? 'justify-center lg:justify-start px-2' : 'justify-center lg:justify-start'}`}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            transition={{ delay: 0.8 }}
          >
            {['C#', '.NET', 'React', 'TypeScript', 'Azure'].map((tech, index) => (
              <motion.span
                key={tech}
                className={`px-3 py-1 rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 text-cyber-cyan border border-cyber-cyan/30 font-rajdhani font-medium transition-all duration-300 touch-manipulation ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={!isMobile ? {
                  scale: 1.05,
                  backgroundColor: 'rgba(0, 240, 255, 0.1)',
                  borderColor: 'rgba(0, 240, 255, 0.5)'
                } : {}}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Enhanced CTA Buttons - Mobile optimized */}
          <motion.div 
            className={`flex flex-col sm:flex-row gap-4 ${isMobile ? 'px-4' : ''} ${isMobile ? 'items-stretch' : 'items-center justify-center lg:justify-start'}`}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            transition={{ delay: 1 }}
          >
            <motion.a
              href="#projects"
              className={`group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-rajdhani font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyber-cyan/25 touch-manipulation ${
                isMobile ? 'px-6 py-3 text-base text-center' : 'px-8 py-4 text-lg'
              }`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.a>
            
            <motion.a
              href="#contact"
              className={`group relative overflow-hidden rounded-lg border-2 border-cyber-cyan/50 text-cyber-cyan font-rajdhani font-bold backdrop-blur-sm transition-all duration-300 hover:bg-cyber-cyan/10 hover:border-cyber-cyan hover:scale-105 touch-manipulation ${
                isMobile ? 'px-6 py-3 text-base text-center' : 'px-8 py-4 text-lg'
              }`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
              whileHover={!isMobile ? { 
                scale: 1.05,
                backgroundColor: 'rgba(0, 240, 255, 0.1)'
              } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get In Touch</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Enhanced Visual Element/Avatar - Responsive */}
        <motion.div 
          className={`relative ${isMobile ? 'order-first mb-6' : ''} flex items-center justify-center`}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Animated Rings - Responsive sizing */}
          <motion.div 
            className={`absolute rounded-full border-2 border-cyber-cyan/30 ${
              isMobile ? 'w-48 h-48' : 'w-64 h-64 sm:w-80 sm:h-80'
            }`}
            animate={!isMobile ? {
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            } : { rotate: [0, 360] }}
            transition={!isMobile ? {
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            } : {
              rotate: { duration: 30, repeat: Infinity, ease: "linear" }
            }}
          />
          <motion.div 
            className={`absolute rounded-full border-2 border-cyber-magenta/30 ${
              isMobile ? 'w-36 h-36' : 'w-48 h-48 sm:w-64 sm:h-64'
            }`}
            animate={!isMobile ? {
              rotate: [360, 0],
              scale: [1, 0.9, 1],
            } : { rotate: [360, 0] }}
            transition={!isMobile ? {
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            } : {
              rotate: { duration: 25, repeat: Infinity, ease: "linear" }
            }}
          />
          
          {/* Central Avatar/Logo */}
          <motion.div 
            className={`relative bg-gradient-to-br from-dark-card to-dark-surface rounded-full border-4 border-cyber-cyan/50 flex items-center justify-center backdrop-blur-lg ${
              isMobile ? 'w-24 h-24' : 'w-32 h-32 sm:w-40 sm:h-40'
            }`}
            animate={!isMobile ? {
              boxShadow: [
                "0 0 20px rgba(0, 240, 255, 0.3)",
                "0 0 40px rgba(0, 240, 255, 0.6)",
                "0 0 20px rgba(0, 240, 255, 0.3)",
              ]
            } : {}}
            transition={!isMobile ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
            whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : {}}
          >
            <span className={`font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta ${
              isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'
            }`}>
              AL
            </span>
          </motion.div>

          {/* Floating Particles around avatar - Reduced on mobile */}
          {!isMobile && [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyber-cyan rounded-full opacity-60"
              style={{
                top: `${20 + Math.sin(i * Math.PI / 3) * 40}%`,
                left: `${20 + Math.cos(i * Math.PI / 3) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5],
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator - Mobile optimized */}
      <motion.div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center ${isMobile ? 'text-xs' : 'text-sm'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="text-white/60 font-rajdhani mb-2"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isMobile ? 'Swipe to explore' : 'Scroll to explore'}
        </motion.div>
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto relative"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <motion.div
            className="w-1 h-2 bg-cyber-cyan rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
