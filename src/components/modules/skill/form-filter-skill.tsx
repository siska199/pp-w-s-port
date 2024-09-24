import InputBase from "@components/ui/input/input-base";
import { TCustomeEventOnChange } from "types/ui-types";
import { useState } from "react";
import { IconSearch } from "@assets/icons";
import InputSelect from "@components/ui/input/input-select";
import Button from "@components/ui/button";

const FormFilterSKill = () => {
  const [form, setForm] = useState({
    keyword : {
      name          : 'keyword',
      value         : '',
      placeholder   : 'Search by skill name...',
      customeClass  : {
      }
    },
    category : {
      name  : 'category',
      value : '',
      options :[
        {label : 'Backend',   value : 'backend'},
        {label : 'Frotnend',  value : 'forntend'},
        {label : 'Fullstack', value : 'fullstack'},
      ],
      placeholder : 'Category Skill'
    },
    yearsOfexperiance : {
      name : 'yearsOfexperiance',
      options :[...Array(40)]?.map((data,i)=>({
        label : `${i+1} year`,
        value : `${i+1}`
      })),
      value:'',
      placeholder : 'Year of experiance'
    }
  })

  const handleOnChange = (e: TCustomeEventOnChange<any>)=>{
    const value = e.target.value;
    const name = e.target.name as keyof typeof  form
    setForm({
      ...form,
      [name] : {
        ...form[name],
        value
      }
    })
  }

  return (
    <div className="spacey-3 flex gap-4">

      <div className="w-fit flex gap-4">
        <InputBase customeElement={{start: <IconSearch className="icon-gray icon-gray-fill"/>}} {...form['keyword']} onChange={handleOnChange} />
        <InputSelect  onChange={handleOnChange} {...form['category']}/>
        <InputSelect  onChange={handleOnChange} {...form['yearsOfexperiance']}/>

      </div>

    </div>
  )
};

export default FormFilterSKill;
