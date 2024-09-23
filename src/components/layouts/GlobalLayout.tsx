import useCurrentPath from '@/hooks/useCurrentPath'
import { route } from '@lib/data/global'
import { useAppSelector } from '@store/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
interface TPropsGlobalLayout {
  children: React.ReactNode
}

const GlobalLayout = (props: TPropsGlobalLayout) => {
  const { children } = props
  const { currentPath } = useCurrentPath()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    if (currentPath?.pathname === '/') 
      navigate(isAuthenticated ? route.personalInformation.fullPath : route.auth.child.signIn.fullPath, { replace: true })
  }, [])

  return <>{children}</>
}

export default GlobalLayout
