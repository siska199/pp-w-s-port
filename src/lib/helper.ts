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
