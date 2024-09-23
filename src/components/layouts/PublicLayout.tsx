import { route } from '@lib/data/global'
import { useAppSelector } from '@store/store'
import { Outlet, useNavigate } from 'react-router-dom'

const PublicLayout = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  if (isAuthenticated) navigate(route.personalInformation.fullPath, { replace: true })

  return <div className='p-4  h-screen'>
    <Outlet />
  </div>
}

export default PublicLayout
