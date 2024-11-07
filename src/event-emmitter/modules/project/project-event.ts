import { TTypeActionModalForm } from '@typescript/global'

const EVENT_PROJECT = {
  SET_FORM_PROJECT: 'SET_FORM_PROJECT',
  SEARCH_DATA_TABLE_PROJECT: 'SEARCH_DATA_TABLE_PROJECT'
} as const

export type TEventMapProject = {
  [EVENT_PROJECT.SET_FORM_PROJECT]: {
    action: TTypeActionModalForm
    id: string
  }
  [EVENT_PROJECT.SEARCH_DATA_TABLE_PROJECT]: null
}

export default EVENT_PROJECT
