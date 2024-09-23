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
    <main>
      <Outlet />
    </main>
  )
}

export default Protectedlayout
