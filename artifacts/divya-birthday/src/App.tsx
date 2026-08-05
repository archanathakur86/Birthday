import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

import { useSoundEngine } from './hooks/useSoundEngine';
import { SparklingCursor } from './components/SparklingCursor';

import { Scene1Terminal } from './scenes/Scene1Terminal';
import { Scene2NASA } from './scenes/Scene2NASA';
import { Scene3Space } from './scenes/Scene3Space';
import { Scene4Magical } from './scenes/Scene4Magical';
import { Scene5Photos } from './scenes/Scene5Photos';
import { Scene6Hearts } from './scenes/Scene6Hearts';
import { Scene7Gift } from './scenes/Scene7Gift';
import { Scene8Finale } from './scenes/Scene8Finale';
import { SceneSecret } from './scenes/SceneSecret';

function App() {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState(0); 
  
  const { playSound, stopAmbient, toggleMute, isMuted, initCtx } = useSoundEngine();

  const handleStart = () => {
    initCtx();
    setStarted(true);
    setScene(1);
  };

  const nextScene = useCallback(() => {
    stopAmbient();
    setScene(s => s + 1);
  }, [stopAmbient]);

  const restart = useCallback(() => {
    stopAmbient();
    setScene(1);
  }, [stopAmbient]);

  return (
    <div className="w-full h-[100dvh] bg-black text-white overflow-hidden relative selection:bg-pink-500/30 font-sans">
      <SparklingCursor />

      {started && (
        <button 
          onClick={toggleMute}
          className="absolute top-4 right-4 z-[9999] p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all border border-white/10"
        >
          {isMuted ? <VolumeX size={20} className="text-white/50" /> : <Volume2 size={20} className="text-white" />}
        </button>
      )}

      {started && scene >= 1 && scene <= 8 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i + 1 === scene ? 'bg-pink-500 scale-125 box-glow-pink' : 
                i + 1 < scene ? 'bg-pink-500/50' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!started && (
          <motion.div 
            key="start"
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#05071a]"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-script text-white text-glow-pink mb-4">A Special Mission</h1>
              <p className="text-white/50 font-mono tracking-widest text-sm">HEADPHONES RECOMMENDED</p>
            </div>
            <button 
              onClick={handleStart}
              className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-none border border-cyan-500/50 hover:border-cyan-400 transition-colors"
            >
              <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative font-mono text-cyan-400 tracking-widest text-lg font-bold group-hover:text-glow-cyan">INITIATE LAUNCH</span>
            </button>
          </motion.div>
        )}

        {scene === 1 && <Scene1Terminal key="s1" onComplete={nextScene} playSound={playSound} />}
        {scene === 2 && <Scene2NASA key="s2" onComplete={nextScene} playSound={playSound} />}
        {scene === 3 && <Scene3Space key="s3" onComplete={nextScene} playSound={playSound} />}
        {scene === 4 && <Scene4Magical key="s4" onComplete={nextScene} playSound={playSound} />}
        {scene === 5 && <Scene5Photos key="s5" onComplete={nextScene} playSound={playSound} />}
        {scene === 6 && <Scene6Hearts key="s6" onComplete={nextScene} playSound={playSound} />}
        {scene === 7 && <Scene7Gift key="s7" onComplete={nextScene} playSound={playSound} />}
        {scene === 8 && <Scene8Finale key="s8" onComplete={nextScene} onRestart={restart} />}
        {scene === 9 && <SceneSecret key="s9" playSound={playSound} onRestart={restart} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
