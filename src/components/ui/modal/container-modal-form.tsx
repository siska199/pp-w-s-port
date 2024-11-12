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
      customeClass={{
        mdModal: `overflow-visible ${customeClass?.mdModal}`,
        mdContent: `overflow-visible  ${customeClass?.mdContent}`,
        mdBody: `overflow-y-auto overflow-visible px-0 pb-2 ${customeClass?.mdBody}`
      }}
      {...attrs}
    >
      <form onSubmit={onSubmit} autoComplete='off' className='overflow-y-auto px-4'>
        <div className='space-y-4 w-full mx-auto  '>{children}</div>
      </form>
      <div className=''>
        <Button type='submit' className='ml-auto' onClick={onSubmit}>
          Save
        </Button>
      </div>
    </ContainerModal>
  )
}

export default ContainerModalForm
