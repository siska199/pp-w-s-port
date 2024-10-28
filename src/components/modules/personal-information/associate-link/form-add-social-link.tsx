import { useContext } from 'react'

import InputSelect from '@components/ui/input/input-select'

import {
  ACTION_TYPE_SOCIAL_LINK,
  socialLinkContext
} from '@context/modules/personal-info/social-link-context'
import { categoriesSocialLink } from '@lib/data/dummy'
import { TObject } from '@typescript/global'
import { TEventOnChange } from '@typescript/modules/ui/ui-types'

const FormAddSocialLink = () => {
  const { dispatch, state } = useContext(socialLinkContext)

  const handleOnChange = (e: TEventOnChange) => {
    dispatch({
      type: ACTION_TYPE_SOCIAL_LINK.ONCHANGE_SOCIAL_LINKS,
      payload: e.target.value?.map((data: string) => JSON.parse(data))
    })
  }

  return (
    <div>
      <InputSelect
        value={state.selectedSocialLinks?.map((data: TObject) => JSON.stringify(data))}
        placeholder='e.g Github, Linkeind, or Whatsapp'
        name='socialLink'
        options={categoriesSocialLink}
        onChange={handleOnChange}
        isMultiple
      />
    </div>
  )
}

export default FormAddSocialLink
