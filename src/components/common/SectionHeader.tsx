import { motion } from 'framer-motion';
import { useMobile } from '@/hooks/useMobile';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: string;
  className?: string;
}

export const SectionHeader = ({
  title,
  subtitle,
  gradient = 'from-cyber-purple via-cyber-magenta to-cyber-pink',
  className = '',
}: SectionHeaderProps) => {
  const { isMobile } = useMobile();
  const { fadeInUp } = useOptimizedAnimations();

  return (
    <motion.div 
      className={`text-center ${isMobile ? 'mb-8' : 'mb-16'} ${className}`}
      {...fadeInUp}
    >
      <motion.h2 
        className={`font-bold font-orbitron mb-6 text-transparent bg-clip-text bg-gradient-to-r ${gradient} ${
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
        {title}
      </motion.h2>
      
      <motion.div 
        className={`h-1 bg-gradient-to-r ${gradient} mx-auto rounded-full ${
          isMobile ? 'w-16' : 'w-24'
        }`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      
      {subtitle && (
        <motion.p 
          className={`mt-6 text-white/70 font-rajdhani max-w-3xl mx-auto leading-relaxed ${
            isMobile ? 'text-sm px-2' : 'text-lg'
          }`}
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ ...fadeInUp.transition, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}; 