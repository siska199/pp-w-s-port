import { useCallback, useEffect, useState } from 'react'

import EVENT_SKILL_USER from '@features/skill-user/event-emitters/skill-user-event'
import skillUserSchema, {
  initialFormSkillUser,
  TSkillUserSchema
} from '@features/skill-user/validation/skill-user-schema'
import InputSelect from '@components/ui/input/input-select/input-select'
import ContainerModalForm from '@components/ui/modal/container-modal-form'

import useEventEmitter from '@hooks/use-event-emitter'
import { deepCopy, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function'
import { TTypeActionModalForm } from '@typescript/index-type'
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types'

const FormSkillUser = () => {
  const [modalForm, setModalForm] = useState({
    isShow: false,
    action: TTypeActionModalForm.ADD
  })
  const [form, setForm] = useState(deepCopy({ ...initialFormSkillUser }))

  useEffect(() => {
    handleInitData()
  }, [])

  useEventEmitter(EVENT_SKILL_USER.SET_MODAL_FORM_SKILL, (data) => {
    setModalForm({ ...data })
  })

  useEventEmitter(EVENT_SKILL_USER.SET_SKILL, (data) => {
    setForm({ ...mappingValuesToForm({ values: data, form }) })
  })

  const handleInitData = async () => {
    try {
      //
    } catch (error: any) {
      console.log('error: ', error?.message)
    }
  }

  const handleOnChange = useCallback((e: TEventOnChange) => {
    const name = e.target.name as keyof typeof form
    const value = e.target.value
    const currForm = form
    currForm[name].value = value

    setForm({
      ...currForm
    })
  }, [])

  const handleOnSubmit = (e: TEventSubmitForm) => {
    e?.preventDefault()
    const { isValid, form: updatedForm } = mappingErrorsToForm<TSkillUserSchema, typeof form>({
      form,
      schema: skillUserSchema
    })

    if (isValid) {
      handleCloseFormSkill()
    }
    setForm({
      ...updatedForm
    })
  }

  const handleCloseFormSkill = () => {
    setForm(deepCopy({ ...initialFormSkillUser }))
    setModalForm({ ...modalForm, isShow: false })
  }

  return (
    <ContainerModalForm
      moduleName={'Skill'}
      action={modalForm.action}
      isShow={modalForm.isShow}
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
        <InputSelect {...form['years_of_experiance']} onChange={handleOnChange} />
      </div>
    </ContainerModalForm>
  )
}

export default FormSkillUser
