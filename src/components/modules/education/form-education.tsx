import { useContext, useEffect, useState } from 'react'

import InputDate from '@components/ui/input/input-date'
import InputSelect from '@components/ui/input/input-select'
import InputTextEditor from '@components/ui/input/input-text-editor'
import ContainerModalForm from '@components/ui/modal/container-modal-form'

import { educationContext } from '@context/modules/education/education-context'
import { deepCopy, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function'
import educationSchema, {
  initialFormEducation,
  TFormEducation
} from '@lib/validation/module/education/education-schema'
import { TEventOnChange } from '@typescript/modules/ui/ui-types'

const FormEducation = () => {
  const { modalFormEducation, education, handleToggleModalFormEducation } =
    useContext(educationContext)
  const [form, setForm] = useState(deepCopy({ ...initialFormEducation }))

  useEffect(() => {
    setForm({ ...mappingValuesToForm({ values: education, form }) })
  }, [education])

  useEffect(() => {
    handlleCloseFormEducation()
  }, [])

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
    handleToggleModalFormEducation({
      isShow: false,
      action: modalFormEducation?.action
    })
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    const { isValid, updatedForm } = mappingErrorsToForm<TFormEducation, typeof form>({
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
      action={modalFormEducation.action}
      isShow={modalFormEducation.isShow}
      onClose={handlleCloseFormEducation}
      onSubmit={handleOnSubmit}
      customeClass={{ mdBody: '  md:w-auto  space-y-4' }}
    >
      <div className='grid md:grid-cols-2 gap-4'>
        <InputSelect {...form['id_level']} onChange={handleOnChange} />
        <InputSelect {...form['id_major']} onChange={handleOnChange} />
      </div>
      <InputSelect {...form['id_school']} onChange={handleOnChange} />
      <div className='grid md:grid-cols-2 gap-4 overflow-visible'>
        <InputDate {...form['start_at']} onChange={handleOnChange} />
        <InputDate {...form['end_at']} onChange={handleOnChange} />
      </div>
      <InputTextEditor {...form['description']} onChange={handleOnChange} />
    </ContainerModalForm>
  )
}

export default FormEducation
