import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'

import { useAnimateScrollCustome } from '@hooks/use-animate-scroll-custome'

interface TProps {
  children: React.ReactNode
  header?: React.ReactNode
  customeClass?: {
    containerList?: string
    list?: string
    container?: string
  }
}

const SliderScrollInHorizontal = (props: TProps) => {
  const { children, header, customeClass } = props
  const targetRef = useRef(null)

  const { scrollYProgress } = useAnimateScrollCustome({
    targetRef
  })

  const x = useTransform(scrollYProgress, [0, 1], [header ? '19%' : '1%', '-95%'])
  return (
    <section ref={targetRef} className={`relative h-[300vh] max-w-full ${customeClass?.container}`}>
      <div
        className={`sticky top-0 flex flex-col space-y-8 py-8 h-screen items-center  overflow-hidden ${customeClass?.containerList} `}
      >
        {header}
        <motion.div
          style={{ x }}
          className={`flex gap-8 items-center h-full ${customeClass?.list}`}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

export default SliderScrollInHorizontal
