import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar, MapPin, User, MessageSquare, Mail, Phone, Home, Download, CreditCard, Loader2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { generateGoogleCalendarLink, downloadICal } from '../lib/calendarUtils';
import { createCheckoutSession } from '../services/stripe';
import { SERVICES } from '../constants';

interface BookingConfirmationProps {
  booking: {
    fullName: string;
    phone: string;
    pujaType: string;
    date: string;
    time: string;
    location: string;
    message: string;
  };
  onClose: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking, onClose }) => {
  const { t } = useLanguage();
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const confirmationT = (t.booking as any).confirmation;

  const currentService = SERVICES.find(s => s.id === booking.pujaType);
  const price = currentService?.price || 0;

  const handlePayment = async () => {
    if (!currentService) return;
    
    setIsPaying(true);
    setPayError(null);
    
    try {
      const session = await createCheckoutSession({
        serviceId: currentService.id,
        serviceName: currentService.name,
        amount: price,
      });

      if (session.url) {
        window.location.href = session.url;
      } else if (session.isMock) {
        // Handle mock payment success
        alert('Payment integration is in test mode. Booking confirmed without real payment.');
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      setPayError('Failed to initialize payment. You can pay in person or try again later.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-2xl w-full mx-auto border border-gold/10"
    >
      {/* Header */}
      <div className="bg-maroon p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 border-4 border-gold rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="w-20 h-20 bg-saffron rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
        >
          <CheckCircle2 className="w-10 h-10 text-maroon" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-cream mb-2 font-serif">{confirmationT.title}</h2>
        <p className="text-gold/80 text-sm max-w-md mx-auto">{confirmationT.message}</p>
      </div>

      {/* Details Summary */}
      <div className="p-10">
        <h3 className="text-xs font-bold uppercase tracking-widest text-maroon/40 mb-6 flex items-center gap-2">
          <div className="w-4 h-px bg-gold/30" /> {confirmationT.summary}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <DetailItem icon={<User />} label={t.booking.form.labelName} value={booking.fullName} />
          <DetailItem icon={<Calendar />} label={t.booking.form.labelDate} value={`${booking.date} (${booking.time})`} />
          <DetailItem icon={<Phone />} label={t.booking.form.labelPhone} value={booking.phone} />
          <DetailItem icon={<Home />} label={t.booking.form.labelService} value={booking.pujaType} />
          {booking.location && (
            <DetailItem icon={<MapPin />} label={t.booking.form.labelLocation} value={booking.location} />
          )}
          {booking.message && (
            <div className="md:col-span-2">
                <DetailItem icon={<MessageSquare />} label={t.booking.form.labelMessage} value={booking.message} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {price > 0 && (
            <div className="mb-6">
              <div className="bg-paper p-6 rounded-2xl border border-gold/20 flex flex-col items-center text-center">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-2">Puja Dakshina (Offline/Online)</div>
                <div className="text-3xl font-serif font-black text-maroon mb-4">NPR {price.toLocaleString()}</div>
                
                {payError && (
                  <p className="text-xs text-red-500 font-bold mb-4">{payError}</p>
                )}

                <button 
                  onClick={handlePayment}
                  disabled={isPaying}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-600/10 disabled:opacity-50"
                >
                  {isPaying ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                  Pay Online with Card
                </button>
                <p className="mt-3 text-[10px] text-gray-400 italic">Payments are processed securely via Stripe</p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex gap-2">
            <a 
              href={generateGoogleCalendarLink(booking)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white border-2 border-gold text-maroon py-4 rounded-xl font-bold text-center hover:bg-gold/10 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" /> Google
            </a>
            <button 
              onClick={() => downloadICal(booking)}
              className="px-6 bg-white border-2 border-maroon text-maroon py-4 rounded-xl font-bold hover:bg-maroon/5 transition-all flex items-center justify-center"
              title="Download .ics"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={onClose}
            className="flex-1 bg-maroon text-cream py-4 rounded-xl font-bold hover:bg-saffron transition-all duration-300 shadow-lg shadow-maroon/10"
          >
            {confirmationT.home}
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 bg-paper rounded-xl flex items-center justify-center text-maroon shrink-0 border border-gold/5">
      {React.cloneElement(icon as React.ReactElement, { size: 18 })}
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <p className="text-maroon font-bold text-sm">{value}</p>
    </div>
  </div>
);
