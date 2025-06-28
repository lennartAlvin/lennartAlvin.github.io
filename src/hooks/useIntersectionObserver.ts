import { useEffect, useRef, useState } from 'react';
import { useMobile } from './useMobile';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const { isMobile } = useMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    threshold = isMobile ? 0.1 : 0.2,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (hasTriggered && triggerOnce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        if (isIntersecting && triggerOnce) {
          setHasTriggered(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { elementRef, isVisible };
}; 