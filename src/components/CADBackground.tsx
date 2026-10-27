import { useEffect, useRef } from 'react';

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

export default function CADBackground({ isDarkMode }: CADBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<FireParticle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: -1000, lastY: -1000, active: false });

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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      
      // Calculate velocity of mouse movement to inject kinetic energy into fire
      if (mouse.lastX !== -1000) {
        mouse.vx = (e.clientX - mouse.lastX) * 0.15;
        mouse.vy = (e.clientY - mouse.lastY) * 0.15;
      }
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      const isDark = isDarkModeRef.current;

      // Spawn flame body particles
      const flameCount = Math.floor(Math.random() * 2) + 2; 
      for (let i = 0; i < flameCount; i++) {
        const offsetAngle = Math.random() * Math.PI * 2;
        const offsetDist = Math.random() * 8;
        const px = e.clientX + Math.cos(offsetAngle) * offsetDist;
        const py = e.clientY + Math.sin(offsetAngle) * offsetDist;

        // Custom organic float & thermal velocity
        const vx = (Math.random() - 0.5) * 0.8 + mouse.vx * 0.4;
        const vy = -(1.2 + Math.random() * 1.5) + mouse.vy * 0.4;

        // Dynamic hues: 10-25 for fiery reds, 25-45 for burning orange, 50-60 for gold sparks
        // If in dark mode, we can make it highly colorful cosmic fire (blue fire matching theme!)
        // "look like fire that vanish above". Let's make it a gorgeous electric blue-cyan fire when dark, 
        // and blue/teal fire when light mode, or a classic warm energetic fire.
        // Let's use gorgeous flame tones. Cyan/Electric-Blue fire fits the digital twin theme beautifully!
        // To satisfy both requests, let's create highly vivid heat fire (electric-cyan-blue in dark mode, and gradient rich sapphire-blue fire in light mode).
        const baseHue = isDark ? 185 : 210; // Cyan of theme vs bright deep royal blue
        const hueVariation = (Math.random() - 0.5) * 35;

        particlesRef.current.push({
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
        for (let i = 0; i < sparkCount; i++) {
          const vx = (Math.random() - 0.5) * 3.5 + mouse.vx * 0.6;
          const vy = -(3.0 + Math.random() * 4.0); // fast shootup
          const isDark = isDarkModeRef.current;
          const baseHue = isDark ? 190 : 215;

          particlesRef.current.push({
            x: e.clientX,
            y: e.clientY,
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
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
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

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.lastX = -1000;
      mouseRef.current.lastY = -1000;
    };

    let animationId: number;

    const render = () => {
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

      particlesRef.current.forEach((p) => {
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
      });

      // Filter out completed particles for outstanding reactivity & frames
      particlesRef.current = particlesRef.current.filter(
        (p) => p.age < p.maxAge && p.alpha > 0.01 && p.y > -50
      );

      // Keep maximum particle buffer protected to avoid browser lag
      if (particlesRef.current.length > 350) {
        particlesRef.current.splice(0, particlesRef.current.length - 350);
      }

      // Reset cursor friction velocity
      mouseRef.current.vx *= 0.85;
      mouseRef.current.vy *= 0.85;

      animationId = requestAnimationFrame(render);
    };

    render();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: isDarkMode ? 'screen' : 'normal' }}
    />
  );
}
