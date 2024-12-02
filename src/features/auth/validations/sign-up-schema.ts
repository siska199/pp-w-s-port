import { zPassword, zString } from '@validation/reusable-schema'
import * as z from 'zod'

import appMessage from '@lib/data/app-message'

const signUpSchema = z
  .object({
    first_name: zString({ name: 'First Name' }),
    last_name: zString({ name: 'Last Name' }),

    email: zString({ name: 'Email' }),
    username: zString({ name: 'Username' }),

    password: zPassword(true),
    confirmation_password: zString({ name: 'Confirmation password' }),

    id_profession: zString({ name: 'Profession' })
  })
  ?.superRefine((data, ctx) => {
    if (data.password !== data.confirmation_password) {
      ctx.addIssue({
        code: 'custom',
        message: `Password and Confirmation Password dosen't match`,
        path: ['confirmation_password']
      })
    }
  })

export type TSignUpSchema = z.input<typeof signUpSchema>

export const initialFormSignUp = {
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
  username: {
    name: 'username',
    label: 'Username',
    placeholder: 'e.g siska199',
    value: '',
    errorMessage: ''
  },
  password: {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    value: '',
    errorMessage: ''
  },
  confirmation_password: {
    name: 'confirmation_password',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
    type: 'password',
    value: '',
    errorMessage: ''
  },
  id_profession: {
    name: 'id_profession',
    label: 'Profession',
    placeholder: appMessage.selectInputPlaceolder('profession'),
    options: [],
    value: ''
  }
}

export default signUpSchema
