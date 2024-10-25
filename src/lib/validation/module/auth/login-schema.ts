import { zEnum, zPassword, zString } from '@lib/validation/reusable-schema';
import * as z from 'zod';

export const loginSchema = z.object({
  username: zString<true>({ name: 'username' }),
  password: zPassword<true>(),
  isRememberMe: zEnum<['false', 'true']>({
    name: 'Is Remember Me',
    enum: ['false', 'true'],
    mandatory: false,
  }),
});

export const initialFormLogin = {
  username: {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    value: '',
    errorMessage: '',
  },
  password: {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    value: '',
    errorMessage: '',
  },
  isRememberMe: {
    name: 'is_remember_me',
    value: 'false',
    errorMessage: '',
  },
};

export type TFormLogin = z.input<typeof loginSchema>;
