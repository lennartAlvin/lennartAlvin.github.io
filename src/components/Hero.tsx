import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [typedText, setTypedText] = useState('');
  const roles = ['Software Developer', 'Full-Stack Engineer', 'Problem Solver', 'Code Architect'];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
            }, 50);
          }, 2000);
        }
      }, 100);
    };

    typeRole();
  }, [currentRole]);

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyber-magenta/20 to-cyber-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-cyber-green/30 to-cyber-cyan/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '-4s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div className="space-y-8" variants={fadeInUp}>
          {/* Greeting */}
          <motion.div 
            className="text-cyber-cyan font-rajdhani text-lg font-medium"
            variants={fadeInUp}
          >
            Hello, I'm
          </motion.div>

          {/* Main Title with Glitch Effect */}
          <motion.h1 
            className={`text-6xl md:text-8xl font-bold font-orbitron leading-tight ${
              glitchActive ? 'animate-glitch' : ''
            }`}
            variants={fadeInUp}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta">
              Alvin
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-magenta via-cyber-pink to-cyber-cyan">
              Lennarthsson
            </span>
          </motion.h1>

          {/* Typed Role */}
          <motion.div 
            className="text-2xl md:text-3xl font-rajdhani text-white/80 h-12 flex items-center"
            variants={fadeInUp}
          >
            <span className="text-cyber-green mr-2">{'>'}</span>
            <span className="font-mono">{typedText}</span>
            <span className="animate-cursor-blink text-cyber-cyan ml-1">|</span>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-white/70 font-rajdhani leading-relaxed max-w-2xl"
            variants={fadeInUp}
          >
            Crafting digital experiences with cutting-edge technology. 
            Specializing in full-stack development with a passion for clean code, 
            innovative solutions, and user-centric design.
          </motion.p>

          {/* Tech Stack Highlights */}
          <motion.div 
            className="flex flex-wrap gap-3"
            variants={fadeInUp}
          >
            {['React', 'TypeScript', 'Node.js', 'Python', 'C#', '.NET'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 text-cyber-cyan border border-cyber-cyan/30 font-rajdhani font-medium backdrop-blur-sm hover:from-cyber-cyan/30 hover:to-cyber-blue/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6"
            variants={fadeInUp}
          >
            <motion.button
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-rajdhani font-bold text-lg border border-cyber-cyan/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span>View My Work</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-lg bg-transparent text-cyber-magenta font-rajdhani font-bold text-lg border border-cyber-magenta hover:bg-cyber-magenta/10 hover:shadow-[0_0_30px_rgba(255,0,200,0.3)] transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced Profile Section */}
        <motion.div 
          className="relative flex justify-center"
          variants={fadeInUp}
        >
          {/* Rotating Border */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple animate-spin-slow opacity-50" 
               style={{ width: '320px', height: '320px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-magenta/20 blur-xl" 
               style={{ width: '280px', height: '280px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          
          <motion.div
            className="relative z-10 w-64 h-64 rounded-full overflow-hidden border-4 border-cyber-cyan/50 shadow-2xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 50px rgba(0,240,255,0.5), 0 0 100px rgba(161,0,255,0.3)'
            }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/profile.jpg"
              alt="Alvin Lennarthsson"
              className="w-full h-full object-cover"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-cyan/20 via-transparent to-cyber-magenta/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* Floating Particles around profile */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyber-cyan rounded-full"
                style={{
                  top: `${20 + (i * 10)}%`,
                  left: `${30 + (i * 5)}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-cyber-cyan/50 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-cyber-cyan rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <p className="text-cyber-cyan/70 text-sm font-rajdhani mt-2 text-center">Scroll</p>
      </motion.div>
    </motion.section>
  );
}
