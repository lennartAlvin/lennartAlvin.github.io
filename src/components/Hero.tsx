import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, heroEntrance, scrollFadeInUp, parallaxFloat, parallaxSlow, typewriterEffect } from '@/utils/animations';
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
      {...heroEntrance}
    >
      {/* Enhanced Cyber Grid Background with Parallax */}
      <motion.div 
        className="absolute inset-0 cyber-grid opacity-10"
        {...parallaxSlow}
      />
      
      {/* Enhanced Floating Orbs with Parallax */}
      <motion.div 
        className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 rounded-full blur-3xl"
        {...parallaxFloat}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyber-magenta/20 to-cyber-purple/20 rounded-full blur-3xl"
        animate={{
          y: [-30, 30, -30],
          x: [-15, 15, -15],
          scale: [1, 1.1, 1],
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-cyber-green/30 to-cyber-cyan/30 rounded-full blur-2xl"
        animate={{
          y: [-15, 15, -15],
          rotate: [0, 360],
          transition: {
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        <motion.div 
          className="space-y-6 sm:space-y-8 text-center lg:text-left"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Greeting with enhanced animation */}
          <motion.div 
            className="text-cyber-cyan font-rajdhani text-lg font-medium"
            {...scrollFadeInUp}
            whileHover={{ x: 10, transition: { duration: 0.3 } }}
          >
            Hello, I'm
          </motion.div>

          {/* Main Title with Enhanced Glitch Effect */}
          <motion.h1 
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-orbitron leading-tight ${
              glitchActive ? 'animate-glitch' : ''
            }`}
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2 
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Alvin
            </motion.span>
            <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-magenta via-cyber-pink to-cyber-cyan"
              animate={{
                backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Lennarthsson
            </motion.span>
          </motion.h1>

          {/* Enhanced Typed Role with Typewriter Effect */}
          <motion.div 
            className="text-xl sm:text-2xl md:text-3xl font-rajdhani text-white/80 h-10 sm:h-12 flex items-center justify-center lg:justify-start overflow-hidden"
            {...scrollFadeInUp}
            transition={{ delay: 0.4 }}
          >
            <span className="text-cyber-green mr-2">{'>'}</span>
            <motion.div
              className="font-mono relative"
              {...typewriterEffect}
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

          {/* Enhanced Description */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white/70 font-rajdhani leading-relaxed max-w-2xl mx-auto lg:mx-0"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              transition: { duration: 0.3 }
            }}
          >
            Crafting digital experiences with cutting-edge technology. 
            Specializing in full-stack development with a passion for clean code, 
            innovative solutions, and user-centric design.
          </motion.p>

          {/* Enhanced Tech Stack Highlights */}
          <motion.div 
            className="flex flex-wrap gap-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.8,
                }
              }
            }}
          >
            {['React', 'TypeScript', 'Node.js', 'Python', 'C#', '.NET'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 text-cyber-cyan border border-cyber-cyan/30 font-rajdhani font-medium backdrop-blur-sm cursor-pointer"
                variants={{
                  initial: { opacity: 0, y: 20, scale: 0.8 },
                  animate: { opacity: 1, y: 0, scale: 1 }
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  boxShadow: '0 10px 30px rgba(0, 240, 255, 0.3)',
                  background: 'linear-gradient(to right, rgba(0, 240, 255, 0.3), rgba(0, 128, 255, 0.3))',
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-rajdhani font-bold text-lg border border-cyber-cyan/50 group relative overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: '0 20px 40px rgba(0,240,255,0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <span className="relative flex items-center space-x-2">
                <span>View My Work</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-lg bg-transparent text-cyber-magenta font-rajdhani font-bold text-lg border border-cyber-magenta relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: '0 20px 40px rgba(255,0,200,0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-cyber-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <span className="relative">Get In Touch</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced Profile Section with Advanced Effects */}
        <motion.div 
          className="relative flex justify-center"
          initial={{ x: 100, opacity: 0, scale: 0.8 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Enhanced Rotating Border with Multiple Layers */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple opacity-50" 
            style={{ width: '320px', height: '320px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-r from-cyber-purple via-cyber-green to-cyber-cyan opacity-30" 
            style={{ width: '340px', height: '340px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Enhanced Inner Glow */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-magenta/20 blur-xl" 
            style={{ width: '280px', height: '280px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="relative z-10 w-64 h-64 rounded-full overflow-hidden border-4 border-cyber-cyan/50 shadow-2xl"
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              boxShadow: '0 0 50px rgba(0,240,255,0.5), 0 0 100px rgba(161,0,255,0.3)',
              transition: { duration: 0.3 }
            }}
            animate={{
              y: [-5, 5, -5],
            }}
            transition={{
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img
              src="/profile.jpg"
              alt="Alvin Lennarthsson"
              className="w-full h-full object-cover"
            />
            {/* Enhanced Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-cyber-cyan/20 via-transparent to-cyber-magenta/20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Enhanced Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyber-cyan rounded-full"
                style={{
                  top: `${10 + (i * 7)}%`,
                  left: `${20 + (i * 6)}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 4 + (i * 0.5),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-2 text-cyber-cyan/70 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1, color: '#00f0ff' }}
        >
          <span className="text-sm font-rajdhani">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border-2 border-cyber-cyan/50 rounded-full relative"
            whileHover={{ borderColor: '#00f0ff' }}
          >
            <motion.div
              className="w-1 h-3 bg-cyber-cyan rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
