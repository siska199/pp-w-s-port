import { HTMLProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import Image from '@components/ui/image'

import { cn } from '@lib/helper/function'
import variantsAvatar from '@lib/helper/variant/variant-avatar'

interface TPropsImage {
  type?: 'image'
  src: string
}

interface TInitialName {
  type?: 'initial-name'
  name?: string
}

type TProps = Omit<Partial<HTMLProps<HTMLDivElement>>, 'size' | 'shape'> &
  VariantProps<typeof avatarVariants> & {
    customeIcon?: React.ReactNode
  } & (TPropsImage | TInitialName)

const Avatar = (props: TProps) => {
  const { className, type = 'image', customeIcon, src, name, variant, size, shape, status } = props
  let updateVariant = variant || 'soft-gray'
  if (!variant && type === 'image') {
    updateVariant = 'solid-black'
  }

  return (
    <div className='relative'>
      <div
        className={cn(
          avatarVariants({
            className,
            variant: updateVariant,
            size,
            shape,
            status
          })
        )}
      >
        {type === 'image' && (
          <Image
            src={src || 'avatar.svg'}
            alt={name}
            className=' w-full h-full object-scale-down'
          />
        )}
        {type === 'initial-name' && <div>{name?.substring(0, 1)}</div>}
        {['online', 'offline', 'dontdistrub', 'away']?.includes(status || '') && (
          <span
            className={cn({
              ' absolute border-white border-2   rounded-full': true
            })}
          ></span>
        )}
        {customeIcon && status === 'icon' && (
          <span className='absolute top-2 right-2'>{customeIcon}</span>
        )}
      </div>
    </div>
  )
}

const avatarVariants = cva(
  'text-white flex  items-center justify-center w-fit font-semibold overflow-hidden [&>span]:top-0 [&>span]:right-0  [&>span]:w-[0.75rem]  [&>span]:h-[0.75rem]',
  {
    variants: variantsAvatar,
    compoundVariants: [],
    defaultVariants: {
      variant: 'soft-gray',
      size: 'base',
      shape: 'circular'
    }
  }
)

export default Avatar
