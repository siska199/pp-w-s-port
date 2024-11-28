import React, { useContext } from 'react'

import { contextFormProject } from '@features/project/context/form-project-context'
import InputBase from '@components/ui/input/input-base'
import InputUploadFile from '@components/ui/input/input-file/input-file-v1'
import InputSelect from '@components/ui/input/input-select/input-select'
import InputTextArea from '@components/ui/input/input-text-area'

const FormInformationProject = () => {
  const { formInformationProject: form, handleOnChangeFormInformationProject: handleOnChange } =
    useContext(contextFormProject)

  return (
    <>
      <div className='grid grid-grid-cols-1 md:grid-cols-2 gap-4'>
        <InputBase {...form['name']} onChange={handleOnChange} />
        <InputSelect {...form['category']} onChange={handleOnChange} />
      </div>
      <InputSelect {...form['type']} onChange={handleOnChange} />
      <InputSelect {...form['tech_stacks']} onChange={handleOnChange} isMultiple />

      <InputUploadFile {...form['thumbnail']} onChange={handleOnChange} />
      <InputTextArea {...form['description']} onChange={handleOnChange} />
    </>
  )
}

export default React.memo(FormInformationProject)
