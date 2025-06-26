import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone, FaDownload } from 'react-icons/fa';
import { useState } from 'react';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  link: string;
  delay: number;
  color: string;
}

function ContactCard({ icon, title, subtitle, link, delay, color }: ContactCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={link}
      target={link.startsWith('http') ? '_blank' : undefined}
      rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="block relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`absolute inset-0 ${color} rounded-xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
      
      <div className="relative p-6 rounded-xl backdrop-blur-lg bg-gradient-to-br from-dark-card/90 via-dark-surface/70 to-dark-card/90 border border-cyber-cyan/20 group-hover:border-cyber-cyan/40 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 rounded-lg ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta">
              {title}
            </h3>
            <p className="text-white/70 font-rajdhani">
              {subtitle}
            </p>
          </div>
          <motion.div
            className="text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={isHovered ? { x: 5 } : { x: 0 }}
          >
            →
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const contactMethods = [
    {
      icon: <FaEnvelope className="text-white text-xl" />,
      title: "Email",
      subtitle: "alvin.lennarthsson@gmail.com",
      link: "mailto:alvin.lennarthsson@gmail.com",
      color: "bg-gradient-to-br from-cyber-cyan to-cyber-blue",
    },
    {
      icon: <FaLinkedin className="text-white text-xl" />,
      title: "LinkedIn",
      subtitle: "Professional Network",
      link: "https://www.linkedin.com/in/alvin-lennarthsson-aab594220/",
      color: "bg-gradient-to-br from-cyber-blue to-cyber-purple",
    },
    {
      icon: <FaGithub className="text-white text-xl" />,
      title: "GitHub",
      subtitle: "Code Repository",
      link: "https://github.com/lennartAlvin",
      color: "bg-gradient-to-br from-cyber-purple to-cyber-magenta",
    },
    {
      icon: <FaMapMarkerAlt className="text-white text-xl" />,
      title: "Location",
      subtitle: "Alingsås, Sweden",
      link: "https://maps.google.com/?q=Alingsås,Sweden",
      color: "bg-gradient-to-br from-cyber-magenta to-cyber-pink",
    },
  ];

  return (
    <motion.section
      className="py-20 relative max-w-7xl mx-auto px-4"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="relative z-10">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-5xl font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-magenta mx-auto rounded-full" />
          <p className="mt-6 text-lg text-white/70 font-rajdhani max-w-3xl mx-auto">
            Ready to collaborate on your next project? Let's create something amazing together.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          variants={staggerContainer}
        >
          {contactMethods.map((method, index) => (
            <ContactCard
              key={method.title}
              icon={method.icon}
              title={method.title}
              subtitle={method.subtitle}
              link={method.link}
              delay={index * 0.1}
              color={method.color}
            />
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          variants={fadeInUp}
        >
          <div className="max-w-4xl mx-auto p-8 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/50 via-dark-surface/30 to-dark-card/50 border border-cyber-cyan/20">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className="text-left">
                <h3 className="text-2xl font-bold font-orbitron mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-cyan">
                  Let's Work Together
                </h3>
                <p className="text-white/80 font-rajdhani text-lg">
                  I'm always interested in hearing about new opportunities and exciting projects.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-rajdhani font-bold text-lg border border-cyber-cyan/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('mailto:alvin.lennarthsson@gmail.com', '_blank')}
                >
                  <span className="flex items-center space-x-2">
                    <FaEnvelope />
                    <span>Send Message</span>
                  </span>
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 rounded-lg bg-transparent text-cyber-magenta font-rajdhani font-bold text-lg border border-cyber-magenta hover:bg-cyber-magenta/10 hover:shadow-[0_0_30px_rgba(255,0,200,0.3)] transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <FaDownload />
                    <span>Download CV</span>
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyber-cyan rounded-full opacity-30"
              style={{
                top: `${20 + (i * 15)}%`,
                left: `${10 + (i * 15)}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
