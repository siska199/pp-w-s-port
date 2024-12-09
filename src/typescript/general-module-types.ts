export interface TProfession {
  id: string
  name: string
}

export interface TCompany {
  id: string
  name: string
  image: string
}

export interface TCategorySocialLink {
  id: string
  name: string
  image: string
  placeholder: string
  default_value: string
}

export interface TEducationLevel {
  id: string
  name: string
}

export interface TEducationMajor {
  id: string
  name: string
  id_levels: string[]
}

export interface TEducationSchool {
  id: string
  name: string
  id_level: string
}

export interface TCategorySkill {
  id: string
  name: string
}

export interface TSkill {
  id: string
  name: string
  image: string
  color: string
  id_category: string
}

export interface TUser {
  first_name: string
  last_name: string
  username: string
  password: string
  email: string
  phone_number: number
  id_profession: string

  id: string
  image: string
  profession: TProfession
}
