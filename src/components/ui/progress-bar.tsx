import { useEffect, useMemo, useState } from 'react'

import Badge from '@components/ui/badge'

import { cn } from '@lib/helper/function'

interface TProps {
  value: number
  valueTotal?: number
  customeClass?: {
    container?: string
    containerProgressbar?: string
    progressbar?: string
    containerLabel?: string
    label?: string
  }
  size?: 'base'
  variant?:
    | 'base'
    | 'trailing-label'
    | 'title-label'
    | 'top-floating-label'
    | 'bottom-floating-label'
    | 'within-progress-bar'
    | 'steps'
}

const Progressbar = (props: TProps) => {
  const { value, variant = 'base', valueTotal = 100, customeClass, size = 'base' } = props
  const percentage = (value / valueTotal) * 100

  // >>-Animation Progress bar
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const nextWidth = width + 10
      if (nextWidth <= 100) {
        setWidth(nextWidth)
      } else {
        setWidth(0)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [width, valueTotal])

  const labelComp = useMemo(
    () => (
      <label
        style={{
          marginLeft:
            ['top-floating-label', 'bottom-floating-label']?.includes(variant) && value !== 0
              ? `${percentage - 5}%`
              : 0
        }}
        className={cn({
          [customeClass?.label || '']: customeClass?.label,
          ['mb-2 ']: ['top-floating-label']?.includes(variant)
        })}
      >
        {['top-floating-label', 'bottom-floating-label']?.includes(variant) ? (
          <Badge shape={'rounded'} variant={'softborder-primary'} label={`${percentage}%`} />
        ) : (
          `${percentage}%`
        )}
      </label>
    ),
    [percentage]
  )

  return (
    <div
      className={cn({
        'relative w-full flex flex-col ': true,
        'flex-col-reverse gap-2': variant == 'bottom-floating-label',
        'flex-row-reverse gap-2 items-center': variant == 'base',
        [customeClass?.container || '']: customeClass?.container
      })}
    >
      {variant !== 'within-progress-bar' && labelComp}
      <div
        className={cn({
          'bg-gray-100 w-full rounded-full min-w-[5rem]': true,
          [customeClass?.containerProgressbar || '']: customeClass?.containerProgressbar,
          'h-[10px] text-body-base': size == 'base',
          'h-[20px]': variant === 'within-progress-bar'
        })}
      >
        <div
          style={{ width: `${percentage}%` }}
          className={`bg-primary flex items-center justify-center text-center text-white h-full transition-all duration-300 rounded-full ${customeClass?.progressbar}`}
        >
          {variant === 'within-progress-bar' && labelComp}
        </div>
      </div>
    </div>
  )
}

export default Progressbar
