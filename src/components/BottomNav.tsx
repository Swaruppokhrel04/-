import { useLanguage } from '../LanguageContext';
import { Home, Grid, Phone, Info, Newspaper, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BottomNav = () => {
  const { t } = useLanguage();

  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-lg z-[40]">
      <div className="bg-paper/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(122,12,12,0.15)] border border-gold/20 px-4 py-4 rounded-[2rem] flex items-center justify-between">
        <a href="#home" className="flex flex-col items-center gap-1.5 text-maroon hover:text-saffron transition-all active:scale-90">
          <Home className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-tighter">{t.nav.home}</span>
        </a>
        <a href="#services" className="flex flex-col items-center gap-1.5 text-maroon hover:text-saffron transition-all active:scale-90">
          <Grid className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-tighter">{t.nav.services}</span>
        </a>
        <Link to="/library" className="flex flex-col items-center gap-1.5 text-maroon hover:text-saffron transition-all active:scale-90">
          <BookOpen className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-tighter">{(t.nav as any).library}</span>
        </Link>
        <Link to="/news" className="flex flex-col items-center gap-1.5 text-maroon hover:text-saffron transition-all active:scale-90 relative">
          <Newspaper className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-tighter">{(t.nav as any).news}</span>
        </Link>
        <a href="#booking" className="flex flex-col items-center gap-1.5 text-maroon hover:text-saffron transition-all active:scale-90">
          <Phone className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-tighter">{t.nav.book}</span>
        </a>
      </div>
    </div>
  );
};
