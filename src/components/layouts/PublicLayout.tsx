import { route } from '@lib/data/global'
import { useAppSelector } from '@store/store'
import { Outlet, useNavigate } from 'react-router-dom'

const PublicLayout = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  if (isAuthenticated) navigate(route.personalInformation.fullPath, { replace: true })

  return (
    <main className='border h-screen p-4'>
      <Outlet />
    </main>
  )
}

export default PublicLayout
