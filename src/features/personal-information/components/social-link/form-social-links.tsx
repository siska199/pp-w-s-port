import React, { useCallback, useContext } from 'react'

import { contextFormPersonalInfo } from '@features/personal-information/context/context-form-personal-info'
import { TSelectedSocialLink } from '@features/personal-information/types/personal-information-types'
import Image from '@components/ui/image'
import InputBase from '@components/ui/input/input-base'

import { TEventOnChange } from '@typescript/ui-types'

const FormSocialLinks = () => {
  const { listSelectedSocialLink } = useContext(contextFormPersonalInfo)
  return (
    <div className='h-auto space-y-4'>
      {listSelectedSocialLink.map((data, index) => {
        return <FormSocialLink key={index} {...data} />
      })}
    </div>
  )
}

const FormSocialLink = React.memo((props: TSelectedSocialLink) => {
  const { name, image, value, errorMessage, placeholder } = props
  const { setListSelectedSocialLink } = useContext(contextFormPersonalInfo)

  const handleOnChange = useCallback((e: TEventOnChange) => {
    const name = e.target.name
    const value = e.target?.value

    setListSelectedSocialLink((prev) =>
      prev?.map((socialLink) => {
        const isChangedData = socialLink?.name === name
        return {
          ...socialLink,
          value: isChangedData ? value : socialLink?.value,
          errorMessage: isChangedData ? '' : socialLink?.errorMessage
        }
      })
    )
  }, [])

  return (
    <InputBase
      name={name}
      customeElement={{
        start: <Image src={image} className='w-4 h-4' />
      }}
      value={value}
      label={name}
      errorMessage={errorMessage}
      onChange={handleOnChange}
      placeholder={placeholder}
    />
  )
})

export default FormSocialLinks
