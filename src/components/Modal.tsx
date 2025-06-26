import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Enhanced Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Cyber Grid Overlay */}
          <div className="absolute inset-0 cyber-grid opacity-5" />
          
          {/* Modal Content */}
          <motion.div
            className="relative bg-gradient-to-br from-dark-card via-dark-surface to-dark-card text-white p-8 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-cyber-cyan/30"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            style={{
              boxShadow: '0 0 50px rgba(0, 240, 255, 0.3), 0 0 100px rgba(161, 0, 255, 0.2)',
            }}
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 via-transparent to-cyber-magenta/5 rounded-2xl" />
            
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cyber-magenta/20 hover:bg-cyber-magenta/30 border border-cyber-magenta/50 text-cyber-magenta hover:text-white transition-all duration-300 flex items-center justify-center group"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close modal"
            >
              <FaTimes className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </motion.button>
            
            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyber-cyan/20 to-transparent rounded-full blur-xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyber-magenta/20 to-transparent rounded-full blur-xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
