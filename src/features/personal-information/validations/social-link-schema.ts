import { messageError } from '@validation/constant'
import { zLink } from '@validation/reusable-schema'
import z from 'zod'

const socialLinkSchema = (name: string) =>
  z.object({
    url: zLink({ mandatory: true })?.refine(
      (data) => {
        const patterns = {
          github: /github\.com\/([a-zA-Z0-9-_]{1,39})$/,
          linkedin: /linkedin\.com\/in\/([a-zA-Z0-9_-]+)$/,
          gmail:
            /mail\.google\.com\/mail\/u\/\d+\/\?fs=1&to=[^&]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}&tf=cm/,
          whatsapp: /wa\.me\/\d+/
        }
        const pattern = patterns[name.toLowerCase() as keyof typeof patterns]
        const isValid = pattern?.test(data || '')
        return isValid
      },
      { message: messageError.invalid(`${name} name`) }
    )
  })

export default socialLinkSchema
