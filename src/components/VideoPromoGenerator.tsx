import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  Sparkles, 
  Loader2, 
  Download, 
  AlertCircle, 
  Key,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Extend window interface for AI Studio helpers
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const VideoPromoGenerator = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState('Rudrabhishek');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [extraDetails, setExtraDetails] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  const services = [
    'Rudrabhishek',
    'Ganpati Pujan',
    'Griha Pravesh',
    'Satyanarayan Pooja',
    'Maha Mrityunjaya Jap'
  ];

  const checkApiKey = async () => {
    try {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setHasApiKey(hasKey);
      return hasKey;
    } catch (err) {
      console.error('Error checking API key:', err);
      return false;
    }
  };

  const handleOpenSelectKey = async () => {
    try {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
      setError(null);
    } catch (err) {
      console.error('Error opening select key dialog:', err);
    }
  };

  const generateVideo = async () => {
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setStatus(t.videoGenerator.generating);

    try {
      const keySelected = await checkApiKey();
      if (!keySelected) {
        setIsGenerating(false);
        setError(t.videoGenerator.needApiKey);
        return;
      }

      // Initialize AI instance right before call as per skill guidance
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found in environment');
      }

      const ai = new GoogleGenerativeAI(apiKey);
      
      const prompt = `Short promotional video for ${selectedService} ceremony. ${extraDetails}. Style: Spiritual, divine, cinematic, slow motion, warm lighting, incense smoke, traditional Vedic atmosphere.`;

      const videoModel = ai.getGenerativeModel({ model: 'veo-3.1-lite-generate-preview' } as any);
      let operation = await (videoModel as any).generateVideos({
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      setStatus(t.videoGenerator.pollStatus);

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await (ai as any).operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) {
        throw new Error('Failed to get download link');
      }

      // Fetch the video
      const response = await fetch(downloadLink, {
        method: 'GET',
        headers: {
          'x-goog-api-key': apiKey,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError("Requested entity was not found. Please try picking your API key again.");
          setHasApiKey(false);
          return;
        }
        throw new Error('Failed to fetch video data');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setStatus(t.videoGenerator.success);
    } catch (err: any) {
      console.error('Video generation error:', err);
      setError(t.videoGenerator.error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-maroon font-serif">{t.videoGenerator.title}</h2>
          <p className="text-gray-500 mt-2">{t.videoGenerator.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          {hasApiKey ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-bold border border-green-100">
              <CheckCircle2 className="w-4 h-4" /> API Key Ready
            </div>
          ) : (
            <button 
              onClick={handleOpenSelectKey}
              className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full text-xs font-bold border border-gold/20 hover:bg-gold/20 transition-all"
            >
              <Key className="w-4 h-4" /> {t.videoGenerator.selectKeyBtn}
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-paper-dark p-8 rounded-3xl border border-gold/10 space-y-6">
            <div className="space-y-2 relative">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.videoGenerator.selectService}</label>
              <div className="relative">
                {/* Trigger Button - Big Size and beautiful design */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-white border border-gold/20 hover:border-gold/40 rounded-2xl px-5 py-4 flex items-center justify-between text-maroon font-bold text-base md:text-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-maroon/20 text-left cursor-pointer"
                >
                  <span>{selectedService}</span>
                  {isDropdownOpen ? (
                    <ChevronUp className="w-5 h-5 text-gold shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gold shrink-0" />
                  )}
                </button>

                {/* Dropdown Options Backdrop to close on click outside */}
                {isDropdownOpen && (
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setIsDropdownOpen(false)} 
                  />
                )}

                {/* Dropdown Options List opening strictly UPSIDE (upward direction) */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-0 right-0 mb-3 bg-white border border-gold/20 rounded-2xl shadow-2xl shadow-maroon/10 z-50 overflow-hidden"
                    >
                      <div className="p-2 max-h-72 overflow-y-auto font-sans">
                        {services.map((s) => {
                          const isSelected = selectedService === s;
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => {
                                setSelectedService(s);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-left text-sm md:text-base font-bold transition-all cursor-pointer ${
                                isSelected 
                                  ? 'bg-maroon text-cream' 
                                  : 'text-gray-700 hover:bg-maroon/5 hover:text-maroon'
                              }`}
                            >
                              <span>{s}</span>
                              {isSelected && <Check className="w-4 h-4 text-gold shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.videoGenerator.promptLabel}</label>
              <textarea 
                value={extraDetails}
                onChange={(e) => setExtraDetails(e.target.value)}
                placeholder={t.videoGenerator.promptPlaceholder}
                className="w-full bg-white border border-gold/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-maroon/20 text-maroon font-bold h-32 resize-none"
              />
            </div>

            <button 
              onClick={generateVideo}
              disabled={isGenerating}
              className="w-full bg-maroon text-cream py-4 rounded-2xl font-bold shadow-lg shadow-maroon/20 hover:bg-saffron transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.videoGenerator.generating}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {t.videoGenerator.generateBtn}
                </>
              )}
            </button>
          </div>

          <div className="p-6 bg-gold/5 rounded-3xl border border-gold/10 flex items-start gap-4">
            <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0 text-gold">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-maroon text-sm mb-1">Divine Quality Guarantee</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our AI uses advanced Vedic visual knowledge to create respectful and beautiful trailers. Each video is 5-10 seconds long.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-paper-dark rounded-[2rem] border-2 border-dashed border-gold/20 flex flex-col items-center justify-center min-h-[400px] overflow-hidden relative">
          <AnimatePresence mode="wait">
            {videoUrl ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col"
              >
                <video 
                  src={videoUrl} 
                  controls 
                  autoPlay 
                  loop 
                  className="w-full aspect-video object-cover"
                />
                <div className="p-6 flex items-center justify-between bg-white border-t border-gold/10">
                  <span className="text-sm font-bold text-maroon flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> {t.videoGenerator.success}
                  </span>
                  <a 
                    href={videoUrl} 
                    download={`promo_${selectedService.toLowerCase().replace(' ', '_')}.mp4`}
                    className="flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-xl text-xs font-bold hover:bg-gold/20 transition-all"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              </motion.div>
            ) : isGenerating ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-10"
              >
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-gold/10 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-maroon border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="w-8 h-8 text-gold animate-pulse" />
                  </div>
                </div>
                <h4 className="font-bold text-maroon mb-2">{status}</h4>
                <p className="text-xs text-gray-400 max-w-[250px] mx-auto leading-relaxed">
                  {status === t.videoGenerator.pollStatus ? t.videoGenerator.pollStatus : ''}
                </p>
              </motion.div>
            ) : error ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-10"
              >
                <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
                <h4 className="font-bold text-red-500 mb-2">{error}</h4>
                {error === t.videoGenerator.needApiKey && (
                  <button 
                    onClick={handleOpenSelectKey}
                    className="mt-4 px-6 py-3 bg-maroon text-cream rounded-2xl font-bold shadow-lg shadow-maroon/20 hover:bg-saffron transition-all"
                  >
                    {t.videoGenerator.selectKeyBtn}
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-10"
              >
                <div className="w-20 h-20 bg-gold/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/10">
                  <Video className="w-10 h-10 text-gold/30" />
                </div>
                <h4 className="font-bold text-maroon/40 mb-2">Video Preview</h4>
                <p className="text-xs text-gray-400 max-w-[200px] mx-auto">
                  Generated video will appear here. describe your ritual to see the magic.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
