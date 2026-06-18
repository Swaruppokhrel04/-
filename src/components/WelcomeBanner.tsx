import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Phone, Sparkles } from 'lucide-react';

export const WelcomeBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show banner after a slight delay once site loads (to wait for splash or content fade)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleWhatsappClick = () => {
    window.open('https://wa.me/9779847016421?text=नमस्कार%20पण्डित%20ज्यू,%20म%20पूजा%20तथा%20ज्योतिषीय%20परामर्श%20सेवाको%20बारेमा%20बुझ्न%20चाहन्छु।', '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          {/* Main Backdrop click to close */}
          <div 
            className="absolute inset-0 cursor-pointer pointer-events-auto" 
            onClick={(e) => { e.stopPropagation(); handleClose(); }} 
            role="button"
            aria-label="Close modal backdrop"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-2xl bg-[#fffef5] border-4 border-gold/40 rounded-[2rem] shadow-[0_20px_60px_rgba(139,0,0,0.40)] p-6 md:p-8 my-8 text-center overflow-hidden z-10 pointer-events-auto"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(212,175,55,0.05) 0%, transparent 70%)',
            }}
          >
            {/* Top Border Pattern */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-saffron via-gold to-saffron" />

            {/* Close Button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleClose(); }}
              className="absolute top-4 right-4 bg-white hover:bg-maroon hover:text-[#fffef5] text-maroon w-11 h-11 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md z-[50] border-2 border-maroon/20 hover:border-maroon active:scale-95 pointer-events-auto"
              aria-label="Close Banner"
            >
              <X className="w-6 h-6 md:w-5 md:h-5 stroke-[2.5]" />
            </button>

            {/* Decorative Hanging Bell Left */}
            <motion.div
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="absolute top-6 left-6 origin-top hidden sm:block text-gold/30 w-10 h-10 select-none pointer-events-none"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gold">
                <path d="M12 2a3 3 0 0 0-3 3v2.17A8.17 8.17 0 0 0 4 15v3h16v-3a8.17 8.17 0 0 0-5-7.83V5a3 3 0 0 0-3-3zm0 2a1 1 0 0 1 1 1v1.1c-.33-.06-.66-.1-1-.1s-.67.04-1 .1V5a1 1 0 0 1 1-1zm0 16a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z" />
              </svg>
            </motion.div>

            {/* Decorative Hanging Bell Right */}
            <motion.div
              animate={{ rotate: [6, -6, 6] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              className="absolute top-6 right-16 origin-top hidden sm:block text-gold/30 w-10 h-10 select-none pointer-events-none"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gold">
                <path d="M12 2a3 3 0 0 0-3 3v2.17A8.17 8.17 0 0 0 4 15v3h16v-3a8.17 8.17 0 0 0-5-7.83V5a3 3 0 0 0-3-3zm0 2a1 1 0 0 1 1 1v1.1c-.33-.06-.66-.1-1-.1s-.67.04-1 .1V5a1 1 0 0 1 1-1zm0 16a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z" />
              </svg>
            </motion.div>

            {/* Om Symbol */}
            <div className="flex justify-center mb-3">
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: [1, 1.05, 1], rotate: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-[0_4px_15px_rgba(212,175,55,0.4)] border-2 border-white select-none pointer-events-none"
              >
                ॐ
              </motion.div>
            </div>

            {/* Main Header Mantra */}
            <h2 className="text-2xl md:text-3xl font-black font-serif text-maroon mb-4 drop-shadow-sm select-none">
              ॐ नमो भगवते वासुदेवाय <span className="text-saffron">🙏</span>
            </h2>

            {/* Welcome message */}
            <p className="text-sm md:text-base font-medium text-gray-700 leading-relaxed max-w-xl mx-auto mb-6 px-2 font-serif select-none">
              तपाईँको जीवनमा सुख, शान्ति र समृद्धिको लागि हामी सम्पूर्ण कर्मकाण्ड र ज्योतिषीय परामर्श सेवा प्रदान गर्दछौँ।
            </p>

            {/* Section Header */}
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gold/30"></div>
              </div>
              <span className="relative px-4 bg-[#fffef5] font-serif font-black text-maroon text-base md:text-lg tracking-wider flex items-center gap-2 select-none">
                <Sparkles className="w-4 h-4 text-saffron" /> हाम्रा विशेष सेवाहरू: <Sparkles className="w-4 h-4 text-saffron" />
              </span>
            </div>

            {/* Services List matching the flyer exactly */}
            <div className="text-left space-y-4 max-h-[38vh] overflow-y-auto pr-2 custom-scrollbar select-none bg-amber-50/20 p-4 rounded-2xl border border-gold/10">
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-saffron/10 text-saffron flex items-center justify-center font-bold text-xs mt-0.5 shrink-0">🪔</div>
                <p className="text-xs md:text-sm text-gray-700 font-medium">
                  <span className="font-bold text-maroon block sm:inline">पूजा एवं अनुष्ठान:</span> गणपति पूजन, लक्ष्मी पूजन, शिव पूजन (रुद्राभिषेक), दुर्गा पूजन, र नवग्रह पूजन (सम्पूर्ण ग्रह शान्ति)।
                </p>
              </div>

              <div className="flex gap-3 items-start border-t border-gold/5 pt-3">
                <div className="w-5 h-5 rounded-full bg-saffron/10 text-saffron flex items-center justify-center font-bold text-xs mt-0.5 shrink-0">🏡</div>
                <p className="text-xs md:text-sm text-gray-700 font-medium">
                  <span className="font-bold text-maroon block sm:inline">गृह प्रवेश:</span> नयाँ घरको गृह प्रवेश पूजन र वास्तु शान्ति।
                </p>
              </div>

              <div className="flex gap-3 items-start border-t border-gold/5 pt-3">
                <div className="w-5 h-5 rounded-full bg-saffron/10 text-saffron flex items-center justify-center font-bold text-xs mt-0.5 shrink-0">📖</div>
                <p className="text-xs md:text-sm text-gray-700 font-medium">
                  <span className="font-bold text-maroon block sm:inline">पाठ र पारायण:</span> सुन्दरकाण्ड पाठ, रामायण, गीता, र श्रीमद्भागवत महापुराण।
                </p>
              </div>

              <div className="flex gap-3 items-start border-t border-gold/5 pt-3">
                <div className="w-5 h-5 rounded-full bg-saffron/10 text-saffron flex items-center justify-center font-bold text-xs mt-0.5 shrink-0">🧘</div>
                <p className="text-xs md:text-sm text-gray-700 font-medium">
                  <span className="font-bold text-maroon block sm:inline">आध्यात्मिक समाधान:</span> जप, पाठ, हवन र सबै प्रकारका विशेष अनुष्ठानहरू।
                </p>
              </div>

              <div className="flex gap-3 items-start border-t border-gold/5 pt-3">
                <div className="w-5 h-5 rounded-full bg-saffron/10 text-saffron flex items-center justify-center font-bold text-xs mt-0.5 shrink-0">🔮</div>
                <p className="text-xs md:text-sm text-gray-700 font-medium">
                  <span className="font-bold text-maroon block sm:inline">ज्योतिष सेवा:</span> जन्मकुण्डली निर्माण, चिना हेर्ने, ग्रह दोष निवारण, र उचित ज्योतिषीय उपायहरू।
                </p>
              </div>
            </div>

            {/* Note */}
            <p className="text-xs text-maroon/80 font-semibold italic mt-4 mb-6 select-none">
              शास्त्रोक्त विधिद्वारा पूजा र परामर्शको लागि हामीलाई सम्झनुहोस्।
            </p>

             {/* Contact WhatsApp CTA Button matching the flyer aesthetics */}
            <div className="mt-4 p-4 rounded-2xl bg-[#f7efdf] border-2 border-gold/20 shadow-md">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsappClick}
                className="w-full flex items-center justify-center gap-3 bg-[#a52a2a] hover:bg-[#8b0000] text-white py-3 px-6 rounded-xl font-bold font-serif text-sm md:text-base shadow-lg transition-all duration-300 pointer-events-auto cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-green-300 fill-green-300 animate-pulse" />
                <span>आजै सम्पर्क वा मेसेज गर्नुहोस्! +9779847016421 (WhatsApp)</span>
              </motion.button>
              
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-maroon font-serif font-black select-none">
                <span>सम्पूर्ण कर्मकाण्ड एवं परामर्शको लागि हामीलाई मेसेज गर्नुहोस्।</span>
                <span>🙏</span>
              </div>
            </div>

            {/* Bottom Close Button CTA */}
            <div className="mt-5 relative z-20 flex justify-center">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleClose(); }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-maroon/10 hover:bg-maroon text-maroon hover:text-[#fffef5] font-serif font-bold text-xs md:text-sm tracking-wide transition-all duration-300 border border-maroon/20 hover:border-maroon shadow-sm hover:shadow-md cursor-pointer pointer-events-auto active:scale-95"
              >
                <X className="w-4 h-4 text-maroon currentColor" />
                <span>बन्द गर्नुहोस् (Close Menu)</span>
              </button>
            </div>

            {/* Decorative bottom oil lamps / diyas */}
            <div className="absolute bottom-4 left-6 text-gold/20 flex gap-1 select-none pointer-events-none">
              <div className="w-6 h-6 animate-pulse">🪔</div>
            </div>
            <div className="absolute bottom-4 right-6 text-gold/20 flex gap-1 select-none pointer-events-none">
              <div className="w-6 h-6 animate-pulse">🪔</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
