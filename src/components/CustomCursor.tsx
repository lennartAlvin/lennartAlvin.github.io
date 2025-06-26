import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef<number>();

  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  const handleMouseEnter = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.classList.contains('cursor-pointer') ||
      target.closest('button, a, [role="button"], .cursor-pointer')
    ) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseLeave = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.classList.contains('cursor-pointer') ||
      target.closest('button, a, [role="button"], .cursor-pointer')
    ) {
      setIsHovering(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseover', handleMouseEnter, { passive: true });
    document.addEventListener('mouseout', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateMousePosition, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-mode-difference"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.15,
        }}
      >
        <div className={`w-5 h-5 rounded-full border-2 transition-all duration-150 ${
          isHovering 
            ? 'border-cyber-magenta shadow-[0_0_20px_rgba(255,0,200,0.8)]' 
            : 'border-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.6)]'
        }`}>
          <div className={`absolute top-1/2 left-1/2 w-1 h-1 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-150 ${
            isHovering ? 'bg-cyber-magenta' : 'bg-cyber-cyan'
          }`} />
        </div>
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-[9998] opacity-30"
        animate={{
          x: mousePosition.x - 25,
          y: mousePosition.y - 25,
        }}
        transition={{
          type: "tween",
          ease: "circOut",
          duration: 0.3,
        }}
      >
        <div className={`w-12 h-12 rounded-full border transition-all duration-200 ${
          isHovering 
            ? 'border-cyber-magenta/50 bg-cyber-magenta/5' 
            : 'border-cyber-cyan/30 bg-cyber-cyan/5'
        }`} />
      </motion.div>
    </>
  );
} 