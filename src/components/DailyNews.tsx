import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Newspaper, Calendar, Sparkles, Star, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { i18n } from '../translations';
import { cn } from '../lib/utils';

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

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      setNews(data);
    } catch (err: any) {
      console.error('News Fetch Error:', err);
      setError(t.news.error);
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
    <div className="max-w-4xl mx-auto px-4 py-12">
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
            <span>{new Date(news.date).toLocaleDateString(language === 'en' ? 'en-US' : language === 'ne' ? 'ne-NP' : 'hi-IN', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            })}</span>
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
