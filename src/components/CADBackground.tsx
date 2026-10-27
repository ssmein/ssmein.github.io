import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface FireParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  startSize: number;
  alpha: number;
  age: number;
  maxAge: number;
  type: 'flame' | 'spark' | 'smoke';
  hue: number;
  wiggleSpeed: number;
  wiggleOffset: number;
}

interface CADBackgroundProps {
  isDarkMode: boolean;
}

// Hard ceiling on simultaneously simulated particles.
const MAX_PARTICLES = 350;
// Work cap: never step the simulation faster than ~90Hz, so a 144Hz/240Hz
// display does not burn 2-4x the frames for an identical looking result.
const MIN_FRAME_MS = 1000 / 90;

export default function CADBackground({ isDarkMode }: CADBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<FireParticle[]>([]);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    vx: 0,
    vy: 0,
    dx: 0,
    dy: 0,
    lastX: -1000,
    lastY: -1000,
    active: false,
    moved: false
  });

  const reduceMotion = useReducedMotion();

  // Keep track of theme inside the render loop
  const isDarkModeRef = useRef(isDarkMode);
  useEffect(() => {
    isDarkModeRef.current = isDarkMode;
  }, [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reduced motion: no loop, no listeners, no particles. A static empty
    // frame instead of a continuously running simulation.
    if (reduceMotion) {
      particlesRef.current.length = 0;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let resizeQueued = false;
    const applyResize = () => {
      resizeQueued = false;
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Writing width/height clears the canvas, so skip no-op resizes
      // (mobile browser chrome fires resize while scrolling).
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
    };
    const resizeCanvas = () => {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(applyResize);
    };
    applyResize();
    window.addEventListener('resize', resizeCanvas);

    // Pointer events can fire far more often than frames on high-polling-rate
    // mice. Record movement here; spawn once per simulated frame instead.
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;

      // Accumulate travel so mouse-driven kinetic energy stays correct even
      // when several events land inside a single frame.
      if (mouse.lastX !== -1000) {
        mouse.dx += e.clientX - mouse.lastX;
        mouse.dy += e.clientY - mouse.lastY;
      }
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.moved = true;
    };

    const handleMouseLeave = () => {
      const mouse = mouseRef.current;
      mouse.active = false;
      mouse.moved = false;
      mouse.dx = 0;
      mouse.dy = 0;
      mouse.lastX = -1000;
      mouse.lastY = -1000;
    };

    const spawnBurst = (x: number, y: number, mvx: number, mvy: number) => {
      const particles = particlesRef.current;
      if (particles.length >= MAX_PARTICLES) return;

      const isDark = isDarkModeRef.current;

      // Spawn flame body particles
      const flameCount = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < flameCount; i++) {
        const offsetAngle = Math.random() * Math.PI * 2;
        const offsetDist = Math.random() * 8;
        const px = x + Math.cos(offsetAngle) * offsetDist;
        const py = y + Math.sin(offsetAngle) * offsetDist;

        // Custom organic float & thermal velocity
        const vx = (Math.random() - 0.5) * 0.8 + mvx * 0.4;
        const vy = -(1.2 + Math.random() * 1.5) + mvy * 0.4;

        // Electric cyan fire in dark mode, deep sapphire blue fire in light mode.
        const baseHue = isDark ? 185 : 210;
        const hueVariation = (Math.random() - 0.5) * 35;

        particles.push({
          x: px,
          y: py,
          vx: vx,
          vy: vy,
          size: 3 + Math.random() * 5,
          startSize: 3 + Math.random() * 5,
          alpha: 0.9,
          age: 0,
          maxAge: 40 + Math.random() * 30, // lifespan frames
          type: 'flame',
          hue: baseHue + hueVariation,
          wiggleSpeed: 0.05 + Math.random() * 0.1,
          wiggleOffset: Math.random() * 100
        });
      }

      // Spawn bright spark embers
      if (Math.random() < 0.65) {
        const sparkCount = Math.floor(Math.random() * 3) + 1;
        const baseHue = isDark ? 190 : 215;
        for (let i = 0; i < sparkCount; i++) {
          const vx = (Math.random() - 0.5) * 3.5 + mvx * 0.6;
          const vy = -(3.0 + Math.random() * 4.0); // fast shootup

          particles.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            size: 0.8 + Math.random() * 1.5,
            startSize: 0.8 + Math.random() * 1.5,
            alpha: 1.0,
            age: 0,
            maxAge: 60 + Math.random() * 50,
            type: 'spark',
            hue: baseHue + (Math.random() - 0.5) * 15,
            wiggleSpeed: 0.1 + Math.random() * 0.2,
            wiggleOffset: Math.random() * 100
          });
        }
      }

      // Spawn smoke trail particles
      if (Math.random() < 0.35) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -(0.5 + Math.random() * 0.7),
          size: 4 + Math.random() * 4,
          startSize: 4 + Math.random() * 4,
          alpha: 0.35,
          age: 0,
          maxAge: 70 + Math.random() * 40,
          type: 'smoke',
          hue: 0, // gray/neutral
          wiggleSpeed: 0.02,
          wiggleOffset: Math.random() * 100
        });
      }
    };

    let animationId = 0;
    let running = false;
    let lastFrameTime = 0;

    const render = (now: number) => {
      animationId = requestAnimationFrame(render);

      // Frame cap: the simulation is frame-stepped, so throttling here bounds
      // per-frame work and keeps the motion consistent across refresh rates.
      if (now - lastFrameTime < MIN_FRAME_MS) return;
      lastFrameTime = now;

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      // Resolve this frame's pointer velocity from the accumulated travel.
      if (mouse.moved) {
        mouse.vx = mouse.dx * 0.15;
        mouse.vy = mouse.dy * 0.15;
        mouse.dx = 0;
        mouse.dy = 0;
        mouse.moved = false;
        if (mouse.active) spawnBurst(mouse.x, mouse.y, mouse.vx, mouse.vy);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = isDarkModeRef.current;

      // Ensure absolutely NO context shadows are applied anywhere during rendering
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowColor = 'transparent';

      // Enable additive composition for bright glowing fire look (especially in dark mode)
      if (isDark) {
        ctx.globalCompositeOperation = 'screen';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }

      // Single pass: simulate, draw, and compact in place, so no throwaway
      // array is allocated every frame.
      let write = 0;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.age++;

        // Physics: rising up, slowly fading out, applying air resistance left/right
        p.y += p.vy;
        p.x += p.vx;

        // Apply friction/drag forces
        p.vx *= 0.97;
        // Gravity/rising buoyant acceleration (buoyancy shoots flame upwards)
        p.vy -= 0.08;

        // Horizontal flame waving/swaying
        p.x += Math.sin(p.age * p.wiggleSpeed + p.wiggleOffset) * 0.45;

        // Life ratios
        const lifePercent = p.age / p.maxAge;

        if (p.type === 'flame') {
          // Shrink size as it burns out
          p.size = p.startSize * (1 - lifePercent * 0.85);
          // Rise and fade
          p.alpha = 0.9 * (1 - lifePercent);

          const chroma = isDark ? '85%' : '90%';
          const light = isDark
            ? `${Math.floor(45 + (1 - lifePercent) * 25)}%`
            : `${Math.floor(40 + (1 - lifePercent) * 30)}%`;

          // Dynamic radial heat gradient to look like gorgeous glowing flames (with crisp boundaries, no soft outer shadowy haze)
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          // Hot core
          grad.addColorStop(0, `hsla(${p.hue + 15}, 100%, 93%, ${p.alpha})`);
          // Thermal body
          grad.addColorStop(0.5, `hsla(${p.hue}, ${chroma}, ${light}, ${p.alpha * 0.85})`);
          // Sharp outer edge - fades directly at the extreme boundary to avoid shadow halos
          grad.addColorStop(0.95, `hsla(${p.hue - 10}, 90%, 35%, 0.1)`);
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

        } else if (p.type === 'spark') {
          // Ember spark: tiny burning core
          p.size = p.startSize * (1 - lifePercent);
          p.alpha = 1.0 - lifePercent;

          // Spark flickers as it ascends
          const flicker = 0.7 + 0.3 * Math.sin(p.age * 0.6);
          const currentAlpha = p.alpha * flicker;

          if (currentAlpha > 0.02) {
            ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${currentAlpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

        } else if (p.type === 'smoke') {
          // Fading expanding smoke puff
          p.size = p.startSize * (1 + lifePercent * 1.4);
          p.alpha = 0.3 * (1 - lifePercent);

          const smokeColor = isDark
            ? `rgba(74, 109, 140, ${p.alpha * 0.15})` // bluish/slate dust cloud
            : `rgba(100, 116, 139, ${p.alpha * 0.1})`;

          ctx.fillStyle = smokeColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Keep only live particles (same liveness test as before, compacted in place)
        if (p.age < p.maxAge && p.alpha > 0.01 && p.y > -50) {
          particles[write++] = p;
        }
      }
      particles.length = write;

      // Keep maximum particle buffer protected to avoid browser lag
      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }

      // Reset cursor friction velocity
      mouse.vx *= 0.85;
      mouse.vy *= 0.85;
    };

    const start = () => {
      if (running) return;
      running = true;
      lastFrameTime = performance.now() - MIN_FRAME_MS;
      animationId = requestAnimationFrame(render);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(animationId);
      animationId = 0;
    };

    // Stop entirely in a background tab instead of burning frames there.
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
        particlesRef.current.length = 0;
        handleMouseLeave();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        start();
      }
    };

    if (!document.hidden) start();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stop();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      particlesRef.current.length = 0;
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: isDarkMode ? 'screen' : 'normal' }}
    />
  );
}
