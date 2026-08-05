import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene2NASA({ onComplete, playSound }: { onComplete: () => void, playSound: (s: any) => void }) {
  const [countdown, setCountdown] = useState(5);
  const [ignited, setIgnited] = useState(false);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      playSound('beep');
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    } else if (countdown === 0 && !ignited) {
      setIgnited(true);
      playSound('launch');
      setTimeout(() => setLaunched(true), 1500);
    }
  }, [countdown, ignited, playSound]);

  useEffect(() => {
    if (launched) {
      const t = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [launched, onComplete]);

  return (
    <motion.div 
      className="w-full h-full bg-[#0a0e2e] flex flex-col items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Mission Card */}
      <motion.div 
        className="absolute top-8 left-8 glass-panel box-glow-cyan p-6 text-cyan-400 font-mono hidden md:block"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4 border-b border-cyan-500/30 pb-2">MISSION: Operation Birthday</h2>
        <p>Commander: YOU</p>
        <p>Destination: DIVYA</p>
        <p>Status: <span className="text-green-400 animate-pulse">🟢 READY</span></p>
      </motion.div>

      {/* Earth Radar */}
      <div className="absolute right-8 top-8 w-32 h-32 rounded-full border-2 border-cyan-500/30 flex items-center justify-center hidden md:flex">
        <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
        <div className="w-16 h-16 bg-blue-500/20 rounded-full box-glow-cyan" />
      </div>

      {/* Countdown */}
      {!launched && (
        <motion.div 
          key={countdown}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="text-8xl md:text-[15rem] font-bold text-white mb-12 text-glow-cyan z-10 font-mono"
        >
          {countdown > 0 ? countdown : "IGNITION"}
        </motion.div>
      )}

      {/* Rocket Container */}
      <motion.div 
        className={`relative z-20 ${ignited ? 'animate-[shake_0.1s_infinite]' : ''}`}
        animate={launched ? { y: -1000, scale: 0.8 } : { y: 0 }}
        transition={launched ? { duration: 1.5, ease: "easeIn" } : undefined}
      >
        <svg width="120" height="200" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 10 L100 80 L100 160 L60 180 L20 160 L20 80 Z" fill="#e2e8f0" />
          <path d="M60 10 L100 80 L60 80 Z" fill="#cbd5e1" />
          <path d="M20 160 L0 190 L30 170 Z" fill="#94a3b8" />
          <path d="M100 160 L120 190 L90 170 Z" fill="#94a3b8" />
          <circle cx="60" cy="90" r="15" fill="#1e293b" />
          <circle cx="60" cy="90" r="12" fill="#38bdf8" />
          
          {/* Flames */}
          {ignited && (
            <g className="animate-pulse">
              <path d="M40 180 Q60 250 80 180 Q60 220 40 180" fill="#f97316" />
              <path d="M45 180 Q60 230 75 180 Q60 210 45 180" fill="#fbbf24" />
              <path d="M50 180 Q60 210 70 180 Q60 195 50 180" fill="#fef08a" />
            </g>
          )}
        </svg>
      </motion.div>

      {/* Smoke Particles */}
      {ignited && (
        <div className="absolute bottom-0 w-full h-1/3 overflow-hidden pointer-events-none z-10 flex justify-center items-end">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: [1, 2, 3] }}
            transition={{ duration: 2 }}
            className="w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] blur-2xl"
          />
        </div>
      )}

      {/* Flash */}
      <AnimatePresence>
        {launched && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white z-50"
            transition={{ delay: 1, duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Ensure AnimatePresence is imported
import { AnimatePresence } from 'framer-motion';