"use client";
import React, { useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import { CANVAS_SIZE, generateSections } from '@/lib/config';
import { usePortfolioStore } from '@/lib/store';
import { useWindowSize } from '@/hooks/use-window-size';
import { SectionWrapper } from './SectionWrapper';
import { PortfolioData } from '@/lib/portfolio-data';

const MIN_SCALE = 0.4;
const MAX_SCALE = 1.5;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export function Canvas({ portfolioData }: { portfolioData: PortfolioData }) {
  const scope = React.useRef<HTMLDivElement>(null);
  const { setTeleport, setCanvasMotionValues } = usePortfolioStore();
  const viewportSize = useWindowSize();
  const sections = generateSections(portfolioData);

  // All three are raw motion values — no springs on user-driven gestures.
  // Springs are applied programmatically only (teleport, center).
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const getBounds = useCallback((s: number) => {
    const vw = viewportSize.width ?? 0;
    const vh = viewportSize.height ?? 0;
    // With transformOrigin "0 0": canvas top-left is always at (x, y).
    // Right bound 0: can't pull canvas so its left edge goes past viewport left.
    // Left bound: can't push canvas so its right edge goes past viewport right.
    return {
      left:   -(CANVAS_SIZE.width  * s - vw),
      right:  0,
      top:    -(CANVAS_SIZE.height * s - vh),
      bottom: 0,
    };
  }, [viewportSize.width, viewportSize.height]);

  const centerOnAboutMe = useCallback(() => {
    const about = sections.find(s => s.id === 'about');
    if (!about || !viewportSize.width || !viewportSize.height) return;

    const s = 1;
    const cx = -(about.coords.left + (about.size.width as number) / 2 - viewportSize.width / 2);
    const cy = -(about.coords.top  + (about.size.height as number) / 2 - viewportSize.height / 2);

    const b = getBounds(s);
    x.set(clamp(cx, b.left, b.right));
    y.set(clamp(cy, b.top,  b.bottom));
    scale.set(s);
  }, [sections, viewportSize.width, viewportSize.height, x, y, scale, getBounds]);

  useEffect(() => {
    centerOnAboutMe();
  }, [centerOnAboutMe]);

  const teleport = useCallback((newPos: { x: number; y: number }) => {
    const b = getBounds(1);
    const tx = clamp(newPos.x, b.left, b.right);
    const ty = clamp(newPos.y, b.top,  b.bottom);
    animate(scale, 1,  { type: 'spring', stiffness: 200, damping: 28 });
    animate(x, tx, { type: 'spring', stiffness: 200, damping: 28 });
    animate(y, ty, { type: 'spring', stiffness: 200, damping: 28 });
  }, [x, y, scale, getBounds]);

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
      onPinch: ({ origin: [ox, oy], offset: [d] }) => {
        const oldScale = scale.get();
        const newScale = clamp(1 + d / 200, MIN_SCALE, MAX_SCALE);
        const canvasX = (ox - x.get()) / oldScale;
        const canvasY = (oy - y.get()) / oldScale;
        const b = getBounds(newScale);
        x.set(clamp(ox - canvasX * newScale, b.left, b.right));
        y.set(clamp(oy - canvasY * newScale, b.top,  b.bottom));
        scale.set(newScale);
      },
      onWheel: ({ event, delta: [, dy] }) => {
        if ((event.target as HTMLElement).closest('.stop-zoom')) return;
        event.preventDefault();
        const oldScale = scale.get();
        // Exponential zoom: feels consistent at every zoom level
        const newScale = clamp(oldScale * Math.exp(-dy * 0.002), MIN_SCALE, MAX_SCALE);
        const cx = event.clientX;
        const cy = event.clientY;
        const canvasX = (cx - x.get()) / oldScale;
        const canvasY = (cy - y.get()) / oldScale;
        const b = getBounds(newScale);
        x.set(clamp(cx - canvasX * newScale, b.left, b.right));
        y.set(clamp(cy - canvasY * newScale, b.top,  b.bottom));
        scale.set(newScale);
      },
    },
    {
      target: scope,
      eventOptions: { passive: false },
      drag: {
        from: () => [x.get(), y.get()],
        bounds: () => getBounds(scale.get()),
        rubberband: 0.08,
      },
      pinch: {
        from: () => [scale.get() - 1, 0],
        rubberband: 0.15,
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
        x,
        y,
        scale,
        transformOrigin: '0 0',
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
