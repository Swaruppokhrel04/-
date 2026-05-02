import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void, key?: any }) => {
  return (
    <motion.div 
      layout
      className="border-b border-gold/10 last:border-0"
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
        aria-expanded={isOpen}
      >
        <span className={`text-lg font-bold transition-colors pr-8 ${isOpen ? 'text-saffron' : 'text-maroon group-hover:text-saffron'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`p-1.5 rounded-full flex-shrink-0 ${isOpen ? 'bg-saffron text-cream shadow-md shadow-saffron/20' : 'bg-paper text-maroon'}`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginBottom: 24 },
              collapsed: { opacity: 0, height: 0, marginBottom: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="text-gray-500 leading-relaxed text-sm md:text-base pr-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section 
      id="faq" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-24 bg-paper scroll-mt-24 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-maroon/5 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-maroon/5 text-maroon rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-maroon/10"
          >
            <HelpCircle className="w-4 h-4" /> {t.nav.faq}
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-maroon font-serif leading-tight">
            {t.faq.title}
          </h2>
        </div>

        <motion.div 
          layout
          className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl shadow-maroon/5 border border-gold/10"
        >
          {t.faq.questions.map((item, idx) => (
            <FAQItem
              key={idx}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </motion.div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm italic">
            Still have questions? <a href="#contact" className="text-saffron font-bold hover:underline">Contact us</a> directly for more information.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
