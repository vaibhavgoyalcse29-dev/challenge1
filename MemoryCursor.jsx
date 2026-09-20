import { useEffect, useState } from 'react';

export default function MemoryCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return undefined;

    const move = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setActive(true);
    };
    const leave = () => setActive(false);
    const down = () => {
      setPressed(true);
      window.setTimeout(() => setPressed(false), 260);
    };

    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
    };
  }, []);

  return (
    <div
      className={`memory-cursor ${active ? 'memory-cursor-active' : ''} ${pressed ? 'memory-cursor-pressed' : ''}`}
      style={{ '--cursor-x': `${position.x}px`, '--cursor-y': `${position.y}px` }}
      aria-hidden="true"
    >
      <span className="memory-cursor-orbit memory-cursor-orbit-one" />
      <span className="memory-cursor-orbit memory-cursor-orbit-two" />
      <span className="memory-cursor-core" />
      <span className="memory-cursor-label">TRACE</span>
    </div>
  );
}
