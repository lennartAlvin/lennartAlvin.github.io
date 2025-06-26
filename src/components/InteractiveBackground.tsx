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
  
  // Ultra-smooth mouse tracking with more aggressive damping
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30, mass: 0.5 });

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                              window.innerWidth < 768 ||
                              ('ontouchstart' in window);
        setIsMobile(isMobileDevice);
      }
    };
    
    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
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
      window.addEventListener('resize', updateWindowSize);
      return () => window.removeEventListener('resize', updateWindowSize);
    }
  }, []);

  // Ultra-throttled mouse tracking for maximum smoothness
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isMobile) return; // Skip on mobile
    
    const now = performance.now();
    if (now - lastMouseUpdate.current < 32) return; // Limit to 30fps max
    lastMouseUpdate.current = now;
    
    const x = e.clientX;
    const y = e.clientY;
    
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
    setIsMouseMoving(true);

    if (mouseStopTimeout.current) {
      clearTimeout(mouseStopTimeout.current);
    }

    mouseStopTimeout.current = setTimeout(() => {
      setIsMouseMoving(false);
    }, 500);
  }, [mouseX, mouseY, isMobile]);

  // Touch event handlers for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isMobile) return;
    
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
    setIsMouseMoving(true);
  }, [mouseX, mouseY, isMobile]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isMobile) return;
    
    const now = performance.now();
    if (now - lastMouseUpdate.current < 50) return; // Less frequent updates on mobile
    lastMouseUpdate.current = now;
    
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY, isMobile]);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile) return;
    
    setTimeout(() => {
      setIsMouseMoving(false);
    }, 300);
  }, [isMobile]);

  // Simplified click handler with even more restrictive ripple limits
  const handleClick = useCallback((e: MouseEvent) => {
    const maxRipples = isMobile ? 1 : 2; // Fewer ripples on mobile
    if (ripples.length >= maxRipples) return;
    
    const newRipple: Ripple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, isMobile ? 800 : 1000); // Shorter duration on mobile
  }, [ripples.length, isMobile]);

  // Touch tap handler
  const handleTouchTap = useCallback((e: TouchEvent) => {
    if (!isMobile || ripples.length >= 1) return;
    
    const touch = e.changedTouches[0];
    const newRipple: Ripple = {
      id: Date.now(),
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 800);
  }, [ripples.length, isMobile]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Mouse events (desktop only)
      if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('click', handleClick, { passive: true });
      }
      
      // Touch events (mobile only)
      if (isMobile) {
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('touchend', handleTouchTap, { passive: true });
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
  }, [handleMouseMove, handleClick, handleTouchStart, handleTouchMove, handleTouchEnd, handleTouchTap, isMobile]);

  // Extremely simplified gradient that updates less frequently
  const getDynamicGradient = () => {
    if (!windowSize.width || !windowSize.height) return 'transparent';
    
    const xPercent = Math.round((mousePosition.x / windowSize.width) * 10) * 10; // Round to reduce updates
    const yPercent = Math.round((mousePosition.y / windowSize.height) * 10) * 10;
    const intensity = isMouseMoving ? (isMobile ? 0.04 : 0.08) : 0.03; // Reduced intensity on mobile
    
    return `radial-gradient(circle at ${xPercent}% ${yPercent}%, 
      rgba(0, 240, 255, ${intensity}) 0%, 
      rgba(161, 0, 255, ${intensity * 0.3}) 30%, 
      transparent 60%)`;
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Simplified Dynamic Gradient - Less frequent updates */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background: getDynamicGradient(),
        }}
      />

      {/* Single Magnetic Orb - Reduced size on mobile */}
      <MagneticOrb 
        mouseX={springX} 
        mouseY={springY} 
        size={isMobile ? 150 : 250}
        color={isMobile ? "rgba(0, 240, 255, 0.02)" : "rgba(0, 240, 255, 0.04)"}
        isMoving={isMouseMoving}
        isMobile={isMobile}
      />

      {/* Minimal Particle System - Disabled on mobile for performance */}
      {!isMobile && isMouseMoving && (
        <MinimalParticleSwarm 
          mousePosition={mousePosition} 
          windowSize={windowSize} 
        />
      )}

      {/* Simplified Grid - Static */}
      <StaticGrid isMobile={isMobile} />

      {/* Minimal Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: isMobile ? 1.5 : 2, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isMobile ? 0.8 : 1, ease: "easeOut" }}
        >
          <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} rounded-full border border-cyber-cyan/30`} />
        </motion.div>
      ))}

      {/* Ultra-minimal cursor trail - Desktop only */}
      {!isMobile && isMouseMoving && (
        <MinimalCursorTrail mouseX={mousePosition.x} mouseY={mousePosition.y} />
      )}
    </div>
  );
}

// Simplified Magnetic Orb - Single orb with minimal animation
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
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        x: isMobile ? '50%' : mouseX, // Center on mobile
        y: isMobile ? '50%' : mouseY,
        translateX: `-50%`,
        translateY: `-50%`,
        filter: isMobile ? 'blur(20px)' : 'blur(30px)', // Less blur on mobile
      }}
      animate={{
        scale: isMoving ? (isMobile ? 1.05 : 1.1) : 1,
        opacity: isMoving ? (isMobile ? 0.4 : 0.6) : (isMobile ? 0.2 : 0.3),
      }}
      transition={{ 
        duration: isMobile ? 1.5 : 2, 
        ease: "easeOut" 
      }}
    />
  );
}

// Minimal Particle System - Only 4 particles
function MinimalParticleSwarm({ mousePosition, windowSize }: { 
  mousePosition: { x: number; y: number }; 
  windowSize: { width: number; height: number };
}) {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    const particleCount = 4; // Ultra minimal
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
      });
    }

    setParticles(newParticles);
  }, [windowSize]);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const pullStrength = 0.02; // Very gentle pull
            particle.x += dx * pullStrength;
            particle.y += dy * pullStrength;
          }

          return particle;
        })
      );
    };

    const interval = setInterval(animateParticles, 50); // 20fps
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-cyber-cyan/40"
          style={{
            left: particle.x,
            top: particle.y,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 4px rgba(0, 240, 255, 0.4)',
          }}
        />
      ))}
    </div>
  );
}

// Static Grid - No animations
function StaticGrid({ isMobile }: { isMobile: boolean }) {
  return (
    <div className={`absolute inset-0 opacity-10 pointer-events-none ${isMobile ? 'mobile-grid' : ''}`}>
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="static-grid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(0, 240, 255, 0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#static-grid)" />
      </svg>
    </div>
  );
}

// Minimal Cursor Trail - Only 2 points
function MinimalCursorTrail({ mouseX, mouseY }: { 
  mouseX: number; 
  mouseY: number; 
}) {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const newPoint = { x: mouseX, y: mouseY, id: Date.now() };
    setTrail(prevTrail => {
      const newTrail = [newPoint, ...prevTrail.slice(0, 1)]; // Only 2 points total
      return newTrail;
    });
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-0.5 h-0.5 rounded-full bg-cyber-cyan/50"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
            opacity: (2 - index) / 2,
          }}
        />
      ))}
    </div>
  );
} 