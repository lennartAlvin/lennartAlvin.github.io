import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  isMobile?: boolean;
}

export function useTypewriter({
  words,
  typeSpeed = 120,
  deleteSpeed = 120,
  pauseDuration = 4000,
  loop = true,
  isMobile = false
}: UseTypewriterOptions) {
  const [currentText, setCurrentText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isActiveRef = useRef(true);

  // Adjust speeds for mobile
  const adjustedTypeSpeed = isMobile ? typeSpeed * 1.2 : typeSpeed;
  const adjustedDeleteSpeed = isMobile ? deleteSpeed * 1.5 : deleteSpeed;
  const adjustedPauseDuration = isMobile ? pauseDuration * 0.8 : pauseDuration;

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[currentWordIndex];
    
    const typewriterLogic = () => {
      if (!isActiveRef.current) return;

      if (!isDeleting) {
        // Typing phase
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
          timeoutRef.current = setTimeout(typewriterLogic, adjustedTypeSpeed);
        } else {
          // Word complete, pause then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            typewriterLogic();
          }, adjustedPauseDuration);
        }
      } else {
        // Deleting phase
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
          timeoutRef.current = setTimeout(typewriterLogic, adjustedDeleteSpeed);
        } else {
          // Deletion complete, move to next word
          setIsDeleting(false);
          if (loop) {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          } else if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex((prev) => prev + 1);
          }
        }
      }
    };

    timeoutRef.current = setTimeout(typewriterLogic, isDeleting ? adjustedDeleteSpeed : adjustedTypeSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentText, currentWordIndex, isDeleting, words, adjustedTypeSpeed, adjustedDeleteSpeed, adjustedPauseDuration, loop]);

  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return currentText;
} 