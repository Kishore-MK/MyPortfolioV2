"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from "@/hooks/use-mobile";
import { Canvas } from "./Canvas";
import { MiniMap } from "./MiniMap";
import { MobileView } from "./MobileView";
import { ThemeToggle } from '../theme-toggle';
import { CursorGlow } from './CursorGlow';
import { PortfolioData } from '@/lib/portfolio-data';

export function Portfolio({ portfolioData }: { portfolioData: PortfolioData  }) {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Cinematic delay
    return () => clearTimeout(timer);
  }, []);

  const loaderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.7 } },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } },
  };

  if (loading) {
    return (
      <AnimatePresence>
        <motion.div
          key="loader"
          variants={loaderVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full h-screen flex items-center justify-center bg-background"
        >
          <motion.h1
            variants={textVariants}
            className="font-headline text-6xl md:text-8xl font-bold text-primary"
          >
            Loading...
          </motion.h1>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isMobile ? (
        <motion.div key="mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <MobileView portfolioData={portfolioData} />
        </motion.div>
      ) : (
        <motion.div key="desktop" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} exit={{ opacity: 0 }} className="w-full h-screen overflow-hidden bg-background relative cursor-grab active:cursor-grabbing">
          <CursorGlow />
          <Canvas portfolioData={portfolioData} />
          <MiniMap portfolioData={portfolioData} />
          <div className="fixed top-4 left-4 z-50">
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
