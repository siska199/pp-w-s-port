import { useEffect, useRef } from 'react';
import { useScroll, MotionValue, UseScrollOptions } from 'framer-motion';

interface TUseScrollCustomeProps extends UseScrollOptions {
  containerId?: string;
  targetRef: React.RefObject<HTMLDivElement>;
}

export const useScrollCustome = (
  props: TUseScrollCustomeProps
): { scrollYProgress: MotionValue<number> } => {
  const {
    containerId = 'container-page-portofolio',
    targetRef,
    offset,
  } = props;
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById(containerId);
    if (el) {
      containerRef.current = el;
    }
  }, [containerId]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset,
    container: containerRef,
    layoutEffect: false,
  });

  return { scrollYProgress };
};
