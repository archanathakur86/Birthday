import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';

export function Scene6Hearts({ onComplete, playSound }: { onComplete: () => void, playSound: (s: any) => void }) {
  const [found, setFound] = useState<number[]>([]);
  const [revealedWishes, setRevealedWishes] = useState<number[]>([]);
  const [phase, setPhase] = useState<'hunt' | 'wish'>('hunt');
  const isMobile = useIsMobile();
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

  const wishes = useMemo(() => ([
    { id: 0, text: 'For endless reasons to smile', x: '18%', y: '36%' },
    { id: 1, text: 'For soft days and loud laughter', x: '52%', y: '22%' },
    { id: 2, text: 'For every dream that finds her', x: '68%', y: '58%' },
  ]), []);

  const handleFind = (id: number) => {
    if (!found.includes(id)) {
      setFound([...found, id]);
      playSound('sparkle');
    }
  };

  useEffect(() => {
    if (found.length === totalHearts && phase === 'hunt') {
      setPhase('wish');
      setRevealedWishes([]);
    }
  }, [found.length, phase]);

  useEffect(() => {
    if (phase !== 'wish' || revealedWishes.length !== wishes.length) return;
    const t = setTimeout(onComplete, 2500);
    return () => clearTimeout(t);
  }, [phase, revealedWishes.length, wishes.length, onComplete]);

  const handleWish = (id: number) => {
    if (revealedWishes.includes(id)) return;
    setRevealedWishes(prev => [...prev, id]);
    playSound('sparkle');
  };

  return (
    <motion.div 
      className="w-full h-full bg-[#110515] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute top-4 md:top-8 left-0 right-0 flex justify-center z-10 pointer-events-none px-4">
        <div className="bg-black/50 border border-pink-500/30 px-4 md:px-6 py-2.5 md:py-3 rounded-full backdrop-blur-md max-w-[92vw]">
          <div className="text-white text-base sm:text-lg md:text-2xl font-sans text-center">
            {phase === 'hunt' ? 'Click all the Hearts 💕' : 'Make three little wishes ✨'}
          </div>
          <div className="text-pink-400 text-center font-bold mt-1 text-sm sm:text-base md:text-lg">
            {phase === 'hunt' ? `❤️ ${found.length} / ${totalHearts}` : `✨ ${revealedWishes.length} / ${wishes.length}`}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {phase === 'hunt' && hearts.map(heart => (
          !found.includes(heart.id) && (
            <motion.div
              key={heart.id}
              onClick={() => handleFind(heart.id)}
              className="absolute cursor-pointer text-pink-500 text-glow-pink"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                fontSize: `${isMobile ? heart.size * 0.75 : heart.size}rem`,
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
          )
        ))}
      </AnimatePresence>

      {phase === 'wish' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,105,180,0.18)_0%,transparent_70%)] pointer-events-none" />
          {isMobile ? (
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 px-4 pt-20 pb-8">
              <motion.div
                className="text-5xl sm:text-6xl"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                ✨
              </motion.div>

              <div className="flex w-full max-w-[min(92vw,24rem)] flex-col gap-3">
                {wishes.map((wish, index) => {
                  const revealed = revealedWishes.includes(wish.id);
                  return (
                    <motion.button
                      key={wish.id}
                      type="button"
                      onClick={() => handleWish(wish.id)}
                      className="w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-left shadow-xl backdrop-blur-md"
                      initial={{ opacity: 0, scale: 0.7, rotate: index % 2 === 0 ? -3 : 3 }}
                      animate={{
                        opacity: 1,
                        scale: revealed ? 1.03 : 1,
                        y: [0, -4, 0],
                      }}
                      transition={{
                        opacity: { duration: 0.6, delay: 0.2 + index * 0.2 },
                        scale: { type: 'spring', stiffness: 180, damping: 16 },
                        y: { duration: 3.5 + index, repeat: Infinity, ease: 'easeInOut' },
                      }}
                    >
                      <div className="text-[10px] uppercase tracking-[0.2em] text-pink-200/70 mb-1 font-sans">
                        Wish {index + 1}
                      </div>
                      <div className={`text-sm leading-tight ${revealed ? 'text-white' : 'text-white/70'} font-script`}>
                        {revealed ? wish.text : 'Tap to reveal a wish'}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="relative z-10 w-full h-full">
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                ✨
              </motion.div>

              {wishes.map((wish, index) => {
                const revealed = revealedWishes.includes(wish.id);
                return (
                  <motion.button
                    key={wish.id}
                    type="button"
                    onClick={() => handleWish(wish.id)}
                    className="absolute max-w-[220px] rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-left shadow-xl backdrop-blur-md"
                    style={{ left: wish.x, top: wish.y }}
                    initial={{ opacity: 0, scale: 0.7, rotate: index % 2 === 0 ? -6 : 6 }}
                    animate={{
                      opacity: 1,
                      scale: revealed ? 1.06 : 1,
                      rotate: [index % 2 === 0 ? -6 : 6, index % 2 === 0 ? -3 : 3, index % 2 === 0 ? -6 : 6],
                      y: [0, -8, 0],
                    }}
                    transition={{
                      opacity: { duration: 0.6, delay: 0.2 + index * 0.2 },
                      scale: { type: 'spring', stiffness: 180, damping: 16 },
                      rotate: { duration: 4 + index, repeat: Infinity, ease: 'easeInOut' },
                      y: { duration: 3.5 + index, repeat: Infinity, ease: 'easeInOut' },
                    }}
                  >
                    <div className="text-[11px] uppercase tracking-[0.2em] text-pink-200/70 mb-1 font-sans">
                      Wish {index + 1}
                    </div>
                    <div className={`text-sm md:text-base leading-tight ${revealed ? 'text-white' : 'text-white/70'} font-script`}>
                      {revealed ? wish.text : 'Tap to reveal a wish'}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </motion.div>
      )}

    </motion.div>
  );
}
