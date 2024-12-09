import { zFileLocale, zString } from '@validation/reusable-schema'
import { z } from 'zod'

import { defaultTTypeImage } from '@lib/helper/constant'
import { TTypeFile } from '@typescript/ui-types'

const menuProjectSchema = z.object({
  name: zString({ name: 'Name' }),
  main_image: zFileLocale({ name: 'Main Image', listAcceptedTypeFile: [TTypeFile.IMAGE_ALL] }),
  description: zString({ name: 'Description', max: 1000 }),
  features: zString({ name: 'Description', max: 1000 }),
  related_images: z
    .array(zFileLocale({ name: 'Related Images', listAcceptedTypeFile: [TTypeFile.IMAGE_ALL] }))
    .nonempty({ message: 'At least one related image is required' })
    .max(5, { message: 'A maximum of 5 images are allowed' }),
  tech_tacks: zString({ name: 'Tech Stacks', max: 5000 })
})

export type TMenuProject = z.input<typeof menuProjectSchema> & {
  id: string
}

export const initialFormMenuProject = {
  name: {
    name: 'name',
    label: 'Name',
    placeholder: 'e.g Login',
    value: ''
  },
  main_image: {
    name: 'main_image',
    label: 'Main Image',
    value: null,
    listAcceptedTypeFile: defaultTTypeImage
  },
  description: {
    name: 'description',
    label: 'Desription',
    value: '',
    rows: 5,
    placeholder: 'Write a description about your menu project'
  },

  features: {
    name: 'features',
    label: 'Features',
    value: '',
    placeholder: 'List the features of your menu project'
  },
  related_images: {
    name: 'related_images',
    label: 'Related Images',
    value: [],
    multiple: true,
    totalMaxSize: 30
  }
}
export default menuProjectSchema
