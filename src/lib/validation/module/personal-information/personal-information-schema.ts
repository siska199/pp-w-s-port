import { zEmail, zFileLocale, zPhoneNumber, zString } from '@lib/validation/reusable-schema'
import { TTypeFile } from '@typescript/modules/ui/ui-types'
import z from 'zod'

const personalInformationSchema = z
  .object({
    first_name: zString({ name: 'First Name', max: 50 }),
    last_name: zString({ name: 'Last Name', max: 50 }),
    id_profession: zString({ name: 'Profession' }),

    id_province: zString({ name: 'Province', max: 255 }),
    id_city: zString({ name: 'City', max: 255 }),
    id_district: zString({ name: 'District', max: 255 }),
    id_postal_code: zString({ name: 'Postal Code', max: 255 }),

    phone: zPhoneNumber(),
    email: zEmail(),
    bio: zString({ name: 'Bio', max: 100 }),
    about_me: zString({ name: 'About Me', max: 1000 }),
    professional_image: zFileLocale({
      name: 'Professional Image',
      listAcceptedType: [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG]
    })
  })
  ?.strict()

export const initialFormPersonalInformation = {
  first_name: {
    name: 'first_name',
    label: 'First Name',
    placeholder: 'e.g Siska Apriana',
    value: ''
  },
  last_name: {
    name: 'last_name',
    label: 'Last Name',
    placeholder: 'e.g Rifianti',
    value: ''
  },
  id_profession: {
    name: 'id_profession',
    label: 'Profession',
    options: [],
    placeholder: 'e.g Frontend Developer',
    value: ''
  },

  id_province: {
    name: 'id_province',
    options: [],
    label: 'Province',
    placeholder: 'e.g Jawa Timur',
    value: ''
  },
  id_city: {
    name: 'id_city',
    placeholder: 'e.g Situbondo',
    label: 'City',
    options: [],
    disabled: true,
    value: ''
  },
  id_district: {
    name: 'id_district',
    label: 'District',
    placeholder: 'e.g Besuki',
    options: [],
    disabled: true,
    value: ''
  },

  id_postal_code: {
    name: 'id_postal_code',
    options: [],
    label: 'Postal Code',
    placeholder: 'e.g 68356',
    disabled: true,
    value: ''
  },
  bio: {
    name: 'bio',
    maxLength: 100,
    label: 'Bio',
    placeholder: `e.g I'm Frontend Developer based on Jakarta, Indonesia`,
    value: ''
  },
  about_me: {
    name: 'about_me',
    label: 'About Me',
    placeholder: 'Write a brief summary about your professional background and skills',
    value: ''
  },
  professional_image: {
    name: 'professional_image',
    label: 'Professional Image',
    value: null
  }
}

export type TFormPersonalInformation = z.input<typeof personalInformationSchema>

export default personalInformationSchema
