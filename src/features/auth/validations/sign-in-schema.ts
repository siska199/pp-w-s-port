import { zBooleanCheckbox, zPassword, zString } from '@validation/reusable-schema'
import * as z from 'zod'

const signInSchema = z.object({
  username: zString({ name: 'username', mandatory: true }),
  password: zPassword(true),
  isRememberMe: zBooleanCheckbox({ name: 'Is Remember Me' })
})
export type TSignInSchema = z.input<typeof signInSchema>

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
  is_remember_me: {
    name: 'is_remember_me',
    value: 'false',
    errorMessage: '',
    label: 'Remember Me'
  }
}

export default signInSchema
