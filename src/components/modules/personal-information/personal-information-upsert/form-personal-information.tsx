import { useEffect, useState } from 'react'

import Button from '@components/ui/button'
import InputBase from '@components/ui/input/input-base'
import InputSelect from '@components/ui/input/input-select'
import InputTextArea from '@components/ui/input/input-text-area'
import InputUploadFile from '@components/ui/input/input-upload-file'
import useGeneralAPI from '@apis/use-general-api'

import { deepCopy, fetchOptions, mappingErrorsToForm } from '@lib/helper/function'
import personalInformationSchema, {
  initialFormPersonalInformation,
  TFormPersonalInformation
} from '@lib/validation/module/personal-information/personal-information-schema'
import { TEventOnChange } from '@typescript/modules/ui/ui-types'

const FormPersonlaInformation = () => {
  const { getListProvince, getListCity, getListDistrict, getListProfession, getListPostalCode } =
    useGeneralAPI()

  const [form, setForm] = useState(deepCopy(initialFormPersonalInformation))
  type TKeyForm = keyof typeof form

  useEffect(() => {
    handleInitialData()
    return () => {
      setForm({ ...initialFormPersonalInformation })
    }
  }, [])

  const handleInitialData = async () => {
    form['id_province'].options = await fetchOptions(getListProvince)
    form['id_profession'].options = await fetchOptions(getListProfession)
    setForm({ ...form })
  }

  const handleOnChange = async (e: TEventOnChange) => {
    const currForm = form
    const name = e.target.name as TKeyForm
    const value = e.target.value

    currForm[name].value = value

    if (name == 'id_province') {
      ;['id_city', 'id_district', 'id_postal_code']?.map((key) => {
        currForm[key as TKeyForm].value = ''
      })
      currForm['id_city'].options = await fetchOptions(getListCity, {
        id_province: value
      })
    }

    if (name == 'id_city') {
      ;['id_district', 'id_postal_code']?.map((key) => {
        currForm[key as TKeyForm].value = ''
      })
      currForm['id_district'].options = await fetchOptions(getListDistrict, {
        id_city: value
      })
    }

    if (name == 'id_district') {
      currForm['id_postal_code'].value = ''
      currForm['id_postal_code'].options = await fetchOptions(getListPostalCode, {
        id_district: value
      })
    }

    if (['id_city', 'id_province', 'id_district']?.includes(name)) {
      form['id_city'].disabled = !currForm.id_province.value
      form['id_district'].disabled = !currForm.id_city.value
      form['id_postal_code'].disabled = !currForm.id_district.value
    }

    setForm({
      ...currForm
    })
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { isValid, updatedForm } = mappingErrorsToForm<TFormPersonalInformation, typeof form>({
      form,
      schema: personalInformationSchema
    })

    console.log('form: ', updatedForm.about_me)

    if (isValid) {
      //
    }
    setForm({
      ...updatedForm
    })
  }

  return (
    <form className='space-y-4' onSubmit={handleOnSubmit}>
      <div className='grid grid-cols-2 gap-4'>
        <InputBase {...form['first_name']} onChange={handleOnChange} />
        <InputBase {...form['last_name']} onChange={handleOnChange} />
      </div>
      <InputSelect {...form['id_profession']} onChange={handleOnChange} />
      <div className='grid grid-cols-2 gap-4'>
        <InputSelect {...form['id_province']} onChange={handleOnChange} />
        <InputSelect {...form['id_city']} onChange={handleOnChange} />
        <InputSelect {...form['id_district']} onChange={handleOnChange} />
        <InputSelect {...form['id_postal_code']} onChange={handleOnChange} />
      </div>
      <InputBase {...form['bio']} onChange={handleOnChange} />
      <InputTextArea {...form['about_me']} onChange={handleOnChange} />
      <InputUploadFile {...form['professional_image']} onChange={handleOnChange} />
      <Button className='ml-auto'>Save</Button>
    </form>
  )
}

export default FormPersonlaInformation
