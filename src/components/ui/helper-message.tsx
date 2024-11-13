import { HTMLAttributes } from 'react'

import { cn } from '@lib/helper/function'

interface TProps extends HTMLAttributes<HTMLParagraphElement> {
  message?: string
  variant: 'error' | 'sucess' | 'warning'
}
const HelperMessage = (props: TProps) => {
  const { message, variant, className, ...attrs } = props
  if (!message) return null
  return (
    <div
      className={cn({
        [className || '']: className,
        'text-body-tiny font-normal': true,
        'text-error': variant === 'error',
        'text-warning': variant === 'warning',
        'text-sucess': variant === 'sucess'
      })}
      {...attrs}
    >
      {message}
    </div>
  )
}

export default HelperMessage
