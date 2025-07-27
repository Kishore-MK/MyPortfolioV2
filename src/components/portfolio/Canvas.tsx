"use client";
import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useAnimate, useSpring, useMotionValueEvent } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import { CANVAS_SIZE, generateSections } from '@/lib/config';
import { usePortfolioStore } from '@/lib/store';
import { useWindowSize } from '@/hooks/use-window-size';
import { SectionWrapper } from './SectionWrapper';
import { PortfolioData } from '@/lib/portfolio-data';

const MIN_SCALE = 0.5;
const MAX_SCALE = 1.3;

export function Canvas({ portfolioData }: { portfolioData: PortfolioData }) {
  const [scope, animate] = useAnimate();
  const { setTeleport, setCanvasMotionValues } = usePortfolioStore();
  const viewportSize = useWindowSize();
  const sections = generateSections(portfolioData);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 20 });

  const centerOnAboutMe = useCallback(() => {
    const aboutSection = sections.find(s => s.id === 'about');
    
    // Add proper type checking and fallbacks
    if (!aboutSection?.coords || !aboutSection?.size || !viewportSize.width || !viewportSize.height) {
      return;
    }

    // Ensure all values are numbers with fallbacks
    const aboutLeft = Number(aboutSection.coords.left) || 0;
    const aboutTop = Number(aboutSection.coords.top) || 0;
    const aboutWidth = Number(aboutSection.size.width) || 0;
    const aboutHeight = Number(aboutSection.size.height) || 0;
    const viewWidth = Number(viewportSize.width) || 0;
    const viewHeight = Number(viewportSize.height) || 0;

    const initialX = -(aboutLeft + aboutWidth / 2) + (viewWidth / 2);
    const initialY = -(aboutTop + aboutHeight / 2) + (viewHeight / 2);

    x.set(initialX);
    y.set(initialY);
    scale.set(1);
  }, [viewportSize.width, viewportSize.height, x, y, scale, sections]);

  useEffect(() => {
    centerOnAboutMe();
  }, [centerOnAboutMe]);

  const teleport = useCallback(async (newPos: { x: number; y: number }) => {
    x.set(newPos.x);
    y.set(newPos.y);
    scale.set(1);
    animate(scope.current, { x: newPos.x, y: newPos.y, scale: 1 }, { type: 'spring', stiffness: 100, damping: 20 });
  }, [animate, scope, x, y, scale]);

  useEffect(() => {
    setTeleport(teleport);
    setCanvasMotionValues({ x, y, scale });
  }, [setTeleport, teleport, setCanvasMotionValues, x, y, scale]);

  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        x.set(dx);
        y.set(dy);
      },
      onPinch: ({ offset: [d] }) => {
        const newScale = 1 + d / 200;
        scale.set(Math.max(MIN_SCALE, Math.min(newScale, MAX_SCALE)));
      },
      onWheel: ({ event, delta: [, dy] }) => {
        if ((event.target as HTMLElement).closest('.stop-zoom')) {
          return;
        }
        event.preventDefault();
        const newScale = scale.get() - dy / 500;
        scale.set(Math.max(MIN_SCALE, Math.min(newScale, MAX_SCALE)));
      }
    },
    {
      target: scope,
      eventOptions: { passive: false },
      drag: {
        from: () => [x.get(), y.get()],
        bounds: () => {
          // Get current scale value from the motion value
          const s = scale.get();
          const safeViewWidth = Number(viewportSize.width) || 0;
          const safeViewHeight = Number(viewportSize.height) || 0;
          
          return {
            left: -CANVAS_SIZE.width * s + safeViewWidth,
            right: 0,
            top: -CANVAS_SIZE.height * s + safeViewHeight,
            bottom: 0,
          };
        },
        rubberband: 0.1,
      },
      pinch: {
        from: () => [scale.get() - 1, 0],
        bounds: {
          min: MIN_SCALE,
          max: MAX_SCALE
        },
        rubberband: 0.2
      },
    }
  );

  if (!viewportSize.width || !viewportSize.height) return null;

  return (
    <motion.div
      ref={scope}
      className="absolute"
      style={{
        width: CANVAS_SIZE.width,
        height: CANVAS_SIZE.height,
        x: springX,
        y: springY,
        scale: springScale,
        transformOrigin: "center center",
      }}
    >
      {sections.map(({ id, Component, coords, size, title, props }) => (
        <SectionWrapper key={id} position={coords} size={size} title={title}>
          <Component {...props} />
        </SectionWrapper>
      ))}
    </motion.div>
  );
}