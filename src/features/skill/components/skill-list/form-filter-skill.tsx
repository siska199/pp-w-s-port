import { useEffect, useState } from 'react'
import { eventEmitter } from '@event-emitters'
import EVENT_SKILL from '@features/skill/event-emitters/skill-event'

import InputBase from '@components/ui/input/input-base'
import InputSelect from '@components/ui/input/input-select'

import useDebounce from '@hooks/use-debounce'
import { deepCopy } from '@lib/helper/function'
import { TCustomeEventOnChange } from '@typescript/ui-types'
import { IconSearch } from '@assets/icons'

const FormFilterSKill = () => {
  const [form, setForm] = useState(deepCopy({ ...initialFormFilter }))

  const debounceValues = useDebounce({
    value: form
  })

  useEffect(() => {
    eventEmitter.emit(EVENT_SKILL.SEARCH_DATA_TABLE_SKILL, {
      keyword: form.keyword.value,
      category: form.category.value,
      yearsOfExperiance: form.yearsOfExperiance.value,
      level: form.level.value
    })
  }, [debounceValues])

  const handleOnChange = (e: TCustomeEventOnChange<any>) => {
    const currForm = form
    const value = e.target.value
    const name = e.target.name as keyof typeof form
    currForm[name].value = value

    setForm({ ...currForm })
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
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
        <InputSelect onChange={handleOnChange} {...form['level']} isMultiple />
        <InputSelect onChange={handleOnChange} {...form['yearsOfExperiance']} />
      </div>
    </>
  )
}

const initialFormFilter = {
  keyword: {
    name: 'keyword',
    value: '',
    placeholder: 'Search by skill name...'
  },
  category: {
    name: 'category',
    value: [],
    options: [
      { label: 'Backend', value: 'backend' },
      { label: 'Frotnend', value: 'forntend' },
      { label: 'Fullstack', value: 'fullstack' }
    ],
    placeholder: 'Category Skill'
  },
  yearsOfExperiance: {
    name: 'yearsOfExperiance',
    options: [...Array(40)]?.map((_, i) => ({
      label: `${i + 1} year`,
      value: `${i + 1}`
    })),
    value: '',
    placeholder: 'Year of experiance'
  },
  level: {
    name: 'level',
    value: [],
    options: [
      { label: 'Beginner', value: 'Beginner' },
      { label: 'Intermediet', value: 'Intermediet' },
      { label: 'Advance', value: 'Advance' }
    ],
    placeholder: 'Level'
  }
}

export type TFilterSkill = {
  [K in keyof typeof initialFormFilter]: (typeof initialFormFilter)[K]['value']
}

export default FormFilterSKill
