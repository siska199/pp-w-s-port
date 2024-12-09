import { TCategorySocialLink, TProfession, TUser } from '@typescript/general-module-types'

export interface TSocialLink {
  id: string
  url: string
  id_category: string
  id_user: string
  category: TCategorySocialLink
}

export interface TSelectedSocialLink extends TSocialLink {
  errorMessage: string
  default_value: string
  value: string
  image: string
}

export interface TPersonalInformation {
  id?: string
  professional_image: string
  first_name: string
  last_name: string

  province: string
  city: string
  district: string

  postal_code: string

  email: string
  about_me: string
  bio: string

  id_profession: string
  profession?: TProfession

  user?: TUser
}
