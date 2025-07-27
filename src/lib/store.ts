import { create } from 'zustand';
import { MotionValue } from 'framer-motion';

type PortfolioState = {
  teleport: (position: { x: number; y: number }) => void;
  setTeleport: (fn: (position: { x: number; y: number }) => void) => void;
  canvasMotionValues: { x: MotionValue<number>, y: MotionValue<number>, scale: MotionValue<number> } | null;
  setCanvasMotionValues: (values: { x: MotionValue<number>, y: MotionValue<number>, scale: MotionValue<number> }) => void;
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  teleport: () => {},
  setTeleport: (fn) => set({ teleport: fn }),
  canvasMotionValues: null,
  setCanvasMotionValues: (values) => set({ canvasMotionValues: values }),
}));
