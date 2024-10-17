import { zEnum, zPassword, zString } from '@lib/validation/reusable-schema';
import * as z from 'zod';

export const loginSchema = z.object({
  username: zString<true>({ name: 'username' }),
  password: zPassword<true>(),
  isRememberMe: zEnum({ enum: ['false', 'true'], mandatory: false }),
});

export type TFormLogin = z.input<typeof loginSchema>;
