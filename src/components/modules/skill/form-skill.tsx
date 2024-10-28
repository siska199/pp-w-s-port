import { useContext, useEffect, useState } from 'react'

import Button from '@components/ui/button'
import InputSelect from '@components/ui/input/input-select'
import ContainerModal from '@components/ui/modal/container-modal'

import { ACTION_TYPE_SKILL, skillContext } from '@context/modules/skill/skill-context'
import { deepCopy, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper'
import skillSchema, {
  initialFormSkill,
  TFormSkill
} from '@lib/validation/module/skill/skill-schema'
import { TTypeActionModalForm } from '@typescript/global.d'
import { TEventOnChange } from '@typescript/modules/ui/ui-types'

const FormSkill = () => {
  const {
    state: { modalFormSkill, skill },
    dispatch
  } = useContext(skillContext)

  const [form, setForm] = useState(deepCopy({ ...initialFormSkill }))

  useEffect(() => {
    setForm({ ...mappingValuesToForm({ values: skill, form }) })
  }, [skill])

  const handlleCloseFormSkill = () => {
    dispatch({
      type: ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL,
      payload: {
        isShow: false
      }
    })
    setForm({ ...initialFormSkill })
  }

  const handleOnChange = (e: TEventOnChange) => {
    const name = e.target.name as keyof typeof form
    const value = e.target.value
    const currForm = form
    currForm[name].value = value

    setForm({
      ...currForm
    })
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    const { isValid, updatedForm } = mappingErrorsToForm<TFormSkill, typeof form>({
      form,
      schema: skillSchema
    })

    if (isValid) {
      handlleCloseFormSkill()
    }
    setForm({
      ...updatedForm
    })
  }

  return (
    <ContainerModal
      isShow={modalFormSkill.isShow}
      onClose={handlleCloseFormSkill}
      title={
        <>
          <div>Form Skill</div>
          <div className='text-body-base font-normal'>
            Action: {modalFormSkill.action === TTypeActionModalForm.ADD ? 'Add' : 'Edit'}
          </div>
        </>
      }
      customeClass={{
        mdBody: '!overflow-visible',
        mdContent: '!overflow-visible w-[32rem]',
        mdModal: '!overflow-visible'
      }}
    >
      <form onSubmit={handleOnSubmit} className='space-y-4 w-full mx-auto'>
        <div className='grid md:grid-cols-2 gap-4'>
          <InputSelect {...form['id_category']} onChange={handleOnChange} />
          <InputSelect {...form['id_skill']} onChange={handleOnChange} />
        </div>
        <div className='grid md:grid-cols-2 gap-4'>
          <InputSelect {...form['level']} onChange={handleOnChange} />
          <InputSelect {...form['year_of_experiances']} onChange={handleOnChange} />
        </div>
        <Button type='submit' className='ml-auto'>
          Save
        </Button>
      </form>
    </ContainerModal>
  )
}

export default FormSkill
