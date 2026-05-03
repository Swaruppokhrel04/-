
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book as BookIcon, 
  Search, 
  ChevronLeft, 
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
  SearchX
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { RELIGIOUS_BOOKS, Book } from '../library_constants';

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

  if (selectedBook) {
    return (
      <div className="min-h-screen bg-paper pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setSelectedBook(null)}
            className="flex items-center gap-2 text-maroon font-bold mb-8 hover:text-saffron transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {t.library.back}
          </button>

          <header className="mb-12 text-center">
            <div className="w-16 h-16 bg-maroon/10 rounded-2xl flex items-center justify-center text-maroon mx-auto mb-6">
              <BookIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold text-maroon font-serif mb-4">
              {selectedBook.title[language] || selectedBook.title['en']}
            </h1>
            <p className="text-gold font-bold uppercase tracking-widest text-sm mb-6">
              {selectedBook.author[language] || selectedBook.author['en']}
            </p>
            <div className="w-24 h-1 bg-gold/20 mx-auto rounded-full" />
          </header>

          <div className="space-y-12">
            {selectedBook.content.map((section, sIdx) => (
              <section key={sIdx}>
                {section.sectionTitle && (
                  <h2 className="text-2xl font-bold text-maroon font-serif mb-8 border-l-4 border-saffron pl-4">
                    {section.sectionTitle[language] || section.sectionTitle['en']}
                  </h2>
                )}
                <div className="space-y-8">
                  {section.verses.map((verse, vIdx) => (
                    <motion.div 
                      key={vIdx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: vIdx * 0.05 }}
                      className="bg-white rounded-3xl p-8 border border-gold/10 shadow-sm hover:border-gold/30 hover:shadow-md transition-all"
                    >
                      <div className="flex gap-4 mb-6">
                        {verse.number && (
                          <span className="w-8 h-8 rounded-full bg-saffron/10 text-saffron flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {verse.number}
                          </span>
                        )}
                        <p className="text-xl font-bold text-maroon leading-relaxed whitespace-pre-line text-center w-full">
                          {verse.original}
                        </p>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-dashed border-gold/20">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold mb-3">
                          <GraduationCap className="w-3 h-3" />
                          Meaning
                        </div>
                        <p className="text-gray-600 leading-relaxed italic">
                          {verse.translation[language] || verse.translation['en']}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-gold/10 text-center">
            <p className="text-maroon font-serif italic text-lg">शुभमस्तु ।</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-mandala pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-3 bg-saffron/10 rounded-2xl text-saffron mb-6"
          >
            <BookOpen className="w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-maroon font-serif mb-4">{t.library.title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t.library.subtitle}</p>
        </header>

        <div className="max-w-2xl mx-auto mb-16 px-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon/30" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.library.search}
              className="w-full bg-white/70 backdrop-blur-xl border border-gold/20 pl-12 pr-4 py-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-maroon/10 text-maroon shadow-lg shadow-maroon/5"
            />
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredBooks.map((book, idx) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-gold/10 hover:border-gold/30 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={book.image} 
                      alt={book.title[language]} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 to-transparent" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-maroon">
                      {book.category}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-maroon font-serif mb-2 group-hover:text-saffron transition-colors">
                      {book.title[language] || book.title['en']}
                    </h3>
                    <p className="text-xs text-gold font-bold uppercase tracking-widest mb-4">
                      {book.author[language] || book.author['en']}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                      {book.description[language] || book.description['en']}
                    </p>

                    <button 
                      onClick={() => setSelectedBook(book)}
                      className="w-full bg-maroon/5 hover:bg-maroon text-maroon hover:text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group/btn"
                    >
                      {t.library.readNow}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20 bg-white/30 backdrop-blur rounded-[3rem] border border-dashed border-gold/30">
            <SearchX className="w-16 h-16 text-maroon/20 mx-auto mb-4" />
            <p className="text-maroon/50 font-bold">{t.library.noBooks}</p>
          </div>
        )}

        {/* Decorative corner element */}
        <div className="mt-24 text-center">
          <div className="flex items-center justify-center gap-4 text-gold/30">
            <div className="h-px w-20 bg-gradient-to-l from-gold/30 to-transparent" />
            <Sparkles className="w-5 h-5" />
            <div className="h-px w-20 bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};
