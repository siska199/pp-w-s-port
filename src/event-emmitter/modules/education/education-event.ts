import { TFormFilterEducation } from '@components/modules/education/education-list/form-filter-education'

import { TFormEducation } from '@lib/validation/module/education/education-schema'
import { TTypeActionModalForm } from '@typescript/global'

const EVENT_EDUCATION = {
  SET_MODAL_FORM_EDUCATION: 'SET_MODAL_FORM_EDUCATION',
  SET_EDUCATION: 'SET_EDUCATION',
  SEARCH_DATA_TABLE_EDUCATION: 'SEARCH_DATA_TABLE_EDUCATION'
} as const

export type TEventMapEducation = {
  [EVENT_EDUCATION.SET_MODAL_FORM_EDUCATION]: {
    isShow: boolean
    action: TTypeActionModalForm
  }
  [EVENT_EDUCATION.SET_EDUCATION]: TFormEducation
  [EVENT_EDUCATION.SEARCH_DATA_TABLE_EDUCATION]: TFormFilterEducation
}

export default EVENT_EDUCATION
