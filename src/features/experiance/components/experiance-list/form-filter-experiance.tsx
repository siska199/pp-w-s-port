import { useState } from 'react'

import InputBase from '@components/ui/input/input-base'
import InputDate from '@components/ui/input/input-date'

import { deepCopy, generateMaxDateOneYear } from '@lib/helper/function'
import { TEventOnChange } from '@typescript/ui-types'
import { IconSearch } from '@assets/icons'

const FormFilterExperiance = () => {
  const [form, setForm] = useState(deepCopy({ ...initialFormFilter }))

  const handleOnChange = (e: TEventOnChange) => {
    const currForm = form
    const value = e.target.value
    const name = e.target.name as keyof typeof form
    currForm[name].value = value

    if (name === 'start_at') {
      currForm['end_at'].value = null
    }
    setForm({ ...currForm })
  }

  return (
    <div className='grid md:grid-cols-2 gap-4'>
      <InputBase
        customeElement={{
          start: <IconSearch className='icon-gray icon-gray-fill' />
        }}
        {...form['keyword']}
        onChange={handleOnChange}
      />
      <div className='grid grid-cols-2 gap-4'>
        <InputDate {...form['start_at']} onChange={handleOnChange} />
        <InputDate
          {...form['end_at']}
          minDate={form['start_at'].value}
          maxDate={generateMaxDateOneYear(form['start_at'].value)}
          onChange={handleOnChange}
        />
      </div>
    </div>
  )
}

const initialFormFilter = {
  keyword: {
    name: 'keyword',
    value: '',
    placeholder: 'Search by company or profession name...',
    customeClass: {}
  },
  start_at: {
    name: 'start_at',
    value: null as Date | null,
    placeholder: 'Start At'
  },
  end_at: {
    name: 'end_at',
    value: null as Date | null,
    placeholder: 'End At'
  }
}

export type TFilterExperiance = {
  [K in keyof typeof initialFormFilter]: (typeof initialFormFilter)[K]['value']
}

export default FormFilterExperiance
