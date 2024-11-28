import React, { useContext, useState } from 'react'

import educationSchema, { TEducationSchema } from '@features/education/validations/education-schema'
import { contextFormProject } from '@features/project/context/form-project-context'
import EVENT_PROJECT from '@features/project/event-emitters/project-event'
import { initialFormMenuProject } from '@features/project/validation/menu-project-schema'
import InputBase from '@components/ui/input/input-base'
import InputFileV1 from '@components/ui/input/input-file/input-file-v1'
import InputFileV2 from '@components/ui/input/input-file/input-file-v2'
import InputTextArea from '@components/ui/input/input-text-area'
import InputTextEditor from '@components/ui/input/input-text-editor'
import ContainerModalForm from '@components/ui/modal/container-modal-form'

import useEventEmitter from '@hooks/use-event-emitter'
import { deepCopy, mappingErrorsToForm } from '@lib/helper/function'
import { TTypeActionModalForm } from '@typescript/index-type'
import { TEventSubmitForm } from '@typescript/ui-types'

const FormMenuProject = () => {
  const {
    formMenuProject: form,
    handleOnChangeFormMenuProject: handleOnChange,
    setFormMenuProject: setForm
  } = useContext(contextFormProject)

  const [modalForm, setModalForm] = useState({
    moduleName: 'Menu Project',
    isShow: false,
    action: TTypeActionModalForm.ADD,
    customeClass: { mdBody: '  md:min-w-[38rem]  space-y-4' }
  })

  useEventEmitter(EVENT_PROJECT.SET_MODAL_FORM_MENU_PROJECT, (data) => {
    setModalForm({
      ...modalForm,
      ...data
    })
  })

  const handlleCloseFormEducation = () => {
    setForm(deepCopy({ ...initialFormMenuProject }))
    setModalForm({
      ...modalForm,
      isShow: false
    })
  }

  const handleOnSubmit = (e: TEventSubmitForm) => {
    e?.preventDefault()
    const { isValid, form: updatedForm } = mappingErrorsToForm<TEducationSchema, typeof form>({
      form,
      schema: educationSchema
    })

    if (isValid) {
      handlleCloseFormEducation()
    }

    setForm({
      ...updatedForm
    })
  }

  return (
    <ContainerModalForm
      {...modalForm}
      onClose={handlleCloseFormEducation}
      onSubmit={handleOnSubmit}
    >
      <InputBase {...form['name']} onChange={handleOnChange} />
      <InputFileV1 {...form['main_image']} onChange={handleOnChange} />
      <InputTextArea {...form['description']} onChange={handleOnChange} />
      <InputTextEditor {...form['features']} onChange={handleOnChange} />
      <InputFileV2 {...form['related_images']} onChange={handleOnChange} />
    </ContainerModalForm>
  )
}

export default React.memo(FormMenuProject)
