import { TDate } from '@typescript/index-type'
import {
  TMasterEducationLevel,
  TMasterEducationMajor,
  TMasterEducationSchool
} from '@typescript/master-module-types'

export interface TEducation<TSchoolImage = string> {
  id_user: string
  id_level: string
  id_major: string
  id_school: string
  id: string

  level: TMasterEducationLevel
  major: TMasterEducationMajor
  school: TMasterEducationSchool

  school_name: string
  level_name: string
  major_name: string
  
  gpa: number
  description: string
  start_at: TDate
  end_at: TDate
  school_image: TSchoolImage
}
