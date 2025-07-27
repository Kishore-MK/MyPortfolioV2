
"use client";

import React from 'react';
import { motion, useAnimate } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { CANVAS_SIZE, generateSections } from '@/lib/config';
import { useWindowSize } from '@/hooks/use-window-size';
import { Eye, Map } from 'lucide-react';
import { PortfolioData } from '@/lib/portfolio-data';
import { useTransform } from 'framer-motion';

const MINIMAP_WIDTH = 200;
const MINIMAP_HEIGHT = (MINIMAP_WIDTH / CANVAS_SIZE.width) * CANVAS_SIZE.height;
const MINIMAP_DIMENSIONS = { width: MINIMAP_WIDTH, height: MINIMAP_HEIGHT };

export function MiniMap({ portfolioData }: { portfolioData: PortfolioData }) {
  const { teleport, canvasMotionValues } = usePortfolioStore();
  const viewportSize = useWindowSize();
  const [scope, animate] = useAnimate();
  const [isOpen, setIsOpen] = React.useState(true);

  if (!viewportSize.width || !viewportSize.height || !portfolioData) return null;

  const sections = generateSections(portfolioData);
  const scaleX = MINIMAP_DIMENSIONS.width / CANVAS_SIZE.width;
  const scaleY = MINIMAP_DIMENSIONS.height / CANVAS_SIZE.height;

  const handleTeleport = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!teleport || !canvasMotionValues) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const currentScale = canvasMotionValues.scale.get();

    const targetX = -( (clickX / scaleX) - (viewportSize.width / 2 / currentScale) );
    const targetY = -( (clickY / scaleY) - (viewportSize.height / 2 / currentScale) );
    
    teleport({ x: targetX, y: targetY });
  };
  
  return (
    <>
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          aria-label={isOpen ? "Hide Minimap" : "Show Minimap"}
        >
          {isOpen ? <Eye className="w-4 h-4" /> : <Map className="w-4 h-4" />}
        </button>
      </motion.div>

      <motion.div
        ref={scope}
        className="fixed top-20 right-4 z-40 bg-card/60 dark:bg-zinc-800/80 backdrop-blur-lg border border-border/30 rounded-lg shadow-2xl"
        style={{
          width: MINIMAP_DIMENSIONS.width,
          height: MINIMAP_DIMENSIONS.height,
          boxShadow: '0 0 25px hsl(var(--glow) / 0.2)',
        }}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0, scale: 1 },
          closed: { opacity: 0, y: -20, scale: 0.95 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={handleTeleport}
      >
        <div className="w-full h-full relative cursor-pointer overflow-hidden">
          {sections.map(({ id, coords, size, minHeight }) => {
            const displayHeight = size.height === 'auto' ? minHeight || 200 : size.height;
            return (
              <div
                key={id}
                className="absolute bg-primary/30 border border-primary/50 rounded-sm"
                style={{
                  top: coords.top * scaleY,
                  left: coords.left * scaleX,
                  width: size.width * scaleX,
                  height: displayHeight * scaleY,
                }}
              />
            )
          })}
          <ViewportIndicator scaleX={scaleX} scaleY={scaleY} />
        </div>
      </motion.div>
    </>
  );
}

function ViewportIndicator({ scaleX, scaleY }: { scaleX: number; scaleY: number }) {
  const viewportSize = useWindowSize();
  const { canvasMotionValues } = usePortfolioStore();

  if (!canvasMotionValues) return null;

  const viewportWidth = useTransform(canvasMotionValues.scale, (s) => (viewportSize.width / s) * scaleX);
  const viewportHeight = useTransform(canvasMotionValues.scale, (s) => (viewportSize.height / s) * scaleY);

  const viewportX = useTransform(
    [canvasMotionValues.x, canvasMotionValues.scale],
    ([x, s]) => {
        const scaledX = -x * scaleX;
        const scaledWidth = (viewportSize.width / s) * scaleX;
        return Math.max(0, Math.min(scaledX, MINIMAP_DIMENSIONS.width - scaledWidth));
    }
  );
  
  const viewportY = useTransform(
      [canvasMotionValues.y, canvasMotionValues.scale],
      ([y, s]) => {
          const scaledY = -y * scaleY;
          const scaledHeight = (viewportSize.height / s) * scaleY;
          return Math.max(0, Math.min(scaledY, MINIMAP_DIMENSIONS.height - scaledHeight));
      }
  );


  return (
    <motion.div
      className="absolute border-2 border-accent rounded"
      style={{
        width: viewportWidth,
        height: viewportHeight,
        x: viewportX,
        y: viewportY,
      }}
    />
  );
}
