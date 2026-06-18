import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Newspaper, Calendar, Sparkles, Star, ArrowRight, Loader2, RefreshCw, Quote, BookOpen } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { i18n } from '../translations';
import { cn } from '../lib/utils';
import { FEATURED_WISDOM } from '../constants/wisdomContent';

interface NewsArticle {
  date: string;
  en: LanguageContent;
  ne: LanguageContent;
  hi: LanguageContent;
}

interface LanguageContent {
  title: string;
  summary: string;
  body: string;
  tip: string;
  highlight: string;
}

export default function DailyNews() {
  const { language } = useLanguage();
  const [news, setNews] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = i18n[language];
  const wisdom = FEATURED_WISDOM[language] || FEATURED_WISDOM.en;

  const formatDateSafely = (dateStr: string) => {
    try {
      if (!dateStr) return '';
      // Safari compatibility: parse YYYY-MM-DD safely by replacing "-" with "/"
      const normalizedDate = dateStr.includes('-') ? dateStr.replace(/-/g, '/') : dateStr;
      const parsedDate = new Date(normalizedDate);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString(language === 'en' ? 'en-US' : language === 'ne' ? 'ne-NP' : 'hi-IN', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
      }
    } catch (e) {
      console.error('Error formatting date:', e);
    }
    return dateStr; // fallback to raw string if parsing fails
  };

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || 'Failed to fetch news');
      }
      setNews(data);
    } catch (err: any) {
      console.error('News Fetch Error:', err);
      setError(err.message || t.news.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-6"
        >
          <RefreshCw className="w-12 h-12 text-maroon opacity-20" />
        </motion.div>
        <h2 className="text-2xl font-serif font-bold text-maroon mb-2">{t.news.loading}</h2>
        <p className="text-gray-500 max-w-md mx-auto italic">"Dharma is the foundation of the world..."</p>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <Newspaper className="w-16 h-16 text-maroon/20 mb-6" />
        <h2 className="text-2xl font-serif font-bold text-maroon mb-4">{error || t.news.error}</h2>
        <button
          onClick={fetchNews}
          className="px-8 py-3 bg-maroon text-cream rounded-full font-bold shadow-lg shadow-maroon/20 hover:scale-105 active:scale-95 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  const content = news[language] || news.en;

  return (
    <div className="w-full max-w-[96%] xl:max-w-[94%] mx-auto px-4 py-12">
      {/* Featured Sanskrit Wisdom Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24 bg-gradient-to-br from-paper via-white to-saffron/5 rounded-[3rem] p-8 md:p-12 border border-maroon/10 shadow-2xl shadow-maroon/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 pointer-events-none">
          <Quote className="w-64 h-64 text-maroon" />
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-maroon text-cream rounded-full text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-lg shadow-maroon/20">
            <BookOpen className="w-4 h-4 text-gold" />
            <span>संस्कृत शुभ विचार • Sanskrit Wisdom</span>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-maroon mb-6 leading-tight whitespace-pre-line italic drop-shadow-sm">
              “{wisdom.shloka}”
            </h2>
            <p className="text-saffron font-bold text-sm md:text-base tracking-widest uppercase opacity-80 max-w-2xl mx-auto">
              {wisdom.shlokaTransliteration}
            </p>
          </div>

          <div className="prose prose-lg prose-maroon max-w-none">
            <h3 className="text-2xl font-serif font-bold text-maroon mb-4 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-saffron" />
              {wisdom.title}
            </h3>
            <p className="text-gray-700 leading-relaxed font-medium mb-8 bg-paper/50 p-6 rounded-3xl border border-maroon/5 italic">
              {wisdom.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {wisdom.sections.map((section, idx) => (
                <div key={idx} className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-maroon/5 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="w-10 h-10 bg-maroon/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-maroon group-hover:text-white transition-colors">
                    <span className="font-serif font-bold text-xs italic">{idx + 1}</span>
                  </div>
                  <h4 className="font-serif font-bold text-maroon text-xl mb-3">{section.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            <div className="bg-maroon/5 p-8 rounded-[2.5rem] border border-maroon/10 mb-10">
              <p className="text-gray-800 font-medium leading-relaxed italic text-lg text-center">
                {wisdom.conclusion}
              </p>
            </div>

            <div className="text-center bg-gradient-to-r from-saffron to-maroon p-8 md:p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10"></div>
              <span className="block text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-70">शुभ सन्देश • Auspicious Message</span>
              <p className="text-2xl md:text-3xl font-serif font-bold italic leading-relaxed relative z-10">
                “{wisdom.subhSandesh}”
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily News Header Divider */}
      <div className="flex items-center gap-4 mb-20">
        <div className="h-px bg-maroon/10 flex-1"></div>
        <div className="p-3 bg-paper rounded-full border border-maroon/10">
          <Newspaper className="w-6 h-6 text-maroon/20" />
        </div>
        <div className="h-px bg-maroon/10 flex-1"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-saffron/10 text-saffron rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 border border-saffron/20">
          <Sparkles className="w-3 h-3" />
          <span>Divine Daily</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-black text-maroon mb-4 leading-tight italic">
          {content.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-gray-500 font-bold text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-saffron" />
            <span>{formatDateSafely(news.date)}</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg prose-maroon max-w-none"
          >
            <div className="bg-maroon/5 border-l-4 border-maroon p-6 mb-8 italic text-maroon font-medium rounded-r-2xl shadow-sm">
              <span className="block text-xs uppercase tracking-widest font-black opacity-50 mb-2">{t.news.summary}</span>
              {content.summary}
            </div>
            
            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-medium text-lg drop-shadow-sm">
              {content.body}
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-paper p-8 rounded-[2.5rem] border border-maroon/10 shadow-xl shadow-maroon/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-24 h-24 text-maroon" />
            </div>
            <h3 className="flex items-center gap-3 text-maroon font-serif font-bold text-xl mb-6">
              <Sparkles className="w-5 h-5 text-saffron" />
              {t.news.spiritualTip}
            </h3>
            <p className="text-gray-700 font-medium leading-relaxed italic border-l-2 border-saffron/30 pl-4">
              {content.tip}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-maroon to-maroon/90 p-8 rounded-[2.5rem] text-cream shadow-2xl shadow-maroon/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <RefreshCw className="w-24 h-24 text-white" />
            </div>
            <h3 className="flex items-center gap-3 font-serif font-bold text-xl mb-6 text-gold">
              <Star className="w-5 h-5" />
              {t.news.planetaryHighlight}
            </h3>
            <p className="text-cream/90 font-medium leading-relaxed">
              {content.highlight}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gold/10 p-6 rounded-3xl border border-gold/20"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-maroon opacity-50 mb-3 ml-1">AI Generated Wisdom</p>
            <p className="text-xs text-maroon/70 italic leading-relaxed">
              This article is contextually generated by our Divine AI based on ancient Vedic algorithms and current celestial alignments.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-maroon font-serif italic text-xl mb-8">"May all beings be happy, may all be peaceful."</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-maroon/40 hover:text-maroon transition-colors uppercase tracking-[0.3em] text-[10px] font-black"
        >
          Back to Top
        </button>
      </div>
    </div>
  );
}
