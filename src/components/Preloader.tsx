import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Preloader = ({ onComplete }: { onComplete: () => void, key?: React.Key }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-[10000] bg-[#0c0c0c] flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 rounded-3xl bg-amber-500 flex items-center justify-center font-bold text-black text-5xl shadow-[0_0_50px_rgba(245,158,11,0.5)]"
          >
            C
          </motion.div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-display font-bold tracking-tighter">CUTLAW CONSTRUCTION</h1>
            <p className="text-amber-500/60 text-xs uppercase tracking-[0.4em] font-black">Industrial Excellence</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-amber-500"
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <span>Loading Assets</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
