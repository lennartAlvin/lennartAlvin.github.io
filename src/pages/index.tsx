import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import CustomCursor from '@/components/CustomCursor';
import ParticleBackground from '@/components/ParticleBackground';
import InteractiveBackground from '@/components/InteractiveBackground';
import { sectionFadeSlide } from '@/utils/animations';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === 'light') {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen relative ${isDarkMode ? 'dark' : ''}`}> 
      <Head>
        <title>Alvin Lennarthsson - Software Developer</title>
        <meta name="description" content="Portfolio of Alvin Lennarthsson - Software Developer specializing in C#, .NET, and API integration" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#00f0ff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>

      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Interactive Background - New advanced background */}
      <InteractiveBackground isDark={isDarkMode} />
      
      {/* Particle Background - Keep for additional ambiance */}
      <ParticleBackground />

      {/* Enhanced Dark Mode Toggle - Mobile optimized */}
      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 sm:p-3 rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 hover:from-cyber-cyan/30 hover:to-cyber-blue/30 border border-cyber-cyan/30 backdrop-blur-sm transition-all duration-300 group touch-manipulation"
        whileHover={{ 
          scale: 1.1, 
          y: -2,
          boxShadow: '0 0 30px rgba(0, 240, 255, 0.4)'
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.span 
          className="text-xl sm:text-2xl block"
          animate={{ rotate: isDarkMode ? 0 : 180 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </motion.span>
      </motion.button>

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />
        
        {/* About Section with Enhanced Transitions */}
        <motion.div
          {...sectionFadeSlide}
          className="relative"
        >
          <About />
        </motion.div>
        
        {/* Skills Section with Enhanced Transitions */}
        <motion.div
          {...sectionFadeSlide}
          className="relative"
        >
          <Skills isDark={isDarkMode} />
        </motion.div>
        
        {/* Projects Section with Enhanced Transitions */}
        <motion.div
          {...sectionFadeSlide}
          className="relative"
        >
          <Projects isDark={isDarkMode} />
        </motion.div>
        
        {/* Contact Section with Enhanced Transitions */}
        <motion.div
          {...sectionFadeSlide}
          className="relative"
        >
          <Contact />
        </motion.div>
      </main>

      {/* Enhanced Footer */}
      <motion.footer
        className="relative z-10 py-12 text-center border-t border-cyber-cyan/20 backdrop-blur-sm bg-dark-surface/50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="absolute inset-0 cyber-grid opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.p 
            className="text-white/70 font-rajdhani text-lg mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            © {new Date().getFullYear()} Alvin Lennarthsson. All rights reserved.
          </motion.p>
          
          {/* Enhanced Status Indicators */}
          <motion.div 
            className="flex justify-center items-center space-x-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-3 h-3 bg-cyber-green rounded-full"
                animate={{ 
                  boxShadow: [
                    '0 0 5px rgba(0, 255, 128, 0.5)',
                    '0 0 20px rgba(0, 255, 128, 0.8)',
                    '0 0 5px rgba(0, 255, 128, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-cyber-green font-rajdhani text-sm">Available for work</span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-3 h-3 bg-cyber-cyan rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-cyber-cyan font-rajdhani text-sm">Open to opportunities</span>
            </div>
          </motion.div>
          
          {/* Animated Dots */}
          <div className="flex justify-center space-x-6">
            <motion.span
              className="w-2 h-2 bg-cyber-cyan rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.span
              className="w-2 h-2 bg-cyber-magenta rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.span
              className="w-2 h-2 bg-cyber-green rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
