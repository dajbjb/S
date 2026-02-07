import React, { useState, useEffect, useRef } from 'react';
// Fix: In React 18, createRoot is exported from 'react-dom/client' instead of 'react-dom'
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Sparkles, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

const SmokeEffect = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="smoke-particle"
        style={{
          left: `${Math.random() * 100}%`,
          width: `${150 + Math.random() * 200}px`,
          height: `${150 + Math.random() * 200}px`,
          animation: `smoke ${4 + Math.random() * 5}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ))}
  </div>
);

const FloatingHearts = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
        animate={{ y: '-10vh', opacity: [0, 0.4, 0], rotate: 360 }}
        transition={{ duration: 12 + Math.random() * 10, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
        className="absolute"
      >
        <Heart fill="#e11d48" className="text-rose-600 opacity-20 w-8 h-8" />
      </motion.div>
    ))}
  </div>
);

const App = () => {
  const [stage, setStage] = useState('cover'); // cover, opening, invitation, celebration
  const [isMuted, setIsMuted] = useState(true);
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3');
    audioRef.current.loop = true;
  }, []);

  const toggleAudio = () => {
    if (isMuted) audioRef.current.play();
    else audioRef.current.pause();
    setIsMuted(!isMuted);
  };

  const handleOpenLetter = () => {
    setStage('opening');
    setTimeout(() => setStage('invitation'), 4000);
  };

  const handleYes = () => {
    setStage('celebration');
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff0000', '#ff69b4', '#ffffff'] });
    
    // Continuous confetti
    setInterval(() => {
      confetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff0000', '#ff69b4'] });
      confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff0000', '#ff69b4'] });
    }, 3000);
  };

  const handleNoHover = () => {
    if (noCount < 6) {
      const x = (Math.random() - 0.5) * 300;
      const y = (Math.random() - 0.5) * 300;
      setNoButtonPos({ x, y });
      setNoCount(prev => prev + 1);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden">
      <FloatingHearts />
      
      <button onClick={toggleAudio} className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6 text-rose-400" />}
      </button>

      <AnimatePresence mode="wait">
        {stage === 'cover' && (
          <motion.div key="cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)' }} className="z-10 text-center px-4">
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="mb-8 inline-block p-10 bg-rose-900/20 rounded-full border border-rose-500/30 shadow-[0_0_40px_rgba(225,29,72,0.2)]">
              <Mail className="w-20 h-20 text-rose-500" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-serif-luxury mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-100 via-rose-400 to-rose-100">
              יש לך מכתב סודי
            </h1>
            <p className="text-gray-400 tracking-widest uppercase text-sm mb-10">Limited Edition 2026</p>
            <button onClick={handleOpenLetter} className="px-10 py-4 bg-rose-600 rounded-full text-xl font-bold hover:bg-rose-500 transition-all shadow-lg shadow-rose-600/30">
              פתחי אותי ❤️
            </button>
          </motion.div>
        )}

        {stage === 'opening' && (
          <motion.div key="opening" className="fixed inset-0 bg-black flex flex-col items-center justify-center z-40">
            <SmokeEffect />
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="text-center">
              <motion.div animate={{ rotateY: 360 }} transition={{ duration: 2, repeat: 1 }} className="text-8xl mb-6">💌</motion.div>
              <p className="font-romantic text-3xl text-rose-200">מכין לך משהו מיוחד...</p>
            </motion.div>
          </motion.div>
        )}

        {stage === 'invitation' && (
          <motion.div key="invitation" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="z-10 w-full max-w-xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-16 text-center mx-4 shadow-2xl relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-rose-600 p-4 rounded-full">
              <Heart className="w-8 h-8 fill-white" />
            </div>
            <h2 className="text-2xl font-serif-luxury text-rose-200 mb-6 italic">אהובתי היקרה,</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">האם תסכימי להיות הוולנטיין שלי ב-2026?</h3>
            <p className="text-gray-400 mb-12 italic">״אני אוהב אותך יותר בכל יום שחולף״</p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center min-h-[60px]">
              <motion.button whileHover={{ scale: 1.1 }} onClick={handleYes} className="px-12 py-4 bg-rose-600 rounded-full text-xl font-bold shadow-xl shadow-rose-600/40 w-full md:w-auto">
                כן! 😍
              </motion.button>
              {noCount < 6 && (
                <motion.button animate={{ x: noButtonPos.x, y: noButtonPos.y }} onMouseEnter={handleNoHover} className="px-10 py-4 bg-white/10 rounded-full text-lg w-full md:w-auto">
                  לא... 🙊
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {stage === 'celebration' && (
          <motion.div key="celebration" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-[#0a0005] flex flex-col items-center justify-center text-center p-6">
            <SmokeEffect />
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 100 }} className="mb-6">
              <Heart className="w-32 h-32 text-rose-600 fill-rose-600 drop-shadow-[0_0_20px_rgba(225,29,72,0.8)]" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-serif-luxury font-bold mb-4 text-white">ידעתי שתגידי כן! 🥂</h1>
            <p className="font-romantic text-3xl text-rose-300 mb-10">אני אוהב אותך הכי בעולם.</p>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
              <p className="text-rose-400 uppercase tracking-tighter text-sm mb-2">Save The Date</p>
              <p className="text-3xl font-serif-luxury">14.02.2026</p>
              <div className="w-12 h-0.5 bg-rose-600 mx-auto my-4 opacity-50"></div>
              <p className="text-gray-400 text-sm">הערב שלנו הולך להיות בלתי נשכח</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const container = document.getElementById('root');
// Fix: Use createRoot from 'react-dom/client' and ensure container is not null
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
