import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, User, Phone, Mail, MessageSquare, Tag, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const contactT = (t as any).contact_form;

    if (!formData.name.trim()) {
      newErrors.name = contactT.errNameRequired;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = contactT.errPhoneRequired;
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = contactT.errPhoneInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = contactT.errMessageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setStatus('submitting');
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-paper p-8 md:p-12 rounded-3xl shadow-xl border border-gold/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none" />
      
      <h3 className="text-2xl font-bold font-serif text-maroon mb-8 flex items-center gap-3">
        {(t as any).contact_form.title}
        <div className="h-px bg-gold/30 flex-1" />
      </h3>

      {status === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h4 className="text-xl font-bold text-maroon mb-2">{(t as any).contact_form.success}</h4>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-6 text-saffron font-bold hover:underline flex items-center justify-center gap-2 mx-auto"
          >
            <Send className="w-4 h-4" />
            {(t as any).contact_form.btnSendAnother}
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                {(t as any).contact_form.labelName}
              </label>
              <div className="relative group">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.name ? 'text-red-400' : 'text-gray-400 group-focus-within:text-saffron'}`} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={(t as any).contact_form.placeholderName}
                  className={`w-full pl-12 pr-4 py-3.5 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm ${errors.name ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : 'border-gray-200 focus:ring-saffron/20 focus:border-saffron'}`}
                />
              </div>
              {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                {(t as any).contact_form.labelPhone}
              </label>
              <div className="relative group">
                <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.phone ? 'text-red-400' : 'text-gray-400 group-focus-within:text-saffron'}`} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={(t as any).contact_form.placeholderPhone}
                  className={`w-full pl-12 pr-4 py-3.5 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm ${errors.phone ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : 'border-gray-200 focus:ring-saffron/20 focus:border-saffron'}`}
                />
              </div>
              {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                {(t as any).contact_form.labelSubject}
              </label>
            <div className="relative group">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-saffron transition-colors" />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={(t as any).contact_form.placeholderSubject}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron/20 focus:border-saffron transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                {(t as any).contact_form.labelMessage}
              </label>
            <div className="relative group">
              <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors ${errors.message ? 'text-red-400' : 'text-gray-400 group-focus-within:text-saffron'}`} />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder={(t as any).contact_form.placeholderMessage}
                className={`w-full pl-12 pr-4 py-3.5 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm resize-none ${errors.message ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : 'border-gray-200 focus:ring-saffron/20 focus:border-saffron'}`}
              />
            </div>
            {errors.message && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.message}</p>}
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-100">
              <AlertCircle className="w-4 h-4" />
              {(t as any).contact_form.error}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-maroon text-cream py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-saffron transition-all shadow-xl shadow-maroon/10 disabled:opacity-70 disabled:cursor-not-allowed group h-14"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {(t as any).contact_form.btnSending}
              </>
            ) : (
              <>
                {(t as any).contact_form.btnSubmit}
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
