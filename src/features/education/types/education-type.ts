import { TEducationMajor, TEducationSchool } from '@typescript/general-module-types'

export interface TEducation {
  id: string
  gpa: number
  description: string
  id_user: string
  id_level: string
  id_major: string
  id_school: string
  level: TEducationMajor
  major: TEducationMajor
  school: TEducationSchool
  level_name: string
  major_name: string
  school_name: string
  start_at: Date
  end_at: Date
}
