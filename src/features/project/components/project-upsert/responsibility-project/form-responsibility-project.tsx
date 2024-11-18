import { useCallback, useState } from 'react'

import EVENT_PROJECT from '@features/project/event-emitters/project-event'
import { initialFormResponsibilityProject } from '@features/project/validation/responsiblity-project-schema'
import InputTextEditor from '@components/ui/input/input-text-editor'
import ContainerModalForm from '@components/ui/modal/container-modal-form'

import useEventEmitter from '@hooks/use-event-emitter'
import { deepCopy } from '@lib/helper/function'
import { TTypeActionModalForm } from '@typescript/global.d'
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types'

const FormResponsiblityProject = () => {
  const [modalForm, setModalForm] = useState({
    moduleName: 'Menu Project',
    isShow: false,
    action: TTypeActionModalForm.ADD,
    customeClass: { mdBody: '  md:min-w-[38rem]  space-y-4' }
  })
  const [form, setForm] = useState(deepCopy(initialFormResponsibilityProject))
  type TKeyForm = keyof typeof form
  useEventEmitter(EVENT_PROJECT.SET_MODAL_FORM_RESPONSIBILITY_PROJECT, (data) => {
    setModalForm({
      ...modalForm,
      ...data
    })
  })

  const handleOnChange = useCallback((e: TEventOnChange) => {
    const currForm = form
    const name = e.target.name as TKeyForm
    const value = e.target.value
    currForm[name].value = value

    setForm({
      ...currForm
    })
  }, [])
  const handleCloseModalForm = () => {
    setForm(deepCopy({ ...initialFormResponsibilityProject }))
    setModalForm({
      ...modalForm,
      isShow: false
    })
  }

  const handleOnSubmit = (e: TEventSubmitForm) => {
    e?.preventDefault()
  }

  return (
    <ContainerModalForm {...modalForm} onClose={handleCloseModalForm} onSubmit={handleOnSubmit}>
      <InputTextEditor onChange={handleOnChange} {...form['description']} />
    </ContainerModalForm>
  )
}

export default FormResponsiblityProject
