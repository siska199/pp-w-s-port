import { messageError } from '@validation/const'
import { zLink } from '@validation/reusable-schema'
import z from 'zod'

const socialLinkSchema = (name: string) =>
  z.object({
    url: zLink({ mandatory: true })?.refine(
      (data) => {
        const patterns = [
          /your_linkeind_name/i,
          /your_gmail/i,
          /your_phone_number/i,
          /your_github_username/i
        ]
        return !patterns.some((pattern) => pattern.test(data || ''))
      },
      { message: messageError.required(name) }
    )
})

export default socialLinkSchema
