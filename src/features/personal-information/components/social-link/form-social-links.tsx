import React, { useEffect, useState } from 'react'
import { eventEmitter } from '@event-emitters'

import {
  default as EVENT_PERSONAL_INFORMATION,
  default as EVENT_SOCIAL_LINK
} from '@features/personal-information/event-emitters/personal-information-event'
import socialLinkSchema from '@features/personal-information/validations/social-link-schema'
import Image from '@components/ui/image'
import InputBase from '@components/ui/input/input-base'

import useEventEmitter from '@hooks/use-event-emitter'
import { TEventOnChange } from '@typescript/ui-types'

export interface TSocialLink {
  name: string
  image: string
  placeholder: string
  defaultValue?: string
}

const FormSocialLinks = () => {
  const [listSelectedSocialLink, setListSelectedSocialLink] = useState<TSocialLink[]>([])

  eventEmitter.on(EVENT_SOCIAL_LINK.ONCHANGE_SOCIAL_LINKS, (selectedSocialLinks: TSocialLink[]) => {
    setListSelectedSocialLink(selectedSocialLinks)
  })

  return (
    <div className='h-auto space-y-4'>
      {listSelectedSocialLink.map((data, index) => {
        return <FormSocialLink key={index} {...data} />
      })}
    </div>
  )
}

const FormSocialLink = React.memo((props: TSocialLink) => {
  const [form, setForm] = useState({
    name: '',
    customeElement: {
      start: <></>
    },
    label: '',
    value: '',
    errorMessage: ''
  })

  useEffect(() => {
    setForm({
      ...form,
      name: props.name,
      customeElement: {
        start: <Image src={props.image} className='w-4 h-4' />
      },
      label: props.name,
      value: props.defaultValue || ''
    })
  }, [])

  const handleOnChange = (e: TEventOnChange) => {
    setForm({
      ...form,
      value: e.target.value
    })
  }

  useEventEmitter(EVENT_PERSONAL_INFORMATION.VALIDATE_FORM_PERSONAL_INFORMATION, () => {
    validateFormSocialLink()
    eventEmitter.emit(
      EVENT_PERSONAL_INFORMATION.IS_FORM_SOCIAL_LINK_VALID,
      validateFormSocialLink()
    )
  })

  const validateFormSocialLink = () => {
    const result = socialLinkSchema(form.name).safeParse({ url: form.value })
    const updatedForm = {
      ...form,
      errorMessage: result.error?.errors[0]?.message || ''
    }
    setForm({ ...updatedForm })
    return {
      isValid: result?.success,
      form: updatedForm
    }
  }
  return <InputBase {...form} onChange={handleOnChange} />
})

export default FormSocialLinks
