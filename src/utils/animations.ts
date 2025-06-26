export const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const fadeInLeft = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const fadeInRight = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

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

export const glitchEffect = {
  animate: {
    x: [0, -2, 2, -2, 2, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    }
  }
};

export const floatingAnimation = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
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

// Advanced Scroll-Triggered Animations
export const scrollFadeInUp = {
  initial: { y: 100, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const scrollSlideInLeft = {
  initial: { x: -100, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const scrollSlideInRight = {
  initial: { x: 100, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const scrollScaleIn = {
  initial: { scale: 0.6, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
};

export const scrollRotateIn = {
  initial: { rotate: -10, scale: 0.8, opacity: 0 },
  whileInView: { rotate: 0, scale: 1, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
};

// Section Transition Effects
export const sectionSlideUp = {
  initial: { y: "100%" },
  whileInView: { y: "0%" },
  exit: { y: "-100%" },
  viewport: { once: false, amount: 0.2 },
  transition: { 
    duration: 1.2, 
    ease: [0.83, 0, 0.17, 1],
    staggerChildren: 0.1 
  },
};

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

// Interactive Hover Effects
export const magneticHover = {
  scale: 1.05,
  rotate: [0, 1, -1, 0],
  transition: {
    scale: { duration: 0.3, ease: "easeOut" },
    rotate: { duration: 0.6, ease: "easeInOut" }
  }
};

export const glowOnHover = {
  boxShadow: [
    "0 0 0px rgba(0, 240, 255, 0)",
    "0 0 30px rgba(0, 240, 255, 0.6)",
    "0 0 60px rgba(0, 240, 255, 0.4)",
  ],
  scale: 1.02,
  transition: { duration: 0.4, ease: "easeOut" }
};

export const morphOnHover = {
  borderRadius: ["20px", "40px", "60px", "40px", "20px"],
  scale: [1, 1.02, 1.05, 1.02, 1],
  transition: { duration: 0.8, ease: "easeInOut" }
};

// Stagger Animations for Multiple Elements
export const staggerFadeInUp = {
  initial: "initial",
  whileInView: "animate",
  viewport: { once: true, amount: 0.3 },
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }
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

// Complex Multi-Stage Animations
export const heroEntrance = {
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
};

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

// Parallax-style animations
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

export const parallaxSlow = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

export const parallaxFast = {
  animate: {
    y: [-30, 30, -30],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};
