import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Confetti } from '../components/Confetti';
import { StarField } from '../components/StarField';

export function Scene8Finale({ onComplete, onRestart }: { onComplete: () => void, onRestart: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      { delay: 1000, step: 1 }, // candles light up
      { delay: 3000, step: 2 }, // happy birthday types
      { delay: 6000, step: 3 }, // Divya appears
      { delay: 9000, step: 4 }, // Photos arrange
      { delay: 12000, step: 5 }, // Final message & Buttons
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
        className="relative z-20 mb-8"
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
            className="mt-8 flex flex-col items-center"
          >
            <div className="text-xl md:text-2xl text-pink-200/80 font-sans max-w-xl px-4 text-center mb-8">
              May your smile always shine brighter<br/>than every star in this universe. 🎆
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={onRestart}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white backdrop-blur-md transition-all flex items-center gap-2"
              >
                <span>🔄</span> Replay Mission
              </button>
              <button 
                onClick={onRestart}
                className="px-6 py-3 bg-pink-500/20 hover:bg-pink-500/40 border border-pink-500/50 rounded-full text-white backdrop-blur-md transition-all flex items-center gap-2"
              >
                <span>🚀</span> Launch Again
              </button>
            </div>
          </motion.div>
        )}
      </div>

    </motion.div>
  );
}