import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ModalConfirmation from '@components/ui/modal/container-modal-confirmation'

import useCurrentPath from '@hooks/use-current-path'
import { handleSetModalConfirmation } from '@store/modules/ui/ui-slice'
import { useAppDispatch, useAppSelector } from '@store/store'
import { routes } from '@routes/constant'
interface TPropsGlobalLayout {
  children: React.ReactNode
}

const GlobalLayout = (props: TPropsGlobalLayout) => {
  const { children } = props

  const { currentPath } = useCurrentPath()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const modalConfirmation = useAppSelector((state) => state?.ui?.modalConfirmation)

  useEffect(() => {
    if (currentPath?.pathname === '/')
      navigate(
        (isAuthenticated ? routes.personalInformation.fullPath : routes?.auth?.fullPath) || '',
        { replace: true }
      )
  }, [currentPath])

  useEffect(() => {
    dispatch(handleSetModalConfirmation({ isShow: false }))
  }, [])

  return (
    <>
      {children}
      <ModalConfirmation
        {...modalConfirmation}
        button={{
          ...modalConfirmation?.button,
          cancel: {
            ...modalConfirmation?.button?.cancel,
            onClick: () => dispatch(handleSetModalConfirmation({ isShow: false }))
          }
        }}
      />
    </>
  )
}

export default GlobalLayout
