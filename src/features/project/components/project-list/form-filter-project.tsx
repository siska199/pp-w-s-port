import { useState } from 'react'

import InputBase from '@components/ui/input/input-base'
import InputSelect from '@components/ui/input/input-select/input-select'

import { deepCopy } from '@lib/helper/function'
import { TEventOnChange } from '@typescript/ui-types'
import { IconSearch } from '@assets/icons'

const FormFilterProject = () => {
  const [form, setForm] = useState(deepCopy({ ...initialFormFilter }))
  type TKeyForm = keyof typeof form

  const handleOnChange = (e: TEventOnChange) => {
    const currForm = form
    const value = e.target.value
    const name = e.target.name as TKeyForm
    currForm[name].value = value

    setForm({ ...currForm })
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      <InputBase
        customeElement={{
          start: <IconSearch className='icon-gray icon-gray-fill' />
        }}
        {...form['keyword']}
        onChange={handleOnChange}
        customeClass={{
          ciV4: 'md:col-span-2'
        }}
      />
      <InputSelect onChange={handleOnChange} {...form['category']} isMultiple />
      <InputSelect onChange={handleOnChange} {...form['type']} isMultiple />
      <InputSelect onChange={handleOnChange} {...form['skill']} isMultiple />
    </div>
  )
}

const initialFormFilter = {
  keyword: {
    name: 'keyword',
    value: '',
    placeholder: 'Search by project or company name...'
  },
  category: {
    name: 'category',
    placeholder: 'Category',
    value: [],
    options: []
  },
  type: {
    name: 'type',
    placeholder: 'Type',
    value: [],
    options: []
  },
  skill: {
    name: 'skill',
    placeholder: 'Skil',
    value: [],
    options: []
  }
}

export default FormFilterProject
