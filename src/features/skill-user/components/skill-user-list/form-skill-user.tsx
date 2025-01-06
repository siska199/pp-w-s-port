import { useEffect, useState } from 'react'
import { eventEmitter } from '@event-emitters'

import useSkillUserAPI from '@features/skill-user/apis/use-skill-user-api'
import EVENT_SKILL_USER from '@features/skill-user/event-emitters/skill-user-event'
import skillUserSchema, {
  initialFormSkillUser,
  TOptionsFormSkillUser,
  TSkillUserSchema
} from '@features/skill-user/validation/skill-user-schema'
import InputNumber from '@components/ui/input/input-number'
import InputSelect from '@components/ui/input/input-select/input-select'
import ContainerModalForm from '@components/ui/modal/container-modal-form'
import useMasterAPI from '@apis/use-master-api'

import useEventEmitter from '@hooks/use-event-emitter'
import {
  deepCopy,
  extractValueFromForm,
  generateOptions,
  mappingErrorsToForm,
  mappingValuesToForm
} from '@lib/helper/function'
import { TTypeActionModalForm } from '@typescript/index-type'
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types'

const FormSkillUser = () => {
  const [modalForm, setModalForm] = useState({
    isShow: false,
    action: TTypeActionModalForm.ADD,
    moduleName: 'Skill User',
    customeClass: {
      mdBody: 'md:min-w-[32rem]'
    }
  })
  const [form, setForm] = useState(deepCopy({ ...initialFormSkillUser }))
  type TKeyForm = keyof typeof form

  const [options, setOptions] = useState<TOptionsFormSkillUser>({
    categories: [],
    skills: []
  })
  const { getListMasterCategorySkill, getListMasterSkill } = useMasterAPI()
  const { upsertSkillUser } = useSkillUserAPI()

  useEffect(() => {
    handleInitData()
  }, [])

  useEventEmitter(EVENT_SKILL_USER.SET_MODAL_FORM_SKILL_USER, (data) => {
    setModalForm({
      ...modalForm,
      ...data
    })
  })

  useEventEmitter(EVENT_SKILL_USER.SET_SKILL_USER, (data) => {
    setForm({ ...mappingValuesToForm({ values: data, form }) })
  })

  const handleInitData = async () => {
    try {
      const updateForm = form
      const categories = generateOptions({
        options: (await getListMasterCategorySkill())?.data || []
      })
      const skills = generateOptions({
        options: (await getListMasterSkill())?.data || [],
        listSaveField: ['id_category']
      })

      updateForm['id_category'].options = categories
      updateForm['id_skill'].options = skills

      setOptions({
        categories: [...categories],
        skills: [...skills]
      })

      setForm({
        ...updateForm
      })
    } catch (error: any) {
      console.log('error: ', error?.message)
    }
  }

  const handleOnChange = (e: TEventOnChange) => {
    const name = e.target.name as TKeyForm
    let value = e.target.value
    const currForm = form
    currForm[name].value = value

    if (name === 'id_category') {
      currForm['id_skill'].options = options['skills']?.filter(
        (data: any) => data?.id_category === value
      )
      currForm['id_skill'].disabled = !value
      currForm['id_skill'].value = ''
    }

    if (name === 'years_of_experiance') {
      value = Number(value)
    }

    currForm[name].value = value

    setForm({
      ...currForm
    })
  }

  const handleOnSubmit = async (e: TEventSubmitForm) => {
    e?.preventDefault()
    const { isValid, form: updatedForm } = mappingErrorsToForm<TSkillUserSchema, typeof form>({
      form,
      schema: skillUserSchema
    })

    setForm({
      ...updatedForm
    })

    if (isValid) {
      const extractForm = extractValueFromForm(form)
      const result = await upsertSkillUser({
        ...extractForm,
        id: extractForm?.id || undefined,
        years_of_experiance: Number(extractForm?.years_of_experiance)
      })
      if (result?.status) {
        handleCloseFormSkill()
        eventEmitter.emit(EVENT_SKILL_USER.REFRESH_DATA_TABLE_SKILL_USER, true)
      }
    }
  }

  const handleCloseFormSkill = () => {
    initialFormSkillUser['id_category'].options = options.categories
    initialFormSkillUser['id_skill'].options = options.skills
    setForm(deepCopy({ ...initialFormSkillUser }))
    setModalForm({ ...modalForm, isShow: false })
  }

  return (
    <ContainerModalForm {...modalForm} onClose={handleCloseFormSkill} onSubmit={handleOnSubmit}>
      <div className='grid md:grid-cols-2 gap-4'>
        <InputSelect {...form['id_category']} onChange={handleOnChange} />
        <InputSelect {...form['id_skill']} onChange={handleOnChange} />
      </div>
      <div className='grid md:grid-cols-2 gap-4'>
        <InputSelect {...form['level']} onChange={handleOnChange} />
        <InputNumber
          {...form['years_of_experiance']}
          onChange={handleOnChange}
          customeElement={{
            preStart: '±',
            end: 'years'
          }}
        />
      </div>
    </ContainerModalForm>
  )
}

export default FormSkillUser
