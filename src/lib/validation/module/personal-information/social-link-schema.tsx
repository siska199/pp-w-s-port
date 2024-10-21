import { zLink } from '@lib/validation/reusable-schema';
import z from 'zod';

const socialLinkSchema = z.object({
  url: zLink({ mandatory: true }),
});

export default socialLinkSchema;
