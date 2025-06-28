import { ReactNode } from 'react';
import { useMobile } from '@/hooks/useMobile';

type BadgeVariant = 'tech' | 'category' | 'status' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  tech: 'bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 text-cyber-cyan border-cyber-cyan/30 hover:from-cyber-cyan/30 hover:to-cyber-purple/30',
  category: 'bg-cyber-magenta/20 text-cyber-magenta border-cyber-magenta/30',
  status: 'bg-cyber-green/20 text-cyber-green border-cyber-green/30',
  info: 'bg-white/10 text-white/60 border-white/20',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export const Badge = ({
  children,
  variant = 'tech',
  size = 'md',
  className = '',
}: BadgeProps) => {
  const { isMobile } = useMobile();

  const effectiveSize = isMobile ? 'sm' : size;

  const baseClasses = `
    inline-flex items-center rounded-full border
    font-rajdhani font-medium transition-all duration-300
    whitespace-nowrap
    ${sizeStyles[effectiveSize]}
    ${variantStyles[variant]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <span className={baseClasses}>
      {children}
    </span>
  );
}; 