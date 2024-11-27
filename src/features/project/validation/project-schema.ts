import { zEnum, zFileLocale, zString } from '@validation/reusable-schema'
import { z } from 'zod'

import {
  optionsCategoryProject,
  optionsTechStack,
  optionsTypeProject
} from '@features/project/constants'

import appMessage from '@lib/data/app-message'
import { TTypeFile } from '@typescript/ui-types'

export const initialFormProject = {
  name: {
    name: 'name',
    label: 'Name',
    value: '',
    placeholder: 'e.g GOA (Garda oto Akses)'
  },
  category: {
    name: 'category',
    value: '',
    options: optionsCategoryProject,
    placeholder: appMessage.selectInputPlaceolder('category'),
    label: 'Category'
  },
  tech_stacks: {
    label: 'Tech Stacks',
    placeholder: 'e.g React, Node js, Golang',
    name: 'tech_stacks',
    options: optionsTechStack,
    value: []
  },
  type: {
    name: 'type',
    value: '',
    options: optionsTypeProject,
    placeholder: appMessage.selectInputPlaceolder('type'),
    label: 'Type'
  },
  thumbnail: {
    name: 'thumbnail',
    label: 'Thumbnail',
    value: null,
    listAcceptedTypeFile: [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG]
  },
  description: {
    name: 'description',
    label: 'Description',
    placeholder: 'Enter a brief description of your project',
    value: '',
    errorMessage: '',
    rows: 5,
    maxLength: 500
  }
}
const projectSchema = z.object({
  name: zString({ name: 'Name' }),
  category: zEnum({ name: 'Category', enum: ['WEBSITE', 'MOBILE', 'API', 'UI-UX'] as const }),
  type: zEnum({
    name: 'Type',
    enum: ['PERSONAL_PROJECT', 'COMPANY_PROJECT', 'FREELANCE'] as const
  }),
  thumbnail: zFileLocale({
    name: 'thumbnail',
    listAcceptedTypeFile: initialFormProject.thumbnail.listAcceptedTypeFile
  }),
  description: zString({ name: 'Description', max: initialFormProject.description.maxLength })
})

export type TProjectSchema = z.input<typeof projectSchema>

export default projectSchema
