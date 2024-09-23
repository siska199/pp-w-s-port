import { IconLoadingThreeDots } from '@assets/icons'

const Loading = () => {
  return (
    <div className='fixed top-0 bottom-0 w-screen h-screen flex bg-black/20 items-center justify-center'>
      <IconLoadingThreeDots className='w-[5rem] h-[5rem]' />
    </div>
  )
}

export default Loading
