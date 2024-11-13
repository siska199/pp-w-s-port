import { useState } from 'react'

import EVENT_EDUCATION from '@features/education/event-emitters/education-event'
import educationSchema, {
  initialFormEducation,
  TEducationSchema
} from '@features/education/validations/education-schema'
import InputDate from '@components/ui/input/input-date'
import InputSelect from '@components/ui/input/input-select'
import InputTextEditor from '@components/ui/input/input-text-editor'
import ContainerModalForm from '@components/ui/modal/container-modal-form'

import useEventEmitter from '@hooks/use-event-emitter'
import { deepCopy, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function'
import { TTypeActionModalForm } from '@typescript/global.d'
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types'

const FormEducation = () => {
  const [modalForm, setModalForm] = useState({
    isShow: false,
    action: TTypeActionModalForm.ADD
  })
  const [form, setForm] = useState(deepCopy({ ...initialFormEducation }))

  useEventEmitter(EVENT_EDUCATION.SET_MODAL_FORM_EDUCATION, (data) => {
    setModalForm({
      ...data
    })
  })

  useEventEmitter(EVENT_EDUCATION.SET_EDUCATION, (data) => {
    setForm({ ...mappingValuesToForm({ values: data, form }) })
  })

  const handleOnChange = (e: TEventOnChange) => {
    const name = e.target.name as keyof typeof form
    const value = e.target.value
    const currForm = form
    currForm[name].value = value

    setForm({
      ...currForm
    })
  }

  const handlleCloseFormEducation = () => {
    setForm(deepCopy({ ...initialFormEducation }))
    setModalForm({
      ...modalForm,
      isShow: false
    })
  }

  const handleOnSubmit = (e: TEventSubmitForm) => {
    e?.preventDefault()
    const { isValid, updatedForm } = mappingErrorsToForm<TEducationSchema, typeof form>({
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
      moduleName='Education'
      action={modalForm.action}
      isShow={modalForm.isShow}
      onClose={handlleCloseFormEducation}
      onSubmit={handleOnSubmit}
      customeClass={{ mdBody: '  md:min-w-[38rem]  space-y-4' }}
    >
      <div className='grid md:grid-cols-2 gap-4'>
        <InputSelect {...form['id_level']} onChange={handleOnChange} />
        <InputSelect {...form['id_major']} onChange={handleOnChange} />
      </div>
      <InputSelect {...form['id_school']} onChange={handleOnChange} />
      <div className='grid md:grid-cols-2 gap-4 overflow-visible'>
        <InputDate {...form['start_at']} onChange={handleOnChange} />
        <InputDate
          {...form['end_at']}
          minDate={form.start_at.value ?? undefined}
          onChange={handleOnChange}
        />
      </div>
      <InputTextEditor {...form['description']} onChange={handleOnChange} />
    </ContainerModalForm>
  )
}

export default FormEducation
