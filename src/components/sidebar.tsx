import { useEffect } from 'react'

import Logo from '@components/logo'
import Button from '@components/ui/button'
import Image from '@components/ui/image'

import useCurrentPath from '@hooks/use-current-path'
import useMediaQuery from '@hooks/use-media-query'
import { useAppDispatch, useAppSelector } from '@store/store'
import { handleToggleSidebar } from '@store/ui-slice'
import menuSidebar from '@lib/data/menu-sidebar'
import { cn } from '@lib/helper/function'

const Sidebar = () => {
  const isToggleSidebar = useAppSelector((state) => state?.ui?.isToggleSidebar)
  const dispatch = useAppDispatch()
  const { currentPath } = useCurrentPath()
  const { isMaxMd } = useMediaQuery()

  useEffect(() => {
    dispatch(handleToggleSidebar(isMaxMd ? true : false))
  }, [isMaxMd])

  return (
    <div
      className={` md:z-0  min-h-screen h-screen md:relative w-fit ${
        isMaxMd && !isToggleSidebar && 'bg-black/50 fixed translate-y-0  z-[9] w-full'
      } `}
    >
      <div
        className={`sticky top-0  space-y-4 transition-all  bg-s-port  h-full ${
          isToggleSidebar ? 'w-0 p-0' : 'w-full md:w-[15rem] '
        }`}
      >
        {!isToggleSidebar && (
          <>
            <Logo
              className='cursor-pointer gap-2 p-6 flex text-white '
              onClick={() => dispatch(handleToggleSidebar(!isToggleSidebar))}
            />

            <div className=' flex flex-col gap-4 p-4'>
              {menuSidebar?.map((data, i) => (
                <Button
                  key={i}
                  to={data.url}
                  variant={'solid-white'}
                  onClick={() => (isMaxMd ? dispatch(handleToggleSidebar(true)) : null)}
                  className={cn({
                    'gap-4 w-full justify-start py-2  bg-glassmorphism  border-none hover:!text-black !text-white':
                      true,
                    'bg-white !text-black ': currentPath?.pathname?.includes(data?.name)
                  })}
                >
                  <Image
                    src={data.src || ''}
                    className={cn({
                      'w-6 h-6 bg-white border p-1 rounded-full  z-[9]': true,
                      'bg-primary-100 border-primary-700': currentPath?.pathname?.includes(
                        data?.name
                      )
                    })}
                    customeClassName={{ image: 'object-contain' }}
                    alt='icon menu sidebar'
                  />
                  <span className={cn({})}>{data?.title}</span>
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Sidebar
