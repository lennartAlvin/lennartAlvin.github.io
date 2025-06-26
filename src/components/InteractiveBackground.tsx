import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface InteractiveBackgroundProps {
  isDark?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  speed: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export default function InteractiveBackground({ isDark = true }: InteractiveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseStopTimeout = useRef<NodeJS.Timeout>();
  const lastMouseUpdate = useRef(0);
  
  // Ultra-smooth mouse tracking with mobile-optimized damping
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { 
    stiffness: isMobile ? 30 : 50, 
    damping: isMobile ? 40 : 30, 
    mass: isMobile ? 0.8 : 0.5 
  });
  const springY = useSpring(mouseY, { 
    stiffness: isMobile ? 30 : 50, 
    damping: isMobile ? 40 : 30, 
    mass: isMobile ? 0.8 : 0.5 
  });

  // Enhanced mobile detection
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                              window.innerWidth < 768 ||
                              ('ontouchstart' in window) ||
                              (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
        setIsMobile(Boolean(isMobileDevice));
      }
    };
    
    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile, { passive: true });
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  useEffect(() => {
    const updateWindowSize = () => {
      if (typeof window !== 'undefined') {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    updateWindowSize();
    if (typeof window !== 'undefined') {
      const debouncedResize = debounce(updateWindowSize, 150);
      window.addEventListener('resize', debouncedResize, { passive: true });
      return () => window.removeEventListener('resize', debouncedResize);
    }
  }, []);

  // Heavily throttled mouse tracking for mobile performance
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isMobile) return; // Completely skip on mobile
    
    const now = performance.now();
    const throttleTime = isMobile ? 100 : 32; // Much more aggressive throttling
    if (now - lastMouseUpdate.current < throttleTime) return;
    lastMouseUpdate.current = now;
    
    const x = e.clientX;
    const y = e.clientY;
    
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
      setIsMouseMoving(true);
    });

    if (mouseStopTimeout.current) {
      clearTimeout(mouseStopTimeout.current);
    }

    mouseStopTimeout.current = setTimeout(() => {
      setIsMouseMoving(false);
    }, 800);
  }, [mouseX, mouseY, isMobile]);

  // Simplified touch handlers with reduced frequency
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isMobile) return;
    
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    
    // Center the interaction on mobile for better performance
    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;
    
    setMousePosition({ x: centerX, y: centerY });
    mouseX.set(centerX);
    mouseY.set(centerY);
    setIsMouseMoving(true);
  }, [mouseX, mouseY, isMobile, windowSize]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isMobile) return;
    
    const now = performance.now();
    if (now - lastMouseUpdate.current < 200) return; // Very conservative throttling
    lastMouseUpdate.current = now;
    
    // Keep centered for performance
    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;
    
    setMousePosition({ x: centerX, y: centerY });
  }, [isMobile, windowSize]);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile) return;
    
    setTimeout(() => {
      setIsMouseMoving(false);
    }, 400);
  }, [isMobile]);

  // Minimal click/tap handlers
  const handleClick = useCallback((e: MouseEvent) => {
    if (isMobile || ripples.length >= 1) return; // Single ripple max on mobile
    
    const newRipple: Ripple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600); // Shorter duration
  }, [ripples.length, isMobile]);

  const handleTouchTap = useCallback((e: TouchEvent) => {
    if (!isMobile || ripples.length >= 1) return;
    
    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;
    
    const newRipple: Ripple = {
      id: Date.now(),
      x: centerX,
      y: centerY,
      timestamp: Date.now(),
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 500);
  }, [ripples.length, isMobile, windowSize]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Desktop-only mouse events
      if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('click', handleClick, { passive: true });
      }
      
      // Mobile-only touch events with reduced functionality
      if (isMobile) {
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        // Remove touchmove and tap handlers for better performance
      }
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchend', handleTouchTap);
        if (mouseStopTimeout.current) {
          clearTimeout(mouseStopTimeout.current);
        }
      };
    }
  }, [handleMouseMove, handleClick, handleTouchStart, handleTouchEnd, isMobile]);

  // Simplified gradient with caching
  const getDynamicGradient = useCallback(() => {
    if (!windowSize.width || !windowSize.height || isMobile) {
      // Static gradient for mobile
      return 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.02) 0%, transparent 60%)';
    }
    
    const xPercent = Math.round((mousePosition.x / windowSize.width) * 5) * 20; // Less granular
    const yPercent = Math.round((mousePosition.y / windowSize.height) * 5) * 20;
    const intensity = isMouseMoving ? 0.06 : 0.02;
    
    return `radial-gradient(circle at ${xPercent}% ${yPercent}%, 
      rgba(0, 240, 255, ${intensity}) 0%, 
      rgba(161, 0, 255, ${intensity * 0.2}) 40%, 
      transparent 70%)`;
  }, [mousePosition, windowSize, isMouseMoving, isMobile]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${isMobile ? 'mobile-optimized' : ''}`}
    >
      {/* Ultra-simplified gradient for mobile */}
      <div
        className={`absolute inset-0 transition-all ${isMobile ? 'duration-1000' : 'duration-700'} ease-out`}
        style={{
          background: getDynamicGradient(),
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      />

      {/* Magnetic Orb - Heavily optimized for mobile */}
      {!isMobile && (
        <MagneticOrb 
          mouseX={springX} 
          mouseY={springY} 
          size={200}
          color="rgba(0, 240, 255, 0.03)"
          isMoving={isMouseMoving}
          isMobile={isMobile}
        />
      )}

      {/* Mobile-optimized static orb */}
      {isMobile && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none mobile-optimized"
          style={{
            width: 120,
            height: 120,
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.01) 0%, transparent 70%)',
            filter: 'blur(15px)',
            transform: 'translate(-50%, -50%) translateZ(0)',
          }}
        />
      )}

      {/* Particle system - Desktop only */}
      {!isMobile && isMouseMoving && (
        <MinimalParticleSwarm 
          mousePosition={mousePosition} 
          windowSize={windowSize} 
        />
      )}

      {/* Simplified grid - Static and lightweight */}
      <StaticGrid isMobile={isMobile} />

      {/* Minimal ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none mobile-optimized"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%) translateZ(0)',
            willChange: 'transform, opacity',
          }}
          initial={{ scale: 0, opacity: 0.3 }}
          animate={{ scale: isMobile ? 1.2 : 1.8, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
        >
          <div className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} rounded-full border border-cyber-cyan/20`} />
        </motion.div>
      ))}

      {/* Cursor trail - Desktop only */}
      {!isMobile && isMouseMoving && (
        <MinimalCursorTrail mouseX={mousePosition.x} mouseY={mousePosition.y} />
      )}
    </div>
  );
}

// Optimized Magnetic Orb
function MagneticOrb({ 
  mouseX, 
  mouseY, 
  size, 
  color,
  isMoving,
  isMobile
}: {
  mouseX: any;
  mouseY: any;
  size: number;
  color: string;
  isMoving: boolean;
  isMobile: boolean;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none gpu-accelerated"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        x: mouseX,
        y: mouseY,
        translateX: `-50%`,
        translateY: `-50%`,
        filter: 'blur(25px)',
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
      }}
      animate={{
        scale: isMoving ? 1.05 : 1,
        opacity: isMoving ? 0.5 : 0.2,
      }}
      transition={{ 
        duration: 1.8, 
        ease: "easeOut" 
      }}
    />
  );
}

// Ultra-minimal particle system
function MinimalParticleSwarm({ mousePosition, windowSize }: { 
  mousePosition: { x: number; y: number }; 
  windowSize: { width: number; height: number };
}) {
  const particles = Array.from({ length: 3 }, (_, i) => ({ // Reduced from 6 to 3
    id: i,
    offset: i * 120,
  }));

  return (
    <>
      {particles.map((particle) => {
        const angle = (particle.offset * Math.PI) / 180;
        const radius = 40;
        const x = mousePosition.x + Math.cos(angle) * radius;
        const y = mousePosition.y + Math.sin(angle) * radius;

        return (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyber-cyan/40 rounded-full pointer-events-none gpu-accelerated"
            style={{
              left: x,
              top: y,
              transform: 'translateZ(0)',
              willChange: 'transform',
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: particle.id * 0.2,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </>
  );
}

// Static grid with mobile optimization
function StaticGrid({ isMobile }: { isMobile: boolean }) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${isMobile ? 'mobile-grid opacity-[0.02]' : 'cyber-grid opacity-[0.08]'}`}
      style={{
        transform: 'translateZ(0)',
        willChange: 'auto',
      }}
    />
  );
}

// Minimal cursor trail
function MinimalCursorTrail({ mouseX, mouseY }: { 
  mouseX: number; 
  mouseY: number; 
}) {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-cyber-cyan/30 rounded-full pointer-events-none gpu-accelerated"
      style={{
        left: mouseX,
        top: mouseY,
        transform: 'translate(-50%, -50%) translateZ(0)',
        willChange: 'transform, opacity',
      }}
      animate={{
        scale: [1, 0.5],
        opacity: [0.6, 0],
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
    />
  );
}

// Utility function
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
} 