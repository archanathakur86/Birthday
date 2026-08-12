import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTypingEffect } from '../hooks/useTypingEffect';

export function Scene10Letter({ onRestart }: { onRestart: () => void }) {
  const letter = `You wear your face the way rare things wear their rarity - unassuming, as though beauty were a fact you had simply neglected to mention. But it is your laughter that betrays you entirely; it does not pause to request permission before entering a room - it arrives first, announces itself unapologetically, and departs leaving the air warmer than it found it. You are no still water. You are the sort of noise that makes silence realise, belatedly, what it had been missing all along.

Were I tasked with placing you somewhere in this world, I should not seat you among the stars - admired, yes, but only ever from a distance, untouchable and remote. I would place you instead among festival lights - strung carelessly across some forgotten street, too luminous to be overlooked, turning an otherwise ordinary evening into something people carry with them for years. That is what you do to a room merely by entering it.

And know this - should life ever grow demanding, should the days grow crowded and the hours scarce, my presence shall not waver for it. Busyness may claim my time, but never my constancy. Whatever the circumstance, however stretched the days may become - I remain, unmoved, exactly where you need me to be.`;

  const { displayedText, isComplete } = useTypingEffect(letter, 14, 900);

  useEffect(() => {
    document.body.style.cursor = 'default';
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden flex items-center justify-center bg-[#120f0a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,224,160,0.16)_0%,transparent_55%),linear-gradient(135deg,rgba(255,248,230,0.07)_0%,rgba(0,0,0,0)_45%,rgba(0,0,0,0.14)_100%)]" />
      <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 flex w-full max-w-[94vw] md:max-w-[980px] flex-col items-center px-3 sm:px-4">
        <motion.div
          className="relative w-full max-h-[88vh] overflow-hidden rounded-[18px] border border-[#7f5f2f]/40 bg-[#f4e3bf] shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
          initial={{ scale: 0.92, rotate: -1.5, y: 20 }}
          animate={{ scale: 1, rotate: 0, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_62%)] pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(125,92,40,0.18) 0.7px, transparent 0.7px)', backgroundSize: '18px 18px' }} />

          <div className="relative grid h-full gap-0 grid-cols-1 md:grid-cols-[1.15fr_0.85fr]">
            <div className="relative p-5 sm:p-6 md:p-10">
              <div className="mb-6 flex items-center justify-between text-[#7f5f2f]/70">
                <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em]">An old letter</div>
                <div className="h-px flex-1 mx-3 sm:mx-4 bg-[#7f5f2f]/20" />
                <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.22em] sm:tracking-[0.25em]">kept safe</div>
              </div>

              <div className="max-h-[54vh] sm:max-h-[58vh] md:max-h-[62vh] overflow-y-auto pr-1 sm:pr-2">
                <div className="whitespace-pre-wrap text-[0.95rem] sm:text-[1rem] md:text-[1.18rem] leading-7 sm:leading-8 md:leading-9 text-[#4c3418] font-serif">
                  {displayedText}
                  {!isComplete && <span className="ml-0.5 animate-pulse">_</span>}
                </div>
              </div>
            </div>

            <div className="relative hidden md:flex items-center justify-center border-t border-[#7f5f2f]/20 md:border-t-0 md:border-l">
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_45%,rgba(125,92,40,0.06)_100%)]" />
              <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-10 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="h-40 w-40 rounded-full border-[10px] border-[#a36d3f]/30 bg-[radial-gradient(circle_at_center,#f7e8c6_0%,#e0c38e_65%,#b67a41_100%)] shadow-[0_0_40px_rgba(182,122,65,0.25)] flex items-center justify-center"
                >
                  <div className="text-4xl">✉️</div>
                </motion.div>

                <div className="max-w-xs text-sm md:text-base leading-7 text-[#5b4223]">
                  This feels like a note kept for the right moment.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 12 }}
          transition={{ duration: 0.8 }}
          className="mt-6 flex justify-center"
        >
          <button
            onClick={onRestart}
            className="rounded-full border border-[#7f5f2f]/25 bg-white/35 px-6 py-3 text-[#5b4223] backdrop-blur-md transition-all hover:bg-white/55"
          >
            Restart Mission
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
