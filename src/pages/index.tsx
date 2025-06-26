import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Head>
        <title>Alvin Lennarthsson - Software Developer</title>
        <meta name="description" content="Portfolio of Alvin Lennarthsson - Software Developer specializing in C#, .NET, and API integration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        {/* Dark Mode Toggle */}
        <motion.button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </motion.button>

        <Hero />
        <About />
        <Skills isDark={isDarkMode} />
        <Projects isDark={isDarkMode} />
        <Contact />
      </main>

      <motion.footer
        className="py-8 text-center text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>© {new Date().getFullYear()} Alvin Lennarthsson. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}
