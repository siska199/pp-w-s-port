import React, { useCallback, useState } from 'react'

import EVENT_EDUCATION from '@features/education/event-emitters/education-event'
import educationSchema, {
  initialFormEducation,
  TEducationSchema
} from '@features/education/validations/education-schema'
import InputDate from '@components/ui/input/input-date'
import InputSelect from '@components/ui/input/input-select/input-select'
import ContainerModalForm from '@components/ui/modal/container-modal-form'

import useEventEmitter from '@hooks/use-event-emitter'
import { deepCopy, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function'
import { TTypeActionModalForm } from '@typescript/index-type'
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types'

const InputTextEditor = React.lazy(() => import('@components/ui/input/input-text-editor'))

const FormEducation = () => {
  const [modalForm, setModalForm] = useState({
    moduleName: 'Education',
    isShow: false,
    action: TTypeActionModalForm.ADD,
    customeClass: { mdBody: '  md:min-w-[38rem]  space-y-4' }
  })
  const [form, setForm] = useState(deepCopy({ ...initialFormEducation }))

  useEventEmitter(EVENT_EDUCATION.SET_MODAL_FORM_EDUCATION, (data) => {
    setModalForm({
      ...modalForm,
      ...data
    })
  })

  useEventEmitter(EVENT_EDUCATION.SET_EDUCATION, (data) => {
    setForm({ ...mappingValuesToForm({ values: data, form }) })
  })

  const handleOnChange = useCallback((e: TEventOnChange) => {
    const name = e.target.name as keyof typeof form
    const value = e.target.value
    const currForm = form
    currForm[name].value = value

    setForm({
      ...currForm
    })
  }, [])

  const handlleCloseFormEducation = () => {
    setForm(deepCopy({ ...initialFormEducation }))
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
