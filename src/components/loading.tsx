import { IconLoadingThreeDots } from '@assets/icons'
import { cn } from '@lib/helper'
import { HTMLProps } from 'react'


interface TPropsLoading extends HTMLProps<HTMLDivElement> {

}
const Loading = (props:TPropsLoading) => {
  const {className} = props
  return (
    <div className={cn({
      'fixed top-0 bottom-0 w-screen h-screen flex items-center justify-center':true,
      [`${className}`]:true
    })}>
      <IconLoadingThreeDots className='w-[5rem] h-[5rem]' />
    </div>
  )
}

export default Loading
