import { motion } from 'motion/react';
import { Quote, Star, User, Sparkles, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { useLanguage } from '../LanguageContext';

export const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-paper relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border border-maroon rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-maroon rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-3 bg-saffron/10 rounded-2xl text-saffron mb-4"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-maroon mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.testimonials.subtitle}
          </p>
          <div className="w-24 h-1 bg-gold/30 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] border border-gold/10 shadow-xl shadow-maroon/5 relative group transition-all duration-300"
            >
              <div className="absolute top-6 right-8 text-gold/10 group-hover:text-gold/20 transition-colors">
                <Quote className="w-12 h-12 rotate-180" />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-saffron text-saffron" />
                ))}
              </div>

              <p className="text-gray-600 italic mb-8 leading-relaxed font-serif text-base relative z-10">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-gold/5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-gold/20 flex items-center justify-center bg-paper shadow-inner transition-transform group-hover:scale-105">
                    {testimonial.image ? (
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-maroon/20" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-maroon text-white p-1 rounded-lg">
                    <Sparkles className="w-2.5 h-2.5" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-maroon tracking-tight">{testimonial.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-maroon/10 rounded-full text-maroon text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-maroon/5">
            <span className="flex -space-x-2 mr-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gold/20 overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </span>
            2000+ Satisfied Yajmans
          </div>
        </motion.div>
      </div>
    </section>
  );
};
