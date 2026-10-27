import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { statsData } from '../data';

interface CounterProps {
  target: number;
  suffix: string;
  isDarkMode: boolean;
}

function AnimatedCounter({ target, suffix, isDarkMode }: CounterProps) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? target : 0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Reduced motion: the number is the content, so show it — just don't count.
    if (reduceMotion) {
      setCount(target);
      return;
    }

    const el = elementRef.current;
    if (!el) return;

    let rafId = 0;
    let startedAt = 0;

    // Decelerating curve, so the number lands rather than stopping dead.
    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

    const tick = (now: number) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min((now - startedAt) / 1100, 1);
      setCount(Math.round(easeOutQuint(progress) * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    // Cancel the frame loop too — the old version leaked its interval and set
    // state after unmount.
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, reduceMotion]);

  return (
    <div 
      ref={elementRef} 
      className={`font-display text-5xl sm:text-6xl leading-none mb-2 ${
        isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'
      }`} 
      style={isDarkMode ? { textShadow: '0 0 20px rgba(0, 212, 255, 0.3)' } : undefined}
    >
      {count}
      <span className={`opacity-80 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{suffix}</span>
    </div>
  );
}

export default function About({ isDarkMode }: { isDarkMode: boolean }) {
  const reduceMotion = useReducedMotion();

  // behavior:'smooth' in the options object overrides the reduced-motion rule
  // in index.css, so the preference has to be honoured explicitly here.
  const goToEducation = (enabled: boolean) => {
    if (!enabled) return;
    document.getElementById('education')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <section 
      id="about" 
      className={`py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t transition-colors duration-500 ${
        isDarkMode ? 'border-[#00d4ff]/10' : 'border-slate-200'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column: Text Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <p className={`font-mono text-xs sm:text-[13px] tracking-[6px] uppercase ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'}`}>/* About Me */</p>
            <h2 className={`font-display text-4xl sm:text-5xl tracking-[2px] uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Data Scientist
            </h2>
          </div>

          <div className={`space-y-6 font-sans text-sm sm:text-base leading-relaxed font-light ${
            isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-650'
          }`}>
            <p>
              I am a <strong className={`font-semibold ${isDarkMode ? 'text-[#cde8ff]' : 'text-slate-950'}`}>Data Scientist</strong> in Bangkok. Most of what I build ends up as something people actually open — a retrieval assistant that answers enquiries, a tracker a production team runs its week from, a model whose output decides where a budget goes.
            </p>
            <p>
              The range is deliberate. An analysis that stops at a notebook rarely changes anything, so I work the parts either side of it with (<strong className={`font-semibold ${isDarkMode ? 'text-[#cde8ff]' : 'text-slate-950'}`}>Python, SQL, and retrieval systems</strong>) — getting data into a state worth trusting, then building the interface that puts the result in front of whoever has to act on it. I came to this from civil engineering, by way of construction sites in Yangon and Iwakuni, where I learned the problem I still work on: most things go wrong because a record disagreed with reality.
            </p>
          </div>
        </div>

        {/* Right column: Interactive Stats Cards */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {statsData.map((stat, idx) => {
            const isCerts = stat.id === 'degrees';
            return (
              <motion.div
                key={stat.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.42, delay: idx * 0.055, ease: [0.22, 1, 0.36, 1] }
                }
                // whileInView writes an inline transform, which outranks a
                // hover:scale utility — so the old hover never fired. Hand the
                // hover to Motion instead, where it composes correctly.
                whileHover={isCerts && !reduceMotion ? { scale: 1.02 } : undefined}
                whileTap={isCerts && !reduceMotion ? { scale: 0.995 } : undefined}
                role={isCerts ? 'button' : undefined}
                tabIndex={isCerts ? 0 : undefined}
                aria-label={isCerts ? 'Jump to education and credentials' : undefined}
                onClick={() => goToEducation(isCerts)}
                onKeyDown={(e) => {
                  if (isCerts && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    goToEducation(isCerts);
                  }
                }}
                className={`p-6 flex flex-col justify-center items-center text-center rounded-sm transition-ui group border ${
                  isCerts ? 'cursor-pointer' : ''
                } ${
                  isDarkMode 
                    ? 'bg-[#041325]/40 border-[#00d4ff]/10 hover:border-[#00d4ff]/30' 
                    : 'bg-white shadow-xs border-slate-200 hover:border-slate-400'
                }`}
              >
                <AnimatedCounter target={stat.count} suffix={stat.suffix} isDarkMode={isDarkMode} />
                <div className={`font-mono text-[9px] sm:text-[10px] tracking-widest uppercase mt-1 transition-colors ${
                  isDarkMode 
                    ? 'text-[#4a6d8c] group-hover:text-[#00d4ff]' 
                    : 'text-slate-500 group-hover:text-blue-600'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
