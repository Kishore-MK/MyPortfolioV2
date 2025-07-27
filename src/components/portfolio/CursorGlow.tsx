'use client';

import { motion, useMotionValue, useSpring, useAnimate } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const [scope, animate] = useAnimate();
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.7 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      animate(scope.current, { opacity: 1 }, { duration: 0.3 });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        animate(scope.current, { opacity: 0 }, { duration: 1, delay: 0.5 });
      }, 300);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mouseX, mouseY, animate, scope]);

  return (
    <motion.div
      ref={scope}
      className="pointer-events-none fixed left-0 top-0 z-0 h-96 w-96 rounded-full bg-glow/20 blur-3xl"
      style={{
        translateX: '-50%',
        translateY: '-50%',
        x: springX,
        y: springY,
        opacity: 0,
      }}
    />
  );
}
