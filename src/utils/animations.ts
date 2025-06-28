import { Variants } from 'framer-motion';

// SSR-safe animation creator that prevents hydration mismatches
export const createMobileOptimizedAnimation = (desktopConfig: any, mobileOverrides: any = {}) => {
  // Always return desktop config for SSR consistency
  // Mobile optimizations will be applied via useEffect in components
  return desktopConfig;
};



const DEFAULT_TRANSITION = {
  duration: 0.6,
  ease: "easeOut"
};

const HERO_TRANSITION = {
  duration: 1.2,
  ease: [0.25, 0.46, 0.45, 0.94]
};

// Unified animation generator functions
export const createFadeAnimation = (
  direction: 'up' | 'down' | 'left' | 'right' | 'scale' = 'up',
  distance: number = 20,
  customTransition?: any
) => ({
  initial: {
    opacity: 0,
    ...(direction === 'up' && { y: distance }),
    ...(direction === 'down' && { y: -distance }),
    ...(direction === 'left' && { x: distance }),
    ...(direction === 'right' && { x: -distance }),
    ...(direction === 'scale' && { scale: 0.8 }),
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  transition: customTransition || DEFAULT_TRANSITION,
});

export const createFloatingAnimation = (
  intensity: 'subtle' | 'medium' | 'strong' = 'medium',
  duration: number = 6
) => {
  const ranges = {
    subtle: [-5, 5],
    medium: [-15, 15], 
    strong: [-25, 25],
  };
  const [min, max] = ranges[intensity];

  return {
    animate: {
      y: [min, max, min],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
};

export const createStaggerContainer = (
  staggerDelay: number = 0.1,
  childrenDelay: number = 0.1
): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: childrenDelay,
    },
  },
});

export const createScrollAnimation = (
  direction: 'up' | 'scale' | 'fade' = 'up',
  distance: number = 30,
  amount: number = 0.3
) => ({
  initial: {
    opacity: 0,
    ...(direction === 'up' && { y: distance }),
    ...(direction === 'scale' && { scale: 0.8 }),
  },
  whileInView: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  viewport: { once: true, amount },
  transition: { ...DEFAULT_TRANSITION, duration: 0.8 },
});

// Basic animations using generators
export const fadeInUp = createFadeAnimation('up');
export const fadeInLeft = createFadeAnimation('left', 50);
export const fadeInRight = createFadeAnimation('right', 50);
export const scaleIn = createFadeAnimation('scale');

// Scroll animations
export const scrollFadeInUp = createScrollAnimation('up');
export const scrollScaleIn = createScrollAnimation('scale', 0, 0.3);

// Stagger containers
export const staggerContainer = createStaggerContainer();
export const fastStaggerContainer = createStaggerContainer(0.05, 0.05);

// Hero animations with custom transitions
export const heroEntrance = createFadeAnimation('up', 30, HERO_TRANSITION);

// Complex animations that can't be generated
export const sectionFadeSlide = {
  initial: { y: 80, opacity: 0, scale: 0.95 },
  whileInView: { y: 0, opacity: 1, scale: 1 },
  exit: { y: -80, opacity: 0, scale: 1.05 },
  viewport: { once: false, amount: 0.15 },
  transition: { 
    duration: 1, 
    ease: [0.25, 0.46, 0.45, 0.94],
    staggerChildren: 0.15 
  },
};

export const sectionReveal = {
  initial: { 
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    opacity: 0 
  },
  whileInView: { 
    clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
    opacity: 1 
  },
  viewport: { once: true, amount: 0.2 },
  transition: { 
    duration: 1.5, 
    ease: [0.77, 0, 0.175, 1],
    staggerChildren: 0.2 
  },
};

// Unified floating animations
export const floatingAnimation = createFloatingAnimation('subtle', 3);
export const floatingMedium = createFloatingAnimation('medium', 5);
export const floatingStrong = createFloatingAnimation('strong', 8);

// Effect animations
export const glitchEffect = {
  animate: {
    x: [0, -2, 2, -2, 2, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    }
  }
};

export const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(0, 240, 255, 0.3)",
      "0 0 40px rgba(0, 240, 255, 0.6)",
      "0 0 20px rgba(0, 240, 255, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

// Hover effects generator
export const createHoverEffect = (
  scale: number = 1.05,
  glow?: string,
  duration: number = 0.4
) => ({
  scale,
  ...(glow && {
    boxShadow: [
      "0 0 0px rgba(0, 240, 255, 0)",
      `0 0 30px ${glow}`,
      `0 0 60px ${glow}40`,
    ]
  }),
  transition: { duration, ease: "easeOut" }
});

export const glowOnHover = createHoverEffect(1.02, "rgba(0, 240, 255, 0.6)");

// Complex multi-stage animations
export const cardFlipIn = {
  initial: { 
    rotateY: -90, 
    opacity: 0,
    transformPerspective: 1000 
  },
  whileInView: { 
    rotateY: 0, 
    opacity: 1,
    transformPerspective: 1000 
  },
  viewport: { once: true, amount: 0.3 },
  transition: { 
    duration: 0.8, 
    ease: [0.25, 0.46, 0.45, 0.94] 
  },
};

export const typewriterEffect = {
  initial: { width: "0%" },
  animate: { width: "100%" },
  transition: {
    duration: 2,
    ease: "easeOut",
  }
};

// Parallax animations (conditionally applied)
export const parallaxFloat = {
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

// Legacy animations (kept for compatibility)
export const slideUpContainer = {
  initial: { y: 60, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    }
  },
};

export const morphOnHover = {
  borderRadius: ["20px", "40px", "60px", "40px", "20px"],
  scale: [1, 1.02, 1.05, 1.02, 1],
  transition: { duration: 0.8, ease: "easeInOut" }
};

export const staggerScaleIn = {
  initial: "initial",
  whileInView: "animate",
  viewport: { once: true, amount: 0.3 },
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  }
};
