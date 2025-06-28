import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaDownload, 
  FaPaperPlane, 
  FaCheck, 
  FaTimes, 
  FaSpinner 
} from 'react-icons/fa';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { emailConfig } from '@/utils/emailConfig';
import { useMobile } from '@/hooks/useMobile';

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
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center space-x-4 rounded-xl backdrop-blur-lg bg-gradient-to-br from-dark-card/70 via-dark-surface/50 to-dark-card/70 border border-white/10 transition-all duration-300 hover:border-white/20 hover:bg-white/5 touch-manipulation ${
        isMobile ? 'p-4' : 'p-6'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={!isMobile ? { 
        scale: 1.02,
        boxShadow: `0 10px 30px ${color}30`
      } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <div 
        className={`flex-shrink-0 ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}10)` }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h4 className={`font-rajdhani font-bold text-white group-hover:text-cyber-cyan transition-colors duration-300 ${
          isMobile ? 'text-base' : 'text-lg'
        }`}>
          {title}
        </h4>
        <p className={`text-white/70 font-rajdhani group-hover:text-white/80 transition-colors duration-300 ${
          isMobile ? 'text-sm' : 'text-base'
        }`}>
          {subtitle}
        </p>
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
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <label className={`block font-rajdhani font-medium text-cyber-cyan ${
        isMobile ? 'text-sm' : 'text-base'
      }`}>
        {label}
      </label>
      <Component
        {...register(name, {
          required: `${label} is required`,
          ...(name === 'email' && {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })
        })}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg bg-dark-surface/50 border border-white/20 text-white placeholder-white/50 font-rajdhani focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/20 focus:outline-none transition-all duration-300 backdrop-blur-sm ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
        } ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3 text-base'} ${
          isTextarea ? (isMobile ? 'min-h-[80px] resize-y' : 'min-h-[120px] resize-y') : ''
        }`}
        {...(isTextarea && { rows: isMobile ? 3 : 4 })}
      />
      {error && (
        <motion.p
          className={`text-red-400 font-rajdhani ${isMobile ? 'text-xs' : 'text-sm'}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const { isMobile } = useMobile();
  const form = useRef<HTMLFormElement>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  const contactMethods = [
    {
      icon: <FaGithub className={`${isMobile ? 'text-lg' : 'text-xl'} text-white`} />,
      title: "GitHub",
      subtitle: "Check out my repositories",
      link: "https://github.com/lennartAlvin",
      color: "#00f0ff"
    },
    {
      icon: <FaLinkedin className={`${isMobile ? 'text-lg' : 'text-xl'} text-white`} />,
      title: "LinkedIn", 
      subtitle: "Connect with me professionally",
      link: "https://www.linkedin.com/in/alvin-lennarthsson-b80637266/",
      color: "#a100ff"
    },
    {
      icon: <FaEnvelope className={`${isMobile ? 'text-lg' : 'text-xl'} text-white`} />,
      title: "Email",
      subtitle: "alvin.lennarthsson@hotmail.com",
      link: "mailto:alvin.lennarthsson@hotmail.com",
      color: "#00ff80"
    },
    {
      icon: <FaMapMarkerAlt className={`${isMobile ? 'text-lg' : 'text-xl'} text-white`} />,
      title: "Location",
      subtitle: "Alingsås, Sweden",
      link: "https://maps.google.com/?q=Alingsås,Sweden",
      color: "#ff6b6b"
    },
  ];

  const onSubmit = async (data: FormData) => {
    setFormStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      const result = await emailjs.sendForm(
        emailConfig.serviceId,
        emailConfig.templateId,
        form.current!,
        emailConfig.publicKey
      );

      if (result.status === 200) {
        setFormStatus({ 
          type: 'success', 
          message: 'Message sent successfully! I\'ll get back to you soon.' 
        });
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
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
                  placeholder="Tell me about your project or just say hello!"
                  isTextarea={true}
                  isMobile={isMobile}
                />

                <motion.button
                  type="submit"
                  disabled={formStatus.type === 'loading'}
                  className={`w-full inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-rajdhani font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyber-blue hover:to-cyber-cyan touch-manipulation ${
                    isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'
                  }`}
                  whileHover={!isMobile && formStatus.type !== 'loading' ? { 
                    scale: 1.02,
                    boxShadow: '0 10px 30px rgba(0, 240, 255, 0.4)'
                  } : {}}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {formStatus.type === 'loading' ? (
                    <FaSpinner className={`animate-spin ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  ) : (
                    <FaPaperPlane className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                  )}
                  <span>
                    {formStatus.type === 'loading' ? 'Sending...' : 'Send Message'}
                  </span>
                </motion.button>

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
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
