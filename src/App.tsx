import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const LogoIcon = () => (
  <svg 
    className="w-10 h-10 text-black translate-y-[1px]" 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Clean rendering of the luxury slanted dual-capsule shape from the logo */}
    <rect x="7" y="19" width="15" height="5.5" rx="2.75" transform="rotate(-35 7 19)" fill="currentColor" />
    <rect x="17.5" y="24" width="15" height="5.5" rx="2.75" transform="rotate(-35 17.5 24)" fill="currentColor" />
  </svg>
);

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 z-50 pointer-events-none"
    >
      {/* Left side brand & interactive elements */}
      <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
        <div 
          className="flex items-center gap-1 group cursor-pointer focus-visible:outline-2 focus-visible:outline-black rounded-lg px-2 py-1"
          tabIndex={0}
          aria-label="NeuralKinetics home"
        >
          <LogoIcon />
          <span className="font-display font-medium tracking-tight text-[18px] text-black">NeuralKinetics</span>
        </div>

        {/* Separate Menu Pill button */}
        <button 
          className="flex items-center bg-black hover:bg-zinc-800 text-white focus-visible:ring-2 focus-visible:ring-black outline-none p-1 pr-5 gap-2.5 rounded-full transition-all duration-200 cursor-pointer text-[12px] font-medium border border-black/[0.03]"
          aria-label="Toggle Navigation Menu"
        >
          <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center">
            <Plus size={13} strokeWidth={3} />
          </div>
          <span className="text-[11.5px] pr-1">Menu</span>
        </button>

        {/* Separate Metadata Info Pill */}
        <div className="hidden md:flex items-center bg-[#F4F4F6] border border-black/[0.03] rounded-full px-6 h-11 select-none text-[11.5px] font-normal text-black/60 gap-5">
          <span>Advanced Bionics</span>
          <span>Cognitive AI</span>
        </div>
      </div>

      {/* Right side scalable solutions compound pill */}
      <div className="pointer-events-auto flex items-center">
        <div className="flex items-center bg-[#F4F4F6] hover:bg-[#EAEAEF] transition-colors rounded-full p-1 pr-6 gap-3.5 border border-black/[0.03]">
          {/* Black circle icon nested inside with Clover-like 4 node custom SVG */}
          <button 
            className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center focus-visible:ring-2 focus-visible:ring-black outline-none hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Explore Solutions Portfolio"
          >
            <svg 
              className="w-3.5 h-3.5 text-white" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {/* Outer nodes forming symmetric design */}
              <circle cx="12" cy="5" r="2.2" fill="currentColor" stroke="none" />
              <circle cx="12" cy="19" r="2.2" fill="currentColor" stroke="none" />
              <circle cx="5" cy="12" r="2.2" fill="currentColor" stroke="none" />
              <circle cx="19" cy="12" r="2.2" fill="currentColor" stroke="none" />
              
              {/* Clean symmetric structural lines */}
              <path d="M12 7.5v9M7.5 12h9" opacity="0.6" />
              <circle cx="12" cy="12" r="1.5" fill="none" />
            </svg>
          </button>
          <span className="text-[11px] font-medium text-black/70 select-none">
            Adaptive Systems
          </span>
        </div>
      </div>
    </motion.nav>
  );
};

const HandSequence = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameRef = useRef(0);
  const totalFrames = 61;

  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      img.src = `/hands-sequence/ezgif-frame-${frameNum}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          imagesRef.current = imgs;
          setIsLoaded(true);
        }
      };
      imgs[i - 1] = img;
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    let requestId: number;
    let lastTime = 0;
    const fps = 20; // Increased to 20 for a more fluid and lifelike feel
    const interval = 1000 / fps;

    const render = (time: number) => {
      const deltaTime = time - lastTime;

      if (deltaTime > interval) {
        lastTime = time - (deltaTime % interval);

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = imagesRef.current[frameRef.current];

        if (ctx && canvas && img) {
          const dpr = window.devicePixelRatio || 1;
          const cW = canvas.width / dpr;
          const cH = canvas.height / dpr;
          ctx.clearRect(0, 0, cW, cH);

          const iW = img.width;
          const iH = img.height;
          
          // Mimic object-cover behavior
          const scale = Math.max(cW / iW, cH / iH);
          const x = (cW - iW * scale) / 2;
          const y = (cH - iH * scale) / 2;
          
          ctx.drawImage(img, x, y, iW * scale, iH * scale);
          
          if (frameRef.current < totalFrames - 1) {
            frameRef.current = frameRef.current + 1;
          } else {
            return; // Stop animation loop at the last frame
          }
        }
      }
      requestId = requestAnimationFrame(render);
    };

    requestId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(requestId);
  }, [isLoaded]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);
        
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1.5s ease-in-out' }}
    />
  );
};

export default function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-white text-black font-sans antialiased selection:bg-black selection:text-white overflow-hidden">
      <Navbar />

      {/* Background Graphic Canvas – Ambient base video restored */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          {/* Base Ambient Flow Video */}
          <video 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_061107_6567e617-ee84-4c3e-ac81-f2d9dda9121a.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 relative z-10">
        {/* Hero title container shifted slightly down from true dead center */}
        <div className="text-center w-full max-w-7xl px-4 mt-24 md:mt-0 translate-y-10 md:translate-y-14 animate-fade-in">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col items-center justify-center select-none"
          >
            {/* Highly calibrated elegant title weights to match reference picture */}
            <h1 className="font-display text-[7.5vw] md:text-[5.8vw] lg:text-[4.6vw] font-medium tracking-tight text-black leading-[0.9]">
              NeuralKinetics
            </h1>
            <h2 className="font-display text-[7.5vw] md:text-[5.8vw] lg:text-[4.6vw] leading-[0.9] mt-1 md:mt-1.5">
              <span className="text-black/25 font-light tracking-tight mr-1.5 md:mr-2">cybernetics</span>
              <span className="text-black font-medium tracking-tight">made organic</span>
            </h2>
          </motion.div>
        </div>
      </main>

      {/* Layered Hands Sequence – Positioned on top of the central heading */}
      <div className="absolute inset-0 z-20 pointer-events-none select-none flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <HandSequence />
        </motion.div>
      </div>

      {/* Bottom Information Grid */}
      <footer className="w-full relative z-30 px-8 py-10 md:px-16 md:py-14 bg-gradient-to-t from-white via-white/80 to-transparent">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          {/* Left Block: Description */}
          <div className="flex flex-col gap-3 max-w-[300px] md:max-w-[340px]">
            <span className="text-[11.5px] font-medium text-black/50 select-none">
              Autonomous Dynamics
            </span>
            <p className="text-[19px] md:text-[21px] font-normal text-black leading-[1.15] tracking-tight">
              Unifying biological grace with machine intelligence to design the next era of fusion
            </p>
          </div>

          {/* Middle elegant line separator */}
          <div className="hidden lg:block w-px h-16 bg-black/[0.08]" aria-hidden="true" />

          {/* Right Outlined tags matching the reference design */}
          <div className="flex flex-wrap gap-2.5">
            {['Neuromorphic', 'AGI', 'Cybernetics'].map((tag) => (
              <button 
                key={tag} 
                className="px-6 py-3.5 border border-black/15 hover:border-black text-black text-[11.5px] font-normal rounded-full bg-white hover:bg-black hover:text-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 cursor-pointer active:scale-95"
                aria-label={`Filter by ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
