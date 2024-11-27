import { zString } from '@validation/reusable-schema'
import z from 'zod'

export const initialFormResponsibilityProject = {
  description: {
    name: 'description',
    label: 'Description',
    toolbar: {
      options: ['inline', 'colorPicker'],
      inline: {
        options: ['bold', 'underline', 'italic']
      }
    },
    value: ''
  }
}

const responsibilitySchema = z.object({
  description: zString({ name: 'Description', max: 2000 })
})

export type TResponsibilityProject = z.input<typeof responsibilitySchema>

export default responsibilitySchema
