import { memo, useCallback, useEffect, useState } from 'react'
import { eventEmitter } from '@event-emitters'

import SocialLinks from '@features/personal-information/components/social-link/social-links'
import { default as EVENT_SOCIAL_LINK } from '@features/personal-information/event-emitters/personal-information-event'
import personalInformationSchema, {
  initialFormPersonalInformation,
  TPersonalInformationSchema
} from '@features/personal-information/validations/personal-information-schema'
import Button from '@components/ui/button'
import Divider from '@components/ui/divider'
import InputBase from '@components/ui/input/input-base'
import InputUploadFile from '@components/ui/input/input-file/input-file-v1'
import InputSelect from '@components/ui/input/input-select/input-select'
import InputTextArea from '@components/ui/input/input-text-area'
import useGeneralAPI from '@apis/use-general-api'

import useEventEmitter from '@hooks/use-event-emitter'
import { deepCopy, fetchOptions, mappingErrorsToForm } from '@lib/helper/function'
import { TEventOnChange } from '@typescript/ui-types'

const FormPersonlaInformation = memo(() => {
  const { getListProvince, getListCity, getListDistrict, getListProfession, getListPostalCode } =
    useGeneralAPI()

  const [form, setForm] = useState(deepCopy(initialFormPersonalInformation))

  // const [formSocialLinks, setFormSocialLinks] = useState({})

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

  const handleOnChange = useCallback(async (e: TEventOnChange) => {
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
    }

    setForm({
      ...currForm
    })
  }, [])

  useEventEmitter(EVENT_SOCIAL_LINK.VALIDATE_FORM_PERSONAL_INFORMATION, () => {
    validateFormPersonalInformation()
  })

  const validateFormPersonalInformation = useCallback(() => {
    const { isValid, updatedForm } = mappingErrorsToForm<TPersonalInformationSchema, typeof form>({
      form,
      schema: personalInformationSchema
    })
    setForm({
      ...updatedForm
    })
    return isValid
  }, [])

  const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement | HTMLLinkElement, MouseEvent>) => {
    e?.preventDefault()
    eventEmitter.emit(EVENT_SOCIAL_LINK.VALIDATE_FORM_PERSONAL_INFORMATION, true)
  }

  // useEventEmitter(EVENT_PERSONAL_INFORMATION.IS_FORM_SOCIAL_LINK_VALID, (data) => {
  //   const updateFormSocialLinks = Object.assign(formSocialLinks ?? {}, {
  //     [data?.form?.name]: data
  //   })
  //   setFormSocialLinks({
  //     ...updateFormSocialLinks
  //   })
  // })

  return (
    <form className='space-y-4' onSubmit={(e) => e?.preventDefault()}>
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
      <Divider />
      <SocialLinks />
      <Button onClick={handleOnSubmit} className='ml-auto'>
        Save
      </Button>
    </form>
  )
})
export default FormPersonlaInformation
