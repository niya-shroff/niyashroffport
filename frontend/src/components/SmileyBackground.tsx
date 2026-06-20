import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  char: string;
  size: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  maxLife: number;
  life: number;
}

interface BackgroundSmiley {
  id: number;
  char: '☻' | '☺';
  top: number;
  left: number;
  size: number; // in pixels
  colorClass: string;
  depth: number; // parallax factor (e.g. 0.2 to 1.5)
  animationClass: string;
  opacity: number;
}

const SMILEY_PALETTE = [
  '#FF8A76', // Coral
  '#CDB4DB', // Lavender
  '#FFC8DD', // Pink
  '#BDE0FE', // Sky Blue
  '#C1F4C5', // Mint
  '#FFF4B8', // Butter Yellow
];

const BACKGROUND_SMILEYS_CONFIG: BackgroundSmiley[] = [
  { id: 1, char: '☻', top: 12, left: 8, size: 28, colorClass: 'text-coral/20 dark:text-coral/10', depth: 0.4, animationClass: 'animate-float-gentle', opacity: 0.6 },
  { id: 2, char: '☺', top: 22, left: 85, size: 36, colorClass: 'text-lavender/30 dark:text-lavender/15', depth: 0.8, animationClass: 'animate-spin-slow', opacity: 0.7 },
  { id: 3, char: '☻', top: 38, left: 15, size: 20, colorClass: 'text-mint/30 dark:text-mint/15', depth: 0.3, animationClass: 'animate-float-gentle', opacity: 0.5 },
  { id: 4, char: '☺', top: 48, left: 78, size: 24, colorClass: 'text-pink/30 dark:text-pink/15', depth: 0.6, animationClass: 'animate-float-gentle', opacity: 0.6 },
  { id: 5, char: '☻', top: 65, left: 5, size: 42, colorClass: 'text-skyBlue/20 dark:text-skyBlue/10', depth: 1.2, animationClass: 'animate-spin-slow', opacity: 0.7 },
  { id: 6, char: '☺', top: 78, left: 88, size: 30, colorClass: 'text-butterYellow/40 dark:text-butterYellow/15', depth: 0.5, animationClass: 'animate-float-gentle', opacity: 0.8 },
  { id: 7, char: '☻', top: 88, left: 22, size: 32, colorClass: 'text-coral/25 dark:text-coral/10', depth: 0.9, animationClass: 'animate-spin-slow', opacity: 0.6 },
  { id: 8, char: '☺', top: 5, left: 50, size: 22, colorClass: 'text-lavender/25 dark:text-lavender/10', depth: 0.4, animationClass: 'animate-float-gentle', opacity: 0.5 },
  { id: 9, char: '☻', top: 55, left: 45, size: 18, colorClass: 'text-mint/25 dark:text-mint/10', depth: 0.2, animationClass: 'animate-float-gentle', opacity: 0.4 },
  { id: 10, char: '☺', top: 92, left: 60, size: 38, colorClass: 'text-pink/25 dark:text-pink/15', depth: 1.1, animationClass: 'animate-spin-slow', opacity: 0.6 },
  // Extra subtle smileys for the empty spaces
  { id: 11, char: '☻', top: 30, left: 62, size: 26, colorClass: 'text-skyBlue/20 dark:text-skyBlue/10', depth: 0.5, animationClass: 'animate-float-gentle', opacity: 0.5 },
  { id: 12, char: '☺', top: 72, left: 32, size: 24, colorClass: 'text-butterYellow/30 dark:text-butterYellow/10', depth: 0.7, animationClass: 'animate-float-gentle', opacity: 0.6 },
];

export const SmileyBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  // Parallax Effect based on Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 35; // shifting limit
      const y = (e.clientY / window.innerHeight - 0.5) * 35;
      containerRef.current.style.setProperty('--mx', `${x}px`);
      containerRef.current.style.setProperty('--my', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Click-to-spawn Particle Burst
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Don't trigger if user is clicking on buttons, links, or form elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        return;
      }

      const newParticles: Particle[] = [];
      const numParticles = 6 + Math.floor(Math.random() * 5); // 6 to 10 particles

      for (let i = 0; i < numParticles; i++) {
        // Random velocity vectors (fanning out upwards)
        const angle = (Math.random() * Math.PI) / 1.5 - Math.PI / 1.5 - Math.PI / 2; // general upward arc
        const speed = 2 + Math.random() * 5;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed - 1.5; // push slightly upwards

        newParticles.push({
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          vx,
          vy,
          color: SMILEY_PALETTE[Math.floor(Math.random() * SMILEY_PALETTE.length)],
          char: Math.random() > 0.5 ? '☻' : '☺',
          size: 14 + Math.floor(Math.random() * 22), // 14px to 36px
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 10,
          opacity: 1,
          maxLife: 40 + Math.floor(Math.random() * 20), // 40 to 60 frames
          life: 40 + Math.floor(Math.random() * 20),
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // Update loop for particles
  useEffect(() => {
    if (particles.length === 0) return;

    let animId: number;

    const updateParticles = () => {
      setParticles((prev) =>
        prev
          .map((p) => {
            const nextLife = p.life - 1;
            return {
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              vy: p.vy + 0.12, // gravity
              vx: p.vx * 0.98, // air resistance
              rotation: p.rotation + p.rotSpeed,
              life: nextLife,
              opacity: nextLife / p.maxLife,
            };
          })
          .filter((p) => p.life > 0)
      );

      animId = requestAnimationFrame(updateParticles);
    };

    animId = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animId);
  }, [particles.length]);

  return (
    <>
      {/* Background Layer */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ transform: 'translate3d(0,0,0)' }}
      >
        {BACKGROUND_SMILEYS_CONFIG.map((smiley) => (
          <span
            key={smiley.id}
            style={{
              top: `${smiley.top}%`,
              left: `${smiley.left}%`,
              fontSize: `${smiley.size}px`,
              opacity: smiley.opacity,
              transform: `translate3d(calc(var(--mx, 0px) * ${smiley.depth}), calc(var(--my, 0px) * ${smiley.depth}), 0)`,
            }}
            className={`absolute select-none transition-transform duration-300 ease-out ${smiley.colorClass} ${smiley.animationClass}`}
          >
            {smiley.char}
          </span>
        ))}
      </div>

      {/* Interactive Particles Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}px`,
              top: `${p.y}px`,
              fontSize: `${p.size}px`,
              color: p.color,
              opacity: p.opacity,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              textShadow: `0 0 8px ${p.color}aa, 0 0 16px ${p.color}44`,
            }}
            className="select-none animate-hue-shift font-sans inline-block"
          >
            {p.char}
          </span>
        ))}
      </div>
    </>
  );
};

export default SmileyBackground;
