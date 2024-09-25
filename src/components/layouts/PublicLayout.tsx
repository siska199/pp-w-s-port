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

  console.log(handle)

  return <div className=' overflow-y-auto h-screen relative '>
    {handle?.name==="portofolio" && <Navbar/>}
    <Outlet />
  </div>
}

export default PublicLayout
