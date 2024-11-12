import { useState } from 'react'
import { eventEmitter } from '@event-emitters'

import EVENT_SOCIAL_LINK from '@features/personal-information/event-emitters/social-link-event'
import InputSelect from '@components/ui/input/input-select'

import { categoriesSocialLink } from '@lib/data/dummy/dummy'
import { TEventOnChange } from '@typescript/ui-types'

const FormSelectedSocialLink = () => {
  const [formSocialLink, setFormSocialLink] = useState({
    placeholder: 'e.g Github, Linkeind, or Whatsapp',
    name: 'social_link',
    options: categoriesSocialLink,
    isMultiple: true,
    value: []
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

  return (
    <div>
      <InputSelect {...formSocialLink} onChange={handleOnChange} isMultiple />
    </div>
  )
}

export default FormSelectedSocialLink
