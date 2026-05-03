import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, Sparkles, User, Bot } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const Assistant = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: t.library.assistant.welcome }]);
    }
  }, [isOpen, t.library.assistant.welcome, messages.length]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const systemInstruction = `You are a spiritual and helpful assistant for "Shree Nar Narayan", a platform for Hindu religious services, astrology (Jyotish), and spiritual knowledge. 
      The website offers:
      1. Jyotish (Astrology) services: Kundli, Rashifal (Horoscope), Matching (Guna Milan).
      2. Karmakand: Pujas, rituals, and religious ceremonies.
      3. Spiritual Library: Books on Geeta, Vedas, Puranas, etc.
      4. Daily Panchang: Shubh Muhurats, Tithis, etc.
      
      Your goal is to answer questions about these services or general spiritual/religious questions in a polite and respectful manner.
      Respond in ${language === 'ne' ? 'Nepali' : language === 'hi' ? 'Hindi' : 'English'}.
      Keep responses concise and helpful.`;

      const chatResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction
        }
      });

      const assistantMessage = chatResponse.text || "I apologize, I am temporarily unable to respond. Please try again later.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error("Assistant Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong. Please check your internet connection and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[90vw] sm:w-[400px] h-[500px] bg-white dark:bg-dark-bg rounded-3xl shadow-2xl border border-gold/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-maroon flex items-center justify-between text-cream">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">{t.library.assistant.title}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper/30 dark:bg-dark-surface/30">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    message.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                    message.role === 'user' ? "bg-maroon text-cream" : "bg-white dark:bg-dark-bg text-gold border border-gold/10"
                  )}>
                    {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                    message.role === 'user' 
                      ? "bg-maroon text-cream rounded-tr-none" 
                      : "bg-white dark:bg-dark-surface text-maroon dark:text-cream border border-gold/5 rounded-tl-none"
                  )}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3 mr-auto">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-dark-bg text-gold border border-gold/10 flex items-center justify-center shrink-0 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="p-3 bg-white dark:bg-dark-surface text-gray-400 text-xs rounded-2xl border border-gold/5 rounded-tl-none flex items-center gap-2">
                    {t.library.assistant.loading}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-dark-surface border-t border-gold/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.library.assistant.placeholder}
                  className="w-full bg-paper dark:bg-dark-bg pl-4 pr-12 py-3 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-maroon text-maroon dark:text-cream border border-gold/10"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all",
                    input.trim() && !isLoading ? "bg-maroon text-cream shadow-lg scale-105" : "bg-gray-100 text-gray-400 dark:bg-dark-surface dark:text-gray-600"
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-maroon rounded-full shadow-2xl flex items-center justify-center text-cream border-2 border-gold/30 relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Badge */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-saffron rounded-full border-2 border-meroon flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </div>
        )}
      </motion.button>
    </div>
  );
};
