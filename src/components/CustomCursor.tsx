import React, { useEffect, useState, useCallback, useRef } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const lastUpdate = useRef(0);

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

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const now = performance.now();
    if (now - lastUpdate.current < 16) return; // 60fps max
    lastUpdate.current = now;
    
    const x = e.clientX;
    const y = e.clientY;
    setMousePosition({ x, y });
    
    // Direct DOM manipulation for better performance
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
    }
    if (cursorTrailRef.current) {
      cursorTrailRef.current.style.transform = `translate3d(${x - 25}px, ${y - 25}px, 0)`;
    }
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
    if (typeof window !== 'undefined' && !isMobile) {
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
      };
    }
  }, [updateMousePosition, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave, isMobile]);

  // Don't render cursor on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] mix-blend-mode-difference transition-all duration-100 ease-out ${
          isHovering ? 'scale-150' : isClicking ? 'scale-75' : 'scale-100'
        }`}
        style={{
          willChange: 'transform',
          transform: `translate3d(${mousePosition.x - 10}px, ${mousePosition.y - 10}px, 0)`,
        }}
      >
        <div className={`w-5 h-5 rounded-full border-2 transition-colors duration-100 ${
          isHovering 
            ? 'border-cyber-magenta shadow-[0_0_10px_rgba(255,0,200,0.6)]' 
            : 'border-cyber-cyan shadow-[0_0_6px_rgba(0,240,255,0.4)]'
        }`}>
          <div className={`absolute top-1/2 left-1/2 w-1 h-1 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-100 ${
            isHovering ? 'bg-cyber-magenta' : 'bg-cyber-cyan'
          }`} />
        </div>
      </div>
      
      <div
        ref={cursorTrailRef}
        className="fixed pointer-events-none z-[9998] opacity-20 transition-all duration-200 ease-out"
        style={{
          willChange: 'transform',
          transform: `translate3d(${mousePosition.x - 25}px, ${mousePosition.y - 25}px, 0)`,
        }}
      >
        <div className={`w-12 h-12 rounded-full border transition-colors duration-200 ${
          isHovering 
            ? 'border-cyber-magenta/30 bg-cyber-magenta/5' 
            : 'border-cyber-cyan/20 bg-cyber-cyan/5'
        }`} />
      </div>
    </>
  );
} 