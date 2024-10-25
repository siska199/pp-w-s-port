import React from 'react'
import { motion } from 'framer-motion'

import { singleWordAnimation, textAnimation } from '@/assets/styles/animation'

interface TAnimatedTextProps extends React.HTMLProps<HTMLHeadElement> {
  text: string
}

const AnimatedText = (props: TAnimatedTextProps) => {
  const { text, className } = props
  return (
    <motion.h1 className={`${className} inline-block`} {...textAnimation()}>
      {text.split(' ')?.map((word, i) => (
        <motion.span className='inline-block' key={i} {...singleWordAnimation()}>
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default AnimatedText
