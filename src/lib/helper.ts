import clsx from 'clsx'
import { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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

export const getFieldLabelFromOptions = (params: Pick<TParamsFieldFromObjectList, 'array' | 'value'>) => {
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
