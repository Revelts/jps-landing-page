import { FC, useEffect, useRef } from 'react';

import { useCanvasContext } from '../hooks/useCanvas';
import useResponsiveSize from '../hooks/useResponsiveSize';
import WaveObj from '../utils/wave';

const Wave: FC = () => {
  const { context } = useCanvasContext();
  const { width } = useResponsiveSize();
  const height = 600;
  const rafIdRef = useRef<number | null>(null);
  const frequencyRef = useRef<number>(0.008); // lower frequency for smoother perf
  const waves = {
    frontWave: new WaveObj([0.0211, 0.028, 0.015], 'rgba(30, 58, 138, 0.1)'), // dark blue
    backWave: new WaveObj([0.0122, 0.018, 0.005], 'rgba(139, 92, 246, 0.1)'), // purple
  };

  useEffect(() => {
    if (!context) return undefined;

    // Respect reduced motion
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      context.clearRect(0, 0, width, height);
      Object.entries(waves).forEach(([, wave]) => {
        wave.draw(context, width, height, frequencyRef.current);
      });
      // Smaller step when reduced motion is requested
      frequencyRef.current += prefersReduced ? 0.002 : 0.008;
      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [context, width]);
  return null;
};

export default Wave;
