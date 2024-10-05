import { MotionProps } from 'framer-motion';

export const cardSkillAnimation = (params: { index: number }): MotionProps => {
  return {
    initial: 'hidden',
    whileInView: 'visible',
    exit: 'exit',
    custom: params.index,
    viewport: { once: false },
    variants: {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.1,
          duration: 0.3,
        },
      }),
      exit: {
        opacity: 0,
        y: 20,
        transition: {
          duration: 0.2,
        },
      },
    },
  };
};
