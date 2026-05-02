
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'ne', label: 'नेपाली' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'en', label: 'EN' }
] as const;

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-maroon/5 p-1 rounded-full border border-maroon/10">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`
            px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300
            ${language === lang.code 
              ? 'bg-maroon text-cream shadow-sm' 
              : 'text-maroon/60 hover:text-maroon hover:bg-maroon/5'}
          `}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
