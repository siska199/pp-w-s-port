import { zEnum, zFileLocale, zString } from '@validation/reusable-schema'
import { z } from 'zod'

import { TTypeFile } from '@typescript/modules/ui/ui-types'

const projectSchema = z.object({
  name: zString({ name: 'Name' }),
  category: zEnum({ name: 'Category', enum: ['WEBSITE', 'MOBILE', 'API', 'UI-UX'] as const }),
  type: zEnum({
    name: 'Type',
    enum: ['PERSONAL_PROJECT', 'COMPANY_PROJECT', 'FREELANCE'] as const
  }),
  thumbnail: zFileLocale({
    name: 'thumbnail',
    listAcceptedType: [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG]
  }),
  description: zString({ name: 'Description', max: 2555 })
})

export type TProjectSchema = z.input<typeof projectSchema>
export default projectSchema
