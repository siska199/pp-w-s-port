import React from 'react'

import Button from '@components/ui/button'
import ContainerModal, { TContainerModalProps } from '@components/ui/modal/container-modal'

import { TTypeActionModalForm } from '@typescript/global.d'
import { TEventSubmitForm } from '@typescript/ui-types'

interface TCustomeClass extends TContainerModalProps {
  form?: string
  containerInputs?: string
}

interface TProps extends TContainerModalProps, TCustomeClass {
  moduleName: string
  action: TTypeActionModalForm
  children: React.ReactNode
  onSubmit: (e: TEventSubmitForm) => void
}

const ContainerModalForm = (props: TProps) => {
  const { action, children, moduleName, onSubmit, customeClass, ...attrs } = props

  return (
    <ContainerModal
      title={
        <>
          <div className='capitalize'>Form {moduleName}</div>
          <div className='text-body-base font-normal'>
            Action: {action === TTypeActionModalForm.ADD ? 'Add' : 'Edit'}
          </div>
        </>
      }
      footer={
        <Button type='submit' className='ml-auto' onClick={onSubmit}>
          Save
        </Button>
      }
      customeClass={{
        mdModal: `overflow-visible ${customeClass?.mdModal}`,
        mdContent: `overflow-visible  ${customeClass?.mdContent}`,
        mdBody: ` ${customeClass?.mdBody}`,
        mdFooter: 'mr-6'
      }}
      {...attrs}
    >
      <form onSubmit={onSubmit} autoComplete='off' className=' w-full space-y-4 h-full mx-auto '>
        {children}
      </form>
    </ContainerModal>
  )
}

export default React.memo(ContainerModalForm)
