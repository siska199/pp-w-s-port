import { useEffect, useState } from 'react'
import { eventEmitter } from '@event-emmitter'
import EVENT_EDUCATION from '@event-emmitter/modules/education/education-event'

import InputBase from '@components/ui/input/input-base'
import InputSelect from '@components/ui/input/input-select'

import useDebounce from '@hooks/use-debounce'
import { deepCopy } from '@lib/helper/function'
import { TCustomeEventOnChange } from '@typescript/modules/ui/ui-types'
import { IconSearch } from '@assets/icons'

const FormFilterEducation = () => {
  const [form, setForm] = useState(deepCopy({ ...initialFormFilter }))

  const debounceValue = useDebounce({ value: form.level.value, delay: 10 })

  useEffect(() => {
    eventEmitter.emit(EVENT_EDUCATION.SEARCH_DATA_TABLE_EDUCATION, {
      level: form.level.value
    })
  }, [debounceValue])

  const handleOnChange = (e: TCustomeEventOnChange<any>) => {
    const currForm = form
    const value = e.target.value
    const name = e.target.name as keyof typeof form
    currForm[name].value = value

    setForm({ ...currForm })
  }

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-4'>
      <InputBase
        customeElement={{
          start: <IconSearch className='icon-gray icon-gray-fill' />
        }}
        {...form['keyword']}
        onChange={handleOnChange}
      />
      <div className='grid lg:grid-cols-2'>
        <InputSelect {...form['level']} onChange={handleOnChange} />
      </div>
    </div>
  )
}

const initialFormFilter = {
  keyword: {
    name: 'keyword',
    value: '',
    placeholder: 'Search by school or major name...',
    customeClass: {}
  },
  level: {
    name: 'level',
    value: [],
    options: [
      { label: 'SMA', value: 'SMA' },
      { label: 'S1', value: 'S1' },
      { label: 'Bootcamp', value: 'Bootcamp' }
    ],
    placeholder: 'Level'
  }
}

export interface TFormFilterEducation {
  level: string[]
}

export default FormFilterEducation
