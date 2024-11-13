import { TMenuProject } from '@features/project/validation/menu-project-schema'

import { TTypeActionModalForm } from '@typescript/global'

const EVENT_PROJECT = {
  SET_MODAL_FORM_MENU_PROJECT: 'SET_MODAL_FORM_MENU_PROJECT',
  SET_MENU_PROJECT: 'SET_MENU_PROJECT',

  SET_FORM_PROJECT: 'SET_FORM_PROJECT',
  SEARCH_DATA_TABLE_PROJECT: 'SEARCH_DATA_TABLE_PROJECT'
} as const

export type TEventMapProject = {
  [EVENT_PROJECT.SET_FORM_PROJECT]: {
    action: TTypeActionModalForm
    id: string
  }
  [EVENT_PROJECT.SEARCH_DATA_TABLE_PROJECT]: null
  [EVENT_PROJECT.SET_MENU_PROJECT]: TMenuProject
  [EVENT_PROJECT.SET_MODAL_FORM_MENU_PROJECT]: {
    isShow: boolean
    action: TTypeActionModalForm
  }
}

export default EVENT_PROJECT
