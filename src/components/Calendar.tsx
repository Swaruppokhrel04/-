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
import { ChevronLeft, ChevronRight, Info, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AUSPICIOUS_DATES } from '../constants';
import { cn } from '../lib/utils';
import { useLanguage } from '../LanguageContext';

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
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4)); // Default to May 2026
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const timeSlotsRef = useRef<HTMLDivElement>(null);

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

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const upcomingAuspicious = Object.entries(AUSPICIOUS_DATES)
    .filter(([date]) => {
      const d = new Date(date);
      return isSameMonth(d, currentMonth) || (isBefore(currentMonth, d) && isSameMonth(d, addMonths(currentMonth, 1)));
    })
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(0, 4);

  return (
    <div className="bg-white dark:bg-dark-surface rounded-[2.5rem] shadow-2xl border border-gold/10 dark:border-white/5 overflow-hidden flex flex-col md:flex-row transition-colors">
      {/* Sidebar for Auspicious Info */}
      <div className="w-full md:w-64 bg-maroon/5 dark:bg-maroon/10 p-6 border-b md:border-b-0 md:border-r border-gold/10 dark:border-white/5">
        <div className="flex items-center gap-2 text-maroon dark:text-gold mb-6">
          <Info className="w-5 h-5 text-gold" />
          <h4 className="font-bold uppercase tracking-widest text-[10px]">Auspicious Highlights</h4>
        </div>
        
        <div className="space-y-4">
          {/* Today's Panchang Link */}
          <a 
            href="https://www.drikpanchang.com/panchang/day-panchang.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 bg-maroon rounded-2xl text-cream text-center shadow-lg shadow-maroon/20 group hover:scale-[1.02] transition-all border border-gold/30"
          >
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform">
              <ExternalLink className="w-5 h-5 text-gold" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em]">आजको पञ्चाङ्ग</p>
            <p className="text-xs font-bold text-gold">Daily Hindu Panchang</p>
          </a>

          {upcomingAuspicious.map(([date, info]) => (
            <div 
              key={date}
              onClick={() => onDateSelect(date)}
              className="group cursor-pointer p-3 bg-white rounded-xl border border-gold/5 hover:border-gold/30 hover:shadow-md transition-all"
            >
              <p className="text-[10px] font-bold text-gold uppercase tracking-tighter mb-1">
                {format(new Date(date), 'MMM d, EEE')}
              </p>
              <h5 className="text-xs font-bold text-maroon truncate group-hover:text-saffron transition-colors">
                {info.label}
              </h5>
              <div className="flex items-center gap-1 mt-1">
                <div className={cn("w-1.5 h-1.5 rounded-full", info.type === 'Highly Auspicious' ? 'bg-saffron' : 'bg-gold')} />
                <span className="text-[9px] text-gray-400 font-bold">{info.type}</span>
              </div>
            </div>
          ))}
          
          <div className="mt-8 p-4 bg-maroon rounded-2xl text-cream text-center">
            <Sparkles className="w-6 h-6 text-gold mx-auto mb-2" />
            <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              Book Puja during <br/> <span className="text-gold">Highly Auspicious</span> <br/> times for maximum blessings
            </p>
          </div>
        </div>
      </div>

      {/* Main Calendar Body */}
      <div className="flex-1 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-serif text-3xl font-bold text-maroon mb-1">
              {format(currentMonth, 'MMMM')}
            </h3>
            <p className="text-gold font-bold uppercase tracking-widest text-[10px]">Year {format(currentMonth, 'yyyy')}</p>
          </div>
          <div className="flex items-center gap-4">
            {selectedDate && (
              <a 
                href={`https://www.drikpanchang.com/panchang/day-panchang.html?date=${format(new Date(selectedDate), 'dd/MM/yyyy')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-maroon/5 dark:bg-maroon/20 hover:bg-maroon/10 text-maroon dark:text-saffron rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-gold/10 dark:border-white/5"
              >
                <span>{t.library.viewPanchang}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={prevMonth}
                className="p-3 bg-paper dark:bg-dark-bg hover:bg-maroon/5 dark:hover:bg-maroon/20 rounded-2xl transition-all text-maroon dark:text-gold border border-gold/5 dark:border-white/5 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                type="button"
                onClick={nextMonth}
                className="p-3 bg-paper dark:bg-dark-bg hover:bg-maroon/5 dark:hover:bg-maroon/20 rounded-2xl transition-all text-maroon dark:text-gold border border-gold/5 dark:border-white/5 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map(day => (
            <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-maroon/30 dark:text-gold/20 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
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
                whileHover={!isPast ? { y: -5, scale: 1.05 } : {}}
                whileTap={!isPast ? { scale: 0.95 } : {}}
                onClick={() => !isPast && onDateSelect(dateStr)}
                onMouseEnter={() => isAuspicious && setHoveredDate(dateStr)}
                onMouseLeave={() => setHoveredDate(null)}
                disabled={isPast}
                className={cn(
                  "relative aspect-square w-full flex flex-col items-center justify-center rounded-2xl transition-all duration-300 text-sm font-bold",
                  !isCurrentMonth ? 'text-gray-200 dark:text-gray-800' : 'text-gray-700 dark:text-gray-300',
                  isSelected ? 'bg-maroon text-cream shadow-xl z-10' : '',
                  !isSelected && !isPast && isAuspicious ? "bg-saffron/5 dark:bg-saffron/10 border border-saffron/20 dark:border-saffron/40 text-maroon dark:text-saffron" : '',
                  !isSelected && !isPast && !isAuspicious ? 'hover:bg-maroon/5 dark:hover:bg-maroon/20' : '',
                  isPast ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'
                )}
              >
                <span className={cn(isSelected ? 'text-xl' : '')}>{format(day, 'd')}</span>
                
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
                        {isAuspicious.type}
                      </div>
                      <p className="leading-relaxed opacity-90">{isAuspicious.label}</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-maroon" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedDate && (
          <motion.div
            ref={timeSlotsRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 pt-8 border-t border-gold/10 dark:border-white/5 overflow-hidden"
          >
            <h4 className="font-serif text-xl font-bold text-maroon dark:text-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center text-gold text-sm">
                🕉️
              </span>
              Select Auspicious Time Slot
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => onTimeSelect(slot.label)}
                  className={`
                    flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 text-left
                    ${selectedTime === slot.label 
                      ? 'border-maroon dark:border-saffron bg-maroon/5 dark:bg-maroon/20 shadow-md shadow-maroon/5 ring-1 ring-maroon dark:ring-saffron' 
                      : 'border-gold/10 dark:border-white/5 hover:border-maroon/30 hover:bg-maroon/5 dark:hover:bg-maroon/20'
                    }
                  `}
                >
                  <span className="text-2xl">{slot.icon}</span>
                  <div>
                    <div className={`text-sm font-bold ${selectedTime === slot.label ? 'text-maroon dark:text-saffron' : 'text-gray-700 dark:text-gray-300'}`}>
                      {slot.label.split(' (')[0]}
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">
                      ({slot.label.split(' (')[1]}
                    </div>
                  </div>
                  {selectedTime === slot.label && (
                    <motion.div 
                      layoutId="slot-check"
                      className="ml-auto w-5 h-5 bg-maroon dark:bg-saffron rounded-full flex items-center justify-center text-cream"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile-only link */}
            <div className="mt-6 md:hidden">
              <a 
                href={`https://www.drikpanchang.com/panchang/day-panchang.html?date=${format(new Date(selectedDate), 'dd/MM/yyyy')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 bg-maroon dark:bg-maroon text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-maroon/20 active:scale-95 transition-all"
              >
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                  <ExternalLink className="w-3 h-3 text-white" />
                </div>
                <span>{t.library.viewPanchang}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 pt-6 border-t border-gold/10 dark:border-white/5 grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-saffron" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-600">Highly Auspicious</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-gold bg-gold/20" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-600">Auspicious</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-maroon/20 bg-maroon/10" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-600">Tithi</span>
        </div>
      </div>
    </div>
  );
};
