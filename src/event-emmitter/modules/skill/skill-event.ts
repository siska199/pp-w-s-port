import { TFormSkill } from '@lib/validation/module/skill/skill-schema'
import { TTypeActionModalForm } from '@typescript/global'

const EVENT_NAME_SKILL = {
  SET_MODAL_FORM_SKILL: 'SET_MODAL_FORM_SKILL',
  SET_SKILL: 'SET_SKILL'
} as const

export type TEventSkillMap = {
  [EVENT_NAME_SKILL.SET_MODAL_FORM_SKILL]: {
    isShow: boolean
    action: TTypeActionModalForm
  }
  [EVENT_NAME_SKILL.SET_SKILL]: TFormSkill
}

export default EVENT_NAME_SKILL
