import { zBooleanCheckbox, zDate, zString } from '@validation/reusable-schema'
import z from 'zod'

import appMessage from '@lib/data/app-message'

const experianceSchema = z.object({
  id_company: zString({ name: 'Company' }),
  id_profession: zString({ name: 'Profession' }),
  start_at: zDate({ name: 'Start At' }),
  end_at: zDate({ name: 'End At' }),
  description: zString({ name: 'Description', max: 1000 }),
  is_currently_work_here: zBooleanCheckbox({ name: 'Currently Work Here' })
})

export type TExperianceSchema = z.input<typeof experianceSchema>

export const initialFormExperiance = {
  id_company: {
    name: 'id_company',
    label: 'Company',
    placeholder: appMessage.inputSelectPlaceholder('company'),
    options: [],
    value: ''
  },
  id_profession: {
    name: 'profession',
    label: 'Profession',
    placeholder: appMessage.inputSelectPlaceholder('profession'),
    options: [],
    value: ''
  },
  start_at: {
    name: 'start_at',
    label: 'Start At',
    value: null
  },
  end_at: {
    name: 'end_at',
    label: 'End At',
    value: null
  },
  description: {
    name: 'description',
    label: 'Description',
    value: ''
  }
}

export default experianceSchema
