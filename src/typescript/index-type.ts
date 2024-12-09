import { TSettingTable } from '@typescript/ui-types'

export interface TObject {
  [key: string]: any
}

export interface TPaginationQueryParams {
  page_no: number
  items_per_page: number
  sort_by: string
  sort_dir: TSettingTable<TObject>['sortDir']
}

export enum TTypeActionModalForm {
  EDIT = 'EDIT',
  ADD = 'ADD'
}

export enum TTypeActionData {
  EDIT = 'EDIT',
  ADD = 'ADD',
  DELETE = 'DELETE'
}

export type TResponseAPI<TData extends object> = {
  status: boolean
  data: TData
  message: string
}
