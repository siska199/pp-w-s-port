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
  const dispatchR = useAppDispatch()

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const modalConfirmation = useAppSelector((state) => state?.ui?.modalConfirmation)

  useEffect(() => {
    if (currentPath?.pathname === '/')
      navigate(
        (isAuthenticated
          ? routes.personalInformation.fullPath
          : routes?.auth?.child?.signIn.fullPath) || '',
        { replace: true }
      )
  }, [currentPath])

  return (
    <>
      {children}
      <ModalConfirmation
        {...modalConfirmation}
        button={{
          ...modalConfirmation?.button,
          cancel: {
            ...modalConfirmation?.button?.cancel,
            onClick: () => dispatchR(handleSetModalConfirmation({ isShow: false }))
          }
        }}
      />
    </>
  )
}

export default GlobalLayout
