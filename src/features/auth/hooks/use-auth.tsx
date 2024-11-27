import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { handleSetAuth, TStateAuth } from '@features/auth/store/auth-slice'

import useCurrentPath from '@hooks/use-current-path'
import { useAppDispatch, useAppSelector } from '@store/store'
import STORAGE_VARIABLE from '@lib/config/storage-variable'
import { getItemSecureWebstorage } from '@lib/helper/secure-storage'
import { routes } from '@routes/constant'

export enum TTypeComponentNameUseAuth {
  ProtectedLayout = 'ProtectedLayout',
  GlobalLayout = 'GlobalLayout'
}

const useAuth = (props: { componentName: TTypeComponentNameUseAuth }) => {
  const { componentName } = props
  const navigate = useNavigate()
  const { currentPath } = useCurrentPath()
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector((state) => state?.auth?.isAuthenticated)
  const isRememberMe = getItemSecureWebstorage(STORAGE_VARIABLE.IS_REMEMBER_ME)
  const authStorage = getItemSecureWebstorage<TStateAuth>(
    STORAGE_VARIABLE.AUTH,
    isRememberMe ? localStorage : sessionStorage
  )

  useEffect(() => {
    if (
      !isAuthenticated &&
      !authStorage?.isAuthenticated &&
      componentName === TTypeComponentNameUseAuth.ProtectedLayout
    )
      navigate(routes?.auth?.fullPath, { replace: true })
  }, [])

  useEffect(() => {
    if (
      (currentPath?.pathname === '/' || !currentPath?.pathname) &&
      TTypeComponentNameUseAuth.GlobalLayout
    )
      navigate(
        (isAuthenticated && authStorage?.isAuthenticated
          ? routes?.personalInformation?.fullPath
          : routes?.auth?.fullPath) || '',
        { replace: true }
      )
  }, [currentPath])

  useEffect(() => {
    if (authStorage && TTypeComponentNameUseAuth.GlobalLayout) {
      dispatch(handleSetAuth(authStorage))
    }
  }, [JSON.stringify(authStorage)])

  return { isAuthenticated, authStorage }
}

export default useAuth
