/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Phone, 
  MapPin,
  Mail,
  Calendar, 
  Clock, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Menu, 
  X,
  MessageCircle,
  Award,
  BookOpen,
  Users,
  Info,
  Zap,
  Grid,
  Scroll,
  UserCheck,
  Compass,
  Heart,
  Home,
  Flower2,
  Sparkles,
  Search,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { SERVICES, CONTACT_INFO } from './constants.ts';
import { BookingFormData, PujaService } from './types.ts';
import { CalendarView } from './components/Calendar.tsx';
import { db } from './lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';
import { i18n } from './translations.ts';
import { LanguageSwitcher } from './components/LanguageSwitcher.tsx';
import { FAQ } from './components/FAQ.tsx';
import { SplashScreen } from './components/SplashScreen.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { ChatWidget } from './components/ChatWidget.tsx';
import { BookingConfirmation } from './components/BookingConfirmation.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { ContactForm } from './components/ContactForm.tsx';
import { AudioPlayer } from './components/AudioPlayer.tsx';
import { CallActionButton } from './components/CallActionButton.tsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { t, language } = useLanguage();
  const { user, signIn, signOut } = useAuth();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = query.trim() ? SERVICES.filter(s => {
    const serviceT = (i18n[language] as any).services_list[s.id];
    const name = (serviceT?.name || s.name).toLowerCase();
    const desc = (serviceT?.desc || s.description).toLowerCase();
    const q = query.toLowerCase();
    return name.includes(q) || desc.includes(q);
  }) : [];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-paper/60 backdrop-blur-xl border-b border-gold/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 bg-maroon text-gold flex items-center justify-center rounded-2xl font-bold text-xl shadow-xl shadow-maroon/20 transform group-hover:rotate-6 transition-transform">
              🕉️
            </div>
            <div className="hidden sm:block leading-tight">
              <h1 className="font-serif font-bold text-maroon tracking-tight text-lg">श्री नर नारायण</h1>
              <p className="text-[10px] sm:text-xs text-saffron uppercase font-extrabold tracking-[0.2em] opacity-90">धार्मिक सेवा</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative" ref={searchRef}>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-maroon hover:text-saffron transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-maroon/10 p-4 overflow-hidden"
                  >
                    <div className="relative">
                      <input 
                        autoFocus
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={(t.search as any).placeholder}
                        className="w-full bg-paper pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-maroon/20 text-maroon"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon/40" />
                    </div>

                    {query && (
                      <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
                        {results.length > 0 ? (
                          results.map((s) => {
                            const st = (i18n[language] as any).services_list[s.id];
                            return (
                              <a 
                                key={s.id} 
                                href="#services"
                                onClick={() => {
                                  setIsSearchOpen(false);
                                  setQuery('');
                                }}
                                className="flex flex-col p-3 hover:bg-saffron/5 rounded-xl transition-colors group"
                              >
                                <span className="text-sm font-bold text-maroon group-hover:text-saffron transition-colors">{st?.name || s.name}</span>
                                <span className="text-[10px] text-gray-400 line-clamp-1">{st?.desc || s.description}</span>
                              </a>
                            );
                          })
                        ) : (
                          <div className="text-center py-4 text-gray-400 text-xs">
                            {(t.search as any).noResults}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="/#services" className="text-sm font-bold text-maroon hover:text-saffron transition-colors">{t.nav.services}</a>
            <a href="/#about" className="text-sm font-bold text-maroon hover:text-saffron transition-colors">{t.nav.about}</a>
            <a href="/#faq" className="text-sm font-bold text-maroon hover:text-saffron transition-colors">{t.nav.faq}</a>
            {user && (
              <Link to="/dashboard" className="text-sm font-bold text-maroon hover:text-saffron transition-colors">
                {(t.nav as any).dashboard}
              </Link>
            )}
            <LanguageSwitcher />
            
            {user ? (
              <div className="flex items-center gap-4 border-l border-gold/10 pl-6">
                <div className="flex items-center gap-2 group relative cursor-pointer">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-gold/20" />
                  ) : (
                    <div className="w-8 h-8 bg-maroon/10 rounded-full flex items-center justify-center text-maroon font-bold text-xs uppercase">
                      {user.displayName?.[0] || <Users className="w-4 h-4" />}
                    </div>
                  )}
                  <button 
                    onClick={() => signOut()}
                    className="text-xs font-bold text-gray-500 hover:text-maroon transition-colors"
                  >
                    {t.nav.logout}
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => signIn()}
                className="text-sm font-bold text-maroon hover:text-saffron transition-colors"
              >
                {t.nav.login}
              </button>
            )}

            <a href="#booking" className="bg-maroon text-cream px-6 py-2.5 rounded-full text-sm font-bold hover:bg-saffron transition-all duration-300">
              {t.nav.book}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsOpen(false);
              }}
              className="p-2 text-maroon"
            >
              <Search className="w-6 h-6" />
            </button>
            <button onClick={() => {
              setIsOpen(!isOpen);
              setIsSearchOpen(false);
            }}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gold/20 p-4 shadow-xl z-50"
          >
            <div className="relative">
              <input 
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={(t.search as any).placeholder}
                className="w-full bg-paper pl-12 pr-4 py-3 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-maroon/10 text-maroon"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon/40" />
              <button 
                onClick={() => {
                  setIsSearchOpen(false);
                  setQuery('');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {query && (
              <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-4">
                {results.length > 0 ? (
                  results.map((s) => {
                    const st = (i18n[language] as any).services_list[s.id];
                    return (
                      <a 
                        key={s.id} 
                        href="#services"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setQuery('');
                        }}
                        className="flex items-center gap-4 p-2"
                      >
                        <div className="w-10 h-10 bg-saffron/10 rounded-xl flex items-center justify-center text-saffron">
                          <Scroll className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-maroon">{st?.name || s.name}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{st?.desc || s.description}</p>
                        </div>
                      </a>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    {(t.search as any).noResults}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>


      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-paper border-b border-gold/20 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 text-maroon">
              <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-bold">{t.nav.home}</Link>
              <a href="/#services" onClick={() => setIsOpen(false)} className="block text-lg font-bold">{t.nav.services}</a>
              <a href="/#about" onClick={() => setIsOpen(false)} className="block text-lg font-bold">{t.nav.about}</a>
              <a href="/#faq" onClick={() => setIsOpen(false)} className="block text-lg font-bold">{t.nav.faq}</a>
              {user && (
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-lg font-bold">
                  {(t.nav as any).dashboard}
                </Link>
              )}
              
              <div className="py-2 flex items-center justify-between border-t border-gold/5 pt-6">
                {user ? (
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
                    ) : (
                      <div className="w-10 h-10 bg-maroon/10 rounded-full flex items-center justify-center text-maroon font-bold text-lg uppercase">
                        {user.displayName?.[0] || <Users className="w-5 h-5" />}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold">{user.displayName || 'Yajman'}</p>
                      <button onClick={() => signOut()} className="text-xs text-saffron font-bold text-left">{t.nav.logout}</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => { signIn(); setIsOpen(false); }} className="text-lg font-bold flex items-center gap-2">
                    <Users className="w-5 h-5" /> {t.nav.login}
                  </button>
                )}
              </div>

              <div className="py-2 border-t border-gold/5 pt-4">
                <LanguageSwitcher />
              </div>
              <a href="#booking" onClick={() => setIsOpen(false)} className="block bg-maroon text-cream px-6 py-3 rounded-xl text-center font-bold">
                {t.nav.book}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Swastik = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V22M2 12H22M12 2H22M22 12V22M12 22H2M2 12V2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="7" cy="7" r="1" fill="currentColor"/>
    <circle cx="17" cy="7" r="1" fill="currentColor"/>
    <circle cx="7" cy="17" r="1" fill="currentColor"/>
    <circle cx="17" cy="17" r="1" fill="currentColor"/>
  </svg>
);

const AnimatedSwastik = ({ className = "w-12 h-12" }: { className?: string }) => (
  <motion.div
    animate={{ 
      rotate: [0, 3, 0, -3, 0],
      scale: [1, 1.02, 1, 0.98, 1],
      filter: [
        "drop-shadow(0 0 2px rgba(212, 175, 55, 0.1))",
        "drop-shadow(0 0 12px rgba(212, 175, 55, 0.6))",
        "drop-shadow(0 0 2px rgba(212, 175, 55, 0.1))"
      ]
    }}
    transition={{ 
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
  >
    <Swastik className="w-full h-full" />
  </motion.div>
);

const Trishul = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V22M12 5C10 5 7 7 7 10V12M12 5C14 5 17 7 17 10V12M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Diya = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 10 5 10 7C10 8.1 10.9 9 12 9C13.1 9 14 8.1 14 7C14 5 12 2 12 2Z" fill="#FF9933"/>
    <path d="M4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ZodiacCard = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M12 2V4M12 20V22M2 12H4M20 12H22M5 5L6.5 6.5M17.5 17.5L19 19M5 19L6.5 17.5M17.5 6.5L19 5" stroke="currentColor" strokeWidth="1" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 12L12 10L14 12L12 14L10 12Z" fill="currentColor" opacity="0.3" />
  </svg>
);

const Stars = ({ count = 30, className = "" }: { count?: number, className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden h-full w-full ${className}`}>
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          opacity: Math.random() * 0.3, 
          scale: Math.random() * 0.5 + 0.5,
          x: Math.random() * 100 + "%",
          y: Math.random() * 100 + "%"
        }}
        animate={{ 
          opacity: [0.1, 0.6, 0.1],
          scale: [1, 1.2, 1],
          y: ["-2%", "2%", "-2%"]
        }}
        transition={{ 
          duration: 3 + Math.random() * 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5
        }}
        className="absolute w-1 h-1 bg-gold rounded-full blur-[0.5px]"
        style={{ 
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`
        }}
      />
    ))}
  </div>
);

const OmSymbol = () => (
  <div className="relative flex items-center justify-center">
    {/* Concentric Rings */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [1, 1.3 + (i * 0.2), 1],
          opacity: [0, 0.2, 0],
          rotate: i % 2 === 0 ? 360 : -360
        }}
        transition={{ 
          duration: 8 + (i * 2),
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute border border-gold/30 rounded-full"
        style={{ 
          width: `${140 + (i * 60)}px`, 
          height: `${140 + (i * 60)}px` 
        }}
      />
    ))}
    
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
        filter: [
          "drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))",
          "drop-shadow(0 0 25px rgba(212, 175, 55, 0.6))",
          "drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))"
        ]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="relative z-10 w-28 h-28 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-gold/20 shadow-inner"
    >
      <span className="text-6xl select-none">🕉️</span>
    </motion.div>
  </div>
);

const DecorativeMandala = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
    className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] opacity-[0.03] pointer-events-none select-none z-0"
  >
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        className="text-gold"
        d="M100 0 A100 100 0 0 1 200 100 A100 100 0 0 1 100 200 A100 100 0 0 1 0 100 A100 100 0 0 1 100 0 M100 10 A90 90 0 0 0 10 100 A90 90 0 0 0 100 190 A90 90 0 0 0 190 100 A90 90 0 0 0 100 10"
      />
      <path
        fill="currentColor"
        className="text-gold"
        d="M100 20 L110 50 L140 50 L115 70 L125 100 L100 80 L75 100 L85 70 L60 50 L90 50 Z"
      />
      {/* Decorative dots and lines */}
      {[...Array(12)].map((_, i) => (
        <circle key={i} cx={100 + 80 * Math.cos(i * Math.PI / 6)} cy={100 + 80 * Math.sin(i * Math.PI / 6)} r="2" fill="currentColor" className="text-gold" />
      ))}
    </svg>
  </motion.div>
);

const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-40 md:pt-48 bg-mandala">
      <Stars count={40} className="opacity-40" />
      <DecorativeMandala />
      
      {/* Corner Swastiks */}
      <div className="absolute top-24 left-8 text-gold/20 select-none hidden lg:block">
        <AnimatedSwastik className="w-12 h-12" />
      </div>
      <div className="absolute top-24 right-8 text-gold/20 select-none hidden lg:block">
        <AnimatedSwastik className="w-12 h-12" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/50 to-paper z-10" />
        <img 
          src="https://images.unsplash.com/photo-1544253457-3a137b1248a3?auto=format&fit=crop&q=80&w=2000" 
          alt="Divine Heritage"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
      </motion.div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12"
        >
          <OmSymbol />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8"
          >
            <p className="text-saffron font-bold text-lg md:text-xl font-serif tracking-[0.15em] mb-4 drop-shadow-sm">
              ॐ नमो भगवते वासुदेवाय 🙏
            </p>
            <div className="w-16 h-0.5 bg-gold/30 mx-auto" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <span className="inline-block px-4 py-1.5 bg-saffron/10 text-saffron rounded-full text-base font-bold tracking-widest uppercase mb-6 flex items-center gap-2 mx-auto w-fit">
            <Diya className="w-3 h-3" /> {t.hero.tag} <Diya className="w-3 h-3" />
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-maroon mb-6 md:mb-8 leading-tight font-serif">
            {t.hero.title} <br />
            <span className="italic text-gold">{t.hero.subtitle}</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
            {t.hero.p}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16">
            <a 
              href="#booking"
              className="w-full sm:w-auto bg-maroon text-cream px-10 py-5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-saffron transition-all duration-300 shadow-xl shadow-maroon/20 group"
            >
              {t.hero.btnConsult} <Trishul className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
            <a 
              href="#services"
              className="w-full sm:w-auto bg-white/50 backdrop-blur-sm border border-maroon/20 text-maroon px-10 py-5 rounded-full font-bold hover:bg-maroon hover:text-white transition-all duration-300"
            >
              {t.hero.btnServices}
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-12 border-t border-maroon/10">
            {t.hero.pillars?.map((pillar: any, idx: number) => {
              const icons = [Flower2, Compass, Home, BookOpen];
              const Icon = icons[idx % icons.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + (idx * 0.1) }}
                  className="flex flex-col items-center group cursor-default"
                >
                  <div className="w-14 h-14 bg-saffron/10 rounded-2xl flex items-center justify-center text-saffron mb-4 group-hover:bg-saffron group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-saffron/20 relative">
                    <div className="absolute inset-0 bg-saffron/5 rounded-2xl blur-xl group-hover:bg-saffron/20 transition-all duration-500" />
                    <Icon className="w-7 h-7 relative z-10" />
                  </div>
                  <h3 className="text-maroon font-bold text-base mb-1">{pillar.title}</h3>
                  <p className="text-xs text-gold font-bold uppercase tracking-[0.2em]">{pillar.phrase}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ 
  service, 
  index, 
  onShowDetails,
  onBookNow
}: { 
  service: PujaService; 
  index: number; 
  onShowDetails: (service: PujaService) => void;
  onBookNow: (serviceId: string) => void;
  key?: string | number 
}) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const translatedService = t.services_list[service.id as keyof typeof t.services_list];

  const isJyotish = service.category === 'Astrology' || ['kundali-creation', 'horoscope-reading', 'graha-dosh'].includes(service.id);

  const handleDetailsClick = () => {
    if (isJyotish) {
      const element = document.getElementById('jyotish-details');
      if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else if (service.category === 'Recitation') {
      const element = document.getElementById('path-parayan');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onShowDetails(service);
    }
  };

  const handleLearnMore = () => {
    const element = document.getElementById('jyotish-details');
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover="hover"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group rounded-[2.5rem] overflow-hidden border transition-all duration-500 hover:shadow-2xl relative ${
        isJyotish 
          ? 'bg-white/5 border-gold/20 hover:border-gold/50 hover:shadow-gold/10' 
          : 'bg-paper-dark border-gold/10 hover:border-gold/30 hover:shadow-maroon/10'
      }`}
    >
      <div className="absolute top-6 left-6 z-20 transition-opacity">
        {isJyotish ? (
          <ZodiacCard className="w-10 h-10 text-gold animate-glow" />
        ) : (
          <div className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
            <Trishul className="w-8 h-8 rotate-[-15deg]" />
          </div>
        )}
      </div>
      <div className="relative h-64 overflow-hidden">
        <img 
          src={service.image} 
          alt={translatedService?.name || service.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1590766948510-108259e9c4f3?auto=format&fit=crop&q=80&w=800';
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
        {isJyotish && <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />}
        <div className="absolute top-4 right-4 bg-paper/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-maroon">
          {service.category}
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <h3 className={`text-2xl font-bold font-serif ${isJyotish ? 'text-gold' : 'text-maroon'}`}>{translatedService?.name || service.name}</h3>
          <div className="relative">
            <motion.div
              variants={{
                hover: { scale: 1.2, rotate: 12 }
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-10"
            >
              <Diya className="w-6 h-6 text-saffron opacity-30 group-hover:opacity-100 transition-all duration-500" />
            </motion.div>
            <motion.div 
              variants={{
                hover: { 
                  opacity: [0.3, 0.6, 0.4, 0.7, 0.5],
                  scale: [1, 1.2, 1.1, 1.3, 1.2],
                  transition: { 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }
                },
                initial: { opacity: 0, scale: 1 }
              }}
              className="absolute inset-0 bg-saffron blur-xl rounded-full pointer-events-none" 
            />
          </div>
        </div>
        <div className="relative mb-6">
          <div className="relative">
            <p className={`${isJyotish ? 'text-cream/70' : 'text-gray-500'} text-sm leading-relaxed transition-all duration-500 ${isExpanded ? '' : 'line-clamp-3 overflow-hidden'}`}>
              {translatedService?.desc || service.description}
            </p>
            {!isExpanded && (translatedService?.desc || service.description).length > 100 && (
              <div className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t ${isJyotish ? 'from-white/5' : 'from-paper-dark'} to-transparent`} />
            )}
          </div>
          
          {(translatedService?.desc || service.description).length > 100 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className={`mt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${isJyotish ? 'text-gold hover:text-cream' : 'text-saffron hover:text-maroon'}`}
            >
              {isExpanded ? (
                <><ChevronUp className="w-3 h-3" /> {t.services.showLess}</>
              ) : (
                <><ChevronDown className="w-3 h-3" /> {t.services.readMore}</>
              )}
            </button>
          )}
        </div>
        
        {(translatedService?.benefits || service.benefits) && (
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold/60">
              <Sparkles className="w-3 h-3" />
              {t.services.benefits}
            </div>
            <div className="flex flex-wrap gap-2">
              {(translatedService?.benefits || service.benefits)?.map((benefit, bIdx) => (
                <span key={bIdx} className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors ${
                  isJyotish 
                    ? 'bg-gold/5 border-gold/20 text-gold hover:bg-gold/10' 
                    : 'bg-saffron/5 border-saffron/10 text-saffron hover:bg-saffron/10'
                }`}>
                  <div className={`w-1 h-1 rounded-full ${isJyotish ? 'bg-gold' : 'bg-saffron'}`} />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        )}

        {(service.deity || service.mantra || service.duration) && (
          <div className="mb-6 grid grid-cols-2 gap-3 p-4 bg-paper rounded-2xl border border-gold/5">
            {service.deity && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60">{t.services.deity}</span>
                <p className={`text-xs font-bold ${isJyotish ? 'text-gold' : 'text-maroon'}`}>{service.deity}</p>
              </div>
            )}
            {service.duration && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60">{t.services.duration}</span>
                <p className={`text-xs font-bold ${isJyotish ? 'text-gold' : 'text-maroon'}`}>{service.duration}</p>
              </div>
            )}
            {service.mantra && (
              <div className="col-span-2 space-y-2 border-t border-gold/5 pt-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60">{t.services.mantra}</span>
                  <p className={`text-xs italic ${isJyotish ? 'text-gray-400' : 'text-gray-500'}`}>{service.mantra}</p>
                </div>
                {service.audioUrl && (
                  <div className="mt-1">
                    <AudioPlayer url={service.audioUrl} variant="compact" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className={`flex flex-col gap-4 border-t border-gold/10 pt-6`}>
          <div className="flex items-center justify-end">
            {isJyotish && (
              <button 
                onClick={handleLearnMore}
                className="text-gold font-bold text-xs flex items-center gap-1 hover:text-white transition-colors uppercase tracking-widest"
              >
                {t.services.learnMore} <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleDetailsClick}
              className={`flex-1 font-bold py-3 px-4 rounded-xl text-center text-xs transition-all flex items-center justify-center gap-2 ${
              isJyotish 
                ? 'bg-gold/10 border border-gold/20 text-gold hover:bg-gold hover:text-maroon' 
                : 'bg-paper border border-gold/10 text-maroon hover:border-gold'
            }`}>
              {t.services.details}
            </button>
            <button 
              onClick={() => onBookNow(service.id)}
              className={`flex-1 font-bold py-3 px-4 rounded-xl text-center text-xs transition-all flex items-center justify-center gap-2 ${
              isJyotish 
                ? 'bg-gold text-maroon hover:bg-white' 
                : 'bg-maroon text-cream hover:bg-saffron'
            }`}>
              {t.nav.book}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceSection = ({ 
  onServiceSelect,
  onBookNow 
}: { 
  onServiceSelect: (s: PujaService) => void;
  onBookNow: (serviceId: string) => void;
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('pooja');

  const categories = [
    { id: 'pooja', label: t.categories.pooja, services: SERVICES.filter(s => ['ganpati-pujan', 'rudrabhishek', 'durga-pujan', 'navgrah-shanti'].includes(s.id)) },
    { id: 'griha', label: t.categories.griha, services: SERVICES.filter(s => ['griha-pravesh', 'vastu-shanti'].includes(s.id)) },
    { id: 'path', label: t.categories.path, services: SERVICES.filter(s => ['sunderkand', 'ramayan', 'geeta', 'shrimad-bhagwat'].includes(s.id)) },
    { id: 'jyotish', label: t.categories.jyotish, services: SERVICES.filter(s => ['kundali-creation', 'horoscope-reading', 'graha-dosh'].includes(s.id)) }
  ];

  return (
    <motion.section 
      id="services" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-24 scroll-mt-24 transition-colors duration-1000 relative ${activeTab === 'jyotish' ? 'bg-maroon/95 text-cream' : 'bg-paper'}`}
    >
      {activeTab === 'jyotish' && <Stars />}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className={`text-xs font-bold uppercase tracking-[0.3em] mb-4 ${activeTab === 'jyotish' ? 'text-gold' : 'text-saffron'}`}>{t.services.tag}</h2>
          <p className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${activeTab === 'jyotish' ? 'text-white' : 'text-maroon'}`}>
            {t.services.title} <span className="italic text-gold">{t.services.span}</span>।
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === cat.id 
                  ? (activeTab === 'jyotish' ? 'bg-gold text-maroon shadow-lg shadow-gold/20' : 'bg-maroon text-cream shadow-lg shadow-maroon/20') 
                  : (activeTab === 'jyotish' ? 'bg-white/10 border border-gold/20 text-cream/70 hover:bg-white/20' : 'bg-white border border-gold/10 text-maroon/60 hover:border-gold')
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {categories.find(c => c.id === activeTab)?.services.map((service, idx) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={idx} 
                onShowDetails={onServiceSelect}
                onBookNow={onBookNow}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

const BookingForm = ({ preselectedServiceId }: { preselectedServiceId?: string | null }) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: user?.displayName || '',
    phone: '',
    pujaType: SERVICES[0].id,
    date: '', 
    time: '',
    location: '',
    message: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.displayName || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData(prev => ({ ...prev, pujaType: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (formData.phone.trim() && !/^\+?[0-9]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "कृपया मान्य फोन नम्बर राख्नुहोस्।";
    }
    
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time slot";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [lastBooking, setLastBooking] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [isAcknowledging, setIsAcknowledging] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Save to Firestore
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        userId: user?.uid || 'guest',
        status: 'pending',
        createdAt: serverTimestamp()
      });

      // 2. Send Email via API
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: user?.uid })
      });
      
      const result = await response.json();
      if (result.success) {
        setLastBooking({ ...formData });
        
        // Show acknowledgment first
        setIsAcknowledging(true);
        
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          pujaType: SERVICES[0].id,
          date: '', 
          time: '',
          location: '',
          message: ''
        });
        setErrors({});

        // Delay then show confirmation
        setTimeout(() => {
          setIsAcknowledging(false);
          setShowBookingConfirm(true);
        }, 2500);
      } else {
        setSubmitError(result.error || "An error occurred during booking. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      id="booking" 
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-24 scroll-mt-24 bg-maroon-pattern relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 border-8 border-cream rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border-8 border-gold rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream mb-4">{t.booking.title.split(' ')[0]} <span className="italic text-gold">{t.booking.title.split(' ')[1]}</span> {t.booking.title.split(' ').slice(2).join(' ')}</h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-xs md:text-sm">{t.booking.p}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <CalendarView 
              selectedDate={formData.date} 
              selectedTime={formData.time}
              onDateSelect={(d) => setFormData({...formData, date: d})} 
              onTimeSelect={(t) => {
                setFormData({...formData, time: t});
                if (errors.time) setErrors({...errors, time: undefined});
              }}
            />
            {errors.date && <p className="text-xs text-red-500 font-bold mt-2">{errors.date}</p>}
            {errors.time && <p className="text-xs text-red-500 font-bold mt-2">{errors.time}</p>}
            
            <div className="hidden">
              {/* Muhurat info removed as requested */}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isAcknowledging ? (
              <motion.div
                key="acknowledgment"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="bg-maroon p-12 rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden relative"
              >
                <Stars className="opacity-20" />
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                  className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mb-8 border border-gold/30"
                >
                  <Flower2 className="w-12 h-12 text-gold" />
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-serif font-bold text-cream mb-4"
                >
                  {language === 'ne' ? 'धन्यवाद !' : language === 'hi' ? 'धन्यवाद !' : 'Thank You !'}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-gold font-bold uppercase tracking-[0.2em] text-xs"
                >
                  {language === 'ne' ? 'बुकिङ सफलतापूर्वक प्राप्त भयो' : language === 'hi' ? 'बुकिंग सफलतापूर्वक प्राप्त हुई' : 'Booking Submitted Successfully'}
                </motion.p>
                
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2, ease: "linear", delay: 0.5 }}
                  className="absolute bottom-0 left-0 h-1 bg-gold w-full origin-left"
                />
              </motion.div>
            ) : showBookingConfirm ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden"
              >
                <BookingConfirmation 
                  booking={lastBooking} 
                  onClose={() => setShowBookingConfirm(false)} 
                />
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl"
              >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {submitError && (
                    <div className="md:col-span-2 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                       <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                       {submitError}
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500">{t.booking.form.labelName}</label>
                    <input 
                      type="text" 
                      placeholder={t.booking.form.holderName}
                      className={`w-full bg-gray-50 border ${errors.fullName ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-maroon transition-colors`}
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({...formData, fullName: e.target.value});
                        if (errors.fullName) setErrors({...errors, fullName: undefined});
                      }}
                    />
                    {errors.fullName && <p className="text-xs text-red-500 font-bold">{errors.fullName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500">{t.booking.form.labelPhone}</label>
                    <input 
                      type="tel" 
                      placeholder="+977"
                      className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-maroon transition-colors`}
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({...formData, phone: e.target.value});
                        if (errors.phone) setErrors({...errors, phone: undefined});
                      }}
                    />
                    {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500">{t.booking.form.labelService}</label>
                    <select 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-maroon transition-colors"
                      value={formData.pujaType}
                      onChange={(e) => setFormData({...formData, pujaType: e.target.value})}
                    >
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.id}>
                          {t.services_list[s.id as keyof typeof t.services_list]?.name || s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500">{t.booking.form.labelDate}</label>
                    <div className="p-4 bg-maroon/5 border border-maroon/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-maroon" />
                        <div>
                          <p className="text-sm font-bold text-maroon">
                            {formData.date ? format(new Date(formData.date), 'PPPP') : 'No date selected'}
                          </p>
                          <p className="text-[10px] uppercase font-bold text-saffron tracking-wider">
                            {formData.time ? `Selected Time: ${formData.time}` : 'Please select time from calendar'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500">{t.booking.form.labelLocation}</label>
                    <input 
                      type="text" 
                      placeholder={t.booking.form.holderLocation}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-maroon transition-colors"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500">{t.booking.form.labelMessage}</label>
                    <textarea 
                      rows={4}
                      placeholder={t.booking.form.holderMessage}
                      className={`w-full bg-gray-50 border ${errors.message ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-maroon transition-colors resize-none`}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({...formData, message: e.target.value});
                        if (errors.message) setErrors({...errors, message: undefined});
                      }}
                    />
                    {errors.message && <p className="text-xs text-red-500 font-bold">{errors.message}</p>}
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`md:col-span-2 ${isSubmitting ? 'bg-maroon/70 cursor-not-allowed' : 'bg-maroon hover:bg-saffron'} text-cream font-bold py-4 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {(t.booking.form as any).btnLoading}
                      </>
                    ) : (
                      t.booking.form.btn
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};


const Bell = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9V14.5L3 17V19H21V17L19 14.5V9C19 5.13 15.87 2 12 2Z" fill="currentColor" />
    <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z" fill="currentColor" />
  </svg>
);

const PathSection = () => {
  const { t } = useLanguage();
  return (
    <motion.section 
      id="path-parayan" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-cream relative overflow-hidden bg-scripture"
    >
      {/* Corner Swastiks for Ancient Feel */}
      <div className="absolute top-8 left-8 text-maroon/10"><AnimatedSwastik className="w-10 h-10" /></div>
      <div className="absolute bottom-8 right-8 text-maroon/10"><AnimatedSwastik className="w-10 h-10" /></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Diya className="w-8 h-8 text-saffron mx-auto mb-4 animate-glow" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-maroon mb-4">पाठ र पारायण</h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">वेद र शास्त्रको शुद्ध उच्चारणका साथ पारायण सेवा।</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
          {[
            { title: "श्रीमद् भागवत्", desc: "७ दिनी भव्य पारायण सेवा।", image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=800" },
            { title: "रामचरितमानस", desc: "अखण्ड रामायण पाठ सेवा।", image: "https://images.unsplash.com/photo-1510364947-0639915003c2?auto=format&fit=crop&q=80&w=800" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white border-2 border-gold/20 p-2 rounded-lg shadow-xl"
            >
              <div className="border border-gold/10 rounded overflow-hidden">
                <div className="relative aspect-video">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-maroon/20" />
                </div>
                <div className="p-8 text-center bg-paper">
                  <h3 className="text-2xl font-bold font-serif text-maroon mb-4">{item.title}</h3>
                  <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
                  <p className="text-gray-600 italic">"{item.desc}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const JyotishDetailSection = () => {
  const { t } = useLanguage();
  return (
    <motion.section 
      id="jyotish-details" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="py-24 bg-maroon/95 relative overflow-hidden"
    >
      <Stars />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <ZodiacCard className="w-12 h-12 text-gold mx-auto mb-6 animate-glow" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white mb-4">ज्योतिष सेवाको विस्तृत विवरण</h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-xs md:text-sm">हाम्रा अनुभवी विद्वानहरूद्वारा प्रदान गरिने ज्योतिषीय समाधानहरू।</p>
        </div>

        <div className="grid gap-8 md:gap-12">
          {[
            { 
              id: 'kundali-creation', 
              image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400',
              icon: '📜',
              title: t.services_list['kundali-creation'].name,
              desc: t.services_list['kundali-creation'].desc,
              details: [
                'सटीक जन्म गणित र पञ्चाङ्ग गणना',
                'भविष्यवाणी र जीवन चक्र विश्लेषण',
                'करिअर, शिक्षा र स्वास्थ्य परामर्श',
                'विवाह र गुण मिलान'
              ]
            },
            { 
              id: 'graha-dosh', 
              image: 'https://images.unsplash.com/photo-1464802686167-b939a67a06d1?auto=format&fit=crop&q=80&w=400',
              icon: '🪐',
              title: t.services_list['graha-dosh'].name,
              desc: t.services_list['graha-dosh'].desc,
              details: [
                'कालसर्प, मङ्गल र पितृ दोष शान्ति',
                'ग्रहजन्य बाधाहरूको पौराणिक समाधान',
                'रत्न र मन्त्र सम्बन्धी सल्लाह',
                'विशेष ग्रह हवन र पूजा'
              ]
            }
          ].map((item, idx) => {
            const serviceData = SERVICES.find(s => s.id === item.id);
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white/5 border border-gold/20 rounded-[3rem] p-8 md:p-12 overflow-hidden relative group"
              >
                <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                  <img src={item.image} alt="Background" className="w-full h-full object-cover" />
                </div>
                <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center relative z-10">
                  <div className="text-center md:text-left">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-6 mx-auto md:mx-0 border-2 border-gold/30">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-gold mb-4">{item.title}</h3>
                    <div className="w-20 h-1 bg-gold/30 mx-auto md:mx-0" />
                  </div>
                  <div>
                  <p className="text-lg text-cream/90 font-serif leading-relaxed mb-4 italic">
                    "{item.desc}"
                  </p>
                  <div className="bg-gold/5 border border-gold/20 p-4 rounded-2xl mb-8">
                    <p className="text-xs text-gold font-bold text-center italic uppercase tracking-wider">
                      * {t.services.priceNote}
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-3 text-cream/70 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-gold/10 hover:border-gold/20 transition-all">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                        <span className="text-sm font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

const ServiceModal = ({ 
  service, 
  onClose,
  onBookNow
}: { 
  service: PujaService | null; 
  onClose: () => void;
  onBookNow: (id: string) => void;
}) => {
  const { t } = useLanguage();
  if (!service) return null;
  const translatedService = t.services_list[service.id as keyof typeof t.services_list];

  return (
    <AnimatePresence>
      {service && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-maroon/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-paper w-full max-w-2xl rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-gold/20 max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-maroon shadow-lg z-20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-64 md:h-80">
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1590766948510-108259e9c4f3?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-maroon/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                 <div className="flex items-center gap-2 text-gold mb-2">
                   <Zap className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase tracking-[0.2em]">{service.category}</span>
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold font-serif text-cream">{translatedService?.name || service.name}</h2>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <p className="text-gray-600 leading-relaxed mb-8">
                {translatedService?.desc || service.description}
              </p>

              {service.audioUrl && (
                <div className="mb-8">
                  <AudioPlayer url={service.audioUrl} title={translatedService?.name || service.name} />
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 p-6 bg-paper-dark rounded-[2rem] border border-gold/10">
                {service.deity && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60">{t.services.deity}</span>
                    <p className="text-sm font-bold text-maroon">{service.deity}</p>
                  </div>
                )}
                {service.duration && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60">{t.services.duration}</span>
                    <p className="text-sm font-bold text-maroon">{service.duration}</p>
                  </div>
                )}
                {service.mantra && (
                  <div className="col-span-2 md:col-span-1 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60">{t.services.mantra}</span>
                    <p className="text-xs italic text-gray-500 line-clamp-2" title={service.mantra}>{service.mantra}</p>
                  </div>
                )}
              </div>
              
              <div className="hidden">
                {/* Duration removed as requested */}
              </div>

              {(translatedService?.rituals || service.rituals) && (
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">{t.services.rituals}</h4>
                  <div className="flex flex-wrap gap-2">
                    {(translatedService?.rituals || service.rituals)?.map((ritual, idx) => (
                      <span key={idx} className="bg-white border border-gold/10 px-3 py-1.5 rounded-lg text-xs text-maroon/70">
                        {ritual}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(translatedService?.benefits || service.benefits) && (
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">{t.services.benefits}</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(translatedService?.benefits || service.benefits)?.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="bg-saffron/5 border border-saffron/20 p-4 rounded-2xl mb-8">
                <p className="text-xs text-saffron font-bold text-center italic uppercase tracking-wider">
                  * {t.services.priceNote}
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    if (service) onBookNow(service.id);
                    onClose();
                  }}
                  className="flex-1 bg-maroon text-cream py-4 rounded-xl font-bold text-center hover:bg-saffron transition-all"
                >
                  {t.nav.book}
                </button>
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="bg-white border border-maroon text-maroon px-6 py-4 rounded-xl font-bold hover:bg-maroon hover:text-white transition-all"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ContactSection = () => {
  const { t } = useLanguage();
  const [isRinging, setIsRinging] = useState(false);

  const ringBell = () => {
    setIsRinging(true);
    setTimeout(() => setIsRinging(false), 1000);
  };

  return (
    <motion.section 
      id="contact" 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.button 
          onClick={ringBell}
          animate={isRinging ? { rotate: [0, -20, 20, -20, 20, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 md:w-20 md:h-20 bg-gold text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-gold/20 hover:scale-110 transition-transform cursor-pointer"
        >
          <Bell className="w-8 h-8 md:w-10 md:h-10" />
        </motion.button>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-maroon mb-12">हामीसँग सम्पर्क गर्नुहोस्</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start text-left max-w-6xl mx-auto">
          <div className="space-y-8">
            <p className="text-gray-600 text-lg leading-relaxed">
              तपाईँका कुनै पनि जिज्ञासा वा सेवा सम्बन्धी जानकारीका लागि हामीलाई सम्पर्क गर्नुहोस्। हामी तपाईँलाई सहयोग गर्न सदैव तत्पर छौँ।
            </p>
            
            <div className="flex flex-col gap-4">
              <a 
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-4 bg-maroon text-cream px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-saffron transition-all"
              >
                <Phone className="w-5 h-5" /> {t.footer.contactLinks[0]}
              </a>
              <a 
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                className="flex items-center gap-4 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
            </div>
            
            <div className="p-8 bg-paper rounded-3xl border border-gold/10">
              <h4 className="font-bold text-maroon mb-4">द्रुत जानकारी</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-gold" /> {CONTACT_INFO.address}
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-gold" /> Open Daily: 6:00 AM - 8:00 PM
                </li>
              </ul>
            </div>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </motion.section>
  );
};

const MainContent = ({ setSelectedService, handleBookNow, preselectedBookingId }: any) => {
  const { t } = useLanguage();
  return (
    <main>
      <Hero />

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-12 md:py-16 bg-paper border-y border-gold/10 relative overflow-hidden bg-mandala"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
          <AnimatedSwastik className="absolute -top-4 -left-4 w-24 h-24" />
          <AnimatedSwastik className="absolute -bottom-4 -right-4 w-24 h-24" />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: t.stats.pujas, value: "५०००+", icon: Award },
              { label: t.stats.rituals, value: "५०+", icon: BookOpen },
              { label: t.stats.families, value: "२०००+", icon: Users },
              { label: t.stats.experience, value: "२५+", icon: Clock }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-saffron/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <stat.icon className="w-5 h-5 md:w-6 h-6 text-saffron" />
                </div>
                <div className="text-2xl md:text-3xl font-bold font-serif text-maroon mb-1">{stat.value}</div>
                <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-bold font-sans">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <ServiceSection onServiceSelect={setSelectedService} onBookNow={handleBookNow} />

      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent max-w-7xl mx-auto" />

      <PathSection />

      <JyotishDetailSection />

      {/* About Section */}
      <motion.section 
        id="about" 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-16 md:py-24 scroll-mt-24 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] md:aspect-video lg:aspect-[4/5] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl relative group">
                <img 
                  src="https://images.unsplash.com/photo-1563722216449-3660d5bfa78f?auto=format&fit=crop&q=80&w=1200" 
                  alt="Purity and Tradition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 to-transparent opacity-60" />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-maroon p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl">
                <p className="text-gold text-3xl md:text-4xl font-bold font-serif mb-1 md:mb-2">२५+</p>
                <p className="text-cream text-[10px] md:text-xs font-bold uppercase tracking-widest">वर्षको अनुभव</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-maroon mb-6 md:mb-8">{t.about.title}</h2>
              <div className="space-y-6 md:space-y-8 text-gray-600 leading-relaxed">
                <p className="text-sm md:text-base font-medium text-maroon/80">
                  {t.about.p1}
                </p>
                
                <div className="grid gap-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center shrink-0">
                      <Home className="w-6 h-6 text-saffron" />
                    </div>
                    <div>
                      <h4 className="font-bold text-maroon mb-1">{(t.about as any).lineage}</h4>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center shrink-0">
                      <Compass className="w-6 h-6 text-saffron" />
                    </div>
                    <div>
                      <h4 className="font-bold text-maroon mb-1">{(t.about as any).philosophy}</h4>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-saffron" />
                    </div>
                    <div>
                      <h4 className="font-bold text-maroon mb-1">{(t.about as any).expertise}</h4>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {t.about.list.map((item, idx) => {
                    const [title, services] = item.split(': ');
                    return (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group border border-gray-100 rounded-2xl p-4 hover:border-saffron/30 hover:bg-saffron/5 transition-all duration-300"
                      >
                        <div className="flex gap-4">
                          <div className="w-10 h-10 bg-paper rounded-xl flex items-center justify-center shrink-0 border border-gray-100 group-hover:scale-110 transition-transform">
                            <Sparkles className="w-5 h-5 text-saffron" />
                          </div>
                          <div>
                             <h4 className="font-bold text-maroon mb-1 underline decoration-saffron/30 underline-offset-4">{title}</h4>
                             <p className="text-sm text-gray-500 italic">{services}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <p className="font-bold text-saffron italic border-l-4 border-saffron pl-4 bg-saffron/5 py-3 rounded-r-xl">
                  {t.about.p2}
                </p>
              </div>
              <div className="mt-10 pt-10 border-t border-gray-100 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="client" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-maroon">{t.about.trusted}</p>
                  <p className="text-xs text-gray-400">{t.about.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <FAQ />

      <ContactSection />

      <BookingForm preselectedServiceId={preselectedBookingId} />
    </main>
  );
};

export default function App() {
  const { t } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);
  const [selectedService, setSelectedService] = useState<PujaService | null>(null);
  const [preselectedBookingId, setPreselectedBookingId] = useState<string | null>(null);

  const handleBookNow = (serviceId: string) => {
    setPreselectedBookingId(serviceId);
    if (window.location.pathname !== '/') {
        window.location.href = '/#booking';
        return;
    }
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-paper pb-20 md:pb-0">
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <MainContent 
              setSelectedService={setSelectedService}
              handleBookNow={handleBookNow}
              preselectedBookingId={preselectedBookingId}
            />
          } />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <BottomNav />
        {/* Redundant floating action buttons removed to prevent clutter on mobile */}
        
        <footer className="bg-paper py-16 md:py-20 border-t border-gold/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-maroon text-gold flex items-center justify-center rounded font-bold">🕉️</div>
                  <span className="font-serif text-xl font-bold text-maroon">श्री नर नारायण</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t.footer.desc}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-maroon mb-6 text-sm uppercase tracking-widest">{t.footer.servicesTitle}</h4>
                <ul className="space-y-3 text-sm text-gray-500">
                  {t.footer.links.map((link, idx) => (
                    <li key={idx}><a href="#" className="hover:text-saffron transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-maroon mb-6 text-sm uppercase tracking-widest">{t.footer.contactTitle}</h4>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-saffron" />
                    <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-saffron">{CONTACT_INFO.displayPhone}</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-saffron" />
                    <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="hover:text-saffron">WhatsApp Chat</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-saffron" />
                    <span>{CONTACT_INFO.address}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-maroon mb-6 text-sm uppercase tracking-widest">हाम्रोबारे</h4>
                <p className="text-xs text-gray-500 mb-4">हामी भक्तहरूको सेवामा सदैव समर्पित छौं।</p>
              </div>
            </div>
            <div className="pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-400">{t.footer.rights}</p>
              <p className="text-xs text-gray-400 font-serif italic">{t.footer.mantra}</p>
            </div>
          </div>
        </footer>
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
          onBookNow={handleBookNow}
        />
        <ChatWidget />
        <CallActionButton />
      </div>
    </BrowserRouter>
  );
}

