import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ChevronRight } from 'lucide-react';

export default function Hero({ isDarkMode }: { isDarkMode: boolean }) {
  const phrases = [
    'automating BIM with Python scripts',
    'turning IFC data into insights',
    'training ML models on clash data',
    'building smarter with OpenBIM standards',
    'designing parametric workflows in Dynamo'
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      if (displayedText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 60);
      } else {
        // Wait before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const gridStyle = isDarkMode
    ? `
      linear-gradient(rgba(0, 212, 255, 0.4) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 212, 255, 0.4) 1px, transparent 1px),
      linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
    `
    : `
      linear-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
      linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
    `;

  return (
    <section
      id="home"
      className={`relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-[#000000]' : 'bg-[#f4f5f6]'
      }`}
    >
      {/* Structural blueprint lines */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Fine cross grid */}
        <div 
          className="absolute inset-0 opacity-[0.06] sm:opacity-[0.08] transition-all duration-500"
          style={{
            backgroundImage: gridStyle,
            backgroundSize: '160px 160px, 160px 160px, 40px 40px, 40px 40px'
          }}
        />

        {/* CAD Alignment Crosshairs */}
        <div className={`absolute top-1/4 left-10 md:left-24 w-12 h-12 border-l border-t ${isDarkMode ? 'border-[#00d4ff]/20' : 'border-[#dfa262]/20'}`} />
        <div className={`absolute top-1/4 left-10 md:left-24 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? 'bg-[#00d4ff]/30' : 'bg-[#dfa262]/30'}`} />
        <div className={`absolute bottom-1/4 right-10 md:right-24 w-12 h-12 border-r border-b ${isDarkMode ? 'border-[#00d4ff]/20' : 'border-[#dfa262]/20'}`} />
        <div className={`absolute bottom-1/4 right-10 md:right-24 w-2 h-2 rounded-full translate-x-1/2 translate-y-1/2 ${isDarkMode ? 'bg-[#00d4ff]/30' : 'bg-[#dfa262]/30'}`} />

        {/* Floating tech coordinate ticks (authentic drawing format) */}
        <div className={`absolute top-24 left-6 font-mono text-[9px] ${isDarkMode ? 'text-[#4a6d8c] opacity-40' : 'text-slate-400 opacity-60'} select-none`}>GRID A-1 // ELEV_LV01_0.00m</div>
        <div className={`absolute top-24 right-6 font-mono text-[9px] ${isDarkMode ? 'text-[#4a6d8c] opacity-40' : 'text-slate-400 opacity-60'} select-none`}>GRID H-12 // X:5420.3 Y:1025.1</div>
        <div className={`absolute bottom-24 left-6 font-mono text-[9px] ${isDarkMode ? 'text-[#4a6d8c] opacity-40' : 'text-slate-400 opacity-60'} select-none`}>SYS_READY // COMP_DES_ON</div>

        {/* Glowing laser scanline */}
        <div
          className={`absolute left-0 w-full h-[2px] bg-gradient-to-r pointer-events-none z-10 ${
            isDarkMode ? 'from-transparent via-[#00d4ff]/25 to-transparent' : 'from-transparent via-[#dfa262]/25 to-transparent'
          }`}
          style={{
            animation: 'scan 6s linear infinite'
          }}
        />
        <style>{`
          @keyframes scan {
            0% { top: -5% }
            100% { top: 105% }
          }
        `}</style>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full pt-16 sm:pt-20 md:pt-24 animate-[fadeIn_0.8s_ease]">
        {/* Large Aesthetic Name & Portfolio Graphic */}
        <div className="relative flex flex-col items-start select-none mb-4">
          {/* Core Branding: BIM Portfolio + Vertical ENGINEER */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex flex-col items-start w-full"
          >
            <div 
              className="flex items-baseline flex-nowrap gap-x-2 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 select-none w-full" 
              style={{ fontSize: 'clamp(2.2rem, 13vw, 11rem)' }}
            >
              {/* BIM with relative container for vertical ENGINEER alignments */}
              <div className="relative inline-block leading-none">
                <span className={`font-sans font-black tracking-[-0.03em] leading-none ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                  BIM
                </span>

                {/* Highly responsive vertical aligned word "ENGINEER" below M */}
                <div className="absolute right-0 top-[102%] w-full flex flex-col items-end">
                  <div className="flex flex-col items-center mr-[4.2%] sm:mr-[4%] md:mr-[3.8%] lg:mr-[3.5%] w-6 space-y-[2px] sm:space-y-[4px] md:space-y-[5px]">
                    {"ENGINEER".split("").map((char, index) => (
                      <span
                        key={index}
                        className={`leading-none font-mono text-[7px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-semibold tracking-[0.15em] ${
                          isDarkMode ? 'text-slate-400' : 'text-[#8a929d]'
                        }`}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Portfolio Word with custom glowing dot on 'i' without overlapping with l */}
              <span className={`font-sans font-medium tracking-[-0.02em] leading-none ${
                isDarkMode ? 'text-slate-400' : 'text-[#bfc4cd]'
              } flex items-baseline`}>
                Portfol
                <span className="relative inline-flex items-baseline mx-[0.03em]">
                  ı
                  <span 
                    className="absolute rounded-full bg-gradient-to-br from-[#00d4ff] to-[#005af0]"
                    style={{ 
                      width: '0.14em', 
                      height: '0.14em',
                      top: '-0.02em',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      boxShadow: '0 0 12px 3px rgba(0, 212, 255, 0.9), 0 0 24px 6px rgba(0, 90, 240, 0.6)'
                    }} 
                  >
                    {/* Glowing outer representation container */}
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}>
                      {/* Pulsing expand ring */}
                      <span className="absolute w-[400%] h-[400%] rounded-full border border-[#00d4ff]/50 animate-ping opacity-60" style={{ animationDuration: '2s' }} />
                      
                      {/* Sunburst glowing rays slowly rotating */}
                      <svg 
                        className="absolute w-[500%] h-[500%] animate-[spin_10s_linear_infinite]" 
                        viewBox="0 0 100 100"
                        style={{ overflow: 'visible' }}
                      >
                        <defs>
                          <radialGradient id="ray-grad-dynamic" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(0, 212, 255, 1)" />
                            <stop offset="60%" stopColor="rgba(0, 90, 240, 0.6)" />
                            <stop offset="100%" stopColor="rgba(0, 90, 240, 0)" />
                          </radialGradient>
                        </defs>
                        {/* 8 beautiful rays radiating outward representing the shining sun */}
                        {[...Array(8)].map((_, idx) => {
                          const angle = (idx * 360) / 8;
                          const x2 = 50 + 35 * Math.cos((angle * Math.PI) / 180);
                          const y2 = 50 + 35 * Math.sin((angle * Math.PI) / 180);
                          return (
                            <line
                              key={idx}
                              x1="50"
                              y1="50"
                              x2={x2}
                              y2={y2}
                              stroke="url(#ray-grad-dynamic)"
                              strokeWidth="3.5"
                              style={{
                                animation: 'pulse-ray 2s ease-in-out infinite alternate',
                                animationDelay: `${idx * 120}ms`
                              }}
                            />
                          );
                        })}
                      </svg>
                    </span>
                  </span>
                </span>
                o
              </span>
            </div>
          </motion.div>
        </div>

        {/* Subtitle with compact spacing below ENGINEER word */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`max-w-2xl font-sans text-lg sm:text-xl md:text-2xl font-light tracking-[1px] mb-6 mt-20 sm:mt-26 md:mt-32 lg:mt-38 ${
            isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-650'
          }`}
        >
          Bridging <strong className={`${isDarkMode ? 'text-[#cde8ff]' : 'text-slate-900'} font-medium`}>Design &amp; Data</strong> Through Code
        </motion.p>

        {/* Code Terminal Display */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={`min-h-[40px] font-mono text-sm sm:text-base md:text-lg flex items-center gap-1.5 mb-8 select-all ${
            isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'
          }`}
        >
          <span className={`${isDarkMode ? 'text-[#00d4ff] opacity-60' : 'text-slate-650 opacity-80'} font-semibold`}>&gt;</span>
          <span className={`${isDarkMode ? 'text-[#cde8ff] opacity-70' : 'text-slate-800 opacity-80'} font-light`}>saisoummein</span>
          <span className={`${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'} font-semibold`}>~</span>
          <span>{displayedText}</span>
          <span className={`inline-block w-[8px] h-[1.1em] ${isDarkMode ? 'bg-[#00d4ff]' : 'bg-blue-600'} animate-[blink_0.9s_step-end_infinite] align-middle`} />
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap gap-4 sm:gap-6 items-center"
        >
          <button
            onClick={() => handleScrollTo('#projects')}
            className={`group relative px-6 py-3.5 font-mono text-sm uppercase tracking-[3px] border overflow-hidden transition-all duration-300 cursor-pointer ${
              isDarkMode 
                ? 'text-[#00d4ff] border-[#00d4ff]/30 bg-[#00d4ff]/5 hover:border-[#00d4ff] hover:text-[#020c1b]'
                : 'text-blue-600 border-blue-600/30 bg-blue-600/5 hover:border-blue-600 hover:text-white'
            }`}
          >
            <div className={`absolute inset-0 w-full h-full transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0 -z-10 ${
              isDarkMode ? 'bg-[#00d4ff]' : 'bg-blue-600'
            }`} />
            <span className="relative flex items-center gap-2">
              View Work
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>

          <button
            onClick={() => handleScrollTo('#contact')}
            className={`group px-6 py-3.5 font-mono text-sm uppercase tracking-[3px] border transition-all duration-300 cursor-pointer ${
              isDarkMode 
                ? 'text-[#4a6d8c] border-[#4a6d8c]/30 hover:border-[#cde8ff] hover:text-[#cde8ff]'
                : 'text-slate-655 border-slate-300 hover:border-slate-800 hover:text-slate-900'
            }`}
          >
            Let's Connect
          </button>
        </motion.div>
      </div>

      {/* Floating Scroll / portfolio 2026 indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-70">
        <span className={`font-mono text-[9px] tracking-[5px] uppercase ${isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-500'}`}>PORTFOLIO 2026</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="cursor-pointer"
          onClick={() => handleScrollTo('#about')}
        >
          <ArrowDown className={`w-4 h-4 ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'}`} />
        </motion.div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
