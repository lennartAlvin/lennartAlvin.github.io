import { useState, useEffect } from 'react';

interface MobileDetectionOptions {
  breakpoint?: number;
  enableOrientationChange?: boolean;
  debounceMs?: number;
}

export const useMobile = (options: MobileDetectionOptions = {}) => {
  const {
    breakpoint = 768,
    enableOrientationChange = true,
    debounceMs = 100
  } = options;

  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      if (typeof window === 'undefined') return false;
      
      const userAgent = navigator.userAgent || '';
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < breakpoint;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

      return isMobileUA || isSmallScreen || hasTouch || hasCoarsePointer;
    };

    const updateMobileState = () => {
      const mobile = checkMobile();
      setIsMobile(mobile);
      
      if (enableOrientationChange && typeof window !== 'undefined') {
        const newOrientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
        setOrientation(newOrientation);
      }
    };

    updateMobileState();

    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateMobileState, debounceMs);
    };

    window.addEventListener('resize', debouncedUpdate, { passive: true });
    
    if (enableOrientationChange) {
      window.addEventListener('orientationchange', debouncedUpdate, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      if (enableOrientationChange) {
        window.removeEventListener('orientationchange', debouncedUpdate);
      }
      clearTimeout(timeoutId);
    };
  }, [breakpoint, enableOrientationChange, debounceMs]);

  return {
    isMobile: isClient ? isMobile : false,
    isClient,
    orientation,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
  };
}; 