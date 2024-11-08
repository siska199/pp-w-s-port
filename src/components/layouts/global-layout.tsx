/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ContainerModal from '@components/ui/modal/container-modal'
import ModalConfirmation from '@components/ui/modal/container-modal-confirmation'

import useCurrentPath from '@hooks/use-current-path'
import {
  handleSetModal,
  handleSetModalConfirmation,
  initialStateAuthSlice
} from '@store/modules/ui/ui-slice'
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

  const isAuthenticated = useAppSelector((state) => state?.auth?.isAuthenticated)
  const modalConfirmation = useAppSelector((state) => state?.ui?.modalConfirmation)
  const modal = useAppSelector((state) => state?.ui?.modal)

  useEffect(() => {
    if (currentPath?.pathname === '/' || !currentPath?.pathname)
      navigate(
        (isAuthenticated ? routes?.personalInformation?.fullPath : routes?.auth?.fullPath) || '',
        { replace: true }
      )
  }, [currentPath])

  useEffect(() => {
    dispatch(handleSetModalConfirmation({ ...initialStateAuthSlice?.modalConfirmation }))
    dispatch(handleSetModal({ ...initialStateAuthSlice?.modal }))
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
            onClick: () =>
              dispatch(handleSetModalConfirmation({ ...initialStateAuthSlice?.modalConfirmation }))
          }
        }}
      />
      <ContainerModal
        {...modal}
        isShow={modal?.isShow || false}
        // @ts-expect-error
        children={modal?.children?._source ? modal?.children : <></>}
        onClose={() => dispatch(handleSetModal({ ...initialStateAuthSlice?.modal }))}
      />
    </>
  )
}

export default GlobalLayout
