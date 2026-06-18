import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight,
  Compass, 
  Sun, 
  Scroll, 
  Users, 
  HelpCircle, 
  MapPin, 
  Calendar, 
  Flower2,
  List
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface FloatingSidebarProps {
  activeSection: 'services' | 'jyotish' | 'rashifal' | 'about' | 'testimonials' | 'faq' | 'contact' | 'booking';
  setActiveSection: (section: 'services' | 'jyotish' | 'rashifal' | 'about' | 'testimonials' | 'faq' | 'contact' | 'booking') => void;
  viewMode: 'focus' | 'all';
}

export const FloatingSidebar = ({ activeSection, setActiveSection, viewMode }: FloatingSidebarProps) => {
  const { language } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sectionLabels: Record<string, Record<string, { title: string, icon: any }>> = {
    ne: {
      services: { title: "पूजा एवं अनुष्ठान", icon: Flower2 },
      jyotish: { title: "ज्योतिष सेवाहरू", icon: Compass },
      rashifal: { title: "दैनिक राशिफल", icon: Sun },
      about: { title: "पूज्य पण्डित जी", icon: Scroll },
      testimonials: { title: "भक्तका अनुभव", icon: Users },
      faq: { title: "जिज्ञासा समाधान", icon: HelpCircle },
      contact: { title: "मन्दिर र सम्पर्क", icon: MapPin },
      booking: { title: "पूजा बुकिङ", icon: Calendar }
    },
    hi: {
      services: { title: "पूजा एवं अनुष्ठान", icon: Flower2 },
      jyotish: { title: "ज्योतिष परामर्श", icon: Compass },
      rashifal: { title: "दैनिक राशिफल", icon: Sun },
      about: { title: "पूज्य पण्डित जी", icon: Scroll },
      testimonials: { title: "भक्तों के अनुभव", icon: Users },
      faq: { title: "जिज्ञासा समाधान", icon: HelpCircle },
      contact: { title: "स्थान एवं समय", icon: MapPin },
      booking: { title: "पूजा बुकिंग", icon: Calendar }
    },
    en: {
      services: { title: "Pujas & Services", icon: Flower2 },
      jyotish: { title: "Astro Guidance", icon: Compass },
      rashifal: { title: "Daily Horoscope", icon: Sun },
      about: { title: "About Pandit Ji", icon: Scroll },
      testimonials: { title: "Devotee Feedback", icon: Users },
      faq: { title: "Faith FAQs", icon: HelpCircle },
      contact: { title: "Temple Location", icon: MapPin },
      booking: { title: "Book a Puja", icon: Calendar }
    }
  };

  const sectionsList: ('services' | 'jyotish' | 'rashifal' | 'about' | 'testimonials' | 'faq' | 'contact' | 'booking')[] = [
    'services', 'jyotish', 'rashifal', 'about', 'testimonials', 'faq', 'contact', 'booking'
  ];

  const currentLangLabels = sectionLabels[language as 'ne' | 'hi' | 'en'] || sectionLabels['hi'];

  const handleSectionClick = (sect: typeof activeSection) => {
    setActiveSection(sect);
    if (viewMode === 'all') {
      const el = document.getElementById(`section-card-${sect}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      const el = document.getElementById('section-navigation-focus');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      style={{ top: '55%' }}
      className="fixed right-6 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2"
    >
      <div 
        className={`bg-white/90 backdrop-blur-xl border-2 border-gold/30 rounded-3xl py-4 transition-all duration-300 shadow-[0_20px_50px_rgba(122,12,12,0.15)] flex flex-col items-center ${
          isCollapsed ? 'px-3 w-16' : 'px-4 w-60'
        }`}
      >
        {/* Header with toggle and title when expanded */}
        <div className={`w-full flex items-center mb-4 pb-2 border-b border-gold/10 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 text-maroon"
            >
              <List className="w-4 h-4 text-saffron" />
              <span className="text-[10px] uppercase font-black tracking-widest font-serif">
                {language === 'ne' ? 'अनुगमन' : language === 'hi' ? 'अनुभागीय' : 'Navigation'}
              </span>
            </motion.div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-saffron/10 text-maroon hover:text-saffron rounded-lg transition-colors cursor-pointer"
            title={isCollapsed ? "Expand navigation sidebar" : "Collapse navigation sidebar"}
          >
            {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Sect List */}
        <div className="w-full flex flex-col gap-2">
          {sectionsList.map((sect) => {
            const isActive = activeSection === sect;
            const info = currentLangLabels[sect];
            const Icon = info.icon;

            return (
              <button
                key={sect}
                onClick={() => handleSectionClick(sect)}
                className={`w-full group relative flex items-center gap-3 py-2 px-2.5 rounded-xl transition-all duration-300 text-left cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-maroon/10 to-transparent border border-maroon/20' 
                    : 'hover:bg-gold/5 border border-transparent'
                }`}
              >
                {/* Dot / Icon Container */}
                <div className="relative">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-maroon to-saffron text-white scale-110 shadow-md shadow-maroon/15'
                      : 'bg-gold/10 text-maroon group-hover:scale-105'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  {/* Outer active pulse effect */}
                  {isActive && (
                    <span className="absolute -inset-0.5 rounded-lg border border-saffron animate-ping opacity-60 pointer-events-none" />
                  )}
                </div>

                {/* Text showing when expanded */}
                {!isCollapsed && (
                  <div className="flex-1 overflow-hidden">
                    <p className={`text-xs font-bold truncate transition-colors duration-300 ${
                      isActive ? 'text-maroon' : 'text-gray-600 group-hover:text-maroon'
                    }`}>
                      {info.title}
                    </p>
                  </div>
                )}

                {/* Hover Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute right-14 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-55 mr-2">
                    <div className="bg-gradient-to-br from-maroon to-[#4A040D] text-white border border-gold/40 text-xs font-bold rounded-xl py-2 px-3.5 shadow-xl whitespace-nowrap flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-gold" />
                      {info.title}
                      {/* elegant tiny arrow */}
                      <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-[#4A040D] transform rotate-45 border-r border-t border-gold/40" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
