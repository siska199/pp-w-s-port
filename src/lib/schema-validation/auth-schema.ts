import validation, { messageError } from '@lib/data/error-message';
import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().nonempty({
    message: messageError.required('Username'),
  }),
  password: z
    .string()
    .nonempty({
      message: messageError.required('Password'),
    })
    .refine((val) => validation.password.regex.test(val), {
      message: validation.password.message,
    }),
  isRememberMe: z.enum(['false', 'true']).optional(),
});

export type TFormLogin = z.input<typeof loginSchema>;
