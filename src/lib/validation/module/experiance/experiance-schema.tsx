import appMessage from '@lib/data/app-message'
import { zString } from '@lib/validation/reusable-schema'
import z from 'zod'

const experianceSchema = z.object({
  id_company: zString({ name: 'Company' }),
  id_profession: zString({ name: 'Profession' }),
  start_at: zString({ name: 'Start At' }),
  end_at: zString({ name: 'End At' }),
  description: zString({ name: 'Description', max: 1000 })
})

export const initialFormExperiance = {
  id_company: {
    name: 'id_company',
    label: 'Company',
    placeholder: appMessage.inputSelectPlaceholder('company'),
    options: [],
    value: ''
  },
  skill: {
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
  }
}

export type TFormExperiance = z.input<typeof experianceSchema>

export default experianceSchema
