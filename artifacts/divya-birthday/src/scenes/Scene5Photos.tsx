import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';

export function Scene5Photos({ onComplete, playSound }: { onComplete: () => void, playSound: (s: any) => void }) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [clickedCount, setClickedCount] = useState(0);
  const isMobile = useIsMobile();
  
  // close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const imageUrls = [
    '/IMG-20240717-WA0068.jpg',
    '/Screenshot_20260812_152305.webp',
    '/Screenshot_20260812_152331.webp',
    '/Screenshot_20260812_152357.webp',
    '/Screenshot_20260812_152410.webp',
    '/Screenshot_20260812_152547.webp',
  ];

  // Predefined spread positions (percentages) to avoid clustering
  const spreadPositions = [
    { x: '8%', y: '12%' },
    { x: '75%', y: '6%' },
    { x: '12%', y: '38%' },
    { x: '68%', y: '34%' },
    { x: '6%', y: '68%' },
    { x: '74%', y: '66%' }
  ];

  const photos = useMemo(() => Array.from({ length: imageUrls.length }).map((_, i) => {
    const pos = spreadPositions[i % spreadPositions.length];
    return {
      id: i,
      image: imageUrls[i] || imageUrls[0],
      rotate: (Math.random() - 0.5) * 14,
      x: `calc(${pos.x} + ${ (Math.random()-0.5) * 6 }%)`,
      y: `calc(${pos.y} + ${ (Math.random()-0.5) * 6 }%)`
    };
  }), []);

  const handlePhotoClick = (id: number) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
      if (clickedCount < imageUrls.length) setClickedCount(c => c + 1);
      playSound('sparkle');
    }
  };

  return (
    <motion.div 
      className="w-full h-full bg-[#05071a] relative overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,105,180,0.1)_0%,transparent_100%)] pointer-events-none" />

      <div className="absolute top-4 md:top-8 w-full px-4 text-center text-white/70 text-lg sm:text-2xl md:text-4xl font-script tracking-normal drop-shadow-[0_0_12px_rgba(255,255,255,0.18)] leading-tight">
        A little glimpse that always brings a smile ✨
      </div>

      <div className={`relative w-full h-full ${isMobile ? 'grid grid-cols-2 gap-3 content-start justify-items-center px-4 pt-20 pb-24 overflow-y-auto' : ''}`}>
        {photos.map((photo, i) => {
          const isActive = activeId === photo.id;
          const mobileRotate = photo.rotate * 0.35;
          return (
            <motion.button
              key={photo.id}
              onClick={() => handlePhotoClick(photo.id)}
              className={`${isMobile ? 'relative w-full max-w-[160px] shadow-lg cursor-pointer hover:shadow-xl transition-shadow flex flex-col items-center' : 'absolute shadow-lg cursor-pointer hover:shadow-xl transition-shadow'}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: 'spring' }}
              style={{
                left: isMobile ? undefined : photo.x,
                top: isMobile ? undefined : photo.y,
                width: isMobile ? undefined : 160,
                height: isMobile ? undefined : 230,
                transform: `rotate(${isMobile ? mobileRotate : photo.rotate}deg)`,
                zIndex: 10,
              }}
            >
              <div className={`${isMobile ? 'w-full aspect-[4/5]' : 'w-full h-full'} flex items-center justify-center rounded-sm overflow-hidden`}>
                <img 
                  src={photo.image} 
                  alt={`Little glimpse ${i + 1}`} 
                  className="w-full h-full object-contain"
                  style={{ display: 'block' }}
                />
              </div>
              <div className={`text-center text-white/60 ${isMobile ? 'text-[10px] mt-1' : 'text-xs mt-1'} font-script`}>Little glimpse {i + 1}</div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeId !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={() => setActiveId(null)}
            style={{ pointerEvents: 'auto' }}
          >
            <motion.div
              className="w-[92vw] h-[78vh] md:w-[70vw] md:h-[80vh] max-w-[900px] max-h-[820px] rounded-lg shadow-2xl flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{ background: 'transparent', padding: 0 }}
            >
              <img
                src={photos[activeId]?.image}
                alt={`Little glimpse ${activeId + 1}`}
                className="max-w-full max-h-full object-contain block"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {clickedCount >= 3 && activeId === null && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={onComplete}
            className="absolute bottom-6 md:bottom-12 z-40 bg-white/10 hover:bg-white/20 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full border border-white/30 backdrop-blur-sm transition-all text-sm md:text-base"
          >
            Continue →
          </motion.button>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
