import { MotionProps } from 'framer-motion'

export const cardAnimation = (params: { index: number }): MotionProps => {
  return {
    initial: 'hidden',
    whileInView: 'visible',
    exit: 'exit',
    viewport: { once: false },
    custom: params.index,
    variants: {
      hidden: {
        opacity: 0,
        y: 20
      },
      visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.1,
          duration: 0.3
        }
      }),
      exit: {
        opacity: 0,
        y: 20,
        transition: {
          duration: 0.2
        }
      }
    }
  }
}

export const textAnimation = (): MotionProps => {
  return {
    initial: 'hidden',
    whileInView: 'visible',
    exit: 'exit',
    viewport: { once: false },
    variants: {
      hidden: {
        opacity: 0
      },
      visible: {
        opacity: 1,
        transition: {
          delay: 0.5,
          staggerChildren: 0.08
        }
      },
      exit: {
        opacity: 0,
        y: 20,
        transition: {
          duration: 0.2
        }
      }
    }
  }
}

export const singleWordAnimation = (): MotionProps => {
  return {
    variants: {
      hidden: {
        opacity: 0,
        y: 50
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 1
        }
      },
      exit: {
        opacity: 0,
        y: 50,
        transition: {
          duration: 0.2
        }
      }
    }
  }
}

export const opacityAnimation = (): MotionProps => {
  return {
    initial: 'hidden',
    whileInView: 'visible',
    exit: 'exit',
    viewport: { once: false },
    variants: {
      hidden: {
        opacity: 0
      },
      visible: {
        opacity: 1,
        transition: {
          delay: 0.5
        }
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.2
        }
      }
    }
  }
}

export const slideInAnimation = (params: { direction: 'left' | 'right' }): MotionProps => {
  const { direction } = params
  const isRight = direction === 'right'
  const xStart = isRight ? 100 : -100
  const xEnd = isRight ? 20 : -20

  return {
    initial: 'hidden',
    whileInView: 'visible',
    exit: 'exit',
    viewport: { once: false },
    variants: {
      hidden: {
        opacity: 0,
        x: xStart // Starting position
      },
      visible: {
        opacity: 1,
        x: 0, // Final position
        transition: {
          delay: 0.2,
          duration: 0.5
        }
      },
      exit: {
        opacity: 0,
        x: xEnd, // Exit position
        transition: {
          duration: 0.2
        }
      }
    }
  }
}
