import { useEffect, useRef } from 'react'
import { MotionValue, useScroll, UseScrollOptions } from 'framer-motion'

interface TUseAnimateScrollCustomeProps extends UseScrollOptions {
  containerId?: string
  targetRef: React.RefObject<HTMLDivElement>
}

export const useAnimateScrollCustome = (
  props: TUseAnimateScrollCustomeProps
): { scrollYProgress: MotionValue<number> } => {
  const { containerId = 'container-page-portofolio', targetRef, offset } = props
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = document.getElementById(containerId)
    if (el) {
      containerRef.current = el
    }
  }, [containerId])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset,
    container: containerRef,
    layoutEffect: false
  })

  return { scrollYProgress }
}
