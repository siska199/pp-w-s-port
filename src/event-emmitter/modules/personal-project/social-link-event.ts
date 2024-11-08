import { TSocialLink } from '@components/modules/personal-information/personal-information-upsert/associate-link/form-social-links'

const EVENT_SOCIAL_LINK = {
  ONCHANGE_SOCIAL_LINKS: 'ONCHANGE_SOCIAL_LINKS'
} as const

export type TEventMapSocailLink = {
  [EVENT_SOCIAL_LINK.ONCHANGE_SOCIAL_LINKS]: TSocialLink[]
}

export default EVENT_SOCIAL_LINK
