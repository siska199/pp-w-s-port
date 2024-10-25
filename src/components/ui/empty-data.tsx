import Image from '@components/ui/image'
import { cn } from '@lib/helper'

interface TProps {
  customeClass?: {
    container?: string
    img?: string
    label?: string
  }
}

const EmptyData = (props: TProps) => {
  const { customeClass } = props
  return (
    <div
      className={cn({
        'flex flex-col items-center justify-center gap-2': true,
        [customeClass?.container || '']: customeClass?.container
      })}
    >
      <div className={`${customeClass?.img}`}>
        <Image
          className={cn({
            'object-cover': true
          })}
          src={'not-found.png'}
          alt='empty-data'
        />
      </div>
      <p
        className={cn({
          'font-medium text-base-medium': true,
          [customeClass?.label || '']: customeClass?.label
        })}
      >
        No data to show
      </p>
    </div>
  )
}

export default EmptyData
