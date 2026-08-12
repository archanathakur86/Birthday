import { useState } from 'react';
import { motion } from 'framer-motion';
import { Confetti } from '../components/Confetti';

export function Scene7Gift({ onComplete, playSound }: { onComplete: () => void, playSound: (s: any) => void }) {
  const [clicks, setClicks] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (open) return;
    const newClicks = clicks + 1;
    setClicks(newClicks);
    playSound('beep');

    if (newClicks >= 3) {
      setOpen(true);
      playSound('fireworks');
      setTimeout(() => {
        onComplete();
      }, 5000);
    }
  };

  return (
    <motion.div 
      className="w-full h-full bg-[#050010] relative flex flex-col items-center justify-center overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(150,0,255,0.2)_0%,transparent_70%)] pointer-events-none" />

      {open && <Confetti />}

      <motion.div
        className="relative z-10 cursor-pointer flex flex-col items-center justify-center"
        onClick={handleClick}
        animate={
          open 
            ? { scale: 0, opacity: 0, rotate: 180 } 
            : { 
                scale: 1 + clicks * 0.1, 
                rotate: clicks === 1 ? [-5, 5, -5, 0] : clicks === 2 ? [-10, 10, -15, 15, 0] : 0,
                filter: `brightness(${1 + clicks * 0.5}) drop-shadow(0 0 ${clicks * 20}px rgba(255,105,180,${clicks * 0.3}))`
              }
        }
        transition={{ duration: open ? 1 : 0.2 }}
      >
        <svg className="w-[min(68vw,200px)] h-[min(68vw,200px)]" viewBox="0 0 200 200" fill="none">
          {/* Box Bottom */}
          <path d="M40 90 L160 90 L150 180 L50 180 Z" fill="#d8b4e2" />
          <path d="M100 90 L160 90 L150 180 L100 180 Z" fill="#c490d1" />
          {/* Ribbon Bottom */}
          <rect x="90" y="90" width="20" height="90" fill="#ff1493" />
          {/* Lid */}
          <path d="M30 60 L170 60 L165 95 L35 95 Z" fill="#e8ccea" />
          <path d="M100 60 L170 60 L165 95 L100 95 Z" fill="#d8b4e2" />
          {/* Ribbon Top */}
          <rect x="90" y="60" width="20" height="35" fill="#ff1493" />
          {/* Bow */}
          <path d="M100 60 Q 60 20 80 40 Q 100 60 100 60" fill="#ff69b4" />
          <path d="M100 60 Q 140 20 120 40 Q 100 60 100 60" fill="#ff69b4" />
          <circle cx="100" cy="60" r="10" fill="#ff1493" />
        </svg>
        
        {!open && (
          <motion.div 
            className="text-white/60 text-center mt-5 sm:mt-8 text-sm sm:text-base md:text-xl tracking-widest uppercase font-sans animate-pulse"
          >
            Click Me
          </motion.div>
        )}
      </motion.div>

    </motion.div>
  );
}
