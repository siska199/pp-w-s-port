import { TSkill } from '@validation/module/skill/skill-schema'

import { TFormFilterSkill } from '@components/modules/skill/skill-list/form-filter-skill'

import { TTypeActionModalForm } from '@typescript/global'

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
  [EVENT_SKILL.SEARCH_DATA_TABLE_SKILL]: TFormFilterSkill
}

export default EVENT_SKILL
