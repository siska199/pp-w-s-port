import { zString } from '@validation/reusable-schema'
import z from 'zod'

import categories_skill from '@lib/data/dummy/categories_skill.json'
import skills from '@lib/data/dummy/skills.json'
import { generateOptions } from '@lib/helper/function'
import { levelSkillOptions, yearsOfExperiances } from '@lib/helper/options'

const skillSchema = z.object({
  id_category: zString({ name: 'Category' }),
  id_skill: zString({ name: 'Skill' }),
  level: zString({ name: 'Level' }),
  year_of_experiances: zString({
    name: 'Year of Experiance'
  })
})

export type TSkill = z.input<typeof skillSchema>

export const initialFormSkill = {
  id_category: {
    name: 'id_category',
    label: 'Category',
    placeholder: 'Select a category',
    options: generateOptions({ options: categories_skill }),
    value: '',
    errorMessage: ''
  },
  id_skill: {
    name: 'id_skill',
    label: 'Skill',
    placeholder: 'Select a skill',
    options: generateOptions({ options: skills }),
    value: '',
    errorMessage: ''
  },
  level: {
    name: 'level',
    label: 'Level',
    placeholder: 'Select a level',
    options: levelSkillOptions,
    value: '',
    errorMessage: ''
  },
  year_of_experiances: {
    name: 'year_of_experiances',
    label: 'Year of Experience',
    placeholder: 'Select years of experience',
    options: yearsOfExperiances,
    value: '',
    errorMessage: ''
  }
}

export default skillSchema
