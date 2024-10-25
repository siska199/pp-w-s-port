import { generateDefaultValue } from '@lib/helper';
import { zEnum, zPassword, zString } from '@lib/validation/reusable-schema';
import * as z from 'zod';

export const loginSchema = z.object({
  username: zString<true>({ name: 'username' }),
  password: zPassword<true>(),
  isRememberMe: zEnum<['false', 'true']>({
    name: 'isRememberMe',
    enum: ['false', 'true'],
    mandatory: false,
  }),
});

export const initialFormLogin = {
  username: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
  password: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
  isRememberMe: {},
};

export const loginDefaultValues = {
  ...generateDefaultValue(loginSchema),
  isRememberMe: 'false',
};

export type TFormLogin = z.input<typeof loginSchema>;
