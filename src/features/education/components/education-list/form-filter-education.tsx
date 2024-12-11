import { useCallback, useState } from 'react'
import { eventEmitter } from '@event-emitters'

import EVENT_EDUCATION from '@features/education/event-emitters/education-event'
import InputBase from '@components/ui/input/input-base'
import InputSelect from '@components/ui/input/input-select/input-select'

import { debounce, deepCopy } from '@lib/helper/function'
import { TEventOnChange } from '@typescript/ui-types'
import { IconSearch } from '@assets/icons'

const FormFilterEducation = () => {
  const [form, setForm] = useState(deepCopy({ ...initialFormFilter }))

  const handleOnChange = useCallback((e: TEventOnChange) => {
    const currForm = form
    const value = e.target.value
    const name = e.target.name as keyof typeof form
    currForm[name].value = value
    setForm({ ...currForm })
    handleEmitEventSearchDataTable()
  }, [])

  const handleEmitEventSearchDataTable = debounce(() => {
    eventEmitter.emit(EVENT_EDUCATION.SEARCH_DATA_TABLE_EDUCATION, {
      id_level: form.id_level.value,
      keyword: form?.keyword?.value
    })
  }, 3000)

  return (
    <div className='grid md:grid-cols-4 gap-4'>
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
      <InputSelect {...form['id_level']} onChange={handleOnChange} />
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
  id_level: {
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
  id_level: string[]
  keyword: string
}

export default FormFilterEducation
