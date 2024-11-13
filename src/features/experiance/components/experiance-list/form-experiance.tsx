import { useState } from 'react'

import EVENT_EXPERIANCE from '@features/experiance/event-emitters/experiance-event'
import experianceSchema, {
  initialFormExperiance,
  TExperianceSchema
} from '@features/experiance/validation/experiance-schema'
import InputDate from '@components/ui/input/input-date'
import InputSelect from '@components/ui/input/input-select'
import InputTextEditor from '@components/ui/input/input-text-editor'
import ContainerModalForm from '@components/ui/modal/container-modal-form'

import useEventEmitter from '@hooks/use-event-emitter'
import { deepCopy, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function'
import { TTypeActionModalForm } from '@typescript/global.d'
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types'

const FormExperiance = () => {
  const [modalForm, setModalForm] = useState({
    isShow: false,
    action: TTypeActionModalForm.ADD
  })

  const [form, setForm] = useState(deepCopy({ ...initialFormExperiance }))

  useEventEmitter(EVENT_EXPERIANCE.SET_MODAL_FORM_EXPERIANCE, (data) => {
    setModalForm({ ...data })
  })

  useEventEmitter(EVENT_EXPERIANCE.SET_EXPERIANCE, (data) => {
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

  const handleOnSubmit = (e: TEventSubmitForm) => {
    e?.preventDefault()
    const { isValid, updatedForm } = mappingErrorsToForm<TExperianceSchema, typeof form>({
      form,
      schema: experianceSchema
    })

    if (isValid) {
      handleCloseFormExperiance()
    }
    setForm({
      ...updatedForm
    })
  }

  const handleCloseFormExperiance = () => {
    setForm(deepCopy({ ...initialFormExperiance }))
    setModalForm({ ...modalForm, isShow: false })
  }

  return (
    <ContainerModalForm
      moduleName={'Experiance'}
      {...modalForm}
      onClose={handleCloseFormExperiance}
      customeClass={{ mdBody: 'md:min-w-[38rem]' }}
      onSubmit={handleOnSubmit}
    >
      <div className='grid md:grid-cols-2 gap-4'>
        <InputSelect {...form['id_company']} onChange={handleOnChange} />
        <InputSelect {...form['id_profession']} onChange={handleOnChange} />
      </div>
      <div className='grid md:grid-cols-2 gap-4'>
        <InputDate {...form['start_at']} onChange={handleOnChange} />
        <InputDate {...form['end_at']} onChange={handleOnChange} />
      </div>
      <InputTextEditor {...form['description']} onChange={handleOnChange} />
    </ContainerModalForm>
  )
}

export default FormExperiance
