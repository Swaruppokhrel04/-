import { useState, useRef, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval,
  isBefore,
  startOfDay
} from 'date-fns';
import { hi, enUS } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Info, Sparkles, ExternalLink, Sunrise, Sunset, Moon, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AUSPICIOUS_DATES } from '../constants';
import { cn } from '../lib/utils';
import { useLanguage } from '../LanguageContext';

interface PanchangData {
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  paksha: string;
  masam: string;
  sunrise: string;
  sunset: string;
  rahuKaal: string;
  gulikaKaal: string;
  abhijitMuhurat: string;
  meaning: string;
}

const AUSPICIOUS_COLORS: Record<string, string> = {
  'Highly Auspicious': 'bg-saffron text-white',
  'Auspicious': 'bg-gold/20 text-maroon border border-gold/50',
  'Tithi': 'bg-maroon/10 text-maroon border border-maroon/20',
};

interface CalendarProps {
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

const TIME_SLOTS = [
  { id: 'morning', label: 'Brahma Muhurat (4 AM - 6 AM)', icon: '✨' },
  { id: 'morning-2', label: 'Pratah (8 AM - 11 AM)', icon: '☀️' },
  { id: 'afternoon', label: 'Madhyahna (1 PM - 3 PM)', icon: '🌞' },
  { id: 'evening', label: 'Sandhya (5 PM - 7 PM)', icon: '🌅' },
];

export const CalendarView = ({ selectedDate, selectedTime, onDateSelect, onTimeSelect }: CalendarProps) => {
  const { language, t } = useLanguage();
  const locale = language === 'hi' ? hi : enUS;

  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4)); // Default to May 2026
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [panchangData, setPanchangData] = useState<PanchangData | null>(null);
  const [isLoadingPanchang, setIsLoadingPanchang] = useState(false);
  const timeSlotsRef = useRef<HTMLDivElement>(null);

  // Fetch Panchang details
  useEffect(() => {
    const fetchPanchang = async () => {
      if (!selectedDate) return;
      
      setIsLoadingPanchang(true);
      try {
        const response = await fetch('/api/panchang', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            date: selectedDate,
            location: 'Rupandehi, Nepal' // Default location for the business
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          setPanchangData(data);
        }
      } catch (error) {
        console.error("Error fetching panchang:", error);
      } finally {
        setIsLoadingPanchang(false);
      }
    };

    fetchPanchang();
  }, [selectedDate]);

  // Sync current month with selected date if it changes from outside
  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      if (!isSameMonth(date, currentMonth)) {
        setCurrentMonth(startOfMonth(date));
      }
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate && timeSlotsRef.current) {
      const element = timeSlotsRef.current;
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
  }, [selectedDate]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = t.calendar.weekDays;

  const upcomingAuspicious = Object.entries(AUSPICIOUS_DATES)
    .filter(([date]) => {
      const d = new Date(date);
      return isSameMonth(d, currentMonth) || (isBefore(currentMonth, d) && isSameMonth(d, addMonths(currentMonth, 1)));
    })
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(0, 4);

  return (
    <div className="bg-white rounded-[1.75rem] sm:rounded-[2.5rem] shadow-2xl border border-gold/10 overflow-hidden flex flex-col-reverse md:flex-row">
      {/* Sidebar for Auspicious Info - Placed at bottom on mobile to show interactive calendar first */}
      <div className="w-full md:w-64 bg-maroon/5 p-4 sm:p-6 border-t md:border-t-0 md:border-r border-gold/10">
        <div className="flex items-center gap-2 text-maroon mb-4 sm:mb-6">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
          <h4 className="font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">{t.calendar.highlights}</h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:space-y-4">
          {upcomingAuspicious.map(([date, info]) => (
            <div 
              key={date}
              onClick={() => onDateSelect(date)}
              className="group cursor-pointer p-2.5 sm:p-3 bg-white rounded-xl border border-gold/5 hover:border-gold/30 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <p className="text-[9px] font-bold text-gold uppercase tracking-tighter mb-0.5 sm:mb-1">
                  {format(new Date(date), 'MMM d, EEE', { locale })}
                </p>
                <h5 className="text-[11px] sm:text-xs font-bold text-maroon truncate group-hover:text-saffron transition-colors">
                  {(t.auspicious_dates as any)[info.label] || info.label}
                </h5>
              </div>
              <div className="flex items-center gap-1 mt-1 sm:mt-1.5 border-t border-gray-50 pt-1 sm:pt-1.5">
                <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", info.type === 'Highly Auspicious' ? 'bg-saffron' : 'bg-gold')} />
                <span className="text-[8px] sm:text-[9px] text-gray-400 font-bold truncate">
                  {info.type === 'Highly Auspicious' ? t.calendar.highlyAuspicious.split(' ')[0] : info.type === 'Auspicious' ? t.calendar.auspicious.split(' ')[0] : t.calendar.tithi}
                </span>
              </div>
            </div>
          ))}
          
          <div className="p-3 sm:p-4 bg-maroon rounded-xl sm:rounded-2xl text-cream text-center col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold mb-1.5 animate-pulse" />
            <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              {t.calendar.bookNote.split('Highly Auspicious')[0]}
              <span className="text-gold">{t.calendar.highlyAuspicious}</span>
              {t.calendar.bookNote.split('Highly Auspicious')[1] || ''}
            </p>
          </div>
        </div>
      </div>

      {/* Main Calendar Body */}
      <div className="flex-1 p-3 xs:p-5 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-5 sm:mb-8">
          <div>
            <h3 className="font-serif text-[1.4rem] xs:text-2xl sm:text-3xl font-bold text-maroon mb-0.5 leading-tight">
              {format(currentMonth, 'MMMM', { locale })}
            </h3>
            <p className="text-gold font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">{t.calendar.year} {format(currentMonth, 'yyyy')}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {selectedDate && (
              <a 
                href={`https://www.drikpanchang.com/panchang/day-panchang.html?date=${format(new Date(selectedDate), 'dd/MM/yyyy')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 px-3.5 py-2 bg-maroon/5 hover:bg-maroon/10 text-maroon rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-gold/10"
              >
                <span>{t.calendar.viewPanchang}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <div className="flex gap-1.5 sm:gap-2In flex">
              <button 
                type="button"
                onClick={prevMonth}
                className="p-2 sm:p-3 bg-paper hover:bg-maroon/5 rounded-xl sm:rounded-2xl transition-all text-maroon border border-gold/5 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                type="button"
                onClick={nextMonth}
                className="p-2 sm:p-3 bg-paper hover:bg-maroon/5 rounded-xl sm:rounded-2xl transition-all text-maroon border border-gold/5 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 xs:gap-1.5 sm:gap-2 mb-2.5 sm:mb-4">
          {weekDays.map(day => (
            <div key={day} className="text-center text-[9px] sm:text-[10px] font-black uppercase tracking-normal xs:tracking-wider sm:tracking-widest text-maroon/30 py-1.5 sm:py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 xs:gap-1.5 sm:gap-2">
          {calendarDays.map((day, idx) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const isSelected = selectedDate === dateStr;
            const isAuspicious = AUSPICIOUS_DATES[dateStr];
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isPast = isBefore(day, startOfDay(new Date()));
            
            return (
              <motion.button
                key={idx}
                type="button"
                whileHover={!isPast ? { y: -3, scale: 1.05 } : {}}
                whileTap={!isPast ? { scale: 0.95 } : {}}
                onClick={() => !isPast && onDateSelect(dateStr)}
                onMouseEnter={() => isAuspicious && setHoveredDate(dateStr)}
                onMouseLeave={() => setHoveredDate(null)}
                disabled={isPast}
                className={cn(
                  "relative aspect-square w-full flex flex-col items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300 text-xs sm:text-sm font-bold",
                  !isCurrentMonth ? 'text-gray-200' : 'text-gray-700',
                  isSelected ? 'bg-maroon text-cream shadow-xl z-10' : '',
                  !isSelected && !isPast && isAuspicious ? "bg-saffron/5 border border-saffron/20 text-maroon" : '',
                  !isSelected && !isPast && !isAuspicious ? 'hover:bg-maroon/5' : '',
                  isPast ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'
                )}
              >
                <span className={cn(isSelected ? 'text-[15px] sm:text-xl' : '')}>{format(day, 'd')}</span>
                
                {isAuspicious && !isSelected && (
                  <motion.div 
                    layoutId={`dot-${dateStr}`}
                    className={cn(
                      "absolute bottom-2 w-1.5 h-1.5 rounded-full shadow-sm",
                      isAuspicious.type === 'Highly Auspicious' ? 'bg-saffron animate-pulse' : 'bg-gold'
                    )} 
                  />
                )}

                {isSelected && (
                  <motion.div 
                    layoutId="selection-ring"
                    className="absolute inset-0 border-2 border-gold rounded-2xl"
                  />
                )}
                
                <AnimatePresence>
                  {hoveredDate === dateStr && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute z-50 bottom-full mb-3 left-1/2 -translate-x-1/2 w-40 bg-maroon text-cream p-3 rounded-2xl shadow-2xl text-[10px] pointer-events-none"
                    >
                      <div className="flex items-center gap-2 font-bold mb-2 pb-2 border-b border-white/10">
                        <Sparkles className="w-3 h-3 text-gold" />
                        {isAuspicious.type === 'Highly Auspicious' ? t.calendar.highlyAuspicious : isAuspicious.type === 'Auspicious' ? t.calendar.auspicious : t.calendar.tithi}
                      </div>
                      <p className="leading-relaxed opacity-90">{(t.auspicious_dates as any)[isAuspicious.label] || isAuspicious.label}</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-maroon" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            ref={timeSlotsRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full p-4 sm:p-6 md:p-8 bg-paper border-t border-gold/10"
          >
            {/* Panchang Details Section */}
            <div className="mb-8 sm:mb-10">
              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 mb-5 sm:mb-6">
                <h4 className="font-serif text-lg sm:text-2xl font-bold text-maroon flex items-center gap-2 sm:gap-3">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 bg-maroon/10 rounded-full flex items-center justify-center text-maroon text-xs sm:text-sm">
                    ☸️
                  </span>
                  {t.calendar.panchang.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[8px] sm:text-[10px] font-bold text-gold uppercase tracking-wider bg-gold/5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-gold/10 shrink-0">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  Rupandehi, Nepal
                </div>
              </div>

              {isLoadingPanchang ? (
                <div className="py-8 flex flex-col items-center justify-center gap-3 bg-white/50 rounded-[1.5rem] sm:rounded-[2rem] border border-gold/5 animate-pulse">
                  <Sparkles className="w-6 h-6 text-gold animate-spin" />
                  <p className="text-[10px] sm:text-xs font-bold text-gold uppercase tracking-widest">{t.calendar.panchang.loading}</p>
                </div>
              ) : panchangData ? (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
                >
                  {/* Tithi & Nakshatra Highlight Cards */}
                  <div className="col-span-2 lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-4 sm:p-5 bg-gradient-to-br from-maroon to-maroon/90 rounded-2xl sm:rounded-3xl text-cream shadow-xl shadow-maroon/10 flex flex-col justify-between">
                      <div>
                        <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">{t.calendar.panchang.tithi}</p>
                        <h5 className="text-base sm:text-xl font-bold leading-tight mb-2">{panchangData.tithi}</h5>
                      </div>
                      <div>
                        <span className="text-[8px] sm:text-[9px] font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/10 rounded-lg backdrop-blur-sm uppercase tracking-tighter">
                          {panchangData.paksha} Paksha
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 bg-white rounded-2xl sm:rounded-3xl border border-gold/20 shadow-sm flex flex-col justify-between">
                      <div>
                        <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-gold mb-1">{t.calendar.panchang.nakshatra}</p>
                        <h5 className="text-base sm:text-xl font-bold text-maroon leading-tight mb-2">{panchangData.nakshatra}</h5>
                      </div>
                      <span className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase">{panchangData.masam}</span>
                    </div>
                  </div>

                  {/* Sun Times */}
                  <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gold/10 flex flex-col justify-center gap-3 sm:gap-4 col-span-1">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-saffron/10 rounded-lg sm:rounded-xl flex items-center justify-center text-saffron shrink-0">
                        <Sunrise className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <p className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase leading-none mb-1">{t.calendar.panchang.sunrise}</p>
                        <p className="text-xs sm:text-sm font-bold text-maroon">{panchangData.sunrise}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3 border-t border-gray-50 pt-2.5 sm:pt-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                        <Sunset className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <p className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase leading-none mb-1">{t.calendar.panchang.sunset}</p>
                        <p className="text-xs sm:text-sm font-bold text-maroon">{panchangData.sunset}</p>
                      </div>
                    </div>
                  </div>

                  {/* Yoga & Karana */}
                  <div className="bg-maroon/5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-maroon/10 flex flex-col justify-center gap-3 sm:gap-4 col-span-1">
                    <div>
                      <p className="text-[8px] sm:text-[9px] font-bold text-maroon/40 uppercase mb-0.5">{t.calendar.panchang.yoga}</p>
                      <p className="text-xs sm:text-sm font-bold text-maroon break-words">{panchangData.yoga}</p>
                    </div>
                    <div className="pt-2.5 sm:pt-3 border-t border-maroon/5">
                      <p className="text-[8px] sm:text-[9px] font-bold text-maroon/40 uppercase mb-0.5">{t.calendar.panchang.karana}</p>
                      <p className="text-xs sm:text-sm font-bold text-maroon break-words">{panchangData.karana}</p>
                    </div>
                  </div>

                  {/* Rahu Kaal, Gulika Kaal, Abhijit Muhurat */}
                  <div className="col-span-2 lg:col-span-4 grid grid-cols-1 xs:grid-cols-3 gap-3 md:gap-4 mt-1">
                    <div className="p-3 bg-red-50/75 rounded-xl sm:rounded-2xl border border-red-100 flex flex-col justify-center">
                      <p className="text-[8px] sm:text-[9px] font-bold text-red-400 uppercase mb-0.5 sm:mb-1">{t.calendar.panchang.rahuKaal}</p>
                      <p className="text-xs sm:text-sm font-bold text-red-700">{panchangData.rahuKaal}</p>
                    </div>
                    <div className="p-3 bg-gray-50/75 rounded-xl sm:rounded-2xl border border-gray-100 flex flex-col justify-center">
                      <p className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase mb-0.5 sm:mb-1">{t.calendar.panchang.gulikaKaal}</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-700">{panchangData.gulikaKaal}</p>
                    </div>
                    <div className="p-3 bg-green-50/75 rounded-xl sm:rounded-2xl border border-green-100 flex flex-col justify-center">
                      <p className="text-[8px] sm:text-[9px] font-bold text-green-500 uppercase mb-0.5 sm:mb-1">{t.calendar.panchang.abhijitMuhurat}</p>
                      <p className="text-xs sm:text-sm font-bold text-green-700">{panchangData.abhijitMuhurat}</p>
                    </div>
                  </div>

                  {/* Spiritual Meaning Card */}
                  <div className="col-span-2 lg:col-span-4 mt-1 p-3.5 sm:p-4 bg-maroon/5 rounded-xl sm:rounded-2xl border-l-4 border-gold">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                      </div>
                      <div>
                        <h6 className="text-[9px] sm:text-[10px] font-bold text-gold uppercase tracking-widest mb-0.5 sm:mb-1">{t.calendar.panchang.meaning}</h6>
                        <p className="text-xs text-maroon leading-relaxed">{panchangData.meaning}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="py-8 text-center bg-gray-50 rounded-[1.5rem] sm:rounded-[2rem] border border-dashed border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-400 italic">Select a date to unlock divine alignments</p>
                </div>
              )}
            </div>

            <div className="pt-6 sm:pt-8 border-t border-gold/10">
              <h4 className="font-serif text-lg sm:text-2xl font-bold text-maroon mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <span className="w-8 h-8 sm:w-10 sm:h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold text-xs sm:text-sm">
                  🕒
                </span>
                {t.calendar.selectSlot}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {TIME_SLOTS.map((slot) => {
                  const translatedLabel = (t.calendar.slots as any)[slot.id] || slot.label;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => onTimeSelect(translatedLabel)}
                      className={`
                        group relative flex flex-col items-start gap-2.5 sm:gap-3 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border-2 transition-all duration-500 text-left overflow-hidden cursor-pointer
                        ${selectedTime === translatedLabel 
                          ? 'border-maroon bg-white shadow-2xl shadow-maroon/10 scale-[1.02] z-10' 
                          : 'border-gold/5 bg-white/50 hover:border-maroon/20 hover:bg-white'
                        }
                      `}
                    >
                      {selectedTime === translatedLabel && (
                        <div className="absolute top-0 right-0 p-3 sm:p-4">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-maroon rounded-full flex items-center justify-center text-cream shadow-lg">
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                      
                      <span className="text-3xl sm:text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500">{slot.icon}</span>
                      
                      <div>
                        <div className={`text-sm sm:text-base font-bold mb-0.5 sm:mb-1 transition-colors ${selectedTime === translatedLabel ? 'text-maroon' : 'text-gray-700'}`}>
                          {translatedLabel.split(' (')[0]}
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-gold font-bold uppercase tracking-widest opacity-60">
                          {translatedLabel.split(' (')[1]?.replace(')', '') || ''}
                        </div>
                      </div>
 
                      <div className={cn(
                        "absolute bottom-0 left-0 h-1 transition-all duration-500",
                        selectedTime === translatedLabel ? "w-full bg-maroon" : "w-0 bg-gold/30"
                      )} />
                    </button>
                  );
                })}
              </div>
            </div>
 
            {/* Mobile-only full link */}
            <div className="mt-6 md:hidden">
              <a 
                href={`https://www.drikpanchang.com/panchang/day-panchang.html?date=${format(new Date(selectedDate), 'dd/MM/yyyy')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 bg-maroon text-white rounded-[1.5rem] font-bold text-[10px] sm:text-xs uppercase tracking-widest shadow-xl shadow-maroon/30 active:scale-95 transition-all"
              >
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                </div>
                <span>{t.calendar.viewPanchang}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
 
      <div className="p-4 sm:p-6 md:p-8 bg-paper/50 border-t border-gold/10 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-saffron shadow-lg shadow-saffron/20 shrink-0" />
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate">{t.calendar.highlyAuspicious}</span>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-gold bg-gold/10 shrink-0" />
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate">{t.calendar.auspicious}</span>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 col-span-2 lg:col-span-1">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-maroon/10 bg-maroon/5 shrink-0" />
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate">{t.calendar.tithi}</span>
        </div>
      </div>
    </div>
  );
};
