import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book as BookIcon, 
  Search, 
  ChevronLeft, 
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
  SearchX,
  X,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { RELIGIOUS_BOOKS, Book } from '../library_constants';
import { cn } from '../lib/utils';
import { SafeImage } from './SafeImage.tsx';

const ReadingModal = ({ book, onClose, language, t }: { book: Book, onClose: () => void, language: string, t: any }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-maroon/40 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ${isFullScreen ? 'h-full max-w-full m-0 rounded-none' : 'h-[90vh]'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-white px-6 md:px-10 py-6 border-b border-gold/10 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-maroon/5 rounded-xl flex items-center justify-center text-maroon">
              <BookIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-maroon font-serif leading-tight">
                {book.title[language] || book.title['en']}
              </h2>
              <p className="text-[10px] text-gold font-bold uppercase tracking-widest">
                {book.author[language] || book.author['en']}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-3 text-gold hover:bg-gold/10 rounded-xl transition-colors hidden md:block"
              title={isFullScreen ? (language === 'hi' ? 'छोटा करें' : language === 'ne' ? 'सानो बनाउनुहोस्' : 'Minimize') : (language === 'hi' ? 'बड़ा करें' : language === 'ne' ? 'ठूलो बनाउन्' : 'Maximize')}
            >
              {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button 
              onClick={onClose}
              className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-paper-dark/30 scroll-smooth">
          <div className="max-w-3xl mx-auto py-12 px-6 md:px-10">
            <div className="space-y-16">
              {book.content.map((section, sIdx) => (
                <div key={sIdx} className="space-y-10">
                  {section.sectionTitle && (
                    <div className="text-center">
                      <div className="inline-block px-8 py-3 border-y border-gold/20 relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 w-2 h-2 rounded-full bg-gold" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 w-2 h-2 rounded-full bg-gold" />
                        <h3 className="text-2xl md:text-3xl font-bold text-maroon font-serif">
                          {section.sectionTitle[language] || section.sectionTitle['en']}
                        </h3>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-8">
                    {section.verses.map((verse, vIdx) => (
                      <motion.div 
                        key={vIdx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[2rem] p-8 md:p-10 border border-gold/10 shadow-sm hover:border-gold/30 hover:shadow-xl transition-all duration-300 relative group"
                      >
                        {verse.number && (
                          <div className="absolute -left-3 top-8 w-8 h-8 rounded-xl bg-maroon text-cream flex items-center justify-center text-xs font-black shadow-lg shadow-maroon/20">
                            {verse.number}
                          </div>
                        )}
                        
                        <div className="text-center space-y-6">
                          <p className="text-2xl md:text-3xl font-bold text-maroon leading-[1.6] whitespace-pre-line font-serif">
                            {verse.original}
                          </p>
                          
                          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto" />
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-3">
                              <GraduationCap className="w-4 h-4" />
                              {t.library.sacredMeaning}
                            </div>
                            <p className="text-gray-600 leading-relaxed italic text-lg md:text-xl font-medium px-4">
                              {verse.translation[language] || verse.translation['en']}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-24 pt-12 border-t border-gold/10 text-center space-y-4">
              <div className="flex items-center justify-center gap-4 text-gold/30">
                <div className="h-px w-16 bg-gradient-to-l from-gold/30 to-transparent" />
                <Sparkles className="w-6 h-6" />
                <div className="h-px w-16 bg-gradient-to-r from-gold/30 to-transparent" />
              </div>
              <p className="text-maroon font-serif italic text-2xl">शुभमस्तु ।</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t.library.endOfPath}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Library = () => {
  const { t, language } = useLanguage();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Stotra' | 'Upanishad' | 'Bal Sahitya' | 'Jyotish'>('All');

  const categories = ['All', 'Stotra', 'Upanishad', 'Bal Sahitya', 'Jyotish'] as const;

  const filteredBooks = RELIGIOUS_BOOKS.filter(book => {
    const title = book.title[language] || book.title['en'];
    const desc = book.description[language] || book.description['en'];
    const query = searchQuery.toLowerCase();
    
    const matchesSearch = title.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="min-h-screen bg-mandala pt-32 pb-24 px-4">
      <div className="w-full max-w-[96%] xl:max-w-[94%] mx-auto">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 bg-saffron/10 rounded-[1.5rem] text-saffron mb-6 shadow-inner"
          >
            <BookOpen className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-maroon font-serif mb-6 tracking-tight leading-tight">
            {t.library.title}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">{t.library.subtitle}</p>
        </header>

        <div className="max-w-4xl mx-auto mb-16 space-y-8">
          <div className="relative group max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-maroon/20 group-focus-within:text-saffron transition-colors" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.library.search}
              className="w-full bg-white/70 backdrop-blur-2xl border border-gold/10 pl-16 pr-6 py-5 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-maroon/5 focus:bg-white text-maroon font-bold shadow-2xl shadow-maroon/5 transition-all text-lg"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 border",
                  selectedCategory === cat 
                    ? "bg-maroon text-white border-maroon shadow-lg shadow-maroon/20 scale-105" 
                    : "bg-white/50 text-maroon/60 border-maroon/5 hover:bg-maroon/5 hover:text-maroon"
                )}
              >
                {cat === 'All' ? (language === 'en' ? 'All Books' : language === 'ne' ? 'सबै पुस्तकहरु' : 'सभी पुस्तकें') : cat}
              </button>
            ))}
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredBooks.map((book, idx) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group bg-white rounded-[3rem] overflow-hidden border border-gold/5 hover:border-gold/30 hover:shadow-[0_40px_80px_-20px_rgba(74,4,4,0.1)] transition-all duration-500 flex flex-col h-full relative"
                >
                  <div className="relative h-72 md:h-80 overflow-hidden">
                    <SafeImage 
                      src={book.image} 
                      alt={book.title[language]} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                      fallbackType="book"
                      seed={book.id}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-maroon/20 to-transparent" />
                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-maroon shadow-lg">
                      {book.category}
                    </div>
                  </div>

                  <div className="p-10 flex flex-col flex-grow relative -mt-8 bg-white rounded-t-[3rem]">
                    <h3 className="text-2xl font-bold text-maroon font-serif mb-3 group-hover:text-saffron transition-colors leading-tight">
                      {book.title[language] || book.title['en']}
                    </h3>
                    <p className="text-[10px] text-gold font-black uppercase tracking-[0.2em] mb-6 border-b border-gold/10 pb-4">
                      {t.library.by} {book.author[language] || book.author['en']}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                      {book.description[language] || book.description['en']}
                    </p>

                    <button 
                      onClick={() => setSelectedBook(book)}
                      className="w-full bg-maroon/5 hover:bg-maroon text-maroon hover:text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-transparent hover:shadow-maroon/20 group/btn active:scale-95"
                    >
                      <span>{t.library.readNow}</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-32 bg-white/30 backdrop-blur rounded-[4rem] border-2 border-dashed border-gold/10">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <SearchX className="w-10 h-10 text-maroon/10" />
            </div>
            <p className="text-maroon/30 text-xl font-bold tracking-tight">{t.library.noBooks}</p>
            <p className="text-gray-400 mt-2 text-sm">{t.library.noBooksDesc}</p>
          </div>
        )}

        <div className="mt-32 text-center">
          <div className="flex items-center justify-center gap-6 text-gold/20">
            <div className="h-[2px] w-32 bg-gradient-to-l from-gold/20 to-transparent" />
            <Sparkles className="w-8 h-8" />
            <div className="h-[2px] w-32 bg-gradient-to-r from-gold/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Reading Modal */}
      <AnimatePresence>
        {selectedBook && (
          <ReadingModal 
            book={selectedBook} 
            language={language}
            t={t}
            onClose={() => setSelectedBook(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};
