import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  gradient?: 'cyan-magenta' | 'cyan-purple-magenta' | 'cyan-green' | 'purple-magenta' | 'green-cyan';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  font?: 'orbitron' | 'rajdhani';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  animate?: boolean;
  isMobile?: boolean;
  className?: string;
}

const gradientClasses = {
  'cyan-magenta': 'from-cyber-cyan to-cyber-magenta',
  'cyan-purple-magenta': 'from-cyber-cyan via-cyber-purple to-cyber-magenta', 
  'cyan-green': 'from-cyber-cyan to-cyber-green',
  'purple-magenta': 'from-cyber-purple to-cyber-magenta',
  'green-cyan': 'from-cyber-green to-cyber-cyan'
};

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm', 
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl'
};

const mobileSizeClasses = {
  xs: 'text-xs',
  sm: 'text-xs',
  base: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
  '2xl': 'text-xl',
  '3xl': 'text-2xl',
  '4xl': 'text-3xl',
  '5xl': 'text-4xl',
  '6xl': 'text-5xl'
};

const fontClasses = {
  orbitron: 'font-orbitron',
  rajdhani: 'font-rajdhani'
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium', 
  semibold: 'font-semibold',
  bold: 'font-bold'
};

export default function GradientText({
  children,
  gradient = 'cyan-magenta',
  size = 'base',
  font = 'orbitron',
  weight = 'bold',
  animate = false,
  isMobile = false,
  className = ''
}: GradientTextProps) {
  const Component = animate ? motion.span : 'span';
  
  const animationProps = animate && !isMobile ? {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "linear"
    },
    style: {
      backgroundSize: '200% 200%',
    }
  } : {};

  return (
    <Component
      className={`
        ${fontClasses[font]} 
        ${weightClasses[weight]} 
        text-transparent 
        bg-clip-text 
        bg-gradient-to-r 
        ${gradientClasses[gradient]}
        ${isMobile ? mobileSizeClasses[size] : sizeClasses[size]}
        ${className}
      `}
      {...animationProps}
    >
      {children}
    </Component>
  );
} 