import { useState } from 'react'

import { initialFormProject } from '@features/project/validation/project-schema'
import Button from '@components/ui/button'
import InputBase from '@components/ui/input/input-base'
import InputSelect from '@components/ui/input/input-select'
import InputTextEditor from '@components/ui/input/input-text-editor'
import InputUploadFile from '@components/ui/input/input-upload-file'

import { deepCopy } from '@lib/helper/function'
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types'

const FormProject = () => {
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
    <form className='space-y-4' onClick={handleOnSubmit}>
      <div className='grid grid-grid-cols-1 md:grid-cols-2 gap-4'>
        <InputBase {...form['name']} onChange={handleOnChange} />
        <InputSelect {...form['category']} onChange={handleOnChange} />
      </div>
      <InputSelect {...form['type']} onChange={handleOnChange} />
      <InputUploadFile {...form['thumbnail']} onChange={handleOnChange} />
      <InputTextEditor {...form['description']} onChange={handleOnChange} />
      <div className='flex justify-end'>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  )
}

export default FormProject
