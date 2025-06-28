import { useMemo } from 'react';
import { useMobile } from './useMobile';

interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  repeat?: number;
  repeatType?: 'loop' | 'reverse' | 'mirror';
}

interface OptimizedAnimationOptions {
  reducedMotion?: boolean;
  mobileMultiplier?: number;
}

export const useOptimizedAnimations = (options: OptimizedAnimationOptions = {}) => {
  const { isMobile, isClient } = useMobile();
  const { reducedMotion = false, mobileMultiplier = 0.6 } = options;

  const optimized = useMemo(() => {
    const shouldReduceMotion = reducedMotion || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const animationMultiplier = isMobile ? mobileMultiplier : 1;

    const createConfig = (config: AnimationConfig): AnimationConfig => {
      if (shouldReduceMotion) {
        return {
          ...config,
          duration: 0.01,
          delay: 0,
          repeat: 0,
        };
      }

      return {
        ...config,
        duration: config.duration ? config.duration * animationMultiplier : undefined,
        delay: config.delay ? config.delay * animationMultiplier : undefined,
      };
    };

    return {
      // Basic entrance animations
      fadeInUp: {
        initial: { y: isMobile ? 15 : 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: createConfig({ duration: 0.6, ease: "easeOut" }),
      },

      fadeInLeft: {
        initial: { x: isMobile ? -30 : -50, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: createConfig({ duration: 0.6, ease: "easeOut" }),
      },

      fadeInRight: {
        initial: { x: isMobile ? 30 : 50, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: createConfig({ duration: 0.6, ease: "easeOut" }),
      },

      scaleIn: {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: createConfig({ duration: 0.6, ease: "easeOut" }),
      },

      // Hero-specific animations
      heroEntrance: {
        initial: { opacity: 0, y: isMobile ? 20 : 30 },
        animate: { opacity: 1, y: 0 },
        transition: createConfig({ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }),
      },

      // Floating animations (mobile-optimized)
      floatingOrb: (intensity: 'subtle' | 'medium' | 'strong' = 'medium') => {
        const ranges = {
          subtle: isMobile ? [-5, 5] : [-10, 10],
          medium: isMobile ? [-10, 10] : [-20, 20],
          strong: isMobile ? [-15, 15] : [-30, 30],
        };
        const [min, max] = ranges[intensity];

        return {
          animate: {
            y: [min, max, min],
            transition: createConfig({
              duration: isMobile ? 4 : 6,
              repeat: Infinity,
              ease: "easeInOut",
            }),
          },
        };
      },

      complexFloating: (xRange: number[], yRange: number[], scale: number[] = [1, 1.05, 1]) => ({
        animate: {
          y: yRange,
          x: xRange,
          scale: isMobile ? [1, 1.02, 1] : scale,
          transition: createConfig({
            duration: isMobile ? 6 : 8,
            repeat: Infinity,
            ease: "easeInOut",
          }),
        },
      }),

      // Stagger container
      staggerContainer: {
        animate: {
          transition: {
            staggerChildren: isMobile ? 0.07 : 0.1,
            delayChildren: isMobile ? 0.05 : 0.1,
          },
        },
      },

      // Glitch effect
      glitchEffect: {
        animate: {
          x: [0, -2, 2, -2, 2, 0],
          transition: createConfig({
            duration: 0.5,
            ease: "easeInOut",
          }),
        },
      },

      // Typewriter effect
      typewriterBlink: {
        animate: {
          opacity: [0, 1, 0],
          transition: createConfig({
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }),
        },
      },

      // Hover effects (disabled on mobile)
      getHoverProps: (hoverConfig: any) => {
        if (isMobile || !isClient) return {};
        return {
          whileHover: hoverConfig,
        };
      },

      // Utility functions
      getMobileDuration: (desktopDuration: number) => 
        isMobile ? desktopDuration * mobileMultiplier : desktopDuration,

             getConditionalAnimation: (desktopAnim: any, mobileAnim: any = {}) =>
        isMobile ? { ...desktopAnim, ...mobileAnim } : desktopAnim,

      // Scroll fade animation (replaces scrollFadeInUp)
      scrollFadeInUp: {
        initial: { y: isMobile ? 15 : 30, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true, amount: isMobile ? 0.1 : 0.3 },
        transition: createConfig({ duration: 0.8, ease: "easeOut" }),
      },

      // Performance optimized classes
      getOptimizedClasses: (baseClasses: string) => 
        `${baseClasses} ${isMobile ? 'mobile-optimized' : ''}`,

      // Viewport configuration for mobile
      getViewportConfig: (amount: number = 0.3) => ({
        once: true,
        amount: isMobile ? Math.max(0.1, amount * 0.5) : amount,
      }),
    };
  }, [isMobile, isClient, reducedMotion, mobileMultiplier]);

  return {
    ...optimized,
    isMobile,
    isClient,
    isReduced: useMemo(() => 
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      [isClient]
    ),
  };
}; 