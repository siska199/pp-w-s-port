declare module 'secure-web-storage'

interface TObject {
  [key: string]: any
}

interface TPaginationQueryParams {
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

export interface TResponseSuccessAPI<TData extends object> {
  data: TData
  status: number
  message: string
}
