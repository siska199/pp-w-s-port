import { useContext, useEffect, useState } from 'react'

import InputSelect from '@components/ui/input/input-select'
import ContainerModalForm from '@components/ui/modal/container-modal-form'

import { skillContext } from '@context/modules/skill/skill-context'
import { deepCopy, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function'
import skillSchema, {
  initialFormSkill,
  TFormSkill
} from '@lib/validation/module/skill/skill-schema'
import { TEventOnChange } from '@typescript/modules/ui/ui-types'

const FormSkill = () => {
  const { modalFormSkill, skill, handleToggleModalFormSkill } = useContext(skillContext)
  const [form, setForm] = useState(deepCopy({ ...initialFormSkill }))

  useEffect(() => {
    handlleCloseFormSkill()
  }, [])

  useEffect(() => {
    setForm({ ...mappingValuesToForm({ values: skill, form }) })
  }, [skill])

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

  const handlleCloseFormSkill = () => {
    setForm(deepCopy({ ...initialFormSkill }))
    handleToggleModalFormSkill({
      isShow: false,
      action: modalFormSkill?.action
    })
  }

  return (
    <ContainerModalForm
      moduleName={'Skill'}
      action={modalFormSkill.action}
      isShow={modalFormSkill.isShow}
      onClose={handlleCloseFormSkill}
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
