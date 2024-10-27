import { zString } from '@lib/validation/reusable-schema'
import z from 'zod'

const skillSchema = z.object({
  id_category: zString({ name: 'Category' }),
  id_skill: zString({ name: 'Skill' }),
  level: zString({ name: 'Level' }),
  year_of_experiance: zString({
    name: 'Year of Experiance'
  })
})

export type TFormSkill = z.input<typeof skillSchema>

export const initialFormSkill = {
  id_category: {
    name: 'id_category',
    label: 'Category',
    placeholder: 'Select a category',
    options: []
  },
  id_skill: {
    name: 'id_skill',
    label: 'Skill',
    placeholder: 'Select a skill',
    options: []
  },
  level: {
    name: 'level',
    label: 'Level',
    placeholder: 'Select a level',
    options: []
  },
  year_of_experiance: {
    name: 'year_of_experiance',
    label: 'Year of Experience',
    placeholder: 'Select years of experience',
    options: []
  }
}

export default skillSchema
