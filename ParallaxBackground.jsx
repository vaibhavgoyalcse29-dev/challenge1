import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

/**
 * ParallaxBackground
 * Three depth layers behind your content:
 *  - back:  slow-moving thermal/noise texture (almost static)
 *  - mid:   faint receipt fragments / barcode lines, medium speed
 *  - light: soft radial glow that follows the cursor
 *
 * Drop this once near the root of App.jsx, before your scrollable content.
 * It's `position: fixed`, so it sits behind everything and never scrolls out.
 */
export default function ParallaxBackground() {
  const { scrollY } = useScroll();

  // Different scroll speeds = the parallax depth illusion
  const yBack = useTransform(scrollY, [0, 2000], [0, 150]);
  const yMid = useTransform(scrollY, [0, 2000], [0, 420]);

  // Cursor-follow glow, spring-smoothed so it doesn't feel jittery
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const containerRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="parallax-root" aria-hidden="true">
      {/* Layer 1: base texture, barely moves */}
      <motion.div className="parallax-layer parallax-back" style={{ y: yBack }} />

      {/* Layer 2: faint receipt/barcode fragments, moves more */}
      <motion.div className="parallax-layer parallax-mid">
        <motion.div style={{ y: yMid }} className="parallax-mid-inner">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="ghost-fragment"
              style={{
                left: `${(i * 137) % 100}%`,
                top: `${(i * 71) % 100}%`,
                transform: `rotate(${(i * 47) % 360}deg)`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Layer 3: cursor-reactive light */}
      <motion.div
        className="parallax-glow"
        style={{
          left: glowX,
          top: glowY,
        }}
      />

      {/* Grain overlay for texture, sits on top of all bg layers */}
      <div className="parallax-grain" />
    </div>
  );
}
