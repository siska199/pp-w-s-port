import Navbar from '@components/navbar'
import useCurrentPath from '@hooks/useCurrentPath'
import { route } from '@lib/data/global'
import { useAppSelector } from '@store/store'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const PublicLayout = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const {currentPath : {handle}}   = useCurrentPath()

  useEffect(()=>{
    if (isAuthenticated) navigate(route.personalInformation.fullPath, { replace: true })
  },[isAuthenticated])

  return (
    <div className={`${handle?.name==="portofolio"&&' bg-sport-plain '}   h-screen relative  w-full`}>
      <div className='absolute top-0 bg-glassmorphism h-full w-full '>
        {handle?.name==="portofolio" && <Navbar/>}
        <Outlet />
      </div>
  </div>
  )
}

export default PublicLayout
