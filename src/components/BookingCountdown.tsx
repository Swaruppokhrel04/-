import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface BookingCountdownProps {
  booking: any;
  language: string;
}

const cdTranslations: Record<string, { title: string, days: string, hours: string, minutes: string, seconds: string, nextPuja: string, live: string, started: string }> = {
  en: {
    title: "Next Scheduled Puja",
    days: "Days",
    hours: "Hrs",
    minutes: "Mins",
    seconds: "Secs",
    nextPuja: "Time remaining until next puja",
    live: "Puja is currently in progress!",
    started: "Started!"
  },
  ne: {
    title: "आगामी पूजा",
    days: "दिन",
    hours: "घण्टा",
    minutes: "मिनेट",
    seconds: "सेकेण्ड",
    nextPuja: "अर्को पूजा सुरु हुन बाँकी समय",
    live: "पूजा अहिले सुरु भइरहेको छ!",
    started: "सुरु भयो!"
  },
  hi: {
    title: "आगामी पूजा",
    days: "दिन",
    hours: "घंटे",
    minutes: "मिनट",
    seconds: "सेकंड",
    nextPuja: "अगली पूजा शुरू होने का समय",
    live: "पूजा अभी शुरू हो रही है!",
    started: "प्रारंभ!"
  }
};

export const BookingCountdown = ({ booking, language }: BookingCountdownProps) => {
  const currentLang = cdTranslations[language] || cdTranslations['en'];
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [isLive, setIsLive] = useState(false);

  const getTargetDate = () => {
    if (!booking || !booking.date) return null;
    
    // YYYY-MM-DD
    const parts = booking.date.split('-');
    const dateObj = new Date();
    if (parts.length === 3) {
      dateObj.setFullYear(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    } else {
      return new Date(booking.date);
    }

    let startHour = 9; // Default start hour 9 AM
    if (booking.time) {
      const timeMatch = booking.time.match(/(\d+)\s*(AM|PM)/i);
      if (timeMatch) {
         startHour = parseInt(timeMatch[1]);
         const ampm = timeMatch[2].toUpperCase();
         if (ampm === 'PM' && startHour < 12) startHour += 12;
         if (ampm === 'AM' && startHour === 12) startHour = 0;
      }
    }
    dateObj.setHours(startHour, 0, 0, 0);
    return dateObj;
  };

  useEffect(() => {
    const target = getTargetDate();
    if (!target) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = target.getTime() - now;

      if (difference <= 0) {
        // If it's within 2 hours of starting, consider it live
        const twoHours = 2 * 60 * 60 * 1000;
        if (difference > -twoHours) {
          setIsLive(true);
        } else {
          setIsLive(false);
        }
        setTimeLeft(null);
        clearInterval(timer);
      } else {
        setIsLive(false);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [booking]);

  if (!booking) return null;

  const targetDateObj = getTargetDate();
  const formattedDateString = targetDateObj ? format(targetDateObj, 'MMMM d, yyyy') : '';

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-br from-maroon via-maroon-dark to-black text-cream p-6 md:p-8 rounded-[2.5rem] border border-gold/30 shadow-2xl shadow-maroon/20 mb-8"
      id="booking-countdown-container"
    >
      {/* Absolute Decorative Background Elements */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Sparkles className="w-32 h-32 text-gold animate-pulse" />
      </div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-6 md:gap-8">
        {/* Left Side: Next Puja Info */}
        <div className="text-center xl:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-saffron/25 text-gold text-xs font-black uppercase tracking-widest rounded-full border border-gold/30">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin-slow" />
            <span>{currentLang.title}</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-serif font-black text-white leading-tight mt-1">
            {booking.pujaType}
          </h3>
          
          <p className="text-xs md:text-sm text-gold/80 font-medium flex items-center justify-center xl:justify-start gap-2">
            <Clock className="w-4 h-4 text-gold shrink-0" />
            <span>{formattedDateString} &bull; {booking.time || 'Auspicious Hour'}</span>
          </p>
        </div>

        {/* Right Side: The Interactive Clock Indicator */}
        <div className="flex flex-col items-center gap-3">
          {isLive ? (
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: [0.9, 1.05, 0.9] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="px-8 py-4 bg-saffron text-white rounded-2xl border-2 border-gold font-black uppercase text-sm md:text-base tracking-widest flex items-center gap-3 shadow-lg shadow-saffron/40"
            >
              <div className="w-3 h-3 bg-white rounded-full animate-ping-slow" />
              <span>{currentLang.live}</span>
            </motion.div>
          ) : timeLeft ? (
            <div className="flex items-center gap-3 md:gap-5 justify-center">
              {[
                { label: currentLang.days, value: timeLeft.days },
                { label: currentLang.hours, value: timeLeft.hours },
                { label: currentLang.minutes, value: timeLeft.minutes },
                { label: currentLang.seconds, value: timeLeft.seconds }
              ].map((unit, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="relative min-w-[64px] h-[64px] md:min-w-[76px] md:h-[76px] bg-paper-dark/10 backdrop-blur-md rounded-2xl md:rounded-3xl border border-gold/20 flex flex-col items-center justify-center shadow-inner overflow-hidden">
                    <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gold tracking-tight">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 bg-white/5 h-[2px]" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-gold/70 uppercase tracking-widest mt-2">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-3 bg-white/5 rounded-2xl border border-gold/15 text-xs font-bold text-gold/60 uppercase tracking-wide">
              {currentLang.started}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
