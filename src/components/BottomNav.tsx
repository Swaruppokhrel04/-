import { useLanguage } from '../LanguageContext';
import { Home, Grid, Phone, Info } from 'lucide-react';

export const BottomNav = () => {
  const { t } = useLanguage();

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-[40]">
      <div className="bg-paper shadow-2xl shadow-maroon/20 border border-gold/10 px-6 py-4 rounded-3xl flex items-center justify-between">
        <a href="#home" className="flex flex-col items-center gap-1 text-maroon hover:text-saffron transition-colors">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">{t.nav.home}</span>
        </a>
        <a href="#services" className="flex flex-col items-center gap-1 text-maroon hover:text-saffron transition-colors">
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">{t.nav.services}</span>
        </a>
        <a href="#about" className="flex flex-col items-center gap-1 text-maroon hover:text-saffron transition-colors">
          <Info className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">{t.nav.about}</span>
        </a>
        <a href="#booking" className="flex flex-col items-center gap-1 text-maroon hover:text-saffron transition-colors">
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">{t.nav.contact}</span>
        </a>
      </div>
    </div>
  );
};
