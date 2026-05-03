import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Facebook, 
  Youtube, 
  Instagram,
  ChevronRight,
  Heart
} from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_INFO } from '../constants.ts';
import { useLanguage } from '../LanguageContext.tsx';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.services, to: '/#services' },
    { label: (t.nav as any).library || 'Library', to: '/library' },
    { label: 'User Guide', to: '/guide' },
    { label: t.nav.about, to: '/#about' },
    { label: t.nav.faq, to: '/#faq' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'YouTube' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <MessageCircle className="w-5 h-5" />, href: `https://wa.me/${CONTACT_INFO.whatsapp}`, label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-paper border-t border-gold/20 pt-20 pb-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <div className="flex flex-col">
                <span className="font-serif font-black text-maroon text-3xl leading-none">श्री नर</span>
                <span className="text-xs text-saffron font-bold tracking-[0.3em] uppercase mt-1">नारायण</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Dedicated to preserving and sharing the ancient Vedic traditions. Providing authentic spiritual guidance and Vedic services for a balanced life.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-maroon/5 text-maroon flex items-center justify-center hover:bg-maroon hover:text-white transition-all transform"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-maroon font-serif font-bold text-xl uppercase tracking-widest">Important Pages</h4>
            <ul className="space-y-4">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  {link.to.startsWith('/#') ? (
                    <a 
                      href={link.to}
                      className="text-gray-500 hover:text-maroon transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 text-gold/40 group-hover:text-gold transition-colors" />
                      <span className="font-medium">{link.label}</span>
                    </a>
                  ) : (
                    <Link 
                      to={link.to}
                      className="text-gray-500 hover:text-maroon transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 text-gold/40 group-hover:text-gold transition-colors" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-maroon font-serif font-bold text-xl uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-maroon shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gold/60 tracking-widest mb-1">Our Location</p>
                  <p className="text-sm text-gray-500 font-medium">{CONTACT_INFO.address}</p>
                </div>
              </li>
              <li>
                <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-maroon/5 flex items-center justify-center text-maroon shrink-0 group-hover:bg-maroon group-hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-gold/60 tracking-widest mb-1">Call Anytime</p>
                    <p className="text-sm text-gray-500 font-bold group-hover:text-maroon transition-colors">{CONTACT_INFO.displayPhone}</p>
                  </div>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-green-600/60 tracking-widest mb-1">WhatsApp</p>
                    <p className="text-sm text-gray-500 font-bold group-hover:text-green-600 transition-colors">Chat With Us</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Quote */}
          <div className="space-y-6">
            <h4 className="text-maroon font-serif font-bold text-xl uppercase tracking-widest">Divine Blessing</h4>
            <div className="bg-gradient-to-br from-maroon/5 to-saffron/5 p-8 rounded-[2rem] border border-gold/10 relative overflow-hidden group">
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-maroon/5 rotate-12 group-hover:scale-110 transition-transform duration-700" />
              <p className="text-sm text-maroon/80 font-serif italic relative z-10">
                "Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality."
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-px w-8 bg-gold/30" />
                <span className="text-[10px] font-black uppercase text-gold tracking-widest">Brihadaranyaka Upanishad</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-gray-400">
            &copy; {currentYear} श्री नर नारायण. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-[10px] font-black uppercase text-gray-400 hover:text-maroon transition-colors tracking-widest">Privacy Policy</Link>
            <Link to="/terms" className="text-[10px] font-black uppercase text-gray-400 hover:text-maroon transition-colors tracking-widest">Terms of Service</Link>
          </div>
          <p className="text-[10px] font-black text-gray-400 flex items-center gap-1.5 uppercase tracking-widest">
            Made with <Heart className="w-3 h-3 text-red-500 fill-current" /> in Nepal
          </p>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-saffron/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-maroon/5 rounded-full blur-[120px] -z-10" />
    </footer>
  );
};

const Quote = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21Z" fill="currentColor"/>
    <path d="M14.017 21C14.017 13.8203 17.1504 8.5 21.017 4.5V1.5C14.017 5.5 14.017 13.5 14.017 16V21H14.017Z" fill="currentColor"/>
    <path d="M3.01697 21L3.01697 18C3.01697 16.8954 3.9124 16 5.01697 16H8.01697C9.12154 16 10.017 16.8954 10.017 18V21C10.017 22.1046 9.12154 23 8.01697 23H5.01697C3.9124 23 3.01697 22.1046 3.01697 21Z" fill="currentColor"/>
    <path d="M3.01697 21C3.01697 13.8203 6.1504 8.5 10.017 4.5V1.5C3.01697 5.5 3.01697 13.5 3.01697 16V21H3.01697Z" fill="currentColor"/>
  </svg>
);
