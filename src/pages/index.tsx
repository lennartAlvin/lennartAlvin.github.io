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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Particle Background */}
      <ParticleBackground />

      {/* Dark Mode Toggle */}
      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 hover:from-cyber-cyan/30 hover:to-cyber-blue/30 border border-cyber-cyan/30 backdrop-blur-sm transition-all duration-300 group"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
        }}
      >
        <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">
          {isDarkMode ? '🌞' : '🌙'}
        </span>
      </motion.button>

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills isDark={isDarkMode} />
        <Projects isDark={isDarkMode} />
        <Contact />
      </main>

      <motion.footer
        className="relative z-10 py-12 text-center border-t border-cyber-cyan/20 backdrop-blur-sm bg-dark-surface/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="absolute inset-0 cyber-grid opacity-5" />
        <div className="relative z-10">
          <p className="text-white/70 font-rajdhani text-lg mb-4">
            © {new Date().getFullYear()} Alvin Lennarthsson. All rights reserved.
          </p>
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
