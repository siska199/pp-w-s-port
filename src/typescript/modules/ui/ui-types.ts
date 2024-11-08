import { FormEvent, MouseEvent } from 'react'

import { TObject } from '@typescript/global'

export interface TOption<TLabel = string> {
  label: TLabel
  value: string
}

export interface TBasePropsInput {
  errorMessage?: string
  label?: string
  variant?: 'v1'
  customeClass?: {
    label?: string
    input?: string
    ciV1?: string
    ciV2?: string
    ciV3?: string
    ciV4?: string
  }
  customeElement?: {
    start?: React.ReactNode
    end?: React.ReactNode
    preStart?: React.ReactNode
    preEnd?: React.ReactNode
  }
}

export interface TCustomeEventOnChange<V, T extends object = NonNullable<unknown>> {
  target: {
    name: string
    value: V
    type?: string
  } & T
}

export interface TAlertConfig {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  timeout?: number
  onDismiss?: () => void
  show: boolean
  autoClose?: boolean
  isFixed?: boolean
  withIcon?: boolean
  withCloseBtn?: boolean
  message: string | React.ReactNode
  customeIcon?: React.ReactNode
}

export enum TTypeFile {
  JPG = '.jpg',
  JPEG = '.jpeg',
  PNG = '.png',
  GIF = '.gif',
  BMP = '.bmp',
  WEBP = '.webp',

  DOC = '.doc',
  DOCX = '.docx',
  PDF = '.pdf',
  TXT = '.txt',
  XLS = '.xls',
  XLSX = '.xlsx',
  CSV = '.csv',

  ALL = '*',
  IMAGE_ALL = 'image/*'
}

export type TValueFile<TIsMultiple extends boolean = true> = TIsMultiple extends false
  ? File | null
  : File[] | null

type TObjectForm = TBasePropsInput & {
  value: any
  listUploadedFile?: TUploadedFile[]
} & Omit<Partial<React.HTMLProps<HTMLInputElement>>, 'name' | 'value' | 'onChange'> & // Omit<Partial<ReactDatePickerProps<true, true>>, "onChange" | "value"> &
  Omit<Partial<React.HTMLProps<HTMLTextAreaElement>>, 'onChange' | 'value'>

export type TForm<TKey extends string, TNameRequired extends boolean = true> = Record<
  TKey,
  TNameRequired extends true ? TObjectForm & { name: string } : TObjectForm & { name?: string }
>

export interface TUploadedFile {
  id: number
  status: 'onprogress' | 'done'
  name: string
  type: TTypeFile
  size: number
}

export type TEventOnChange =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | TCustomeEventOnChange<any>
  | TCustomeEventOnChange<TValueFile, { files: FileList; listUploadedFile?: TUploadedFile[] }>

  export type TEventSubmitForm =
  | FormEvent<HTMLFormElement>
  | MouseEvent<HTMLButtonElement | HTMLLinkElement>

export interface TColumn<TData, TKey extends keyof TData> {
  name: string
  key: TKey
  className?: string
  customeComponent?: (data: TData) => React.ReactNode
  isSorted?: boolean
}

export interface TSettingTable<TData> {
  sortBy?: keyof TData
  sortDir?: 'asc' | 'desc'
  checked?: boolean
  pagination?: boolean
  currentPage: number
  totalPage: number
  itemsPerPage: number;
  formFilter? : TObject;
}

export interface TBaseModal {
  isShow: boolean
  onClose: () => void
  children: React.ReactNode
  title?: React.ReactNode
}
