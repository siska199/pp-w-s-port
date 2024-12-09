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
  const isProtectedLayout = componentName === TTypeComponentNameUseAuth.ProtectedLayout
  const isGlobalLayout = TTypeComponentNameUseAuth.GlobalLayout === componentName

  /*------------------------PROTECTED LAYOUT AUTH-------------------------------------------- */
  useEffect(() => {
    if (!isAuthenticated && !authStorage?.isAuthenticated && isProtectedLayout)
      navigate(routes?.auth?.fullPath, { replace: true })
  }, [])

  /*------------------------GLOBAL LAYOUT AUTH-------------------------------------------- */

  useEffect(() => {
    if (['/', null, undefined]?.includes(currentPath?.pathname) && isGlobalLayout)
      navigate(
        (isAuthenticated && authStorage?.isAuthenticated
          ? routes?.personalInformation?.fullPath
          : routes?.auth?.fullPath) || '',
        { replace: true }
      )
  }, [currentPath])

  useEffect(() => {
    if (authStorage && isGlobalLayout) {
      dispatch(handleSetAuth(authStorage))
    }
  }, [JSON.stringify(authStorage)])

  return { isAuthenticated, authStorage }
}

export default useAuth
