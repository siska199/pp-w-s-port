import { useState } from 'react'
import skillEvent from '@event-emmitter/modules/skill/skill-event'
import skillSchema, { initialFormSkill, TSkill } from '@validation/module/skill/skill-schema'

import InputSelect from '@components/ui/input/input-select'
import ContainerModalForm from '@components/ui/modal/container-modal-form'

import useEventEmitter from '@hooks/use-event-emitter'
import { deepCopy, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function'
import { TTypeActionModalForm } from '@typescript/global.d'
import { TEventOnChange, TEventSubmitForm } from '@typescript/modules/ui/ui-types'

const FormSkill = () => {
  const [modalFormSkill, setModalFormSkill] = useState({
    isShow: false,
    action: TTypeActionModalForm.ADD
  })
  const [form, setForm] = useState(deepCopy({ ...initialFormSkill }))

  useEventEmitter(skillEvent.SET_MODAL_FORM_SKILL, (data) => {
    setModalFormSkill({ ...data })
  })

  useEventEmitter(skillEvent.SET_SKILL, (data) => {
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
    const { isValid, updatedForm } = mappingErrorsToForm<TSkill, typeof form>({
      form,
      schema: skillSchema
    })

    if (isValid) {
      handleCloseFormSkill()
    }
    setForm({
      ...updatedForm
    })
  }

  const handleCloseFormSkill = () => {
    setForm(deepCopy({ ...initialFormSkill }))
    setModalFormSkill({ ...modalFormSkill, isShow: false })
  }

  return (
    <ContainerModalForm
      moduleName={'Skill'}
      action={modalFormSkill.action}
      isShow={modalFormSkill.isShow}
      onClose={handleCloseFormSkill}
      customeClass={{ mdBody: 'md:min-w-[32rem]' }}
      onSubmit={handleOnSubmit}
    >
      <div className='grid md:grid-cols-2 gap-4'>
        <InputSelect {...form['id_category']} onChange={handleOnChange} />
        <InputSelect {...form['id_skill']} onChange={handleOnChange} />
      </div>
      <div className='grid md:grid-cols-2 gap-4'>
        <InputSelect {...form['level']} onChange={handleOnChange} />
        <InputSelect {...form['year_of_experiances']} onChange={handleOnChange} />
      </div>
    </ContainerModalForm>
  )
}

export default FormSkill
