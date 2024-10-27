import React, { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface TAnimatedCountNumber extends React.HTMLProps<HTMLSpanElement> {
  number: number
}

export const AnimatedCountNumber = (props: TAnimatedCountNumber) => {
  const { number, ...attrs } = props
  const ref = useRef<HTMLSpanElement | null>(null)

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 3000 })
  const isInView = useInView(ref)

  useEffect(() => {
    motionValue.set(isInView ? number : 0)
  }, [isInView, number, motionValue])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current && Number(latest.toFixed(0)) <= number) {
        ref.current.textContent = latest?.toFixed(0)
      }
    })
  }, [springValue, number])

  return <span ref={ref} {...attrs} />
}
