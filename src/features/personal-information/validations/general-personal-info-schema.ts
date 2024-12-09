import { zEmail, zFileLocale, zString } from '@validation/reusable-schema'
import z from 'zod'

import { TTypeFile } from '@typescript/ui-types'

export const initialFormGeneralPersonalInfo = {
  first_name: {
    name: 'first_name',
    label: 'First Name',
    placeholder: 'e.g Siska Apriana',
    value: '',
    errorMessage: ''
  },
  last_name: {
    name: 'last_name',
    label: 'Last Name',
    placeholder: 'e.g Rifianti',
    value: '',
    errorMessage: ''
  },
  email: {
    name: 'email',
    label: 'email',
    placeholder: 'e.g XXXXX@gmail.com',
    value: '',
    errorMessage: ''
  },
  id_profession: {
    name: 'id_profession',
    label: 'Profession',
    options: [],
    placeholder: 'e.g Frontend Developer',
    value: '',
    errorMessage: ''
  },

  province: {
    name: 'province',
    options: [],
    label: 'Province',
    placeholder: 'e.g Jawa Timur',
    value: '',
    autoComplete: 'new-password',
    errorMessage: ''
  },
  city: {
    name: 'city',
    placeholder: 'e.g Situbondo',
    label: 'City',
    options: [],
    disabled: true,
    value: '',
    autoComplete: 'new-password',
    errorMessage: ''
  },
  district: {
    name: 'district',
    label: 'District',
    placeholder: 'e.g Besuki',
    options: [],
    disabled: true,
    value: '',
    autoComplete: 'new-password',
    errorMessage: ''
  },

  postal_code: {
    name: 'postal_code',
    options: [],
    label: 'Postal Code',
    placeholder: 'e.g 68356',
    disabled: true,
    value: '',
    errorMessage: ''
  },
  bio: {
    name: 'bio',
    maxLength: 100,
    label: 'Bio',
    placeholder: `e.g I'm Frontend Developer based on Jakarta, Indonesia`,
    value: '',
    errorMessage: ''
  },
  about_me: {
    name: 'about_me',
    label: 'About Me',
    placeholder: 'Write a brief summary about your professional background and skills',
    value: '',
    maxLength: 500,
    rows: 4,
    errorMessage: ''
  },
  professional_image: {
    name: 'professional_image',
    label: 'Professional Image',
    value: null,
    listAcceptedTypeFile: [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG, TTypeFile.PDF],
    errorMessage: ''
  }
}

export type TFormGeneralPersonalInfo = typeof initialFormGeneralPersonalInfo

const generalPersonalInfoSchema = z
  .object({
    first_name: zString({ name: 'First Name', max: 50 }),
    last_name: zString({ name: 'Last Name', max: 50 }),
    id_profession: zString({ name: 'Profession' }),

    province: zString({ name: 'Province', max: 255 }),
    city: zString({ name: 'City', max: 255 }),
    district: zString({ name: 'District', max: 255 }),
    postal_code: zString({ name: 'Postal Code', max: 255 }),

    email: zEmail(),
    bio: zString({ name: 'Bio', max: 100 }),
    about_me: zString({ name: 'About Me', max: 1000 }),
    professional_image: zFileLocale({
      name: 'Professional Image',
      listAcceptedTypeFile: initialFormGeneralPersonalInfo.professional_image.listAcceptedTypeFile
    })
  })
  ?.strict()

export type TGeneralPersonalInfoSchema = z.input<typeof generalPersonalInfoSchema>

export default generalPersonalInfoSchema
