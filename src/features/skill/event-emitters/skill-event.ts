import { TFilterSkill } from '@features/skill/components/skill-list/form-filter-skill'
import { TSkill } from '@features/skill/validation/skill-schema'

import { TTypeActionModalForm } from '@typescript/index-type'

const EVENT_SKILL = {
  SET_MODAL_FORM_SKILL: 'SET_MODAL_FORM_SKILL',
  SET_SKILL: 'SET_SKILL',
  SEARCH_DATA_TABLE_SKILL: 'SEARCH_DATA_TABLE_SKILL'
} as const

export type TEventMapSkill = {
  [EVENT_SKILL.SET_MODAL_FORM_SKILL]: {
    isShow: boolean
    action: TTypeActionModalForm
  }
  [EVENT_SKILL.SET_SKILL]: TSkill
  [EVENT_SKILL.SEARCH_DATA_TABLE_SKILL]: TFilterSkill
}

export default EVENT_SKILL
