import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Sparkles, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

const AppStage = {
  COVER: 'cover',
  OPENING: 'opening',
  INVITATION: 'invitation',
  CELEBRATION: 'celebration'
};

const SmokeEffect = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="smoke-particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${100 + Math.random() * 200}px`,
            height: `${100 + Math.random() * 200}px`,
            animation: `smoke ${3 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.5, 0],
            rotate: 360,
          }}
          transition={{
            duration: 10 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute"
        >
          <Heart fill="#e11d48" className="text-rose-600 opacity-20 w-8 h-8" />
        </motion.div>
      ))}
    </div>
  );
};

const ConfettiLoop = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ff69b4'],
        scalar: 0.7
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return null;
};

const App = () => {
  const [stage, setStage] = useState(AppStage.COVER);
  const [isMuted, setIsMuted] = useState(true);
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const audioRef = useRef(null);

  // Background Music (Dramatic & Romantic)
  useEffect(() => {
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3'); // Smooth piano/melodic
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleOpenLetter = () => {
    setStage(AppStage.OPENING);
    // Simulate dramatic movie sequence
    setTimeout(() => {
      setStage(AppStage.INVITATION);
    }, 4500); // 4.5 seconds of cinematic transition
  };

  const handleYes = () => {
    setStage(AppStage.CELEBRATION);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4', '#ffffff']
    });
  };

  const handleNoHover = () => {
    if (noCount >= 5) return;
    const newX = (Math.random() - 0.5) * 300;
    const newY = (Math.random() - 0.5) * 300;
    setNoButtonPos({ x: newX, y: newY });
    setNoCount(prev => prev + 1);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white selection:bg-rose-500/30">
      <FloatingHearts />
      
      {/* Audio Toggle */}
      <button 
        onClick={toggleAudio}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6 text-rose-400" />}
      </button>

      <AnimatePresence mode="wait">
        
        {/* STAGE 1: THE COVER */}
        {stage === AppStage.COVER && (
          <motion.div
            key="cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            className="z-10 flex flex-col items-center text-center px-4"
          >
            <div className="mb-8 relative">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="p-12 bg-gradient-to-br from-rose-900/40 to-black rounded-full border border-rose-500/30 shadow-[0_0_50px_rgba(225,29,72,0.2)]"
              >
                <Mail className="w-24 h-24 text-rose-500" strokeWidth={1} />
              </motion.div>
              <motion.div 
                className="absolute -top-4 -right-4"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="text-yellow-400 w-8 h-8" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif-luxury mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-400 to-rose-200">
              יש לך מכתב מיוחד
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light mb-12 tracking-widest uppercase">
              Valentine's 2026 Edition
            </p>

            <button
              onClick={handleOpenLetter}
              className="group relative px-10 py-4 overflow-hidden rounded-full transition-all duration-300 transform active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-800 transition-all duration-300 group-hover:scale-110"></div>
              <span className="relative text-xl font-medium tracking-widest flex items-center gap-2">
                פתחי את ליבי <Heart className="w-5 h-5 fill-current" />
              </span>
              <div className="absolute inset-0 border border-white/20 rounded-full"></div>
            </button>
          </motion.div>
        )}

        {/* STAGE 2: THE OPENING FILM */}
        {stage === AppStage.OPENING && (
          <motion.div
            key="opening"
            className="fixed inset-0 z-40 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SmokeEffect />
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.5, rotateY: 180, opacity: 0 }}
                animate={{ 
                  scale: [0.5, 1.2, 1], 
                  rotateY: [180, 0], 
                  opacity: 1,
                  y: [0, -20, 0]
                }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="w-80 h-60 bg-white/5 backdrop-blur-xl border-2 border-rose-500/50 rounded-lg shadow-[0_0_100px_rgba(225,29,72,0.5)] flex items-center justify-center"
              >
                <motion.div
                  initial={{ height: "100%" }}
                  animate={{ height: "0%" }}
                  transition={{ delay: 2.5, duration: 1.5, ease: "anticipate" }}
                  className="absolute top-0 left-0 right-0 bg-rose-950 border-b border-rose-400 z-10 origin-top flex items-center justify-center overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-full bg-rose-500 blur-xl opacity-50" />
                </motion.div>
                <p className="font-romantic text-4xl text-rose-200 italic">For You</p>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 1, 0], y: 0 }}
                transition={{ duration: 2, times: [0, 0.5, 1], delay: 1 }}
                className="absolute -bottom-20 text-rose-400 text-2xl font-serif-luxury"
              >
                המתיני רגע... זה קורה
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: THE INVITATION */}
        {stage === AppStage.INVITATION && (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl mx-4 text-center relative"
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
               <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="bg-rose-600 p-4 rounded-full shadow-lg shadow-rose-600/40"
               >
                 <Heart className="w-8 h-8 fill-white text-white" />
               </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif-luxury text-rose-200 mb-6 italic">
                אהובה שלי,
              </h2>
              <p className="text-4xl md:text-6xl font-serif-luxury font-bold leading-tight mb-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                האם תסכימי להיות הוולנטיין שלי ב-2026?
              </p>
              <p className="text-gray-400 font-light mb-12 max-w-md mx-auto leading-relaxed">
               אני פאקינג מתאהב בך כל יום שעובר
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative h-20">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="px-12 py-4 bg-rose-600 hover:bg-rose-500 rounded-full text-xl font-bold transition-all shadow-xl shadow-rose-600/30 w-full md:w-auto"
              >
                כן, ברור! ❤️
              </motion.button>

              {noCount < 5 && (
                <motion.button
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover}
                  className="px-12 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xl font-medium transition-colors w-full md:w-auto"
                >
                  לא... 🙊
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* STAGE 4: THE CELEBRATION */}
        {stage === AppStage.CELEBRATION && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-[#0a0005] flex flex-col items-center justify-center text-center p-6 overflow-hidden"
          >
            <SmokeEffect />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 1, ease: "backOut" }}
              className="mb-8"
            >
              <Heart className="w-40 h-40 text-rose-600 fill-rose-600 drop-shadow-[0_0_30px_rgba(225,29,72,0.8)]" />
            </motion.div>
            
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-8xl font-serif-luxury font-bold mb-6 text-white"
            >
              ידעתי שתגידי כן! 🥂
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-2xl md:text-3xl font-romantic text-rose-300 italic mb-12"
            >
              אני אוהב אותך הכי בעולם.
            </motion.p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.8, type: "spring" }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-lg"
            >
              <p className="text-gray-300 tracking-widest text-lg uppercase mb-2">Save the Date</p>
              <p className="text-3xl font-serif-luxury text-white">14.02.2026</p>
              <div className="w-16 h-0.5 bg-rose-500 mx-auto my-4 opacity-50"></div>
              <p className="text-gray-400 italic font-light">
               יהיה לנו את הערב הכי מיוחד בעולם
              </p>
            </motion.div>

            {/* Repeating confetti for continuous celebration */}
            <ConfettiLoop />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

// Mount the App
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
