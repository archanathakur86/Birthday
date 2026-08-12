import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Scene5Photos({ onComplete, playSound }: { onComplete: () => void, playSound: (s: any) => void }) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [clickedCount, setClickedCount] = useState(0);
  
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

  const photos = Array.from({ length: imageUrls.length }).map((_, i) => {
    const pos = spreadPositions[i % spreadPositions.length];
    return {
      id: i,
      image: imageUrls[i] || imageUrls[0],
      rotate: (Math.random() - 0.5) * 14,
      x: `calc(${pos.x} + ${ (Math.random()-0.5) * 6 }%)`,
      y: `calc(${pos.y} + ${ (Math.random()-0.5) * 6 }%)`
    };
  });

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

      <div className="absolute top-8 w-full text-center text-white/50 text-lg md:text-xl font-sans tracking-wide">
        Click any memory to relive it ✨
      </div>

      <div className="relative w-full h-full">
        {photos.map((photo, i) => {
          const isActive = activeId === photo.id;
          return (
            <motion.div
              key={photo.id}
              onClick={() => handlePhotoClick(photo.id)}
              className="absolute shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: 'spring' }}
              style={{
                left: photo.x,
                top: photo.y,
                width: 160,
                height: 190,
                transform: `rotate(${photo.rotate}deg)`,
                zIndex: 10,
              }}
            >
              <div className="w-full h-full flex items-center justify-center rounded-sm overflow-hidden">
                <img 
                  src={photo.image} 
                  alt={`Memory ${i + 1}`} 
                  className="w-full h-full object-contain"
                  style={{ display: 'block' }}
                />
              </div>
              <div className="text-center text-white/60 text-xs mt-1 font-script">Memory {i + 1}</div>
            </motion.div>
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
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{ width: '70vw', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', padding: 0 }}
            >
              <img
                src={photos[activeId]?.image}
                alt={`Memory ${activeId + 1}`}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
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
            className="absolute bottom-12 z-40 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full border border-white/30 backdrop-blur-sm transition-all"
          >
            Continue →
          </motion.button>
        )}
      </AnimatePresence>

    </motion.div>
  );
}