import { useEffect, useState } from 'react'
import { eventEmitter } from '@event-emitters'
import { messageError } from '@validation/constant'

import usePersonalInformation from '@features/personal-information/apis/use-personal-information-api'
import EVENT_SOCIAL_LINK from '@features/personal-information/event-emitters/personal-information-event'
import EVENT_PERSONAL_INFORMATION from '@features/personal-information/event-emitters/personal-information-event'
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

  const { getListCategorySocialLink } = usePersonalInformation()

  useEffect(() => {
    handleInitData()
  }, [])

  const handleInitData = catchErrors(async () => {
    const resultCatSosLink = await getListCategorySocialLink()
    setFormSocialLink({
      ...formSocialLink,
      options: resultCatSosLink?.data?.map((data) => ({
        label: data.name,
        value: JSON.stringify(data)
      }))
    })
  })

  const handleOnChange = (e: TEventOnChange) => {
    const value = e.target.value
    setFormSocialLink({
      ...formSocialLink,
      value
    })

    eventEmitter.emit(
      EVENT_SOCIAL_LINK.ONCHANGE_SOCIAL_LINKS,
      value?.map((data: string) => JSON.parse(data))
    )
  }

  useEventEmitter(EVENT_PERSONAL_INFORMATION.VALIDATE_FORM_PERSONAL_INFORMATION, () => {
    const isValid = formSocialLink.value?.length > 0

    eventEmitter.emit(EVENT_PERSONAL_INFORMATION.IS_FORM_SOCIAL_LINK_VALID, {
      isValid,
      form: {}
    })
    setFormSocialLink({
      ...formSocialLink,
      errorMessage: isValid ? '' : messageError.required('Social Links')
    })
  })
  return (
    <div>
      <InputSelect {...formSocialLink} onChange={handleOnChange} isMultiple />
    </div>
  )
}

export default FormSelectedSocialLink
