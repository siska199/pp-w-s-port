import { zDate, zString } from '@validation/reusable-schema'
import z from 'zod'

import { basicToolbarConfig } from '@lib/helper/constant'

const educationSchema = z.object({
  id_level: zString({ name: 'Level' }),
  id_major: zString({ name: 'Major' }),
  id_school: zString({ name: 'School' }),
  start_at: zDate({ name: 'Start At' }),
  end_at: zDate({ name: 'End At' }),
  description: zString({ name: 'Description' })
})

export type TEducationSchema = z.input<typeof educationSchema>

export const initialFormEducation = {
  id_level: {
    name: 'id_level',
    label: 'Level',
    placeholder: 'Select a level',
    options: [],
    value: '',
    errorMessage: ''
  },
  id_major: {
    name: 'id_major',
    label: 'Major',
    placeholder: 'Select a major',
    options: [],
    value: '',
    errorMessage: ''
  },
  id_school: {
    name: 'id_school',
    label: 'School',
    placeholder: 'Select a school',
    options: [],
    value: '',
    errorMessage: ''
  },
  start_at: {
    name: 'start_at',
    label: 'Start At',
    placeholder: 'Select a Start At',
    value: null,
    errorMessage: ''
  },
  end_at: {
    name: 'end_at',
    label: 'End At',
    placeholder: 'Select a End At',
    value: null,
    errorMessage: ''
  },
  description: {
    name: 'description',
    label: 'Description',
    placeholder: 'Enter a brief description of your education or experience',
    value: '',
    errorMessage: '',
    toolbar: basicToolbarConfig
  }
}

export default educationSchema
