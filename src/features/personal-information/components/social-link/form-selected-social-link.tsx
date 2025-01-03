import { useContext, useEffect, useState } from 'react'
import { messageError } from '@validation/constant'

import usePersonalInformationAPI from '@features/personal-information/apis/use-personal-information-api'
import { contextFormPersonalInfo } from '@features/personal-information/context/context-form-personal-info'
import EVENT_PERSONAL_INFO from '@features/personal-information/event-emitters/personal-info-event'
import InputSelect from '@components/ui/input/input-select/input-select'
import useMasterAPI from '@apis/use-master-api'

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
    value: [] as string[],
    errorMessage: ''
  })

  const { getListSocialLink } = usePersonalInformationAPI()
  const { getListMasterCategorySocialLink } = useMasterAPI()
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
    const catSosialLinks = (await getListMasterCategorySocialLink())?.data || []
    const socialLinksUsers = (await getListSocialLink())?.data || []

    const options = catSosialLinks?.map((data) => {
      const socialLinkUser = socialLinksUsers?.filter(
        (socialLink) => socialLink?.category?.name === data?.name
      )?.[0]

      return {
        label: data.name,
        url: socialLinkUser?.url,
        value: JSON.stringify({
          ...data,
          id: socialLinkUser?.id,
          value: socialLinkUser?.url || data?.default_value
        })
      }
    })

    const selectedSocialLinks = options
      ?.filter((option) => option?.url)
      ?.map((option) => option?.value)
    setFormSocialLink({
      ...formSocialLink,
      options: options,
      value: options?.filter((option) => option?.url)?.map((option) => option?.value)
    })

    setListSelectedSocialLink(
      selectedSocialLinks?.map((selectedSocialLink) => JSON.parse(selectedSocialLink))
    )
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
