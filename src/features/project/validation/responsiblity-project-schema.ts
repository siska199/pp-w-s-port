import { zString } from '@validation/reusable-schema'
import z from 'zod'

export const initialFormResponsibilityProject = {
  id: {
    name: 'id',
    label: 'ID'
  },
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

const responsibilityProjectSchema = z.object({
  description: zString({ name: 'Description', max: 2000 }),
  id: zString({ name: 'id', mandatory: false })
})

export type TResponsibilityProject = z.input<typeof responsibilityProjectSchema>

export default responsibilityProjectSchema
