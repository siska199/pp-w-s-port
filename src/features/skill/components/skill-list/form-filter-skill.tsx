import { useEffect, useState } from 'react'
import { eventEmitter } from '@event-emitters'

import EVENT_SKILL from '@features/skill/event-emitters/skill-event'
import InputSelect from '@components/ui/input/input-select/input-select'

import useDebounce from '@hooks/use-debounce'
import { deepCopy } from '@lib/helper/function'
import { TCustomeEventOnChange } from '@typescript/ui-types'

const FormFilterSKill = () => {
  const [form, setForm] = useState(deepCopy({ ...initialFormFilter }))

  const debounceValues = useDebounce({
    value: form
  })

  useEffect(() => {
    eventEmitter.emit(EVENT_SKILL.SEARCH_DATA_TABLE_SKILL, {
      years_of_experiance: form.years_of_experiance.value,
      level: form.level.value,
      id_skills: form.id_skills.value
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
        <InputSelect
          onChange={handleOnChange}
          customeClass={{
            ciV4: 'md:col-span-2'
          }}
          {...form['id_skills']}
          isMultiple
        />
        <InputSelect onChange={handleOnChange} {...form['level']} isMultiple />
        <InputSelect onChange={handleOnChange} {...form['years_of_experiance']} />
      </div>
    </>
  )
}

const initialFormFilter = {
  id_skills: {
    name: 'id_skills',
    options: [],
    placeholder: 'Skill',
    value: []
  },

  years_of_experiance: {
    name: 'years_of_experiance',
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
