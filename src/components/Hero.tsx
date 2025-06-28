import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMobile } from '@/hooks/useMobile';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { useInterval } from '@/hooks/useInterval';
import { useTypewriter } from '@/hooks/useTypewriter';

export default function Hero() {
  const [glitchActive, setGlitchActive] = useState(false);
  
  const { isMobile, isClient } = useMobile();
  const {
    heroEntrance,
    floatingOrb,
    complexFloating,
    staggerContainer,
    fadeInUp,
    scrollFadeInUp,
    getHoverProps,
    getOptimizedClasses,
    getViewportConfig,
    getMobileDuration,
  } = useOptimizedAnimations();

  const roles = ['Software Developer', 'Full-Stack Engineer', 'Problem Solver', 'Code Architect'];

  const typedText = useTypewriter({
    words: roles,
    typeSpeed: getMobileDuration(120),
    deleteSpeed: getMobileDuration(120),
    pauseDuration: getMobileDuration(4000),
    isMobile,
  });

  useInterval(() => {
    if (!isClient) return;
    
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), getMobileDuration(200));
  }, isClient ? getMobileDuration(5000) : null);

  if (!isClient) {
    return (
      <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-cyber-cyan/20 rounded w-32 mx-auto mb-6"></div>
            <div className="h-16 bg-gradient-to-r from-cyber-cyan/20 to-cyber-magenta/20 rounded w-64 mx-auto mb-6"></div>
            <div className="h-6 bg-white/10 rounded w-48 mx-auto mb-4"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className={getOptimizedClasses(`relative min-h-screen flex items-center justify-center py-12 sm:py-20 overflow-hidden`)}
      {...heroEntrance}
      style={{ 
        minHeight: isMobile ? '100svh' : '100vh'
      }}
    >
      {/* Enhanced Cyber Grid Background */}
      <motion.div 
        className={`absolute inset-0 cyber-grid ${isMobile ? 'opacity-5' : 'opacity-10'}`}
      />
      
      {/* Enhanced Floating Orbs */}
      <motion.div 
        className={`absolute ${isMobile ? 'top-10 left-10 w-32 h-32' : 'top-20 left-20 w-64 h-64'} bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 rounded-full blur-3xl`}
        {...floatingOrb('subtle')}
      />
      <motion.div 
        className={`absolute ${isMobile ? 'bottom-10 right-10 w-48 h-48' : 'bottom-20 right-20 w-96 h-96'} bg-gradient-to-r from-cyber-magenta/20 to-cyber-purple/20 rounded-full blur-3xl`}
        {...complexFloating(
          [isMobile ? -8 : -15, isMobile ? 8 : 15, isMobile ? -8 : -15],
          [isMobile ? -15 : -30, isMobile ? 15 : 30, isMobile ? -15 : -30]
        )}
      />
      <motion.div 
        className={`absolute top-1/2 left-1/4 ${isMobile ? 'w-16 h-16' : 'w-32 h-32'} bg-gradient-to-r from-cyber-green/30 to-cyber-cyan/30 rounded-full blur-2xl`}
        {...floatingOrb('medium')}
        animate={{
          ...floatingOrb('medium').animate,
          rotate: [0, 360],
          transition: {
            ...floatingOrb('medium').animate.transition,
            rotate: { duration: getMobileDuration(20), repeat: Infinity, ease: "linear" }
          }
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        <motion.div 
          className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left"
          initial="initial"
          whileInView="animate"
          viewport={getViewportConfig()}
          variants={staggerContainer}
        >
          {/* Greeting with enhanced animation */}
          <motion.div 
            className="text-cyber-cyan font-rajdhani text-base sm:text-lg font-medium"
            {...fadeInUp}
            {...getHoverProps({ x: 10, transition: { duration: 0.3 } })}
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

          {/* Optimized Typed Role with Typewriter Effect */}
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
            <motion.div className="font-mono relative">
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
            {...scrollFadeInUp}
            transition={{ delay: 0.6 }}
          >
            Passionate about creating robust, scalable solutions with modern technologies. 
            Specializing in C#, .NET, and full-stack development with a focus on clean architecture and performance optimization.
          </motion.p>

          {/* Enhanced CTA Buttons - Mobile optimized */}
          <motion.div 
            className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-row space-x-4'} justify-center lg:justify-start`}
            {...scrollFadeInUp}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="#projects"
              className={`group relative overflow-hidden ${isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-4 text-base'} rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-rajdhani font-bold transition-all duration-300 hover:from-cyber-blue hover:to-cyber-cyan transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-cyan/25 touch-manipulation`}
              whileHover={!isMobile ? { y: -2 } : {}}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.a>
            
            <motion.a
              href="#contact"
              className={`group ${isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-4 text-base'} rounded-lg border-2 border-cyber-cyan text-cyber-cyan font-rajdhani font-bold hover:bg-cyber-cyan hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-cyan/25 touch-manipulation`}
              whileHover={!isMobile ? { y: -2 } : {}}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Enhanced Avatar Section - Responsive */}
        <motion.div 
          className="flex justify-center lg:justify-end"
          {...scrollFadeInUp}
          transition={{ delay: 1 }}
        >
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
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${isMobile ? 'scale-75' : ''}`}
        animate={{
          y: [0, 10, 0],
          opacity: 1,
        }}
        initial={{ opacity: 0 }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          opacity: { delay: 2, duration: 0.5 }
        }}
      >
        <div className="w-6 h-10 border-2 border-cyber-cyan/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-cyber-cyan rounded-full mt-2"
            animate={{
              y: [0, 16, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
