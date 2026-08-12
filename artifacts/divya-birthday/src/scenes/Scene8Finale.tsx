import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Confetti } from '../components/Confetti';
import { StarField } from '../components/StarField';

export function Scene8Finale({ onComplete, onRestart }: { onComplete: () => void, onRestart: () => void }) {
  const [step, setStep] = useState(0);
  const finaleNotes = useMemo(() => [
    { text: 'Keep glowing', x: '12%', y: '18%', delay: 0.2, rotate: -7 },
    { text: 'You light up rooms', x: '76%', y: '22%', delay: 0.8, rotate: 6 },
    { text: 'Soft joy, loud laughter', x: '14%', y: '72%', delay: 1.2, rotate: -5 },
    { text: 'Today belongs to your smile', x: '70%', y: '72%', delay: 1.6, rotate: 5 },
  ], []);

  useEffect(() => {
    const sequence = [
      { delay: 1000, step: 1 }, // candles light up
      { delay: 3000, step: 2 }, // happy birthday types
      { delay: 6000, step: 3 }, // Divya appears
      { delay: 9000, step: 4 }, // Photos arrange
      { delay: 10000, step: 5 }, // Final message & Buttons
    ];

    const timeouts = sequence.map(s => setTimeout(() => setStep(s.step), s.delay));
    
    // trigger secret ending 5s after finale is fully shown (at 17s total)
    const finalTimeout = setTimeout(onComplete, 17000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finalTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="w-full h-full bg-[#0a0014] relative overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2 } }}
    >
      <StarField speed={0.5} />
      {step >= 3 && <Confetti />}

      {/* Cake Container */}
      <motion.div 
        className="relative z-20 mb-4 md:mb-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg width="200" height="150" viewBox="0 0 200 150">
          <ellipse cx="100" cy="130" rx="90" ry="15" fill="#333" />
          <ellipse cx="100" cy="128" rx="85" ry="13" fill="#666" />
          <path d="M30 120 A 70 20 0 0 0 170 120 L 170 80 A 70 20 0 0 1 30 80 Z" fill="#ffb6c1" />
          <ellipse cx="100" cy="80" rx="70" ry="20" fill="#ffc0cb" />
          <path d="M50 80 A 50 15 0 0 0 150 80 L 150 50 A 50 15 0 0 1 50 50 Z" fill="#fff" />
          <ellipse cx="100" cy="50" rx="50" ry="15" fill="#f8f8f8" />
          <path d="M50 50 Q 60 70 70 50 Q 80 80 90 50 Q 100 65 110 50 Q 120 75 130 50 Q 140 60 150 50" fill="#fff" />
          
          {[65, 85, 100, 115, 135].map((x, i) => (
            <g key={i}>
              <rect x={x - 2} y="30" width="4" height="20" fill={['#ff0', '#0ff', '#f0f'][i%3]} />
              <rect x={x - 2} y="30" width="4" height="4" fill="#fff" opacity="0.5" />
              {step >= 1 && (
                <motion.path 
                  d={`M${x} 28 Q ${x-5} 20 ${x} 15 Q ${x+5} 20 ${x} 28`} 
                  fill="#ff9900"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 0.9, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                  style={{ transformOrigin: `${x}px 28px` }}
                />
              )}
            </g>
          ))}
        </svg>
      </motion.div>

      {step >= 5 && finaleNotes.map((note, i) => (
        <motion.div
          key={note.text}
          className="absolute z-30 max-w-[190px] rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/90 shadow-lg backdrop-blur-md"
          style={{ left: note.x, top: note.y }}
          initial={{ opacity: 0, scale: 0.7, rotate: note.rotate }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: [note.rotate, note.rotate + 4, note.rotate - 4, note.rotate],
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: note.delay },
            scale: { type: 'spring', stiffness: 170, damping: 15, delay: note.delay },
            rotate: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 4.5 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div className="text-xs md:text-sm font-script leading-tight text-center">
            {note.text}
          </div>
        </motion.div>
      ))}

      {/* Text Container */}
      <div className="z-20 text-center flex flex-col items-center">
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-script text-white text-glow-pink mb-2"
          >
            Happy Birthday
          </motion.div>
        )}
        
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 pb-4 text-glow-pink"
          >
            DIVYA ❤️
          </motion.div>
        )}

        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="mt-4 md:mt-5 flex flex-col items-center"
          >
            <div className="text-xl md:text-2xl text-pink-200/80 font-sans max-w-xl px-4 text-center mb-4 leading-tight">
              May your smile always shine brighter<br/>than every star in this universe. 🎆
            </div>
          </motion.div>
        )}
      </div>

    </motion.div>
  );
}
