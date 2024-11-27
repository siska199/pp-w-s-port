import { TSocialLink } from '@features/personal-information/components/social-link/form-social-links'

import { TObject } from '@typescript/index-type'

const EVENT_PERSONAL_INFORMATION = {
  ONCHANGE_SOCIAL_LINKS: 'ONCHANGE_SOCIAL_LINKS',
  VALIDATE_FORM_PERSONAL_INFORMATION: 'VALIDATE_FORM_PERSONAL_INFORMATION',
  IS_FORM_SOCIAL_LINK_VALID: 'S_FORM_SOCIAL_LINK_VALID'
} as const

export type TEventMapPersonalInformation = {
  [EVENT_PERSONAL_INFORMATION.ONCHANGE_SOCIAL_LINKS]: TSocialLink[]
  [EVENT_PERSONAL_INFORMATION.VALIDATE_FORM_PERSONAL_INFORMATION]: boolean
  [EVENT_PERSONAL_INFORMATION.IS_FORM_SOCIAL_LINK_VALID]: { isValid: boolean; form: TObject }
}

export default EVENT_PERSONAL_INFORMATION
