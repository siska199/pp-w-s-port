import { TFormFilterSkill } from '@components/modules/skill/form-filter-skill'

import { TFormSkill } from '@lib/validation/module/skill/skill-schema'
import { TTypeActionModalForm } from '@typescript/global'

const EVENT_NAME_SKILL = {
  SET_MODAL_FORM_SKILL: 'SET_MODAL_FORM_SKILL',
  SET_SKILL: 'SET_SKILL',
  SEARCH_DATA_TABLE_SKILL : 'SEARCH_DATA_TABLE_SKILL'
} as const

export type TEventMapSkill = {
  [EVENT_NAME_SKILL.SET_MODAL_FORM_SKILL]: {
    isShow: boolean
    action: TTypeActionModalForm
  }
  [EVENT_NAME_SKILL.SET_SKILL]: TFormSkill,
  [EVENT_NAME_SKILL.SEARCH_DATA_TABLE_SKILL] :TFormFilterSkill
}

export default EVENT_NAME_SKILL
