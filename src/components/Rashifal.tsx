import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Heart, 
  Briefcase, 
  Activity, 
  ChevronRight, 
  Calendar,
  Star,
  Zap,
  Droplets,
  Wind,
  Flame,
  Search
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { cn } from '../lib/utils';

type SignKey = 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

interface Prediction {
  general: string;
  love: string;
  career: string;
  health: string;
  luckyNumber: number;
  luckyColor: string;
}

// Simple deterministic prediction generator based on date and sign
const getPredictions = (sign: SignKey, date: Date, lang: string): Prediction => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const seed = dayOfYear + sign.length;
  
  const predictions: Record<string, any> = {
    ne: {
      general: [
        "आजको दिन तपाईंका लागि सकारात्मक रहनेछ। नयाँ कार्यको थालनी फलदायी हुनेछ।",
        "धैर्य र संयम राख्नुहोला। आज केही चुनौतीहरू आउन सक्छन् तर सफलता मिल्नेछ।",
        "आफन्त र मित्रजनको सहयोगले रोकिएका कामहरू पुरा हुनेछन्।",
        "धार्मिक कार्यमा रुचि बढ्नेछ। मनमा शान्ति र आनन्दको अनुभूति हुनेछ।"
      ],
      love: [
        "सम्बन्धमा मधुरता छाउनेछ। जीवनसाथीसँगको सामीप्यता बढ्नेछ।",
        "नयाँ सम्बन्धको प्रस्ताव आउन सक्छ। प्रेम जीवन सुखमय रहनेछ।",
        "पारिवारिक कलह साम्य हुनेछ। माया र सद्भावमा वृद्धि हुनेछ।"
      ],
      career: [
        "व्यवसायमा आम्दानी बढ्नेछ। लगानीको लागि राम्रो समय छ।",
        "कार्यक्षेत्रमा प्रशंसा मिल्नेछ। रोकिएको पदोन्नति हुनसक्छ।",
        "नयाँ व्यावसायिक योजनाहरू सफल हुनेछन्।"
      ],
      health: [
        "स्वास्थ्यमा सुधार आउनेछ। योग र प्राणायाममा रुचि बढ्नेछ।",
        "खानपानमा ध्यान दिनुहोला। अल्छीपन हटाउनु पर्ने देखिन्छ।",
        "मानसिक तनाव कम हुनेछ। फिट रहने प्रयास सफल हुनेछ।"
      ],
      colors: ["रातो", "पहेलो", "सेतो", "निलो", "हरियो", "सुन्तला"]
    },
    hi: {
      general: [
        "आज का दिन आपके लिए सकारात्मक रहेगा। नए कार्यों की शुरुआत फलदायी होगी।",
        "धैर्य और संयम रखें। आज कुछ चुनौतियाँ आ सकती हैं लेकिन सफलता मिलेगी।",
        "रिश्तेदारों और मित्रों के सहयोग से रुके हुए काम पूरे होंगे।",
        "धार्मिक कार्यों में रुचि बढ़ेगी। मन में शांति और आनंद का अनुभव होगा।"
      ],
      love: [
        "रिश्तों में मधुरता आएगी। जीवनसाथी के साथ निकटता बढ़ेगी।",
        "नया प्रेम प्रस्ताव मिल सकता है। प्रेम जीवन सुखद रहेगा।",
        "पारिवारिक कलह शांत होगी। प्रेम और सद्भाव में वृद्धि होगी।"
      ],
      career: [
        "व्यापार में आय बढ़ेगी। निवेश के लिए अच्छा समय है।",
        "कार्यक्षेत्र में प्रशंसा मिलेगी। रुकी हुई पदोन्नति हो सकती है।",
        "नई व्यावसायिक योजनाएँ सफल होंगी।"
      ],
      health: [
        "स्वास्थ्य में सुधार होगा। योग और प्राणायाम में रुचि बढ़ेगी।",
        "खान-पान पर ध्यान दें। आलस्य त्यागना होगा।",
        "मानसिक तनाव कम होगा। फिट रहने के प्रयास सफल होंगे।"
      ],
      colors: ["लाल", "पीला", "सफेद", "नीला", "हरा", "नारंगी"]
    },
    en: {
      general: [
        "Today will be a positive day for you. Starting new ventures will be fruitful.",
        "Maintain patience and restraint. Challenges may arise today but success is assured.",
        "Pending tasks will be completed with the help of relatives and friends.",
        "Interest in religious activities will increase. You will feel peace and joy."
      ],
      love: [
        "Sweetness will prevail in relationships. Closeness with your spouse will increase.",
        "A new love proposal might come. Your love life will be pleasant.",
        "Family disputes will be settled. Love and harmony will increase."
      ],
      career: [
        "Income in business will increase. It is a good time for investments.",
        "You will receive appreciation at the workplace. Pending promotion might happen.",
        "New business plans will become successful."
      ],
      health: [
        "Health will improve. Interest in yoga and meditation will increase.",
        "Pay attention to your diet. Avoid laziness today.",
        "Mental stress will decrease. Efforts to stay fit will be successful."
      ],
      colors: ["Red", "Yellow", "White", "Blue", "Green", "Orange"]
    }
  };

  const l = predictions[lang] || predictions['en'];
  
  return {
    general: l.general[seed % l.general.length],
    love: l.love[seed % l.love.length],
    career: l.career[seed % l.career.length],
    health: l.health[seed % l.health.length],
    luckyNumber: (seed % 9) + 1,
    luckyColor: l.colors[seed % l.colors.length]
  };
};

const ElementIcon = ({ element }: { element: string }) => {
  switch (element) {
    case 'Fire':
    case 'अग्नि': return <Flame className="w-4 h-4 text-orange-500" />;
    case 'Earth':
    case 'पृथ्वी': return <Droplets className="w-4 h-4 text-emerald-600" />;
    case 'Air':
    case 'वायु': return <Wind className="w-4 h-4 text-sky-400" />;
    case 'Water':
    case 'जल': return <Zap className="w-4 h-4 text-blue-500" />;
    default: return <Star className="w-4 h-4" />;
  }
};

export const Rashifal = () => {
  const { t, language } = useLanguage();
  const [selectedSign, setSelectedSign] = useState<SignKey | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedSign) {
      setPrediction(getPredictions(selectedSign, new Date(), language));
    }
  }, [selectedSign, language]);

  const signsList = Object.keys(t.rashifal.signs) as SignKey[];
  const filteredSigns = signsList.filter(sign => 
    t.rashifal.signs[sign].name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-paper rounded-[3rem] p-8 md:p-12 shadow-inner border border-maroon/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-maroon/10 rounded-full text-maroon mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{t.rashifal.title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">
              {t.rashifal.title}
            </h2>
            <p className="text-gray-500 max-w-xl">
              {t.rashifal.subtitle}
            </p>
          </div>

          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t.rashifal.selectSign}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gold/10 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all shadow-sm font-bold text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3 mb-12">
          {filteredSigns.map((sign) => (
            <button
              key={sign}
              onClick={() => setSelectedSign(sign)}
              className={cn(
                "group flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300",
                selectedSign === sign 
                  ? "bg-maroon text-cream shadow-xl shadow-maroon/20 scale-105" 
                  : "bg-white hover:bg-maroon/5 text-maroon border border-maroon/5"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                selectedSign === sign ? "bg-white/20" : "bg-paper group-hover:bg-maroon/10"
              )}>
                <Star className={cn("w-5 h-5", selectedSign === sign ? "text-gold" : "text-maroon/40")} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tight truncate w-full text-center">
                {t.rashifal.signs[sign].name}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedSign && prediction ? (
            <motion.div
              key={selectedSign}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <div className="md:col-span-1 space-y-6">
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gold/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Star className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-maroon rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <Star className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-maroon">
                          {t.rashifal.signs[selectedSign].name}
                        </h3>
                        <div className="flex items-center gap-1 opacity-60">
                          <ElementIcon element={t.rashifal.signs[selectedSign].element} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{t.rashifal.signs[selectedSign].element}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-paper rounded-2xl flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.rashifal.categories.luckyNumber}</span>
                        <span className="text-xl font-black text-maroon">{prediction.luckyNumber}</span>
                      </div>
                      <div className="p-4 bg-paper rounded-2xl flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.rashifal.categories.luckyColor}</span>
                        <span className="font-bold text-maroon">{prediction.luckyColor}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-saffron p-6 rounded-[2rem] text-white shadow-xl shadow-saffron/20 flex items-center justify-between group cursor-pointer hover:bg-orange-600 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{t.rashifal.date}</p>
                      <p className="font-bold">{new Date().toLocaleDateString(language === 'ne' ? 'ne-NP' : language === 'hi' ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-[2rem] border border-gold/10 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-maroon/5 rounded-xl flex items-center justify-center text-maroon">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-maroon">{t.rashifal.categories.general}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {prediction.general}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gold/10 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-maroon">{t.rashifal.categories.love}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {prediction.love}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gold/10 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-maroon">{t.rashifal.categories.career}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {prediction.career}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gold/10 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-maroon">{t.rashifal.categories.health}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {prediction.health}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white py-20 rounded-[2rem] border border-dashed border-gold/30 text-center"
            >
              <div className="w-20 h-20 bg-paper rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-serif font-bold text-maroon mb-2">{t.rashifal.selectSign}</h3>
              <p className="text-gray-400 text-sm">{t.rashifal.subtitle}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
