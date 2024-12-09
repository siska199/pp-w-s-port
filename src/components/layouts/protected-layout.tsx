import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'

import useAuth from '@features/auth/hooks/use-auth'
import Navbar from '@components/navbar'
import Sidebar from '@components/sidebar'

import useCurrentPath from '@hooks/use-current-path'

const ProtectedLayout = () => {
  const refContainerPage = useRef<HTMLDivElement>(null)
  const { currentPath } = useCurrentPath()

  useAuth({ componentName: 'ProtectedLayout' })

  useEffect(() => {
    refContainerPage?.current?.scrollTo(0, 0)
  }, [currentPath])

  return (
    <main className='w-full  flex  max-h-screen relative '>
      <Sidebar />
      <div
        ref={refContainerPage}
        className='flex-grow relative overflow-x-auto min-h-full max-w-full w-full '
      >
        <Navbar />
        <div className='relative max-w-full w-full overflow-auto  flex-grow  '>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default ProtectedLayout
