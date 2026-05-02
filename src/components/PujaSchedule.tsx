import React from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, Bell } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { PUJA_SCHEDULE } from '../constants';

export const PujaSchedule = () => {
  const { t } = useLanguage();
  const scheduleT = (t as any).schedule;

  return (
    <section id="schedule" className="py-24 bg-paper relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-maroon/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-maroon/5 text-maroon rounded-full text-sm font-bold uppercase tracking-widest mb-4"
          >
            <Clock className="w-4 h-4" />
            {scheduleT.title}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-serif text-maroon mb-4"
          >
            {scheduleT.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            {scheduleT.subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PUJA_SCHEDULE.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gold/10 hover:shadow-xl hover:border-gold/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-maroon/5 text-maroon rounded-2xl flex items-center justify-center group-hover:bg-maroon group-hover:text-cream transition-colors">
                  <Bell className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-widest text-saffron mb-1">
                    {item.day === 'Daily' ? scheduleT.days.daily : (scheduleT.days as any)[item.day.toLowerCase()]}
                  </div>
                  <div className="flex items-center gap-1.5 text-maroon font-bold">
                    <Clock className="w-4 h-4" />
                    {item.time}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-maroon mb-2 group-hover:text-saffron transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
              
              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Open to all Devotees
                </span>
                <div className="h-1 w-12 bg-gold/30 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special dates CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-maroon rounded-[2rem] text-cream flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-cream/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-8 h-8 text-gold" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1">Looking for a specific date?</h4>
              <p className="text-cream/70 text-sm">Check our auspicious calendar or contact us for personal muhurat.</p>
            </div>
          </div>
          
          <a 
            href="#booking"
            className="px-8 py-4 bg-gold text-maroon rounded-xl font-bold hover:bg-cream transition-colors whitespace-nowrap"
          >
            Check Calendar
          </a>
        </motion.div>
      </div>
    </section>
  );
};
