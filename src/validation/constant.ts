import { TTypeFile } from '@typescript/ui-types'

export const messageError = {
  required: (name: string) => `${name} is Required`,
  invalid: (name: string) => `${name} is Invalid`,
  maxCharacter: (name: string, maxCharacter: number) =>
    `${name} must not exceed ${maxCharacter} characters.`,
  minCharacter: (name: string, maxCharacter: number) =>
    `${name} must have at least ${maxCharacter} characters.`,
  minNumber: (name: string, min: number) => `${name} must be at least ${min} digits long.`,
  maxNumber: (name: string, max: number) => `${name} must not exceed ${max} digits.`,
  password: 'Password must be at least 8 characters long and contain at least one uppercase letter',
  url: 'Please enter a valid URL. Ensure it starts with http:// or https://',
  maxSizeFile: 'File upload cancelled due to size limit exceeded.',
  fileType: (fileTypes: TTypeFile[]) => {
    const updateFileType = fileTypes?.join(', ')
    return `Please upload the correct type file : ${updateFileType}`
  },
  phoneNumberFormat: 'Phone Number should be in 08XXXXXXXXXX format',
  phoneNumberExceedLength: 'Phone number must not exceed 15 characters'
}

export const regexValidation = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  url: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/
}
