import { useState } from 'react'
import { eventEmitter } from '@event-emmitter'
import EVENT_SOCIAL_LINK from '@event-emmitter/modules/personal-project/social-link-event'
import socialLinkSchema from '@validation/module/personal-information/social-link-schema'
import z from 'zod'

import Button from '@components/ui/button'
import Image from '@components/ui/image'
import InputBase from '@components/ui/input/input-base'

import { TEventOnChange } from '@typescript/modules/ui/ui-types'

export interface TSocialLink {
  name: string
  image: string
  placeholder: string
  defaultValue?: string
}

const FormSocialLinks = () => {
  const [listFormSocialLink, setListFormSocialLink] = useState<(TSocialLink & { value: string })[]>(
    []
  )

  eventEmitter.on(EVENT_SOCIAL_LINK.ONCHANGE_SOCIAL_LINKS, (selectedSocialLinks: TSocialLink[]) => {
    const updateListFormSocialLink = selectedSocialLinks?.map((data: TSocialLink) => {
      const prevData = listFormSocialLink?.find((form) => form.name === data.name)
      const result = {
        ...data,
        value: data.defaultValue || '',
        ...prevData
      }
      delete result.defaultValue
      return result
    })
    setListFormSocialLink([...updateListFormSocialLink])
  })

  const handleOnChangeListFormSocialLink = (index: number, e: TEventOnChange) => {
    listFormSocialLink[index] = {
      ...listFormSocialLink[index],
      value: e.target.value
    }

    setListFormSocialLink([...listFormSocialLink])
  }

  const handleOnSubmit = () => {
    try {
      let isValid = true
      const updatelistFormSocialLink = listFormSocialLink?.map((form) => {
        const result = socialLinkSchema(form.name).safeParse({ url: form.value })
        if (!result.success) isValid = false
        return {
          ...form,
          errorMessage: result.error?.errors[0]?.message
        }
      })

      if (isValid) {
        //
      }

      setListFormSocialLink([...updatelistFormSocialLink])
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log('is invalid', error.errors)
      }
    }
  }

  return (
    <div className='min-h-[10rem] space-y-4'>
      {listFormSocialLink?.map((data, index) => {
        return (
          <InputBase
            key={index}
            {...data}
            onChange={(e) => handleOnChangeListFormSocialLink(index, e)}
            customeElement={{
              start: <Image src={data.image} className='w-4 h-4' />
            }}
            label={data.name}
          />
        )
      })}
      {listFormSocialLink?.length > 0 && (
        <Button onClick={handleOnSubmit} className='ml-auto'>
          Save
        </Button>
      )}
    </div>
  )
}

export default FormSocialLinks
