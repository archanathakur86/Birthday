import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField } from '../components/StarField';
import { useIsMobile } from '../hooks/use-mobile';

export function Scene3Space({ onComplete, playSound }: { onComplete: () => void, playSound: (s: any) => void }) {
  const [speed, setSpeed] = useState(1);
  const [locked, setLocked] = useState(false);
  const [energy, setEnergy] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    playSound('ambient');
    const i = setInterval(() => {
      setSpeed(s => Math.min(s + 0.5, 15));
      setEnergy(e => {
        if (e >= 100) return 100;
        return e + 2;
      });
    }, 200);

    return () => clearInterval(i);
  }, [playSound]);

  useEffect(() => {
    if (energy >= 100 && !locked) {
      setLocked(true);
      playSound('beep');
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  }, [energy, locked, onComplete, playSound]);

  return (
    <motion.div 
      className="w-full h-full bg-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <StarField speed={speed} />

      {/* Planets drifting by */}
      <motion.div 
        className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-600 blur-[2px]"
        initial={{ x: '110vw', y: '20vh' }}
        animate={{ x: '-20vw', y: '40vh' }}
        transition={{ duration: 5, ease: "linear" }}
      />
      <motion.div 
        className="absolute w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-purple-800 to-indigo-500 blur-[4px] opacity-60"
        initial={{ x: '120vw', y: '60vh' }}
        animate={{ x: '-40vw', y: '80vh' }}
        transition={{ duration: 8, delay: 2, ease: "linear" }}
      >
        <div className="absolute inset-[-20px] rounded-full border-[10px] border-white/20 transform rotate-12" />
      </motion.div>

      {/* HUD */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 glass-panel p-3 sm:p-4 text-cyan-300 font-mono z-20 w-[min(84vw,18rem)] sm:w-auto text-xs sm:text-sm md:text-base">
        <div>Speed: {Math.floor(speed * 450)} km/s</div>
        <div>Sector: Deep Space</div>
        <div className="mt-2">
          Love Energy:
          <div className="w-full sm:w-48 h-3 sm:h-4 bg-black/50 border border-cyan-500/50 mt-1 relative overflow-hidden">
            <div className="h-full bg-pink-500" style={{ width: `${energy}%` }} />
          </div>
        </div>
      </div>

      {/* Rocket */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        animate={{ 
          y: [-10, 10, -10],
          x: [-5, 5, -5]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="w-12 h-20 sm:w-16 sm:h-28 md:w-[60px] md:h-[100px]" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 10 L100 80 L100 160 L60 180 L20 160 L20 80 Z" fill="#e2e8f0" />
          <path d="M60 10 L100 80 L60 80 Z" fill="#cbd5e1" />
          <path d="M20 160 L0 190 L30 170 Z" fill="#94a3b8" />
          <path d="M100 160 L120 190 L90 170 Z" fill="#94a3b8" />
          <circle cx="60" cy="90" r="15" fill="#1e293b" />
          <circle cx="60" cy="90" r="12" fill="#38bdf8" />
          <g className="animate-pulse">
            <path d="M40 180 Q60 280 80 180" fill="#38bdf8" />
            <path d="M45 180 Q60 240 75 180" fill="#fff" />
          </g>
        </svg>
      </motion.div>

      {/* Destination Locked & Portal */}
      <AnimatePresence>
        {locked && (
          <>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 text-2xl sm:text-4xl md:text-6xl text-pink-400 font-bold text-glow-pink z-40 text-center w-full px-4 leading-tight"
            >
              DESTINATION LOCKED
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: isMobile ? 9 : 15, rotate: 180 }}
              transition={{ duration: 3, ease: "easeIn" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-[16px] sm:border-[20px] border-pink-500/80 z-20 shadow-[0_0_100px_#ff69b4]"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,105,180,0.5) 100%)'
              }}
            />
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
