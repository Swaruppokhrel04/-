import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface AudioPlayerProps {
  url: string;
  title?: string;
  variant?: 'default' | 'compact';
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ url, title, variant = 'default' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isCompact = variant === 'compact';

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
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className={`${isCompact ? 'bg-transparent border-none p-0 shadow-none' : 'bg-paper border border-gold/10 p-4 rounded-2xl shadow-sm'}`}>
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
      <div className="flex flex-col gap-3">
        {title && !isCompact && (
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-maroon/60">
              {title} Mantra Recording
            </span>
          </div>
        )}

        <div className={`flex items-center ${isCompact ? 'gap-3' : 'gap-4'}`}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className={`${isCompact ? 'w-8 h-8' : 'w-10 h-10'} bg-maroon text-cream rounded-full flex items-center justify-center shadow-lg shadow-maroon/10`}
          >
            {isPlaying ? 
              <Pause className={`${isCompact ? 'w-4 h-4' : 'w-5 h-5'} fill-current`} /> : 
              <Play className={`${isCompact ? 'w-4 h-4 ml-0.5' : 'w-5 h-5 ml-1'} fill-current`} />
            }
          </motion.button>

          <div className="flex-1 flex flex-col gap-1">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className={`w-full ${isCompact ? 'h-1' : 'h-1.5'} bg-gold/20 rounded-lg appearance-none cursor-pointer accent-maroon`}
            />
            {!isCompact && (
              <div className="flex justify-between items-center text-[10px] font-medium text-gray-400 font-mono">
                <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}</span>
                <span>{audioRef.current ? formatTime(audioRef.current.duration) : '0:00'}</span>
              </div>
            )}
          </div>

          {!isCompact && (
            <div className="flex items-center gap-2 group relative">
              <button
                 onClick={() => setIsMuted(!isMuted)}
                 className="text-maroon/60 hover:text-maroon transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-white rounded-lg shadow-xl border border-gray-100 z-10 w-24">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-full h-1 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-maroon"
                />
              </div>
              
              <button
                onClick={resetAudio}
                className="text-maroon/60 hover:text-maroon transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}

          {isCompact && (
            <button
              onClick={resetAudio}
              className="text-maroon/40 hover:text-maroon transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
