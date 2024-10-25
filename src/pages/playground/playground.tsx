import { useState } from 'react'
import Button from '@components/ui/button'
import InputBase from '@components/ui/input/input-base'
import InputSelect from '@components/ui/input/input-select'
import InputUploadFile from '@components/ui/input/input-upload-file'
import { TCustomeEventOnChange, TTypeFile } from '@typescript/modules/ui/ui-types'

const PlaygroundPage = () => {
  const [form, setForm] = useState({
    username: {
      value: '',
      label: 'Username',
      placeholder: 'e.g: username',
      name: 'username'
    },
    password: {
      value: '',
      label: 'Password',
      placeholder: '',
      type: 'password',
      name: 'password',
      errorMessage: 'siska apriana rifianti'
    },
    city: {
      value: [],
      label: 'City',
      name: 'city',
      options: [
        { label: 'Jakarta', value: 'Jakarta' },
        { label: 'Bandung', value: 'Bandung' },
        { label: 'Bandung1', value: 'Bandung1' },
        { label: 'Bandung2', value: 'Bandung2' },
        { label: 'Bandung3', value: 'Bandung3' },
        { label: 'Jakarta1', value: 'Jakarta1' },
        { label: 'Jakarta2', value: 'Jakarta2' },
        { label: 'Jakarta3', value: 'Jakarta3' }
      ]
    },
    profile: {
      name: 'profile',
      value: null
    }
  })

  const handleOnChange = (e: TCustomeEventOnChange<any>) => {
    const name = e.target.name as keyof typeof form
    console.log(e.target.value)
    setForm({
      ...form,
      [name]: {
        ...form[name],
        value: e.target.value
      }
    })
  }

  return (
    <div className='space-y-8'>
      <Button isLoading>SISKA</Button>
      <div className='flex flex-col gap-4 max-w-md'>
        <InputBase onChange={handleOnChange} {...form['username']} />
        <InputBase onChange={handleOnChange} {...form['password']} />
        <InputSelect isMultiple={true} onChange={handleOnChange} {...form['city']} />
        <InputUploadFile
          listAcceptedTypeFile={[TTypeFile.PDF, TTypeFile.PNG]}
          onChange={handleOnChange}
          {...form['profile']}
        />
      </div>
    </div>
  )
}

export default PlaygroundPage
