import { cn } from '@lib/helper'
import { forwardRef } from 'react'

interface TProps {
  children: React.ReactNode
  text: string
  variant?: 'top' | 'bottom' | 'left' | 'right'
  type?: 'glass'
  customeClass?: {
    tooltip?: string
    rectangle?: string
  }
}

const Tooltip = forwardRef<HTMLDivElement, TProps>(function Tooltip(props, ref) {
  const { children, type, text, variant = 'top', customeClass } = props
  return (
    <div
      data-text={text}
      className={cn({
        'p-1 inline-block relative !overflow-visible w-fit': true,
        [customeClass?.tooltip || '']: !!customeClass?.tooltip,
        'tooltip ': !!text,
        [`${variant}`]: !!variant,
        'hover:before:!bg-white/15': type === 'glass'
      })}
      ref={ref}
    >
      {children}
      {text && (
        <span
          className={cn({
            'rectangle ': true,
            [customeClass?.rectangle || '']: !!customeClass?.rectangle,
            [`${variant}`]: !!variant,
            '!border-transparent !border-t-transparent !border-b-white/15 !border-l-transparent !border-r-transparent':
              type === 'glass'
          })}
        ></span>
      )}
    </div>
  )
})

export default Tooltip
