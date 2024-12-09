import { useContext, useEffect, useState } from 'react'
import { messageError } from '@validation/constant'

import usePersonalInformationAPI from '@features/personal-information/apis/use-personal-information-api'
import { contextFormPersonalInfo } from '@features/personal-information/context/context-form-personal-info'
import EVENT_PERSONAL_INFO from '@features/personal-information/event-emitters/personal-info-event'
import InputSelect from '@components/ui/input/input-select/input-select'

import useEventEmitter from '@hooks/use-event-emitter'
import { categoriesSocialLink } from '@lib/data/dummy/dummy'
import { catchErrors } from '@lib/helper/function'
import { TEventOnChange } from '@typescript/ui-types'

const FormSelectedSocialLink = () => {
  const [formSocialLink, setFormSocialLink] = useState({
    placeholder: 'e.g Github, Linkeind, or Whatsapp',
    name: 'social_link',
    options: categoriesSocialLink,
    isMultiple: true,
    value: [],
    errorMessage: ''
  })

  const { getListSocialLink } = usePersonalInformationAPI()
  const { setListSelectedSocialLink } = useContext(contextFormPersonalInfo)

  useEffect(() => {
    handleInitData()
  }, [])

  useEventEmitter(EVENT_PERSONAL_INFO.ON_VALIDATE_PERSONAL_INFO, (isValid) => {
    setFormSocialLink({
      ...formSocialLink,
      errorMessage: isValid ? '' : messageError?.required('Social Links')
    })
  })

  const handleInitData = catchErrors(async () => {
    const resultCatSosLink = (await getListSocialLink())?.data || []

    setFormSocialLink({
      ...formSocialLink,
      options: resultCatSosLink?.map((data) => ({
        label: data.category?.name,
        value: JSON.stringify({
          ...data,
          name: data?.category?.name,
          value: data?.category?.default_value,
          image: data?.category?.image
        })
      }))
    })
  })

  const handleOnChange = (e: TEventOnChange) => {
    const value = e.target.value
    setFormSocialLink({
      ...formSocialLink,
      value,
      errorMessage: ''
    })

    setListSelectedSocialLink(value?.map((data: string) => JSON.parse(data)))
  }

  return (
    <div>
      <InputSelect {...formSocialLink} onChange={handleOnChange} isMultiple />
    </div>
  )
}

export default FormSelectedSocialLink
