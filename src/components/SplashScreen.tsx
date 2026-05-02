import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Give time for exit animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-maroon flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Aura */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.3 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-96 h-96 bg-gold/30 rounded-full blur-[100px]"
          />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="text-[140px] text-gold select-none flex items-center justify-center font-bold drop-shadow-[0_0_30px_rgba(212,175,55,0.6)] animate-glow">
              🕉️
            </div>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "120%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-[10%] h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 text-cream text-center"
          >
            <h1 className="text-3xl font-serif font-bold tracking-[0.2em] mb-3">श्री नर नारायण</h1>
            <div className="flex items-center justify-center gap-4 text-gold/60 text-xs uppercase tracking-[0.4em] font-bold">
              <span>धार्मिक</span>
              <div className="w-1 h-1 bg-saffron rounded-full" />
              <span>सेवा</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
