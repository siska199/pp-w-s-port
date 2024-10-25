import useCurrentPath from '@hooks/use-current-path'
import ModalConfirmation from '@components/ui/modal/modal-confirmation'
import { routes } from '@routes/constant'
import { useAppDispatch, useAppSelector } from '@store/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSetModalConfirmation } from '@store/modules/ui/ui-slice'
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
            onClick: () => dispatch(handleSetModalConfirmation({ isShow: false }))
          }
        }}
      />
    </>
  )
}

export default GlobalLayout
