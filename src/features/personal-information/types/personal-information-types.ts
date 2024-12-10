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
  id: string
  professional_image: string
  first_name: string
  last_name: string

  id_province: string
  id_city: string
  id_district: string
  id_postal_code: string

  email: string
  phone_number: string
  about_me: string
  bio: string

  id_profession: string
  profession?: TProfession

  user?: TUser
}
