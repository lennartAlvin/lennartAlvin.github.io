import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useMobile } from '@/hooks/useMobile';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 text-cyber-cyan hover:from-cyber-cyan/30 hover:to-cyber-blue/30 border-cyber-cyan/30',
  secondary: 'bg-gradient-to-r from-cyber-magenta/20 to-cyber-pink/20 text-cyber-magenta hover:from-cyber-magenta/30 hover:to-cyber-pink/30 border-cyber-magenta/30',
  ghost: 'bg-transparent text-white/70 hover:text-white hover:bg-white/5 border-white/20',
  danger: 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 hover:from-red-500/30 hover:to-red-600/30 border-red-500/30',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  onClick,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
}: ButtonProps) => {
  const { isMobile } = useMobile();
  const { getHoverProps } = useOptimizedAnimations();

  const baseClasses = `
    inline-flex items-center justify-center space-x-2 
    rounded-lg border font-rajdhani font-medium 
    transition-all duration-300 touch-manipulation
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${isMobile ? sizeStyles.sm : sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={isMobile ? 'w-3 h-3' : 'w-4 h-4'}>{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={isMobile ? 'w-3 h-3' : 'w-4 h-4'}>{icon}</span>
      )}
    </>
  );

  const motionProps = {
    className: baseClasses,
    whileTap: { scale: 0.95 },
    ...getHoverProps({ scale: 1.05 }),
    ...(disabled && { whileHover: {}, whileTap: {} }),
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}; 