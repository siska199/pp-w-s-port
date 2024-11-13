import { useState } from 'react'

import MenuProjects from '@features/project/components/project-upsert/menu-project/menu-projects'
import useMenuProject from '@features/project/hooks/use-menu-project'
import { initialFormProject } from '@features/project/validation/project-schema'
import Button from '@components/ui/button'
import InputBase from '@components/ui/input/input-base'
import InputUploadFile from '@components/ui/input/input-file/input-file-v1'
import InputSelect from '@components/ui/input/input-select/input-select'
import InputTextEditor from '@components/ui/input/input-text-editor'

import { deepCopy } from '@lib/helper/function'
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types'

const FormProject = () => {
  const { listMenuProject } = useMenuProject()
  const [form, setForm] = useState(deepCopy(initialFormProject))

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
  }

  return (
    <div className='space-y-10 '>
      <form className='space-y-4' onClick={handleOnSubmit}>
        <div className='grid grid-grid-cols-1 md:grid-cols-2 gap-4'>
          <InputBase {...form['name']} onChange={handleOnChange} />
          <InputSelect {...form['category']} onChange={handleOnChange} />
        </div>
        <InputSelect {...form['type']} onChange={handleOnChange} />
        <InputSelect {...form['tech_stacks']} onChange={handleOnChange} isMultiple />

        <InputUploadFile {...form['thumbnail']} onChange={handleOnChange} />
        <InputTextEditor {...form['description']} onChange={handleOnChange} />
      </form>
      <MenuProjects />
      <div className='flex justify-end'>
        <Button type='submit'>Save</Button>
      </div>
    </div>
  )
}

export default FormProject
