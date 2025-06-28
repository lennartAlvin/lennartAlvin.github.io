import { motion } from 'framer-motion';
import { createFloatingAnimation } from '@/utils/animations';

interface FloatingOrbProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size: 'small' | 'medium' | 'large';
  colors: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  intensity?: 'subtle' | 'medium' | 'strong';
  duration?: number;
  isMobile?: boolean;
  className?: string;
}

const sizeClasses = {
  small: 'w-16 h-16',
  medium: 'w-32 h-32', 
  large: 'w-64 h-64'
};

const mobileSizeClasses = {
  small: 'w-12 h-12',
  medium: 'w-16 h-16',
  large: 'w-32 h-32'
};

const positionClasses = {
  'top-left': 'top-10 left-10',
  'top-right': 'top-10 right-10', 
  'bottom-left': 'bottom-10 left-10',
  'bottom-right': 'bottom-10 right-10',
  'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
};

const mobilePositionClasses = {
  'top-left': 'top-5 left-5',
  'top-right': 'top-5 right-5',
  'bottom-left': 'bottom-5 left-5', 
  'bottom-right': 'bottom-5 right-5',
  'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
};

const blurClasses = {
  sm: 'blur-sm',
  md: 'blur-md',
  lg: 'blur-lg', 
  xl: 'blur-xl',
  '2xl': 'blur-2xl',
  '3xl': 'blur-3xl'
};

export default function FloatingOrb({
  position,
  size,
  colors,
  blur = 'xl',
  intensity = 'medium',
  duration = 6,
  isMobile = false,
  className = ''
}: FloatingOrbProps) {
  const animation = createFloatingAnimation(intensity, isMobile ? duration * 0.8 : duration);
  
  return (
    <motion.div
      className={`
        absolute 
        ${isMobile ? mobilePositionClasses[position] : positionClasses[position]}
        ${isMobile ? mobileSizeClasses[size] : sizeClasses[size]}
        ${colors}
        rounded-full 
        ${blurClasses[blur]}
        pointer-events-none
        ${className}
      `}
      {...animation}
    />
  );
} 