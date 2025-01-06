import { zNumber, zString } from '@validation/reusable-schema'
import z from 'zod'

import { TTypeLevelSkill } from '@features/skill-user/types/skill-user-type'

import { generateOptionsFromEnum } from '@lib/helper/function'
import { TOption } from '@typescript/ui-types'

const skillUserSchema = z.object({
  id: zString({ name: 'ID', mandatory: false }),
  id_category: zString({ name: 'Category' }),
  id_skill: zString({ name: 'Skill' }),
  level: zString({ name: 'Level' }),
  years_of_experiance: zNumber({
    name: 'Years of Experiance'
  })
})

export type TSkillUserSchema = z.input<typeof skillUserSchema>

export interface TOptionsFormSkillUser {
  categories: TOption[]
  skills: (TOption & {
    id_category: string
  })[]
}

export const initialFormSkillUser = {
  id: {
    value: '',
    name: 'id',
    errorMessage: '',
    label: 'ID'
  },
  id_category: {
    name: 'id_category',
    label: 'Category',
    placeholder: 'Select a category',
    options: [] as TOptionsFormSkillUser['categories'],
    value: '',
    errorMessage: ''
  },
  id_skill: {
    name: 'id_skill',
    label: 'Skill',
    placeholder: 'Select a skill',
    options: [] as TOptionsFormSkillUser['skills'],
    value: '',
    errorMessage: '',
    disabled: true
  },
  level: {
    name: 'level',
    label: 'Level',
    placeholder: 'Select a level',
    options: generateOptionsFromEnum(TTypeLevelSkill),
    value: '',
    errorMessage: ''
  },
  years_of_experiance: {
    name: 'years_of_experiance',
    label: 'Years of Experience',
    placeholder: 'e.g 1',
    value: '',
    errorMessage: ''
  }
}

export default skillUserSchema
