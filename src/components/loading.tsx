import { HTMLProps } from 'react'

import { cn } from '@lib/helper/function'
import { IconLoadingThreeDots } from '@assets/icons'

type TPropsLoading = HTMLProps<HTMLDivElement>

const Loading = (props: TPropsLoading) => {
  const { className } = props
  return (
    <div
      className={cn({
        'sticky top-0 z-[999] bottom-0    h-[calc(100vh-5rem)] w-full m-auto flex items-center justify-center':
          true,
        [`${className}`]: true
      })}
    >
      <IconLoadingThreeDots className='w-[5rem] h-[5rem]' />
    </div>
  )
}

export default Loading
