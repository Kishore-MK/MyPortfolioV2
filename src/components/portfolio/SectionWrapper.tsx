
"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  position: { top: number; left: number };
  size: { width: number; height: number | 'auto' };
  minHeight?: number;
  title: string;
}

export function SectionWrapper({ children, position, size, minHeight, title }: SectionWrapperProps) {
  return (
    <motion.div
      className="absolute flex flex-col stop-zoom"
      style={{
        top: position.top,
        left: position.left,
        width: size.width,
        height: size.height,
        minHeight: minHeight,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="h-full w-full bg-card/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-2xl shadow-black/20 overflow-hidden flex flex-col">
        <div className="flex-shrink-0 h-9 bg-zinc-200/50 dark:bg-zinc-900/50 flex items-center px-4 border-b border-white/10">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-sm font-medium text-zinc-600 dark:text-zinc-300">
                {title}
            </div>
        </div>
        <div className="flex-grow overflow-auto">
             {children}
        </div>
      </div>
    </motion.div>
  );
}
