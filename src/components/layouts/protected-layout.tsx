import { useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Navbar from '@components/navbar'
import Sidebar from '@components/sidebar'

import useCurrentPath from '@hooks/use-current-path'
import { useAppSelector } from '@store/store'
import { routes } from '@routes/constant'

const Protectedlayout = () => {
  const refContainerPage = useRef<HTMLDivElement>(null)

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const navigate = useNavigate()
  const { currentPath } = useCurrentPath()

  useEffect(() => {
    if (!isAuthenticated) navigate(routes?.auth?.fullPath, { replace: true })
  }, [])

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

export default Protectedlayout
