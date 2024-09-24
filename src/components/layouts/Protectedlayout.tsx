import Navbar from '@components/navbar'
import Sidebar from '@components/sidebar'
import { route } from '@lib/data/global'
import { useAppSelector } from '@store/store'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Protectedlayout = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated)
      navigate(route.auth.child.signIn.fullPath, { replace: true })
  }, [])

  return (
    <main className="w-full  flex  max-h-screen relative ">
    <Sidebar />
    <div className="flex-grow relative min-h-full ">
      <Navbar />
      <div className="flex-grow min-h-[calc(100%-5rem)] max-h-[calc(100%-5rem)] bg-background p-4 md:p-8  overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  </main>
  )
}

export default Protectedlayout
