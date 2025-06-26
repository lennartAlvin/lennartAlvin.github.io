import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone, FaDownload, FaPaperPlane, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { emailConfig, createEmailTemplate } from '@/utils/emailConfig';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  link: string;
  delay: number;
  color: string;
  isMobile: boolean;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

function ContactCard({ icon, title, subtitle, link, delay, color, isMobile }: ContactCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={link}
      target={link.startsWith('http') ? '_blank' : undefined}
      rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="block relative group cursor-pointer touch-manipulation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: isMobile ? 0.4 : 0.6 }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      whileHover={!isMobile ? { y: -5, scale: 1.02 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`absolute inset-0 ${color} rounded-xl blur-sm ${isMobile ? 'opacity-20' : 'opacity-0 group-hover:opacity-30'} transition-opacity duration-300`} />
      
      <div className={`relative rounded-xl backdrop-blur-lg bg-gradient-to-br from-dark-card/90 via-dark-surface/70 to-dark-card/90 border border-cyber-cyan/20 group-hover:border-cyber-cyan/40 transition-all duration-300 ${
        isMobile ? 'p-4' : 'p-4 sm:p-6'
      }`}>
        <div className={`flex items-center ${isMobile ? 'space-x-3' : 'space-x-3 sm:space-x-4'}`}>
          <div className={`rounded-lg ${color} flex items-center justify-center transition-transform duration-300 ${!isMobile ? 'group-hover:scale-110' : ''} ${
            isMobile ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-12 h-12 sm:w-14 sm:h-14'
          }`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta truncate ${
              isMobile ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
            }`}>
              {title}
            </h3>
            <p className={`text-white/70 font-rajdhani truncate ${
              isMobile ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
            }`}>
              {subtitle}
            </p>
          </div>
          <motion.div
            className={`text-cyber-cyan transition-opacity duration-300 flex-shrink-0 ${isMobile ? 'opacity-60' : 'opacity-0 group-hover:opacity-100'}`}
            animate={isHovered && !isMobile ? { x: 5 } : { x: 0 }}
          >
            →
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}

function FormField({ 
  label, 
  name, 
  type = 'text', 
  register, 
  error, 
  placeholder,
  isTextarea = false,
  isMobile = false
}: {
  label: string;
  name: keyof FormData;
  type?: string;
  register: any;
  error?: string;
  placeholder: string;
  isTextarea?: boolean;
  isMobile?: boolean;
}) {
  const Component = isTextarea ? 'textarea' : 'input';
  
  return (
    <div className="space-y-2">
      <label className={`block font-medium text-cyber-cyan font-rajdhani ${
        isMobile ? 'text-sm' : 'text-sm'
      }`}>
        {label}
      </label>
      <Component
        {...register(name, {
          required: `${label} is required`,
          ...(name === 'email' && {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })
        })}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg bg-dark-surface/50 border backdrop-blur-sm font-rajdhani text-white placeholder-white/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 touch-manipulation ${
          error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-cyber-cyan/30 focus:border-cyber-cyan'
        } ${isTextarea ? 'min-h-[120px] resize-vertical' : ''} ${
          isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3 text-base'
        }`}
        {...(isTextarea && { rows: isMobile ? 4 : 5 })}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-red-400 font-rajdhani flex items-center space-x-1 ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}
          >
            <FaTimes className="text-xs" />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const [isMobile, setIsMobile] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();

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

  const contactMethods = [
    {
      icon: <FaEnvelope className={`text-white ${isMobile ? 'text-sm sm:text-lg' : 'text-lg sm:text-xl'}`} />,
      title: "Email",
      subtitle: "alvin.lennarthsson.dev@gmail.com",
      link: "mailto:alvin.lennarthsson.dev@gmail.com",
      color: "bg-gradient-to-br from-cyber-cyan to-cyber-blue",
    },
    {
      icon: <FaLinkedin className={`text-white ${isMobile ? 'text-sm sm:text-lg' : 'text-lg sm:text-xl'}`} />,
      title: "LinkedIn",
      subtitle: "Professional Network",
      link: "https://www.linkedin.com/in/alvin-lennarthsson-aab594220/",
      color: "bg-gradient-to-br from-cyber-blue to-cyber-purple",
    },
    {
      icon: <FaGithub className={`text-white ${isMobile ? 'text-sm sm:text-lg' : 'text-lg sm:text-xl'}`} />,
      title: "GitHub",
      subtitle: "Code Repository",
      link: "https://github.com/lennartAlvin",
      color: "bg-gradient-to-br from-cyber-purple to-cyber-magenta",
    },
    {
      icon: <FaMapMarkerAlt className={`text-white ${isMobile ? 'text-sm sm:text-lg' : 'text-lg sm:text-xl'}`} />,
      title: "Location",
      subtitle: "Alingsås, Sweden",
      link: "https://maps.google.com/?q=Alingsås,Sweden",
      color: "bg-gradient-to-br from-cyber-magenta to-cyber-pink",
    },
  ];

  const onSubmit = async (data: FormData) => {
    setFormStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      const templateParams = createEmailTemplate(data);

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        emailConfig.publicKey
      );

      setFormStatus({ 
        type: 'success', 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      });
      reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or contact me directly.' 
      });
    }

    setTimeout(() => {
      setFormStatus({ type: 'idle', message: '' });
    }, 5000);
  };

  const handleDownloadCV = () => {
    // TODO: Add actual CV download link
    window.open('/cv.pdf', '_blank');
  };

  return (
    <motion.section
      className={`relative ${isMobile ? 'py-12 px-4' : 'py-20 max-w-7xl mx-auto px-4'}`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {/* Enhanced Background Elements - Simplified on mobile */}
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

      {/* Floating Orbs - Reduced on mobile */}
      <motion.div
        className={`absolute ${isMobile ? 'top-5 right-5 w-16 h-16' : 'top-10 right-10 w-32 h-32'} bg-gradient-to-r from-cyber-green/10 to-cyber-cyan/10 rounded-full blur-xl`}
        animate={!isMobile ? {
          y: [-12, 12, -12],
          x: [-6, 6, -6],
          scale: [1, 1.15, 1],
        } : { scale: [1, 1.05, 1] }}
        transition={{
          duration: isMobile ? 4 : 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div 
          className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}
          variants={fadeInUp}
        >
          <motion.h2 
            className={`font-bold font-orbitron mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-green via-cyber-cyan to-cyber-blue ${
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
            Get In Touch
          </motion.h2>
          <motion.div 
            className={`h-1 bg-gradient-to-r from-cyber-green to-cyber-cyan mx-auto rounded-full ${
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
            Ready to start your next project? I'd love to hear about your ideas and 
            discuss how we can bring them to life. Let's create something amazing together!
          </motion.p>
        </motion.div>

        <div className={`grid gap-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {/* Contact Methods */}
          <motion.div 
            className="space-y-6"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <motion.h3 
              className={`font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-green ${
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
              Connect With Me
            </motion.h3>
            
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-1'}`}>
              {contactMethods.map((method, index) => (
                <ContactCard
                  key={method.title}
                  icon={method.icon}
                  title={method.title}
                  subtitle={method.subtitle}
                  link={method.link}
                  delay={0.6 + index * 0.1}
                  color={method.color}
                  isMobile={isMobile}
                />
              ))}
            </div>

            {/* Download CV Button - Mobile optimized */}
            <motion.div 
              className="pt-6"
              variants={fadeInUp}
              transition={{ delay: 1 }}
            >
              <motion.button
                onClick={handleDownloadCV}
                className={`w-full inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-green/20 to-cyber-cyan/20 text-cyber-green hover:from-cyber-green/30 hover:to-cyber-cyan/30 border border-cyber-green/30 font-rajdhani font-bold transition-all duration-300 touch-manipulation ${
                  isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'
                }`}
                whileHover={!isMobile ? { 
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(0, 255, 128, 0.3)'
                } : {}}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                <span>Download CV</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className={`rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/70 via-dark-surface/50 to-dark-card/70 border border-cyber-cyan/20 overflow-hidden ${
              isMobile ? 'p-6' : 'p-8'
            }`}
            variants={fadeInUp}
            transition={{ delay: 0.8 }}
            whileHover={!isMobile ? {
              borderColor: 'rgba(0, 240, 255, 0.4)',
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)'
            } : {}}
          >
            <div className="absolute inset-0 cyber-grid opacity-5" />
            <div className="relative z-10">
              <motion.h3 
                className={`font-bold font-orbitron mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta ${
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
                Send Message
              </motion.h3>

              <form ref={form} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                  <FormField
                    label="Name"
                    name="name"
                    register={register}
                    error={errors.name?.message}
                    placeholder="Your full name"
                    isMobile={isMobile}
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email?.message}
                    placeholder="your.email@example.com"
                    isMobile={isMobile}
                  />
                </div>
                
                <FormField
                  label="Subject"
                  name="subject"
                  register={register}
                  error={errors.subject?.message}
                  placeholder="What's this about?"
                  isMobile={isMobile}
                />
                
                <FormField
                  label="Message"
                  name="message"
                  register={register}
                  error={errors.message?.message}
                  placeholder="Tell me about your project..."
                  isTextarea
                  isMobile={isMobile}
                />

                {/* Form Status */}
                <AnimatePresence>
                  {formStatus.type !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-lg border font-rajdhani flex items-center space-x-2 ${
                        formStatus.type === 'success' 
                          ? 'bg-cyber-green/10 border-cyber-green/30 text-cyber-green'
                          : formStatus.type === 'error'
                          ? 'bg-red-500/10 border-red-500/30 text-red-400'
                          : 'bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan'
                      } ${isMobile ? 'text-sm' : 'text-base'}`}
                    >
                      {formStatus.type === 'loading' && <FaSpinner className="animate-spin" />}
                      {formStatus.type === 'success' && <FaCheck />}
                      {formStatus.type === 'error' && <FaTimes />}
                      <span>{formStatus.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formStatus.type === 'loading'}
                  className={`w-full inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-rajdhani font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation ${
                    isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'
                  }`}
                  whileHover={!isMobile && formStatus.type !== 'loading' ? { 
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(0, 240, 255, 0.3)'
                  } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  {formStatus.type === 'loading' ? (
                    <>
                      <FaSpinner className={`animate-spin ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Additional CTA Section - Mobile optimized */}
        <motion.div 
          className={`text-center ${isMobile ? 'mt-12' : 'mt-16'}`}
          variants={fadeInUp}
          transition={{ delay: 1.2 }}
        >
          <motion.div 
            className={`rounded-2xl backdrop-blur-lg bg-gradient-to-br from-dark-card/50 via-dark-surface/30 to-dark-card/50 border border-cyber-green/20 overflow-hidden ${
              isMobile ? 'p-6 mx-2' : 'p-8 max-w-4xl mx-auto'
            }`}
            whileHover={!isMobile ? {
              borderColor: 'rgba(0, 255, 128, 0.4)',
              boxShadow: '0 0 30px rgba(0, 255, 128, 0.2)'
            } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 cyber-grid opacity-5" />
            <div className="relative z-10">
              <motion.h3 
                className={`font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-cyan ${
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
                Let's Build Something Great
              </motion.h3>
              <motion.p 
                className={`mb-6 text-white/80 font-rajdhani leading-relaxed ${
                  isMobile ? 'text-sm' : 'text-lg'
                }`}
                whileHover={!isMobile ? { color: 'rgba(255, 255, 255, 0.95)' } : {}}
              >
                Whether you have a specific project in mind or just want to explore possibilities, 
                I'm here to help turn your vision into reality. Every great project starts with a conversation.
              </motion.p>
              
              <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6'}`}>
                <motion.a
                  href="mailto:alvin.lennarthsson.dev@gmail.com"
                  className={`inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-green/20 to-cyber-cyan/20 text-cyber-green hover:from-cyber-green/30 hover:to-cyber-cyan/30 border border-cyber-green/30 font-rajdhani font-bold transition-all duration-300 touch-manipulation ${
                    isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'
                  }`}
                  whileHover={!isMobile ? { 
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(0, 255, 128, 0.3)'
                  } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                  <span>Quick Email</span>
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/in/alvin-lennarthsson-aab594220/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-rajdhani font-bold transition-all duration-300 touch-manipulation ${
                    isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'
                  }`}
                  whileHover={!isMobile ? { 
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(0, 240, 255, 0.3)'
                  } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                  <span>Connect on LinkedIn</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
