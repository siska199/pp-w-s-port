import { handleValidateType } from '@lib/helper'
import validation, { messageError } from '@lib/validation'
import { TTypeFile } from '@typescript/modules/ui/ui-types'
import z, { ZodEffects, ZodNumber, ZodString } from 'zod'

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
    : numberSchema.optional()) as ZodNumber
}

export const zDate = (params: { name: string; mandatory?: boolean }) => {
  const { name, mandatory = true } = params
  const dateSchema = zString({ name, mandatory })?.datetime({ message: 'Invalid Date' })
  return mandatory
    ? dateSchema.nonempty({
        message: messageError.required(name)
      })
    : dateSchema?.optional()
}

type TResultZPassword = ZodEffects<ZodString, string, string>
export const zPassword = (mandatory: boolean = true): TResultZPassword => {
  return zString({ name: 'Password', mandatory }).refine(
    (val) => (mandatory ? validation.password.regex.test(val as string) : true),
    {
      message: validation.password.message
    }
  ) as TResultZPassword
}

export const zEmail = (mandatory = true) => {
  return zString({ name: 'Email', mandatory }).refine(
    (val) => (mandatory ? validation.email.regex.test(val as string) : true),
    {
      message: validation.email.message
    }
  )
}

export const zPhoneNumber = (mandatory = true) => {
  const phoneSchema = z
    .string()
    .max(15, { message: messageError.phoneNumberExceedLength })
    .refine((val) => /^08\d{8,13}$/.test(val), {
      message: messageError.phoneNumberFormat
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
  listAcceptedType: TTypeFile[]
  mandatory?: boolean
}): z.ZodType<File | null | undefined> => {
  const { size = 5, listAcceptedType, mandatory = true } = params
  const fileSchema = z
    .instanceof(File, { message: 'File is required' })
    ?.refine((file) => file.size > size * 1024 * 1024, messageError.fileType(listAcceptedType))
    .refine((file) => {
      const isValid = handleValidateType({
        file,
        listAcceptedType
      })
      return isValid
    }, messageError.fileType(listAcceptedType))

  return mandatory ? fileSchema : fileSchema?.optional()?.nullable()
}

export const zLink = (params: { mandatory?: boolean }) => {
  const { mandatory } = params
  const linkSchema = zString({ name: 'Link', max: 2083 })?.url({
    message: messageError.url
  })
  return mandatory ? linkSchema : linkSchema?.optional()
}
