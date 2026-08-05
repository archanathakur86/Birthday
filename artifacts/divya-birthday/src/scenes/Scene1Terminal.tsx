import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTypingEffect } from '../hooks/useTypingEffect';

export function Scene1Terminal({ onComplete, playSound }: { onComplete: () => void, playSound: (s: any) => void }) {
  const [step, setStep] = useState(0);
  const [glitch, setGlitch] = useState(false);
  
  const text1 = "> Initializing...\n> Connecting to Global Birthday Database...\n> Scanning Earth...\n> Searching 8,200,000,000 Humans...";
  
  const { displayedText, isComplete: isComplete1 } = useTypingEffect(text1, 30, 500, () => {
    setStep(1);
  });

  const [fakeNames, setFakeNames] = useState("NOT Found.");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === 1) {
      const names = ["Smith, J.", "Doe, A.", "Garcia, M.", "Wang, C.", "Kim, Y."];
      let i = 0;
      const id = setInterval(() => {
        setFakeNames(`${names[i % names.length]} - NOT Found.`);
        playSound('type');
        setProgress(p => Math.min(p + Math.random() * 5, 99));
        i++;
      }, 100);
      
      const timeout = setTimeout(() => {
        clearInterval(id);
        setProgress(100);
        setStep(2);
      }, 3000);
      
      return () => {
        clearInterval(id);
        clearTimeout(timeout);
      };
    }
  }, [step, playSound]);

  useEffect(() => {
    if (step === 2) {
      playSound('beep');
      const t = setTimeout(() => {
        setStep(3);
        playSound('beep');
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [step, playSound]);

  useEffect(() => {
    if (step === 3) {
      playSound('alarm');
      setGlitch(true);
      const t = setTimeout(() => {
        onComplete();
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [step, onComplete, playSound]);

  const progressBar = "█".repeat(Math.floor(progress / 5)) + "░".repeat(20 - Math.floor(progress / 5));

  return (
    <motion.div 
      className={`w-full h-full bg-black text-[#39ff14] font-mono p-8 md:p-16 flex flex-col relative ${glitch ? 'animate-[shake_0.5s_infinite]' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEElEQVQImWNgYGBgYGBgAAABQAAJ6Q20wQAAAABJRU5ErkJggg==')] opacity-10" />
      <div className="absolute inset-0 pointer-events-none animate-[scanline_8s_linear_infinite] bg-gradient-to-b from-transparent via-[rgba(57,255,20,0.1)] to-transparent h-[10vh]" />
      
      <div className={`whitespace-pre-wrap text-lg md:text-2xl ${glitch ? 'animate-[glitch_0.3s_infinite]' : ''}`}>
        {displayedText}
        {(!isComplete1 && Math.floor(Date.now() / 500) % 2 === 0) ? <span className="animate-pulse">_</span> : ''}
      </div>

      {step >= 1 && step < 3 && (
        <div className="mt-4 text-lg md:text-2xl opacity-70">
          <div>{fakeNames}</div>
          <div className="mt-2 text-glow-green">[{progressBar}] {Math.floor(progress)}%</div>
        </div>
      )}

      {step >= 2 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-xl md:text-3xl font-bold text-white text-glow-green"
        >
          Match Found.
        </motion.div>
      )}

      {step >= 3 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-12 border-2 border-[#39ff14] p-6 glass-panel"
        >
          <div className="text-2xl md:text-4xl mb-4">Name: <span className="text-white text-glow-green">DIVYA</span></div>
          <div className="text-xl md:text-3xl mb-4">Birthday Status: <span className="text-[#ff69b4] text-glow-pink">TODAY 🎉</span></div>
          <div className="text-xl md:text-3xl">Importance Level: ∞</div>
          
          <div className="mt-12 text-center text-3xl md:text-5xl text-red-500 font-bold text-glow-red animate-pulse">
            ⚠️ SPECIAL PERSON DETECTED ⚠️
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
