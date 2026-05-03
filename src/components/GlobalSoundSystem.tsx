import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, X, ChevronRight, ChevronLeft, Volume2, VolumeX, ListMusic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SOUND_TRACKS } from '../constants.ts';

export const GlobalSoundSystem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showList, setShowList] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = SOUND_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % SOUND_TRACKS.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + SOUND_TRACKS.length) % SOUND_TRACKS.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setShowList(false);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        autoPlay={isPlaying}
        onEnded={nextTrack}
      />
      
      {/* Floating Button */}
      <div className="fixed bottom-24 right-6 z-[80] md:bottom-32">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
            isPlaying ? 'bg-maroon text-gold animate-[spin_8s_linear_infinite]' : 'bg-paper text-maroon'
          } border-2 border-gold/30`}
        >
          <Music className="w-6 h-6" />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-saffron"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Music Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[90] flex items-end justify-center md:items-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-maroon/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ y: '100%', opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: '100%', opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-[360px] bg-paper rounded-[2.5rem] shadow-2xl border border-gold/20 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="absolute top-6 right-6">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-maroon/40 hover:text-maroon transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 flex flex-col items-center">
                <div className="w-48 h-48 rounded-[3rem] bg-gradient-to-br from-maroon to-saffron p-1 shadow-2xl mb-8 relative group">
                  <div className={`w-full h-full rounded-[2.9rem] bg-paper flex items-center justify-center overflow-hidden transition-all duration-700 ${isPlaying ? 'scale-95 animate-[pulse_4s_easeInOut_infinite]' : ''}`}>
                    <Music className={`w-20 h-20 text-maroon/10 ${isPlaying ? 'animate-bounce' : ''}`} />
                    <div className="absolute inset-0 flex items-center justify-center bg-maroon/5">
                       <span className="text-4xl">🕉️</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-serif font-black text-maroon mb-2">{currentTrack.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed px-4">{currentTrack.description}</p>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mb-8 w-full">
                  <button onClick={prevTrack} className="p-3 text-maroon/60 hover:text-maroon transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="w-16 h-16 bg-maroon text-gold rounded-full flex items-center justify-center shadow-xl shadow-maroon/30"
                  >
                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                  </motion.button>
                  
                  <button onClick={nextTrack} className="p-3 text-maroon/60 hover:text-maroon transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Seek Bar (Fake for now or could connect) */}
                <div className="w-full px-4 mb-8">
                  <div className="h-1.5 bg-gold/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-maroon transition-all duration-300" 
                      style={{ width: isPlaying ? '65%' : '0%' }}
                    />
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex items-center justify-between w-full px-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setIsMuted(!isMuted)} className="text-maroon/60">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01"
                      value={volume}
                      onChange={e => setVolume(parseFloat(e.target.value))}
                      className="w-20 h-1 bg-gold/20 rounded-full appearance-none accent-maroon"
                    />
                  </div>
                  
                  <button 
                    onClick={() => setShowList(!showList)}
                    className={`p-2 rounded-xl transition-all ${showList ? 'bg-maroon text-gold' : 'text-maroon/60 hover:bg-maroon/5'}`}
                  >
                    <ListMusic className="w-5 h-5" />
                  </button>
                </div>

                {/* Track List Overlay */}
                <AnimatePresence>
                  {showList && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-x-0 bottom-0 top-[20%] bg-paper/95 backdrop-blur-md p-8 z-10 overflow-y-auto"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif font-black text-maroon uppercase tracking-wider">Mantra Playlist</h3>
                        <button onClick={() => setShowList(false)} className="text-maroon/40"><X className="w-5 h-5" /></button>
                      </div>
                      <div className="space-y-3">
                        {SOUND_TRACKS.map((track, idx) => (
                          <button
                            key={track.id}
                            onClick={() => selectTrack(idx)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                              currentTrackIndex === idx ? 'bg-maroon text-gold shadow-lg' : 'hover:bg-maroon/5 text-gray-700'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                              currentTrackIndex === idx ? 'bg-gold/20' : 'bg-maroon/10 text-maroon'
                            }`}>
                              {currentTrackIndex === idx && isPlaying ? (
                                <div className="flex items-end gap-0.5 h-3">
                                  <div className="w-1 bg-gold animate-[music-bar_0.5s_ease-in-out_infinite]" />
                                  <div className="w-1 bg-gold animate-[music-bar_0.7s_ease-in-out_infinite]" />
                                  <div className="w-1 bg-gold animate-[music-bar_0.6s_ease-in-out_infinite]" />
                                </div>
                              ) : idx + 1}
                            </div>
                            <div className="text-left">
                              <p className={`font-bold ${currentTrackIndex === idx ? 'text-gold' : 'text-maroon'}`}>{track.title}</p>
                              <p className="text-[10px] opacity-60 uppercase tracking-widest font-black">Spiritual Chanting</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="bg-maroon/5 py-4 text-center">
                <p className="text-[10px] text-maroon/40 uppercase font-black tracking-[0.4em]">Shree Nar Narayan</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
