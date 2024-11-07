import { useState } from "react"

import InputBase from "@components/ui/input/input-base"
import InputDate from "@components/ui/input/input-date"

import { deepCopy } from "@lib/helper/function"
import { TEventOnChange } from "@typescript/modules/ui/ui-types"
import { IconSearch } from "@assets/icons"

const FormFilterExperiance = () => {
  const [form, setForm] = useState(deepCopy({...initialFormFilter}))

  const handleOnChange = (e: TEventOnChange) => {
    const currForm = form
    const value = e.target.value
    const name = e.target.name as keyof typeof form
    currForm[name].value = value

    setForm({ ...currForm })
  }

  return(
    <div className='grid md:grid-cols-2 gap-4'>
      <InputBase
        customeElement={{
          start: <IconSearch className='icon-gray icon-gray-fill' />
        }}
        {...form['keyword']}
        onChange={handleOnChange}
      />
      <div className="grid grid-cols-2 gap-4">
        <InputDate {...form['start_at']} onChange={handleOnChange} />
        <InputDate {...form['end_at']} onChange={handleOnChange} />
      </div>
    </div>
  )
}



const initialFormFilter ={
  keyword: {
    name: 'keyword',
    value: '',
    placeholder: 'Search by company or profession name...',
    customeClass: {}
  },
  start_at : {
    name :'start_at',
    value : null,
    placeholder: 'Start At'
  },
  end_at : {
    name :'end_at',
    value : null,
    placeholder  : 'End At'
  }
}

export type TFormFilterExperiance = {
  keyword: string;
  start_at: string;
  end_at : string;
}
export default FormFilterExperiance
