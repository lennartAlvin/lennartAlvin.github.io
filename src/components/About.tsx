import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scrollFadeInUp, scrollSlideInLeft, scrollSlideInRight, cardFlipIn, magneticHover, glowOnHover, staggerFadeInUp } from '@/utils/animations';
import { FaUser, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaCode, FaRocket } from 'react-icons/fa';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  delay: number;
  index: number;
}

function InfoCard({ icon, title, content, delay, index }: InfoCardProps) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      className="relative group cursor-pointer"
      {...cardFlipIn}
      transition={{ delay: delay + 0.2, duration: 0.8 }}
      whileHover={{
        ...magneticHover,
        ...glowOnHover,
      }}
    >
      {/* Enhanced Background Effects */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-cyber-magenta/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        animate={{
          background: [
            'linear-gradient(to right, rgba(0, 240, 255, 0.2), rgba(255, 0, 200, 0.2))',
            'linear-gradient(to right, rgba(255, 0, 200, 0.2), rgba(0, 255, 128, 0.2))',
            'linear-gradient(to right, rgba(0, 255, 128, 0.2), rgba(0, 240, 255, 0.2))',
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="relative p-6 rounded-xl backdrop-blur-lg bg-gradient-to-br from-dark-card/90 via-dark-surface/70 to-dark-card/90 border border-cyber-cyan/20 group-hover:border-cyber-cyan/40 transition-all duration-300 overflow-hidden"
        whileHover={{ 
          borderColor: 'rgba(0, 240, 255, 0.6)',
          backgroundColor: 'rgba(30, 30, 30, 0.95)'
        }}
      >
        {/* Animated Corner Accents */}
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
        
        <div className="flex items-center space-x-4 mb-3">
          <motion.div 
            className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center relative overflow-hidden"
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 1), rgba(0, 128, 255, 1))'
            }}
            transition={{ duration: 0.3 }}
          >
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
            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
          </motion.div>
          <motion.h3 
            className="text-lg font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            {title}
          </motion.h3>
        </div>
        <motion.p 
          className="text-white/80 font-rajdhani leading-relaxed"
          whileHover={{ color: 'rgba(255, 255, 255, 0.95)' }}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.p>
        
        {/* Floating Particles */}
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
      </motion.div>
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
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {/* Enhanced Background Elements */}
      <motion.div 
        className="absolute inset-0 cyber-grid opacity-5"
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px', '0px 0px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-cyber-cyan/10 to-cyber-blue/10 rounded-full blur-xl"
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-cyber-magenta/10 to-cyber-purple/10 rounded-full blur-xl"
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16"
          {...scrollFadeInUp}
        >
          <motion.h2 
            className="text-5xl font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            About Me
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-magenta mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.p 
            className="mt-6 text-lg text-white/70 font-rajdhani max-w-3xl mx-auto"
            {...scrollFadeInUp}
            transition={{ delay: 0.3 }}
            whileHover={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              scale: 1.02
            }}
          >
            Crafting digital experiences through code, innovation, and continuous learning
          </motion.p>
        </motion.div>

        {/* Enhanced Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          {...staggerFadeInUp}
        >
          {personalInfo.map((info, index) => (
            <InfoCard
              key={info.title}
              icon={info.icon}
              title={info.title}
              content={info.content}
              delay={index * 0.1}
              index={index}
            />
          ))}
        </motion.div>

        {/* Enhanced Philosophy Section */}
        <motion.div
          className="text-center"
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div 
            className="max-w-4xl mx-auto p-8 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/50 via-dark-surface/30 to-dark-card/50 border border-cyber-green/20 relative overflow-hidden group"
            whileHover={{
              borderColor: 'rgba(0, 255, 128, 0.5)',
              boxShadow: '0 20px 40px rgba(0, 255, 128, 0.2)',
              scale: 1.02
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyber-green/5 to-cyber-cyan/5 opacity-0 group-hover:opacity-100"
              initial={false}
              transition={{ duration: 0.5 }}
            />
            
            {/* Corner Decorations */}
            <motion.div
              className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyber-green opacity-30"
              animate={{
                borderColor: ['rgba(0, 255, 128, 0.3)', 'rgba(0, 240, 255, 0.3)', 'rgba(0, 255, 128, 0.3)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyber-cyan opacity-30"
              animate={{
                borderColor: ['rgba(0, 240, 255, 0.3)', 'rgba(0, 255, 128, 0.3)', 'rgba(0, 240, 255, 0.3)']
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
            
            <div className="relative z-10">
              <motion.div 
                className="flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-green to-cyber-cyan flex items-center justify-center relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 128, 0.3)',
                      '0 0 40px rgba(0, 255, 128, 0.6)',
                      '0 0 20px rgba(0, 255, 128, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <FaCode className="text-white text-2xl relative z-10" />
                </motion.div>
              </motion.div>
              
              <motion.h3 
                className="text-2xl font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-cyan"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                My Philosophy
              </motion.h3>
              
              <motion.p 
                className="text-lg text-white/80 font-rajdhani leading-relaxed"
                whileHover={{ 
                  color: 'rgba(255, 255, 255, 0.95)',
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                I believe in writing code that not only works but stands the test of time. 
                My approach combines technical excellence with practical problem-solving, 
                always keeping user experience and system maintainability at the forefront. 
                Whether it's integrating complex APIs or architecting scalable solutions, 
                I strive to deliver software that makes a real difference.
              </motion.p>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyber-green rounded-full opacity-20"
                  style={{
                    top: `${15 + i * 20}%`,
                    left: `${10 + i * 15}%`,
                  }}
                  animate={{
                    y: [-15, 15, -15],
                    x: [-8, 8, -8],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
