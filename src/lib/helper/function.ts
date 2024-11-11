import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import z, { ZodSchema, ZodType } from 'zod'

import { TObject } from '@typescript/global.d'
import { TOption, TTypeDateFormat, TTypeFile } from '@typescript/modules/ui/ui-types'

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

export const handleValidateType = (params: { file: File; listAcceptedType: TTypeFile[] }) => {
  const { file, listAcceptedType } = params
  const type = handleGetFileTypeFromName(file?.name) as TTypeFile

  const isAllTypeAllow = listAcceptedType?.includes(TTypeFile.ALL)
  const isAllImageTypeAllow = listAcceptedType?.includes(TTypeFile.IMAGE_ALL)
  const isTypeAllow = isAllTypeAllow || listAcceptedType?.includes(type) || isAllImageTypeAllow

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
}) => {
  const { options, labelName = 'name', valueName = 'id' } = params

  return options?.map((option: TObject) => ({
    label: option[labelName],
    value: option[valueName]
  }))
}

export const generateOptionsFromEnum = (enumObject: TObject): TOption<string>[] => {
  return Object?.keys(enumObject)?.map((key) => ({
    label: enumObject[key],
    value: enumObject[key]
  }))
}

export const generateFileFromUrl = async (url: string) => {
  const result = await fetch(url).then((r) => r.blob())
  console.log('result: ', result)
  return result
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
  const { schema, form } = params
  let isValid = true

  const result = schema.safeParse(
    Object.keys(form).reduce((acc, key) => {
      const value = form[key as keyof TForm].value
      acc[key] = typeof value === 'string' ? value?.trim() : value
      return acc
    }, {} as TObject)
  )

  if (!result?.success) {
    const errors = result?.error?.flatten()?.fieldErrors
    Object?.keys(form)?.reduce((acc, key) => {
      form[key as keyof TForm].errorMessage = errors[key as keyof TForm]?.[0] || ''
      if (errors[key as keyof TForm]?.[0]) isValid = false
      return acc
    }, {} as TObject)
  }

  return { isValid, updatedForm: form }
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
  date: Date
  format: TTypeDateFormat
  timeZone?: string
}
export const formatDate = (params: TFormatDate) => {
  const { date, format, timeZone = 'UTC' } = params
}

/**
 

// Enum for Date Formats
enum DateFormat {
  ISO = 'ISO',
  DD_MM_YYYY = 'DD-MM-YYYY',
  YYYY_MM_DD = 'YYYY-MM-DD',
  DD_SLASH_MM_SLASH_YYYY = 'DD/MM/YYYY',
  MM_DD_YYYY = 'MM-DD-YYYY',
  DD_MONTH_YYYY = 'DD Month YYYY',
  HH_MM = 'HH:mm',
  YYYY_MM_DD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss', // Added format
}

// Function to parse the input date string into a Date object
function parseDate(input: string): Date {
  const slashDatePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/; // DD/MM/YYYY or MM/DD/YYYY
  const hyphenDatePattern = /^(\d{2})-(\d{2})-(\d{4})$/; // DD-MM-YYYY or MM-DD-YYYY
  const isoPattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/; // ISO format with time
  const dateTimePattern = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/; // YYYY-MM-DD HH:mm:ss

  // Match with slash-delimited date formats (DD/MM/YYYY or MM/DD/YYYY)
  const slashMatch = input.match(slashDatePattern);
  if (slashMatch) {
    const [_, day, month, year] = slashMatch;
    // Handle DD/MM/YYYY and MM/DD/YYYY
    if (parseInt(day) > 12) {
      // It is in DD/MM/YYYY format
      return new Date(`${year}-${month}-${day}`);
    } else {
      // It is in MM/DD/YYYY format
      return new Date(`${year}-${month}-${day}`);
    }
  }

  // Match with hyphen-delimited date formats (DD-MM-YYYY or MM-DD-YYYY)
  const hyphenMatch = input.match(hyphenDatePattern);
  if (hyphenMatch) {
    const [_, day, month, year] = hyphenMatch;
    // Handle DD-MM-YYYY and MM-DD-YYYY
    if (parseInt(day) > 12) {
      // It is in DD-MM-YYYY format
      return new Date(`${year}-${month}-${day}`);
    } else {
      // It is in MM-DD-YYYY format
      return new Date(`${year}-${month}-${day}`);
    }
  }

  // Match with ISO format (YYYY-MM-DDTHH:mm:ssZ)
  const isoMatch = input.match(isoPattern);
  if (isoMatch) {
    return new Date(input); // Directly parse ISO date string
  }

  // Match with the new format (YYYY-MM-DD HH:mm:ss)
  const dateTimeMatch = input.match(dateTimePattern);
  if (dateTimeMatch) {
    const [_, year, month, day, hour, minute, second] = dateTimeMatch;
    // Construct the Date string in ISO format (because the Date constructor can handle this)
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
  }

  // If no pattern matches, throw an error
  throw new Error("Invalid Date Format");
}

// Utility function to format a date based on the specified format and time zone
function formatDate(date: Date, format: DateFormat, timeZone: string = "UTC"): string {
  if (isNaN(date.getTime())) {
    throw new Error("Invalid Date");
  }

  // Directly return ISO format
  if (format === DateFormat.ISO) {
    return date.toISOString();
  }

  // Define date format options for each format type
  const formatOptions: { [key in DateFormat]?: Intl.DateTimeFormatOptions } = {
    [DateFormat.DD_MM_YYYY]: { day: "2-digit", month: "2-digit", year: "numeric", timeZone },
    [DateFormat.YYYY_MM_DD]: { year: "numeric", month: "2-digit", day: "2-digit", timeZone },
    [DateFormat.DD_SLASH_MM_SLASH_YYYY]: { day: "2-digit", month: "2-digit", year: "numeric", timeZone },
    [DateFormat.MM_DD_YYYY]: { month: "2-digit", day: "2-digit", year: "numeric", timeZone },
    [DateFormat.DD_MONTH_YYYY]: { day: "2-digit", month: "long", year: "numeric", timeZone },
    [DateFormat.HH_MM]: { hour: "2-digit", minute: "2-digit", hour12: false, timeZone },
    [DateFormat.YYYY_MM_DD_HH_MM_SS]: { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone }, // Added format options
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", formatOptions[format]!).format(date);

  // Replace slashes with hyphens if needed for the DD-MM-YYYY format
  return format === DateFormat.DD_MM_YYYY ? formattedDate.replace(/\//g, "-") : formattedDate;
}

// Example usage
const inputDate1 = '2024-11-11T12:00:00Z'; // ISO format
const inputDate2 = '11/11/2024'; // DD/MM/YYYY
const inputDate3 = '2024/11/11'; // YYYY/DD/MM
const inputDate4 = '11-11-2024'; // DD-MM-YYYY
const inputDate5 = '11/12/2024'; // MM/DD/YYYY
const inputDate6 = '2024-11-11 12:30:45'; // New format YYYY-MM-DD HH:mm:ss

try {
  const parsedDate1 = parseDate(inputDate1);
  console.log(formatDate(parsedDate1, DateFormat.ISO));  // Outputs: "2024-11-11T12:00:00.000Z"

  const parsedDate2 = parseDate(inputDate2);
  console.log(formatDate(parsedDate2, DateFormat.DD_MM_YYYY));  // Outputs: "11-11-2024"

  const parsedDate3 = parseDate(inputDate3);
  console.log(formatDate(parsedDate3, DateFormat.YYYY_MM_DD));  // Outputs: "2024-11-11"

  const parsedDate4 = parseDate(inputDate4);
  console.log(formatDate(parsedDate4, DateFormat.DD_MM_YYYY));  // Outputs: "11-11-2024"

  const parsedDate5 = parseDate(inputDate5);
  console.log(formatDate(parsedDate5, DateFormat.MM_DD_YYYY));  // Outputs: "12-11-2024"

  const parsedDate6 = parseDate(inputDate6);
  console.log(formatDate(parsedDate6, DateFormat.YYYY_MM_DD_HH_MM_SS));  // Outputs: "2024-11-11 12:30:45"
} catch (error) {
  console.error(error.message);
}


 */
