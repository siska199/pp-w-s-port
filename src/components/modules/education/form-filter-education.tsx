import { useState } from "react"

import InputSelect from "@components/ui/input/input-select"

import { deepCopy } from "@lib/helper/function"
import { TCustomeEventOnChange } from "@typescript/modules/ui/ui-types"

const FormFilterEducation = () => {
  const [form, setForm] = useState(deepCopy({...initialFormFilter}))


  const handleOnChange = (e: TCustomeEventOnChange<any>) => {
    const currForm = form
    const value = e.target.value
    const name = e.target.name as keyof typeof form
    currForm[name].value = value

    setForm({ ...currForm })
  }

  return <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
    <InputSelect {...form['level']} onChange={handleOnChange}/>
  </div>
}


const initialFormFilter = {
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

export default FormFilterEducation
