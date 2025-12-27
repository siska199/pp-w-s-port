import { zString } from '@validation/reusable-schema'
import z from 'zod'

export const initialFormProjectResponsibility = {
  id: {
    name: 'id',
    label: 'ID',
    value: ''
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

const projectResponsibilitySchema = z.object({
  description: zString({ name: 'Description', max: 2000 }),
  id: zString({ name: 'id', mandatory: false })
})

export type TProjectResponsibility = z.input<typeof projectResponsibilitySchema>

export default projectResponsibilitySchema
