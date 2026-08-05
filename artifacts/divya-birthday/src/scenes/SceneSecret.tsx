import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypingEffect } from '../hooks/useTypingEffect';

export function SceneSecret({ playSound, onRestart }: { playSound: (s: any) => void, onRestart: () => void }) {
  const [step, setStep] = useState(0);

  const text1 = "> Closing Mission...\nERROR: Unexpected File Remaining...";
  const { displayedText: t1, isComplete: c1 } = useTypingEffect(text1, 50, 2000, () => setStep(1));

  useEffect(() => {
    if (step === 1) playSound('alarm');
  }, [step, playSound]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    playSound('ambient');
  };

  return (
    <motion.div 
      className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {!open ? (
        <div className="text-[#39ff14] font-mono p-8 w-full max-w-3xl flex flex-col">
          <div className="whitespace-pre-wrap text-xl md:text-2xl mb-8">
            {t1}
            {(!c1 && Math.floor(Date.now() / 500) % 2 === 0) ? <span className="animate-pulse">_</span> : ''}
          </div>
          
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="self-center mt-12 cursor-pointer flex flex-col items-center"
                onClick={handleOpen}
              >
                <div className="text-6xl text-blue-400 text-glow-cyan mb-4 animate-pulse">📁</div>
                <div className="text-xl border border-blue-500 text-blue-400 px-4 py-2 hover:bg-blue-500/20">OPEN ME</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#2a0845] via-[#6441A5] to-[#fbc2eb] flex flex-col items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          {/* Radiating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full opacity-50"
                style={{
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: (Math.random() - 0.5) * window.innerWidth * 2,
                  y: (Math.random() - 0.5) * window.innerHeight * 2,
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 2, delay: 1, type: "spring", damping: 20 }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 p-1 shadow-[0_0_50px_rgba(255,105,180,0.5)] z-10 flex items-center justify-center"
          >
            <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_100%)]" />
              <div className="text-4xl md:text-5xl font-script text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                Divya
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 4 }}
            className="mt-12 text-center text-xl md:text-3xl font-sans text-white/90 leading-relaxed max-w-2xl z-10 px-4"
          >
            Among billions of people searched...
            <br/><br/>
            <span className="font-script text-3xl md:text-5xl text-pink-200">only one was worth launching this mission for.</span>
            <br/><br/>
            <span className="text-2xl md:text-4xl font-bold tracking-widest uppercase">Happy Birthday. ❤️</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 10 }}
            onClick={onRestart}
            className="absolute bottom-8 z-50 text-white/50 hover:text-white border border-white/20 px-6 py-2 rounded-full backdrop-blur-sm transition-all text-sm uppercase tracking-wider"
          >
            Restart Mission
          </motion.button>

        </motion.div>
      )}
    </motion.div>
  );
}