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

const ReadingModal = ({ book, onClose, language, t }: { book: Book, onClose: () => void, language: string, t: any }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (book.audioUrl) {
      const newAudio = new Audio(book.audioUrl);
      newAudio.onended = () => setIsPlaying(false);
      setAudio(newAudio);
    }
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [book.audioUrl]);

  const togglePlay = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

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
        className={`bg-white dark:bg-dark-bg w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ${isFullScreen ? 'h-full max-w-full m-0 rounded-none' : 'h-[90vh]'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-white dark:bg-dark-surface px-6 md:px-10 py-6 border-b border-gold/10 dark:border-gold/5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-maroon/5 dark:bg-maroon/20 rounded-xl flex items-center justify-center text-maroon dark:text-saffron">
              <BookIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-maroon dark:text-cream font-serif leading-tight">
                {book.title[language] || book.title['en']}
              </h2>
              <p className="text-[10px] text-gold dark:text-saffron font-bold uppercase tracking-widest">
                {book.author[language] || book.author['en']}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {book.audioUrl && (
              <div className="flex items-center gap-1 bg-maroon/5 dark:bg-maroon/20 rounded-xl p-1 mr-4">
                <button 
                  onClick={togglePlay}
                  className="p-2.5 bg-maroon text-white rounded-lg hover:bg-saffron transition-all active:scale-90"
                  title={isPlaying ? "Pause" : "Play Audio"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button 
                  onClick={toggleMute}
                  className="p-2.5 text-maroon dark:text-saffron hover:bg-maroon/10 rounded-lg transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <div className="px-3 py-1 flex items-center gap-2">
                  <div className={`w-1 h-4 bg-maroon/20 dark:bg-maroon/40 rounded-full overflow-hidden relative`}>
                    {isPlaying && (
                      <div className="absolute inset-0 bg-maroon dark:bg-saffron animate-pulse" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-maroon dark:text-saffron uppercase tracking-widest hidden sm:inline">Audio</span>
                </div>
              </div>
            )}
            <button 
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-3 text-gold dark:text-saffron hover:bg-gold/10 dark:hover:bg-gold/5 rounded-xl transition-colors hidden md:block"
              title={isFullScreen ? "Minimize" : "Maximize"}
            >
              {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button 
              onClick={onClose}
              className="p-3 bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-paper-dark/30 dark:bg-dark-bg/50 scroll-smooth">
          <div className="max-w-3xl mx-auto py-12 px-6 md:px-10">
            <div className="space-y-16">
              {book.content.map((section, sIdx) => (
                <div key={sIdx} className="space-y-10">
                  {section.sectionTitle && (
                    <div className="text-center">
                      <div className="inline-block px-8 py-3 border-y border-gold/20 dark:border-gold/10 relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 w-2 h-2 rounded-full bg-gold dark:bg-saffron" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 w-2 h-2 rounded-full bg-gold dark:bg-saffron" />
                        <h3 className="text-2xl md:text-3xl font-bold text-maroon dark:text-gold font-serif">
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
                        className="bg-white dark:bg-dark-surface rounded-[2rem] p-8 md:p-10 border border-gold/10 dark:border-gold/5 shadow-sm hover:border-gold/30 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 relative group"
                      >
                        {verse.number && (
                          <div className="absolute -left-3 top-8 w-8 h-8 rounded-xl bg-maroon dark:bg-maroon text-cream flex items-center justify-center text-xs font-black shadow-lg shadow-maroon/20">
                            {verse.number}
                          </div>
                        )}
                        
                        <div className="text-center space-y-6">
                          <p className="text-2xl md:text-3xl font-bold text-maroon dark:text-cream leading-[1.6] whitespace-pre-line font-serif">
                            {verse.original}
                          </p>
                          
                          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 dark:via-gold/10 to-transparent mx-auto" />
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gold dark:text-saffron mb-3">
                              <GraduationCap className="w-4 h-4" />
                              Sacred Meaning
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic text-lg md:text-xl font-medium px-4">
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

            <div className="mt-24 pt-12 border-t border-gold/10 dark:border-gold/5 text-center space-y-4">
              <div className="flex items-center justify-center gap-4 text-gold/30 dark:text-gold/10">
                <div className="h-px w-16 bg-gradient-to-l from-gold/30 to-transparent" />
                <Sparkles className="w-6 h-6" />
                <div className="h-px w-16 bg-gradient-to-r from-gold/30 to-transparent" />
              </div>
              <p className="text-maroon dark:text-gold font-serif italic text-2xl">शुभमस्तु ।</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-widest">End of Path</p>
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

  const filteredBooks = RELIGIOUS_BOOKS.filter(book => {
    const title = book.title[language] || book.title['en'];
    const desc = book.description[language] || book.description['en'];
    const query = searchQuery.toLowerCase();
    return title.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
  });

  return (
    <section className="min-h-screen bg-mandala pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
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

        <div className="max-w-2xl mx-auto mb-20 px-4">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-maroon/20 group-focus-within:text-saffron transition-colors" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.library.search}
              className="w-full bg-white/70 backdrop-blur-2xl border border-gold/10 pl-16 pr-6 py-5 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-maroon/5 focus:bg-white text-maroon font-bold shadow-2xl shadow-maroon/5 transition-all text-lg"
            />
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
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={book.image} 
                      alt={book.title[language]} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
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
                      By {book.author[language] || book.author['en']}
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
            <p className="text-gray-400 mt-2 text-sm">Perhaps it exists in the oral tradition.</p>
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
