import { IconSearch } from "@assets/icons";
import InputBase from "@components/ui/input/input-base";
import InputSelect from "@components/ui/input/input-select";
import { TCustomeEventOnChange } from "@typescript/modules/ui/ui-types";
import { useState } from "react";

const FormFilterSKill = () => {
  const [form, setForm] = useState({
    keyword: {
      name: 'keyword',
      value: '',
      placeholder: 'Search by skill name...',
      customeClass: {},
    },
    category: {
      name: 'category',
      value: [],
      options: [
        { label: 'Backend', value: 'backend' },
        { label: 'Frotnend', value: 'forntend' },
        { label: 'Fullstack', value: 'fullstack' },
      ],
      placeholder: 'Category Skill',
    },
    yearsOfexperiance : {
      name : 'yearsOfexperiance',
      options :[...Array(40)]?.map((data,i)=>({
        label : `${i+1} year`,
        value : `${i+1}`
      })),
      value: '',
      placeholder: 'Year of experiance',
    },
    level: {
      name: 'level',
      value: [],
      options: [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Intermediet', value: 'Intermediet' },
        { label: 'Advance', value: 'Advance' },
      ],
      placeholder: 'Level',
    },
  });

  const handleOnChange = (e: TCustomeEventOnChange<any>) => {
    const value = e.target.value;
    const name = e.target.name as keyof typeof form;
    setForm({
      ...form,
      [name]: {
        ...form[name],
        value,
      },
    });
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <InputBase
        customeElement={{
          start: <IconSearch className="icon-gray icon-gray-fill" />,
        }}
        {...form['keyword']}
        onChange={handleOnChange}
      />
      <InputSelect onChange={handleOnChange} {...form['category']} isMultiple />
      <InputSelect onChange={handleOnChange} {...form['level']} isMultiple />
      <InputSelect onChange={handleOnChange} {...form['yearsOfexperiance']} />
    </div>
  );
};

export default FormFilterSKill;
