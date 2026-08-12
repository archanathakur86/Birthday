import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export function Scene4Magical({ onComplete, playSound }: { onComplete: () => void, playSound: (s: any) => void }) {
  useEffect(() => {
    playSound('ambient');
    const t = setTimeout(() => {
      onComplete();
    }, 7000);
    return () => clearTimeout(t);
  }, [onComplete, playSound]);

  const warmNotes = useMemo(() => [
    { text: 'Made to brighten your day', x: '12%', y: '18%', delay: 0.2, rotate: -8 },
    { text: 'Smile, it suits you', x: '68%', y: '16%', delay: 0.8, rotate: 6 },
    { text: 'A little magic follows you', x: '16%', y: '72%', delay: 1.2, rotate: -5 },
    { text: 'Main character energy', x: '66%', y: '70%', delay: 1.7, rotate: 7 },
  ], []);

  return (
    <motion.div 
      className="w-full h-full bg-gradient-to-b from-[#1a0b2e] to-[#4a154b] relative overflow-hidden flex items-center justify-center text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: ['#fff', '#ffb6c1', '#ffd700'][Math.floor(Math.random() * 3)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px currentColor'
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Balloons */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`balloon-${i}`}
          className="absolute bottom-[-100px]"
          style={{
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: '-120vh', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10
          }}
        >
          <svg width="40" height="60" viewBox="0 0 40 60">
            <path d="M20 0 C 40 0, 40 30, 20 40 C 0 30, 0 0, 20 0 Z" fill={['#ff69b4', '#00ffff', '#bf5fff'][i%3]} opacity="0.8" />
            <path d="M20 40 Q 15 50 20 60" fill="transparent" stroke="#fff" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}

      {warmNotes.map((note, i) => (
        <motion.div
          key={note.text}
          className={`absolute z-10 max-w-[150px] md:max-w-[190px] rounded-full border border-white/20 bg-black/20 px-3 md:px-4 py-2 text-white/90 shadow-lg backdrop-blur-md ${i >= 2 ? 'hidden md:block' : ''}`}
          style={{ left: note.x, top: note.y }}
          initial={{ opacity: 0, scale: 0.75, rotate: note.rotate }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: [note.rotate, note.rotate + 4, note.rotate - 4, note.rotate],
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: note.delay },
            scale: { type: 'spring', stiffness: 180, damping: 14, delay: note.delay },
            rotate: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div className="text-xs md:text-sm font-script leading-tight">
            {note.text}
          </div>
        </motion.div>
      ))}

      <div className="z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-2xl md:text-5xl font-script text-white text-glow-pink mb-8"
        >
          ✨ Mission Successful.
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 3 }}
          className="text-xl md:text-3xl font-sans text-pink-200"
        >
          The Most Precious Person Has Been Reached.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 5 }}
          className="mt-16 text-lg text-white/50 animate-pulse tracking-widest uppercase"
        >
          Preparing Surprise...
        </motion.div>
      </div>

    </motion.div>
  );
}
