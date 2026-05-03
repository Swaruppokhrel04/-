import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star, Moon, Sun, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../constants.ts';
import { useLanguage } from '../LanguageContext.tsx';

interface JyotishSectionProps {
  onSelectService: (service: any) => void;
}

export const JyotishSection: React.FC<JyotishSectionProps> = ({ onSelectService }) => {
  const { t } = useLanguage();
  const astrologyServices = SERVICES.filter(s => s.category === 'Astrology');
  const jt = (t as any).jyotish_section;

  const bookingProcess = [
    { title: jt.process.step1Title, desc: jt.process.step1Desc },
    { title: jt.process.step2Title, desc: jt.process.step2Desc },
    { title: jt.process.step3Title, desc: jt.process.step3Desc },
    { title: jt.process.step4Title, desc: jt.process.step4Desc }
  ];

  return (
    <section id="jyotish" className="py-24 bg-maroon relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute text-gold"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
          >
            <Sparkles className="w-2 h-2 fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <span className="text-saffron font-black uppercase tracking-[0.4em] text-xs mb-4 block">{jt.tag}</span>
            <h2 className="text-5xl md:text-6xl font-serif font-black text-white mb-8 leading-tight">
              {jt.title} <span className="text-gold">{jt.span}</span>
            </h2>
            <p className="text-cream font-medium opacity-80 text-lg leading-relaxed mb-10">
              {jt.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bookingProcess.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-gold font-bold mb-1">{step.title}</h4>
                    <p className="text-sm text-cream opacity-60">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="w-full aspect-square max-w-md mx-auto relative group">
              <div className="absolute inset-0 bg-gold/10 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 border-2 border-gold/20 rounded-full border-dashed animate-[spin_30s_linear_infinite_reverse]" />
              
              <div className="absolute inset-12 bg-cream rounded-full flex items-center justify-center p-8 shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800" 
                  alt="Vedic Astrology" 
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-maroon/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-16 h-16 bg-gold text-maroon rounded-full flex items-center justify-center shadow-xl">
                      <Star className="w-8 h-8 fill-current" />
                   </div>
                </div>
              </div>

              {/* Floating Planetary Icons */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 right-0 p-4 bg-paper rounded-2xl shadow-xl text-maroon z-20"
              >
                <Sun className="w-6 h-6" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-10 left-0 p-4 bg-paper rounded-2xl shadow-xl text-maroon z-20"
              >
                <Moon className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {astrologyServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8 hover:bg-white/10 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/20 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                {idx === 0 ? <Star className="w-6 h-6" /> : idx === 1 ? <Moon className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">
                {(t as any).services_list[service.id]?.name || service.name}
              </h3>
              <p className="text-cream opacity-70 text-sm leading-relaxed mb-6">
                {(t as any).services_list[service.id]?.desc || service.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {(t as any).services_list[service.id]?.benefits ? (t as any).services_list[service.id].benefits.slice(0, 3).map((benefit: string, bIdx: number) => (
                  <li key={bIdx} className="flex items-center gap-2 text-xs text-cream opacity-80">
                    <CheckCircle2 className="w-3 h-3 text-gold" />
                    {benefit}
                  </li>
                )) : service.benefits?.slice(0, 3).map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-2 text-xs text-cream opacity-80">
                    <CheckCircle2 className="w-3 h-3 text-gold" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onSelectService(service)}
                className="w-full py-4 bg-gold text-maroon rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors"
              >
                {jt.btnConsult}
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Language support helper */}
      <style>{`
        .text-cream { color: #FFFDD0; }
      `}</style>
    </section>
  );
};
