import React from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'service' | 'avatar' | 'banner' | 'book';
  seed?: string | number;
}

// Vedic symbols assigned based on type / seed
const VEDIC_SYMBOLS = ['🕉️', '卐', '⚛', '📿'];

export const SafeImage: React.FC<SafeImageProps> = ({
  alt,
  className = '',
  fallbackType = 'service',
  seed,
}) => {
  const finalSeed = seed ?? 0;
  
  // Choose symbol based on seed or type
  let symbol = '🕉️';
  if (fallbackType === 'avatar') {
    symbol = '📿';
  } else if (fallbackType === 'book') {
    symbol = '🕉️';
  } else if (fallbackType === 'banner') {
    symbol = '卐';
  } else {
    // Service or other: derive from seed
    let index = 0;
    if (typeof finalSeed === 'number') {
      index = finalSeed;
    } else if (typeof finalSeed === 'string') {
      index = finalSeed.length + finalSeed.charCodeAt(0);
    }
    symbol = VEDIC_SYMBOLS[index % VEDIC_SYMBOLS.length];
  }

  // Pure stylized, responsive spiritual card fitting the Vedic / Sanatan motif
  return (
    <div 
      className={`w-full h-full min-h-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#2D0209] via-[#4F0713] to-[#600C1B] text-cream border border-gold/15 shadow-inner ${className}`}
      style={{ aspectRatio: fallbackType === 'avatar' ? '1/1' : fallbackType === 'book' ? '3/4' : undefined }}
    >
      {/* Decorative concentric sacred geometries using absolute styled layers */}
      <div className="absolute inset-0 bg-mandala-pattern opacity-[0.06] pointer-events-none select-none mix-blend-overlay" />
      
      {/* Outer borders/frame */}
      <div className="absolute inset-2 border border-gold/10 rounded-xl pointer-events-none" />
      <div className="absolute inset-4 border border-gold/5 rounded-lg border-dashed pointer-events-none" />
      
      {/* Dynamic Saffron/Crimson aura glow in the center */}
      <div className="absolute w-2/3 h-2/3 bg-saffron/20 rounded-full blur-[40px] pointer-events-none select-none animate-pulse" />

      {/* Symbol Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <span 
          className={`font-serif tracking-normal text-gold filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)] transition-all select-none
            ${fallbackType === 'avatar' ? 'text-4xl sm:text-5xl' : ''}
            ${fallbackType === 'book' ? 'text-5xl sm:text-6xl animate-pulse' : ''}
            ${fallbackType === 'banner' ? 'text-7xl sm:text-8xl' : ''}
            ${fallbackType === 'service' ? 'text-6xl sm:text-7xl hover:scale-110 duration-500' : 'text-5xl'}
          `}
        >
          {symbol}
        </span>

        {/* Small Elegant Label (if alt text exists and is not empty) */}
        {alt && fallbackType !== 'avatar' && (
          <div className="mt-4 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-lg border border-gold/10 max-w-[85%] text-center">
            <p className="text-[10px] sm:text-xs font-serif font-semibold tracking-wide text-amber-100/90 truncate">
              {alt}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
