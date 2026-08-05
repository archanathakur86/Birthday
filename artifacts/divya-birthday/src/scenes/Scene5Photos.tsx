import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Scene5Photos({ onComplete, playSound }: { onComplete: () => void, playSound: (s: any) => void }) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [clickedCount, setClickedCount] = useState(0);

  const photos = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    rotate: (Math.random() - 0.5) * 30,
    x: (Math.random() - 0.5) * 60 + 'vw',
    y: (Math.random() - 0.5) * 60 + 'vh',
    gradient: `linear-gradient(${Math.random() * 360}deg, hsl(${Math.random() * 360}, 80%, 60%), hsl(${Math.random() * 360}, 80%, 40%))`
  }));

  const handlePhotoClick = (id: number) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
      if (clickedCount < 8) setClickedCount(c => c + 1);
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

      {photos.map((photo, i) => {
        const isActive = activeId === photo.id;
        return (
          <motion.div
            key={photo.id}
            layout
            onClick={() => handlePhotoClick(photo.id)}
            className={`absolute bg-white p-2 md:p-4 pb-8 md:pb-12 shadow-xl cursor-pointer
              ${isActive ? 'z-50' : 'z-10 hover:z-40'}`}
            initial={{ 
              x: photo.x, 
              y: '-100vh', 
              rotate: photo.rotate 
            }}
            animate={isActive ? {
              x: 0,
              y: 0,
              rotate: 0,
              scale: window.innerWidth < 768 ? 1.5 : 2.5,
              zIndex: 50,
            } : {
              x: photo.x,
              y: photo.y,
              rotate: photo.rotate,
              scale: 1,
              zIndex: 10,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              delay: isActive ? 0 : i * 0.1
            }}
            style={{ width: '150px', height: '180px' }}
          >
            <div className="w-full h-full" style={{ background: photo.gradient }} />
            <div className="text-center text-black mt-2 font-script text-lg">Memory {i + 1}</div>
            
            {isActive && (
              <motion.div 
                className="absolute inset-0 border-[4px] border-pink-400 rounded pointer-events-none"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
        );
      })}

      <AnimatePresence>
        {activeId !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 z-40"
            onClick={() => setActiveId(null)}
          />
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