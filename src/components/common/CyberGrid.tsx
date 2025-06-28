import { motion } from 'framer-motion';

interface CyberGridProps {
  opacity?: number;
  animate?: boolean;
  isMobile?: boolean;
  className?: string;
}

export default function CyberGrid({
  opacity = 0.05,
  animate = false,
  isMobile = false,
  className = ''
}: CyberGridProps) {
  const Component = animate && !isMobile ? motion.div : 'div';
  
  const animationProps = animate && !isMobile ? {
    animate: {
      backgroundPosition: ['0px 0px', '50px 50px', '0px 0px'],
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  } : {};

  return (
    <Component
      className={`
        absolute inset-0 cyber-grid 
        ${isMobile ? 'mobile-grid' : ''}
        ${className}
      `}
      style={{ 
        opacity: isMobile ? Math.max(opacity * 0.5, 0.02) : opacity 
      }}
      {...animationProps}
    />
  );
} 