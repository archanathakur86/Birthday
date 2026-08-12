import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Scene6Hearts({ onComplete, playSound }: { onComplete: () => void, playSound: (s: any) => void }) {
  const [found, setFound] = useState<number[]>([]);
  const totalHearts = 5;

  const hearts = useMemo(() => {
    return Array.from({ length: totalHearts }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 1.5 + Math.random() * 2,
      delay: Math.random() * 2
    }));
  }, []);

  const handleFind = (id: number) => {
    if (!found.includes(id)) {
      setFound([...found, id]);
      playSound('sparkle');
    }
  };

  if (found.length === totalHearts) {
    setTimeout(onComplete, 3000);
  }

  return (
    <motion.div 
      className="w-full h-full bg-[#110515] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute top-8 left-0 right-0 flex justify-center z-10 pointer-events-none">
        <div className="bg-black/50 border border-pink-500/30 px-6 py-3 rounded-full backdrop-blur-md">
          <div className="text-white text-xl md:text-2xl font-sans">
            {found.length < totalHearts ? "Click all the Hearts 💕" : "Gift Unlocked! 🎁"}
          </div>
          <div className="text-pink-400 text-center font-bold mt-1 text-lg">
            ❤️ {found.length} / {totalHearts}
          </div>
        </div>
      </div>

      {hearts.map(heart => (
        <AnimatePresence key={heart.id}>
          {!found.includes(heart.id) && (
            <motion.div
              onClick={() => handleFind(heart.id)}
              className="absolute cursor-pointer text-pink-500 text-glow-pink"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                fontSize: `${heart.size}rem`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.6 + Math.random() * 0.4, 
                scale: 1,
                y: [0, -10, 0]
              }}
              exit={{ scale: 3, opacity: 0 }}
              transition={{
                y: { repeat: Infinity, duration: 2, delay: heart.delay },
                scale: { type: 'spring' }
              }}
            >
              ❤️
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {found.length === totalHearts && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-6xl md:text-8xl">🎁</div>
          {Array.from({ length: 30 }).map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-4 h-4 bg-pink-500 rounded-full"
               initial={{ x: 0, y: 0, scale: 1 }}
               animate={{ 
                 x: (Math.random() - 0.5) * 500, 
                 y: (Math.random() - 0.5) * 500,
                 scale: 0,
                 opacity: 0
               }}
               transition={{ duration: 1, ease: "easeOut" }}
             />
          ))}
        </motion.div>
      )}

    </motion.div>
  );
}