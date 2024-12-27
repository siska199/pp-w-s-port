import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import z, { ZodSchema, ZodType } from 'zod'

import { TObject, TResponseAPI } from '@typescript/index-type'
import { TOption, TTypeDateFormat, TTypeFile } from '@typescript/ui-types'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const isEmptyValue = (value: any): boolean => {
  if ([undefined, null, '']?.includes(value)) return true
  if (typeof value === 'object') {
    if (Array.isArray(value)) return value.length === 0
    return Object.keys(value).length === 0
  }
  return false
}

interface TParamsSpreadArrayTemp {
  newValue: any
  array: any[]
}

export const spreadArrayAttemp = (params: TParamsSpreadArrayTemp) => {
  const { newValue, array } = params
  return isEmptyValue(array) ? [newValue] : [...array, newValue]
}

export const arraysHaveSameMembers = (array1: string[], array2: string[]) => {
  if (array1.length !== array2.length) return false

  const sortedArray1 = array1.slice().sort()
  const sortedArray2 = array2.slice().sort()

  return sortedArray1.every((value, index) => value === sortedArray2[index])
}

export const handlePreventDefault = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  return e?.preventDefault()
}

interface TParamsFieldFromObjectList {
  array: any[]
  fieldNameTarget: string
  fieldNameValue: string
  value: any
}
export const getFieldFromObjectList = (params: TParamsFieldFromObjectList) => {
  const { array, fieldNameTarget, fieldNameValue, value } = params
  return array?.filter((data) => data?.[fieldNameValue] === value)?.[0]?.[fieldNameTarget]
}

export const getFieldLabelFromOptions = (
  params: Pick<TParamsFieldFromObjectList, 'array' | 'value'>
) => {
  const { array, value } = params
  return array?.filter((data) => data?.value === value)?.[0]?.label
}

export function debounce(func?: (...args: any[]) => void, wait?: number) {
  let timeout: ReturnType<typeof setTimeout>
  return function (...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => (func ? func(...args) : null), wait)
  }
}

interface TParamsGetAssetURl {
  name: string
  folder?: 'images' | 'icons'
}
export const getAssetURL = (params: TParamsGetAssetURl) => {
  const { name, folder = 'images' } = params
  return new URL(`../../assets/${folder}/${name}`, import.meta.url)?.href
}

export const convertBytesToMegabytes = (bytes: number): number => {
  return bytes / (1024 * 1024)
}

export const handleGetFileTypeFromName = (name: string) => {
  const type = name?.split('.')?.slice(-1)[0]

  return `.${type?.toLowerCase()}`
}

export const isValidTypeFile = (params: { file: File; listAcceptedTypeFile: TTypeFile[] }) => {
  const { file, listAcceptedTypeFile } = params
  const type = handleGetFileTypeFromName(file?.name) as TTypeFile

  const isAllTypeAllow = listAcceptedTypeFile?.includes(TTypeFile.ALL)
  const isAllImageTypeAllow = listAcceptedTypeFile?.includes(TTypeFile.IMAGE_ALL)
  const isTypeAllow = isAllTypeAllow || listAcceptedTypeFile?.includes(type) || isAllImageTypeAllow

  return isTypeAllow
}

interface TParamsDownloadFile {
  url: string
  filename: string
}
export const handleDownloadFile = (params: TParamsDownloadFile) => {
  const { url, filename } = params

  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename || 'file'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
}

export type TTypeGeneralFile = 'image' | 'pdf' | undefined

export const getGeneralTypeFile = (type: string): TTypeGeneralFile => {
  let generalType
  if (['jpg', 'jpeg', 'png', 'webp']?.some((ext) => type?.toLowerCase()?.includes(ext))) {
    generalType = 'image'
  } else if (type?.includes('pdf')) {
    generalType = 'pdf'
  }

  return generalType as TTypeGeneralFile
}

export const extractExtensionFile = (type: string) => {
  const [_, extension] = type.split('/')
  return extension
}

export const excludeRef = <T extends { ref?: any }>(input: T) => {
  const { ref: _, ...rest } = input
  return rest
}

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const generateUrlQueryParams = (params: { url: string; queryObject: TObject }) => {
  const { url, queryObject } = params
  const queryParams = new URLSearchParams(queryObject)
  const newUrl = `${url}?${queryParams.toString()}`
  return newUrl
}

export const generateDefaultValue = (schema: ZodType<any>): any => {
  if (schema instanceof z.ZodString) return ''
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape
    const defaultObj: { [key: string]: any } = {}
    for (const key in shape) {
      defaultObj[key] = generateDefaultValue(shape[key])
    }
    return defaultObj
  }
  if (schema instanceof z.ZodArray) return null
  if (schema instanceof z.ZodOptional) return null
  if (schema instanceof z.ZodNull) return null
  if (schema instanceof z.ZodEffects) return ''
}

export const generateOptions = (params: {
  options: TObject
  labelName?: string
  valueName?: string
  listSaveField?: string[]
}) => {
  const { options, labelName = 'name', valueName = 'id', listSaveField } = params

  return options?.map((option: TObject) => {
    const saveFields = listSaveField?.reduce<Record<string, any>>((acc, field) => {
      acc[field] = option[field]
      return acc
    }, {})
    return {
      label: toCapitalize(option[labelName]),
      value: option?.[valueName]?.toString(),
      ...saveFields
    }
  })
}

export const generateOptionsFromEnum = (enumObject: TObject): TOption<string>[] => {
  return Object?.keys(enumObject)?.map((key) => {
    return {
      label: toCapitalize(enumObject[key]?.replace(/_/g, ' ')),
      value: enumObject[key]
    }
  })
}

export const generateFileFromUrl = async (url: string) => {
  const blob = await fetch(url).then((r) => r.blob())
  const file = new File([blob], 'random', { type: blob.type })
  return file
}

export const extractValueFromForm = <TForm extends TObject>(
  form: TForm
): { [key in keyof TForm]: any } => {
  Object.keys(form).map((key: keyof TForm) => {
    form[key] = form[key]?.value
  })
  return form
}

interface TMappingErrorsToForm<TSchema, TForm extends TObject> {
  schema: ZodSchema<TSchema>
  form: TForm
}

export const mappingErrorsToForm = <TSchema, TForm extends TObject>(
  params: TMappingErrorsToForm<TSchema, TForm>
) => {
  type TKForm = keyof TForm

  const { schema, form } = params
  let isValid = true

  const result = schema.safeParse(
    Object.keys(form).reduce((acc, key) => {
      const value = form[key as TKForm].value
      acc[key] = typeof value === 'string' ? value?.trim() : value
      return acc
    }, {} as TObject)
  )

  isValid = result?.success
  Object?.keys(form)?.reduce((acc, key) => {
    const errorMessage = !isValid ? result?.error?.flatten()?.fieldErrors[key as TKForm]?.[0] : ''

    form[key as TKForm].errorMessage = errorMessage
    form[key as TKForm].value = result?.data?.[key as keyof TSchema]
    return acc
  }, {} as TObject)

  return { isValid, form }
}

interface TMappingValuesToForm<TForm extends TObject> {
  values: Record<keyof TForm, any>
  form: TForm
}
export const mappingValuesToForm = <TForm extends TObject>(params: TMappingValuesToForm<TForm>) => {
  const { form, values } = params
  Object.keys(form).forEach((key) => {
    form[key].value = values[key]
  })

  return { ...form }
}

export const fetchOptions = async <T>(
  fetchFunction: (params?: any) => Promise<T[]>,
  params?: any
) => {
  const data = await fetchFunction(params)
  return generateOptions({ options: data })
}

export const isHtmlHasText = (html: string): boolean => {
  const tempElement = document.createElement('div')
  tempElement.innerHTML = html

  return (tempElement?.textContent?.trim().length || 0) > 0
}

export const deepCopy = <T extends object>(input: T): T => {
  if (input === null || typeof input !== 'object') return input
  if (input instanceof Date) return new Date(input.getTime()) as T
  if (Array.isArray(input)) return input.map((item) => deepCopy(item)) as unknown as T

  const result: any = {}
  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = (input as any)[key]
      result[key] = deepCopy(value)
    }
  }

  return result
}

interface TFormatDate {
  date: Date | string | null
  format?: TTypeDateFormat
  timeZone?: string
  formatLanguage?: 'en-GB' | 'en-US'
}
export const formatDate = (params: TFormatDate) => {
  let { date } = params
  const {
    format = TTypeDateFormat['DD/MM/YYYY'],
    timeZone = 'UTC',
    formatLanguage = 'en-GB'
  } = params

  if (!date) return null

  date = new Date(date)

  if (format === TTypeDateFormat.ISO) return date?.toISOString()

  const formatOptions: { [key in TTypeDateFormat]?: Intl.DateTimeFormatOptions } = {
    [TTypeDateFormat['DD MONTH YEAR']]: {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone
    },
    [TTypeDateFormat['DD-MM-YYYY']]: {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone
    },
    [TTypeDateFormat['DD/MM/YYYY']]: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone
    },
    [TTypeDateFormat['hh:mm']]: { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }
  }

  const formattedDate = new Intl.DateTimeFormat(formatLanguage, formatOptions[format]!).format(date)
  return format === TTypeDateFormat['DD-MM-YYYY']
    ? formattedDate.replace(/\//g, '-')
    : formattedDate
}

export const generateMaxDateOneYear = (date: string | Date | null): Date | null => {
  if (!date) return null
  const parseDate = new Date(date)
  const maxDate = parseDate.setFullYear(parseDate.getFullYear() + 1)
  return new Date(maxDate)
}

export const getRandomKey = <T extends object>(obj: T): keyof T => {
  const keys = Object.keys(obj) as Array<keyof T>

  const randomIndex = Math.floor(Math.random() * keys.length)
  return keys[randomIndex]
}

export const toCapitalize = (str: string) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)?.toLowerCase())
    .join(' ')
}

export const catchErrors = <T, Args extends any[]>(fn: (...args: Args) => T | Promise<T>) => {
  return async (...args: Args): Promise<T | void> => {
    try {
      return await fn(...args)
    } catch (error: any) {
      console.log('error message: ', error?.message)
    }
  }
}

interface TParamsFilterKeysObject<TObject extends object> {
  object: TObject
  keys: (keyof TObject)[]
}
export const filterKeysObject = <TObject extends object>(
  params: TParamsFilterKeysObject<TObject>
) => {
  const { object, keys } = params

  keys?.forEach((key) => {
    delete object[key]
  })

  return object
}

export type TParamsMapErrorMessagePromiseAll = (TResponseAPI<TObject> & { moduleName: string })[]
export const mapErrorMessagePromiseAll = (params: TParamsMapErrorMessagePromiseAll): string => {
  const results = params

  const listErrorMaessage = results?.map((result) => {
    return `${result?.status ? 'Success' : 'Failed'} update ${result?.moduleName}`
  })

  const errorMessage = listErrorMaessage?.reduce((acc, message, i) => {
    if (i === 0) return message

    const seperator = i === listErrorMaessage?.length - 1 ? ' and ' : ', '
    return `${acc}${seperator}${message}`
  }, '')

  return errorMessage
}

export const mergeArraysOfObjects = (arr1: object[], arr2: object[]): object[] => {
  return arr1.map((obj, index) => ({
    ...obj,
    ...arr2[index]
  }))
}

export const removeKeyWithUndifienedValue = <TData extends object>(obj: TData) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined))
}
