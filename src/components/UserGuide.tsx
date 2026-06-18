import React from 'react';
import { 
  BookOpen, 
  Music, 
  Calendar, 
  User, 
  Globe, 
  MessageCircle,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

export const UserGuide: React.FC = () => {
  const sections = [
    {
      title: "Introduction",
      icon: <Info className="w-6 h-6" />,
      content: "Shree Nar Narayan is a digital gateway to Vedic wisdom and spiritual services. Our mission is to bridge ancient traditions with modern convenience, providing you with authentic rituals and profound knowledge at your fingertips.",
      color: "blue"
    },
    {
      title: "Vedic Services & Booking",
      icon: <Calendar className="w-6 h-6" />,
      content: "Navigate to the home page to view our range of Vedic services including Pujas, Homas, and Consultations. Click on any service to read details and book an appointment. Our system will guide you through selecting a time and providing necessary details.",
      color: "maroon"
    },
    {
      title: "Spiritual Library",
      icon: <BookOpen className="w-6 h-6" />,
      content: "Our library contains translated verses from the Bhagavad Gita, Panchatantra stories, Sanskrit learning modules, and Jyotish (Astrology) basics. You can switch between Nepali, Hindi, and English to understand the deep meanings of these texts.",
      color: "saffron"
    },
    {
      title: "The Sound System",
      icon: <Music className="w-6 h-6" />,
      content: "Use the floating music icon on the bottom right to access our Global Sound System. You can listen to powerful mantras like Gayatri Mantra and Om Chanting while browsing the app to maintain a peaceful atmosphere.",
      color: "gold"
    },
    {
      title: "Language & Accessibility",
      icon: <Globe className="w-6 h-6" />,
      content: "The app supports Nepali, Hindi, and English. Use the language switcher in the top navigation bar to choose your preferred language. The entire interface will adapt to your choice.",
      color: "green"
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-paper min-h-screen">
      <div className="w-full max-w-[96%] xl:max-w-[94%] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-saffron font-black uppercase tracking-[0.4em] text-xs mb-4 block">Help Center</span>
          <h1 className="text-5xl md:text-6xl font-serif font-black text-maroon mb-6 leading-tight">User Guide</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Welcome to your spiritual companion. This guide will help you navigate and make the most of the Shree Nar Narayan platform.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-maroon/5 border border-gold/10 group hover:border-maroon/20 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 rounded-2xl bg-paper flex items-center justify-center text-maroon shrink-0 shadow-lg border border-gold/10 group-hover:scale-110 transition-transform duration-500">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-bold text-maroon mb-4 flex items-center gap-2">
                    {section.title}
                    <Zap className="w-4 h-4 text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {section.content}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gold bg-gold/5 px-4 py-2 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Feature
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-12 bg-maroon rounded-[3rem] text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold text-gold mb-4">Still have questions?</h2>
            <p className="text-cream/70 mb-8 max-w-lg mx-auto leading-relaxed">
              Our support team is available 24/7 to assist you with any technical or spiritual inquiries.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://wa.me/9779847016421" 
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-600 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Pandit Ji
              </a>
              <button className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all active:scale-95">
                Contact Support
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </motion.div>
      </div>
    </div>
  );
};
