import * as z from 'zod'

import { zEnum, zPassword, zString } from '@lib/validation/reusable-schema'

export const signInSchema = z.object({
  username: zString({ name: 'username', mandatory: true }),
  password: zPassword(true),
  isRememberMe: zEnum<['false', 'true']>({
    name: 'Is Remember Me',
    enum: ['false', 'true'],
    mandatory: false
  })
})

export const initialFormSignIn = {
  username: {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
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
  isRememberMe: {
    name: 'is_remember_me',
    value: 'false',
    errorMessage: ''
  }
}

export type TFormLSignIn = z.input<typeof signInSchema>
