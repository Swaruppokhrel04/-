import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, X, Calendar } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const CallActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl border border-gold/10 p-4 flex flex-col gap-2 min-w-[200px]"
          >
            <a
              href="#booking"
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-3 p-3 bg-maroon/5 hover:bg-maroon hover:text-cream rounded-xl transition-all group/book"
            >
              <div className="w-10 h-10 bg-gold text-maroon rounded-full flex items-center justify-center group-hover/book:scale-110 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Save Your Muhurat</div>
                <div className="text-sm font-bold">Book Online</div>
              </div>
            </a>

            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center gap-3 p-3 hover:bg-gold/5 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 bg-maroon text-cream rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Call Pandit Ji</div>
                <div className="text-sm font-bold text-maroon">{CONTACT_INFO.displayPhone}</div>
              </div>
            </a>

            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 hover:bg-gold/5 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">WhatsApp</div>
                <div className="text-sm font-bold text-maroon">Quick Chat</div>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0.5,
          rotate: isExpanded ? 90 : 0
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors ${
          isExpanded ? 'bg-paper text-maroon border border-gold/20' : 'bg-saffron text-white'
        }`}
      >
        {isExpanded ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6 animate-pulse" />}
      </motion.button>
    </div>
  );
};
