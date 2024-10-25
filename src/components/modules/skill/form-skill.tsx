import Button from '@components/ui/button'
import InputSelect from '@components/ui/input/input-select'
import ContainerModal from '@components/ui/modal/container-modal'
import {
  ACTION_TYPE_SKILL,
  skillContext,
  TTypeActionModalFormSkill
} from '@context/modules/skill/skill-context'
import { initialFormSkill } from '@lib/validation/module/skill/skill-schema'
import { TEventOnChange } from '@typescript/modules/ui/ui-types'

import { useContext, useState } from 'react'

const FormSkill = () => {
  const {
    state: { modalFormSkill },
    dispatch
  } = useContext(skillContext)

  const [form, setForm] = useState(initialFormSkill)

  const handlleCloseFormSkill = () => {
    dispatch({
      type: ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL,
      payload: {
        isShow: false
      }
    })
  }

  const handleOnChange = (e: TEventOnChange) => {
    const name = e.target.name as keyof typeof form
    const value = e.target.value
    const currForm = form
    currForm[name] = value

    setForm({
      ...currForm
    })
  }

  const handleOnSubmit = () => {}

  return (
    <ContainerModal
      isShow={modalFormSkill.isShow}
      onClose={handlleCloseFormSkill}
      title={
        <>
          <div>Form Skill</div>
          <div className='text-body-base font-normal'>
            Action: {modalFormSkill.action === TTypeActionModalFormSkill.ADD ? 'Add' : 'Edit'}
          </div>
        </>
      }
      customeClass={{
        mdBody: '!overflow-visible',
        mdContent: '!overflow-visible w-[32rem]',
        mdModal: '!overflow-visible'
      }}
    >
      <form className='space-y-4 w-full mx-auto'>
        <div className='grid md:grid-cols-2 gap-4'>
          <InputSelect {...form['id_category']} onChange={handleOnChange} />
          <InputSelect {...form['skill']} onChange={handleOnChange} />
        </div>
        <div className='grid md:grid-cols-2 gap-4'>
          <InputSelect {...form['level']} onChange={handleOnChange} />
          <InputSelect {...form['year_of_experiance']} onChange={handleOnChange} />
        </div>
        <Button type='submit' onClick={handleOnSubmit} className='ml-auto'>
          Save
        </Button>
      </form>
    </ContainerModal>
  )
}

export default FormSkill
