/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from 'react'

import useAuth, { TTypeComponentNameUseAuth } from '@features/auth/hooks/use-auth'
import ContainerModal from '@components/ui/modal/container-modal'
import ModalConfirmation from '@components/ui/modal/container-modal-confirmation'

import { useAppDispatch, useAppSelector } from '@store/store'
import { handleSetModal, handleSetModalConfirmation, initialStateAuthSlice } from '@store/ui-slice'
interface TPropsGlobalLayout {
  children: React.ReactNode
}

const GlobalLayout = (props: TPropsGlobalLayout) => {
  const { children } = props

  const dispatch = useAppDispatch()
  const modalConfirmation = useAppSelector((state) => state?.ui?.modalConfirmation)
  const modal = useAppSelector((state) => state?.ui?.modal)

  useAuth({ componentName: TTypeComponentNameUseAuth.GlobalLayout })

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
