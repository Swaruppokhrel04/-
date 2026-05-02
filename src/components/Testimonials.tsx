import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <motion.section 
      id="testimonials" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="py-16 md:py-24 bg-paper relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-maroon/5 text-maroon rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-maroon rounded-full animate-pulse" />
            {(t as any).testimonials.title}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-maroon mb-4 font-serif">
            {(t as any).testimonials.subtitle}
          </h2>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-gold text-gold" />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {(t as any).testimonials.list.map((item: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-gold/10 relative group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute top-6 right-8 text-gold/20 group-hover:text-gold/40 transition-colors">
                <Quote className="w-8 h-8 md:w-12 md:h-12" />
              </div>
              
              <p className="text-gray-500 italic mb-6 md:mb-8 relative z-10 leading-relaxed text-sm md:text-base">
                "{item.content}"
              </p>
              
              <div className="flex items-center gap-3 md:gap-4 border-t border-gold/10 pt-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-maroon/5 rounded-full flex items-center justify-center text-maroon font-bold text-lg md:text-xl border border-gold/20 shrink-0">
                  {item.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-maroon">{item.name}</h4>
                  <p className="text-xs text-saffron uppercase font-bold tracking-widest">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-maroon/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
    </motion.section>
  );
};

export default Testimonials;
