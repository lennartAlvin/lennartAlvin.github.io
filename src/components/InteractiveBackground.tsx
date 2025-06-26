import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface InteractiveBackgroundProps {
  isDark?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

export default function InteractiveBackground({ isDark = true }: InteractiveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // Smooth mouse tracking with springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Update window size
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Generate dynamic gradient based on mouse position
  const getDynamicGradient = () => {
    const xPercent = (mousePosition.x / windowSize.width) * 100;
    const yPercent = (mousePosition.y / windowSize.height) * 100;
    
    return `radial-gradient(circle at ${xPercent}% ${yPercent}%, 
      rgba(0, 240, 255, 0.15) 0%, 
      rgba(255, 0, 200, 0.1) 25%, 
      rgba(0, 255, 128, 0.05) 50%, 
      rgba(161, 0, 255, 0.02) 75%, 
      transparent 100%)`;
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Dynamic Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: getDynamicGradient(),
        }}
        animate={{
          background: getDynamicGradient(),
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Floating Orbs that Follow Cursor */}
      <FloatingOrb 
        mouseX={springX} 
        mouseY={springY} 
        delay={0} 
        size={300}
        color="rgba(0, 240, 255, 0.08)"
        speed={0.1}
      />
      <FloatingOrb 
        mouseX={springX} 
        mouseY={springY} 
        delay={0.5} 
        size={200}
        color="rgba(255, 0, 200, 0.06)"
        speed={0.15}
      />
      <FloatingOrb 
        mouseX={springX} 
        mouseY={springY} 
        delay={1} 
        size={150}
        color="rgba(0, 255, 128, 0.04)"
        speed={0.2}
      />

      {/* Interactive Grid Lines */}
      <InteractiveGrid mouseX={mousePosition.x} mouseY={mousePosition.y} />

      {/* Cursor Trail Effect */}
      <CursorTrail mouseX={mousePosition.x} mouseY={mousePosition.y} />

      {/* Ambient Particles */}
      <AmbientParticles mousePosition={mousePosition} />
    </div>
  );
}

// Floating Orb Component
function FloatingOrb({ 
  mouseX, 
  mouseY, 
  delay, 
  size, 
  color, 
  speed 
}: {
  mouseX: any;
  mouseY: any;
  delay: number;
  size: number;
  color: string;
  speed: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-xl"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        x: mouseX,
        y: mouseY,
        translateX: `-50%`,
        translateY: `-50%`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

// Interactive Grid Component
function InteractiveGrid({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const gridSize = 50;
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const getCellKey = (x: number, y: number) => `${x}-${y}`;
  
  const isNearMouse = (cellX: number, cellY: number) => {
    const distance = Math.sqrt(
      Math.pow(cellX - mouseX, 2) + Math.pow(cellY - mouseY, 2)
    );
    return distance < 150;
  };

  return (
    <div className="absolute inset-0 opacity-20">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern
            id="interactive-grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="rgba(0, 240, 255, 0.1)"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="interactive-grid-hover"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="rgba(0, 240, 255, 0.4)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#interactive-grid)" />
        
        {/* Highlight cells near mouse */}
        <motion.circle
          cx={mouseX}
          cy={mouseY}
          r="100"
          fill="url(#interactive-grid-hover)"
          style={{ mixBlendMode: 'screen' }}
          animate={{
            r: [80, 120, 80],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}

// Cursor Trail Effect
function CursorTrail({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const newPoint = { x: mouseX, y: mouseY, id: Date.now() };
    
    setTrail(prev => {
      const newTrail = [newPoint, ...prev.slice(0, 8)];
      return newTrail;
    });
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0">
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            background: `rgba(0, 240, 255, ${0.8 - index * 0.1})`,
            boxShadow: `0 0 ${10 - index}px rgba(0, 240, 255, 0.6)`,
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ 
            scale: 0,
            opacity: 0,
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Ambient Particles
function AmbientParticles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles near mouse
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 100;
        const x = mousePosition.x + Math.cos(angle) * radius;
        const y = mousePosition.y + Math.sin(angle) * radius;
        
        newParticles.push({
          id: Date.now() + i,
          x,
          y,
          size: Math.random() * 4 + 1,
          color: ['rgba(0, 240, 255, 0.6)', 'rgba(255, 0, 200, 0.6)', 'rgba(0, 255, 128, 0.6)'][i],
          speed: Math.random() * 2 + 1,
        });
      }
      
      setParticles(prev => [...prev, ...newParticles].slice(-20));
    };

    const interval = setInterval(generateParticles, 100);
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          initial={{ 
            scale: 0,
            opacity: 1,
            y: 0,
          }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: -50,
          }}
          transition={{ 
            duration: 2,
            ease: "easeOut",
          }}
          onAnimationComplete={() => {
            setParticles(prev => prev.filter(p => p.id !== particle.id));
          }}
        />
      ))}
    </div>
  );
} 