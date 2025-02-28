import { messageError, regexValidation } from '@validation/constant'
import z, { ZodDate, ZodEffects, ZodNumber, ZodString } from 'zod'

import { TFileValue } from '@components/ui/input/input-file/input-file-v1'

import { formatDate, isValidTypeFile } from '@lib/helper/function'
import { TTypeDateFormat, TTypeFile } from '@typescript/ui-types'

export const zNumber = (params: {
  name: string
  min?: number
  max?: number
  mandatory?: boolean
}): z.ZodNumber => {
  const { name, max = 255, min = 1, mandatory = true } = params
  const numberSchema = z.number().max(max, {
    message: messageError.maxNumber(name, max)
  })

  return (mandatory
    ? numberSchema.min(min, {
        message: messageError.minNumber(name, min)
      })
    : numberSchema.optional()) as unknown as ZodNumber
}

export const zString = (params: {
  name: string
  min?: number
  max?: number
  mandatory?: boolean
}): ZodString => {
  const { name, max = 255, min = 1, mandatory = true } = params

  const stringSchema = z.string().max(max, {
    message: messageError.maxCharacter(name, max)
  })

  return mandatory
    ? stringSchema
        .nonempty({
          message: messageError.required(name)
        })
        .min(min, {
          message: messageError.minCharacter(name, min)
        })
    : stringSchema.min(0)
}

export const zDate = (params: {
  name: string
  mandatory?: boolean
  format?: TTypeDateFormat
}): ZodDate => {
  const { name = 'Date', mandatory = true, format = TTypeDateFormat.ISO } = params

  const dateSchema = z.coerce
    .date()
    .transform((date) => {
      const newFormat = formatDate({ date, format })
      return date ? newFormat : null
    })
    .refine(
      (date) => {
        return date && date !== '1970-01-01T00:00:00.000Z'
      },
      { message: messageError.required(name) }
    )

  return (mandatory ? dateSchema : dateSchema?.optional()) as unknown as ZodDate
}

type TResultZPassword = ZodEffects<ZodString, string, string>
export const zPassword = (mandatory: boolean = true): TResultZPassword => {
  return zString({ name: 'Password', mandatory }).refine(
    (val) => (mandatory ? regexValidation.password.test(val as string) : true),
    {
      message: messageError.password
    }
  ) as TResultZPassword
}

export const zEmail = (mandatory = true) => {
  return zString({ name: 'Email', mandatory }).refine(
    (val) => (mandatory ? regexValidation.email.test(val as string) : true),
    {
      message: messageError.invalid('Email')
    }
  )
}

export const zPhoneNumber = (mandatory = true) => {
  const phoneSchema = z
    .string()
    .max(15, { message: messageError.phoneNumberExceedLength })
    .transform((phoneNumber) => {
      const isFormated = String(phoneNumber?.charAt(0)) === '0'
      const updateFormatPhoneNumber = String(`0${phoneNumber?.replace(/-/g, '')}`)
      return isFormated ? phoneNumber : updateFormatPhoneNumber
    })

  return mandatory ? phoneSchema : phoneSchema.optional()
}

export const zEnum = <TEnum extends [string, ...string[]]>(params: {
  name: string
  enum: TEnum
  mandatory?: boolean
}): z.ZodEnum<TEnum> | z.ZodOptional<z.ZodEnum<TEnum>> => {
  const { enum: enumValues, mandatory, name } = params
  const enumSchema = z.enum(enumValues, {
    message: messageError.required(name)
  })

  return mandatory ? enumSchema : enumSchema.optional()
}

export const zFileLocale = (params: {
  name: string
  size?: number
  listAcceptedTypeFile: TTypeFile[]
  mandatory?: boolean
}): z.ZodType<TFileValue> => {
  const { size = 5, listAcceptedTypeFile, mandatory = true } = params
  const fileSchema = z
    .instanceof(File, { message: 'File is required' })
    ?.refine((file) => {
      return file.size <= size * 1024 * 1024
    }, messageError.maxSizeFile)
    .refine((file) => {
      const isValid = isValidTypeFile({
        file,
        listAcceptedTypeFile
      })
      return isValid
    }, messageError.fileType(listAcceptedTypeFile))

  return (mandatory ? fileSchema : fileSchema?.optional()?.nullable()) as z.ZodType<File>
}

export const zLink = (params: { mandatory?: boolean }) => {
  const { mandatory } = params
  const linkSchema = zString({ name: 'Link', max: 2083 })?.url({
    message: messageError.url
  })
  return mandatory ? linkSchema : linkSchema?.optional()
}

export const zBooleanCheckbox = (params: { name: string; mandatory?: boolean }) => {
  const { name, mandatory = false } = params
  return zEnum({
    name: name,
    enum: ['false', 'true'] as const,
    mandatory: mandatory
  })
}
