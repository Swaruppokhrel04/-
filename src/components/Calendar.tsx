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
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AUSPICIOUS_DATES } from '../constants';
import { cn } from '../lib/utils';

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
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4)); // Default to May 2026
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const timeSlotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDate && timeSlotsRef.current) {
      const element = timeSlotsRef.current;
      const offset = 100; // Account for fixed navbar if any
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

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gold/10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-serif text-2xl font-bold text-maroon">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={prevMonth}
            className="p-2 hover:bg-maroon/5 rounded-full transition-colors text-maroon"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            type="button"
            onClick={nextMonth}
            className="p-2 hover:bg-maroon/5 rounded-full transition-colors text-maroon"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {weekDays.map(day => (
          <div key={day} className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
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
              whileHover={!isPast ? { scale: 1.1 } : {}}
              whileTap={!isPast ? { scale: 0.95 } : {}}
              onClick={() => !isPast && onDateSelect(dateStr)}
              onMouseEnter={() => isAuspicious && setHoveredDate(dateStr)}
              onMouseLeave={() => setHoveredDate(null)}
              disabled={isPast}
              className={`
                relative h-12 w-full flex flex-col items-center justify-center rounded-xl transition-all duration-300 text-sm font-medium
                ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                ${isSelected ? 'bg-maroon text-cream scale-110 shadow-2xl ring-2 ring-gold ring-offset-1 z-10' : ''}
                ${!isSelected && !isPast && isAuspicious ? AUSPICIOUS_COLORS[isAuspicious.type] : ''}
                ${!isSelected && !isPast && !isAuspicious ? 'hover:bg-maroon/5' : ''}
                ${isPast ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <span>{format(day, 'd')}</span>
              {isAuspicious && !isSelected && (
                <div className="absolute top-1 right-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${isAuspicious.type === 'Highly Auspicious' ? 'bg-white' : 'bg-saffron'}`} />
                </div>
              )}
              
              <AnimatePresence>
                {hoveredDate === dateStr && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 w-32 bg-maroon text-cream p-2 rounded-lg shadow-xl text-[10px] pointer-events-none"
                  >
                    <div className="flex items-center gap-1 font-bold mb-1">
                      <Info className="w-3 h-3 text-gold" />
                      {isAuspicious.type}
                    </div>
                    {isAuspicious.label}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-maroon" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedDate && (
          <motion.div
            ref={timeSlotsRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 pt-8 border-t border-gold/10 overflow-hidden"
          >
            <h4 className="font-serif text-xl font-bold text-maroon mb-4 flex items-center gap-2">
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
                      ? 'border-maroon bg-maroon/5 shadow-md shadow-maroon/5 ring-1 ring-maroon' 
                      : 'border-gold/10 hover:border-maroon/30 hover:bg-maroon/5'
                    }
                  `}
                >
                  <span className="text-2xl">{slot.icon}</span>
                  <div>
                    <div className={`text-sm font-bold ${selectedTime === slot.label ? 'text-maroon' : 'text-gray-700'}`}>
                      {slot.label.split(' (')[0]}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      ({slot.label.split(' (')[1]}
                    </div>
                  </div>
                  {selectedTime === slot.label && (
                    <motion.div 
                      layoutId="slot-check"
                      className="ml-auto w-5 h-5 bg-maroon rounded-full flex items-center justify-center text-cream"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 pt-6 border-t border-gold/10 grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-saffron" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Highly Auspicious</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-gold bg-gold/20" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Auspicious</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-maroon/20 bg-maroon/10" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Tithi</span>
        </div>
      </div>
    </div>
  );
};
