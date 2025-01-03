import { zString } from '@validation/reusable-schema'
import z from 'zod'

import { TTypeLevelSkill } from '@features/skill-user/types/skill-user-type'

import { generateOptionsFromEnum } from '@lib/helper/function'
import { yearsOfExperiances } from '@lib/helper/options'

const skillUserSchema = z.object({
  id: zString({ name: 'ID', mandatory: false }),
  id_category: zString({ name: 'Category' }),
  id_skill: zString({ name: 'Skill' }),
  level: zString({ name: 'Level' }),
  years_of_experiance: zString({
    name: 'Years of Experiance'
  })
})

export type TSkillUserSchema = z.input<typeof skillUserSchema>

export const initialFormSkillUser = {
  id_category: {
    name: 'id_category',
    label: 'Category',
    placeholder: 'Select a category',
    options: [],
    value: '',
    errorMessage: ''
  },
  id_skill: {
    name: 'id_skill',
    label: 'Skill',
    placeholder: 'Select a skill',
    options: [],
    value: '',
    errorMessage: ''
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
    placeholder: 'Select years of experience',
    options: yearsOfExperiances,
    value: '',
    errorMessage: ''
  }
}

export default skillUserSchema
