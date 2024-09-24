import { route } from '@lib/data/global'
import { useAppSelector } from '@store/store'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const PublicLayout = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  useEffect(()=>{
    if (isAuthenticated) navigate(route.personalInformation.fullPath, { replace: true })
  },[isAuthenticated])

  return <div className=' h-screen'>
    <Outlet />
  </div>
}

export default PublicLayout
