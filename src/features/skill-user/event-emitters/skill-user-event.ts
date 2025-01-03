import { TFilterSkillUser } from '@features/skill-user/components/skill-user-list/form-filter-skill-user'
import { TSkillUser } from '@features/skill-user/types/skill-user-type'

import { TTypeActionModalForm } from '@typescript/index-type'

const EVENT_SKILL_USER = {
  SET_MODAL_FORM_SKILL_USER: 'SET_MODAL_FORM_SKILL_USER',
  SET_SKILL_USER: 'SET_SKILL_USER',
  SEARCH_DATA_TABLE_SKILL_USER: 'SEARCH_DATA_TABLE_SKILL_USER'
} as const

export type TEventMapSkillUser = {
  [EVENT_SKILL_USER.SET_MODAL_FORM_SKILL_USER]: {
    isShow: boolean
    action: TTypeActionModalForm
  }
  [EVENT_SKILL_USER.SET_SKILL_USER]: TSkillUser
  [EVENT_SKILL_USER.SEARCH_DATA_TABLE_SKILL_USER]: TFilterSkillUser
}

export default EVENT_SKILL_USER
