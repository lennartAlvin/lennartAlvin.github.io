// Mobile detection utility
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth < 768 ||
         ('ontouchstart' in window) ||
         (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
};

// Mobile-optimized animation creator
export const createMobileOptimizedAnimation = (desktopConfig: any, mobileOverrides: any = {}) => {
  const isMobile = isMobileDevice();
  
  if (!isMobile) return desktopConfig;
  
  // Default mobile optimizations
  const mobileDefaults = {
    transition: {
      ...desktopConfig.transition,
      duration: desktopConfig.transition?.duration ? desktopConfig.transition.duration * 0.6 : 0.3,
      ease: "easeOut",
    }
  };
  
  return {
    ...desktopConfig,
    ...mobileDefaults,
    ...mobileOverrides,
  };
};

export const fadeInUp = createMobileOptimizedAnimation({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
}, {
  initial: { y: 10, opacity: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
});

export const fadeInLeft = createMobileOptimizedAnimation({
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
}, {
  initial: { x: -20, opacity: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
});

export const fadeInRight = createMobileOptimizedAnimation({
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
}, {
  initial: { x: 20, opacity: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
});

export const scaleIn = createMobileOptimizedAnimation({
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
}, {
  initial: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
});

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: isMobileDevice() ? 0.05 : 0.1,
      delayChildren: isMobileDevice() ? 0.05 : 0.1,
    },
  },
};

export const slideUpContainer = createMobileOptimizedAnimation({
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
}, {
  initial: { y: 30, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.05,
    }
  },
});

export const glitchEffect = createMobileOptimizedAnimation({
  animate: {
    x: [0, -2, 2, -2, 2, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    }
  }
}, {
  animate: {
    x: [0, -1, 1, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    }
  }
});

export const floatingAnimation = createMobileOptimizedAnimation({
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
}, {
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
});

export const pulseGlow = createMobileOptimizedAnimation({
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
}, {
  animate: {
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
});

// Advanced Scroll-Triggered Animations
export const scrollFadeInUp = createMobileOptimizedAnimation({
  initial: { y: 100, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
}, {
  initial: { y: 40, opacity: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.4, ease: "easeOut" },
});

export const scrollSlideInLeft = createMobileOptimizedAnimation({
  initial: { x: -100, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
}, {
  initial: { x: -40, opacity: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.4, ease: "easeOut" },
});

export const scrollSlideInRight = createMobileOptimizedAnimation({
  initial: { x: 100, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
}, {
  initial: { x: 40, opacity: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.4, ease: "easeOut" },
});

export const scrollScaleIn = createMobileOptimizedAnimation({
  initial: { scale: 0.6, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
}, {
  initial: { scale: 0.9, opacity: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.4, ease: "easeOut" },
});

export const scrollRotateIn = createMobileOptimizedAnimation({
  initial: { rotate: -10, scale: 0.8, opacity: 0 },
  whileInView: { rotate: 0, scale: 1, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
}, {
  initial: { scale: 0.95, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.4, ease: "easeOut" },
});

// Section Transition Effects
export const sectionSlideUp = createMobileOptimizedAnimation({
  initial: { y: "100%" },
  whileInView: { y: "0%" },
  exit: { y: "-100%" },
  viewport: { once: false, amount: 0.2 },
  transition: { 
    duration: 1.2, 
    ease: [0.83, 0, 0.17, 1],
    staggerChildren: 0.1 
  },
}, {
  initial: { y: 60, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  exit: { y: -60, opacity: 0 },
  viewport: { once: false, amount: 0.1 },
  transition: { 
    duration: 0.5, 
    ease: "easeOut",
    staggerChildren: 0.05 
  },
});

export const sectionFadeSlide = createMobileOptimizedAnimation({
  initial: { y: 80, opacity: 0, scale: 0.95 },
  whileInView: { y: 0, opacity: 1, scale: 1 },
  exit: { y: -80, opacity: 0, scale: 1.05 },
  viewport: { once: false, amount: 0.15 },
  transition: { 
    duration: 1, 
    ease: [0.25, 0.46, 0.45, 0.94],
    staggerChildren: 0.15 
  },
}, {
  initial: { y: 30, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  exit: { y: -30, opacity: 0 },
  viewport: { once: false, amount: 0.05 },
  transition: { 
    duration: 0.4, 
    ease: "easeOut",
    staggerChildren: 0.05 
  },
});

export const sectionReveal = createMobileOptimizedAnimation({
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
}, {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.1 },
  transition: { 
    duration: 0.4, 
    ease: "easeOut",
    staggerChildren: 0.05 
  },
});

// Interactive Hover Effects - Disabled on mobile for performance
export const magneticHover = isMobileDevice() ? {} : {
  scale: 1.05,
  rotate: [0, 1, -1, 0],
  transition: {
    scale: { duration: 0.3, ease: "easeOut" },
    rotate: { duration: 0.6, ease: "easeInOut" }
  }
};

export const glowOnHover = isMobileDevice() ? {} : {
  boxShadow: [
    "0 0 0px rgba(0, 240, 255, 0)",
    "0 0 30px rgba(0, 240, 255, 0.6)",
    "0 0 60px rgba(0, 240, 255, 0.4)",
  ],
  scale: 1.02,
  transition: { duration: 0.4, ease: "easeOut" }
};

export const morphOnHover = isMobileDevice() ? {} : {
  borderRadius: ["20px", "40px", "60px", "40px", "20px"],
  scale: [1, 1.02, 1.05, 1.02, 1],
  transition: { duration: 0.8, ease: "easeInOut" }
};

// Stagger Animations for Multiple Elements
export const staggerFadeInUp = {
  initial: "initial",
  whileInView: "animate",
  viewport: { once: true, amount: isMobileDevice() ? 0.1 : 0.3 },
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: isMobileDevice() ? 0.05 : 0.1,
        delayChildren: isMobileDevice() ? 0.1 : 0.2,
      }
    }
  }
};

export const staggerScaleIn = {
  initial: "initial",
  whileInView: "animate",
  viewport: { once: true, amount: isMobileDevice() ? 0.1 : 0.3 },
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: isMobileDevice() ? 0.05 : 0.15,
        delayChildren: isMobileDevice() ? 0.1 : 0.3,
      }
    }
  }
};

// Complex Multi-Stage Animations
export const heroEntrance = createMobileOptimizedAnimation({
  initial: { 
    y: 100, 
    opacity: 0, 
    scale: 0.8,
    filter: "blur(10px)" 
  },
  animate: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.2,
    }
  },
}, {
  initial: { 
    y: 40, 
    opacity: 0, 
    scale: 0.95
  },
  animate: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
    }
  },
});

export const cardFlipIn = createMobileOptimizedAnimation({
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
}, {
  initial: { 
    scale: 0.95, 
    opacity: 0
  },
  whileInView: { 
    scale: 1, 
    opacity: 1
  },
  viewport: { once: true, amount: 0.1 },
  transition: { 
    duration: 0.4, 
    ease: "easeOut" 
  },
});

export const typewriterEffect = createMobileOptimizedAnimation({
  initial: { width: "0%" },
  animate: { width: "100%" },
  transition: {
    duration: 2,
    ease: "easeOut",
  }
}, {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.5,
    ease: "easeOut",
  }
});

// Parallax-style animations - Disabled on mobile for performance
export const parallaxFloat = isMobileDevice() ? {} : {
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

export const parallaxSlow = isMobileDevice() ? {} : {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

export const parallaxFast = isMobileDevice() ? {} : {
  animate: {
    y: [-30, 30, -30],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};
