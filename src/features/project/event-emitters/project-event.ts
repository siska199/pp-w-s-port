import { TMenuProject } from '@features/project/validation/menu-project-schema'

import { TTypeActionData, TTypeActionModalForm } from '@typescript/global'

const EVENT_PROJECT = {
  SET_FORM_PROJECT: 'SET_FORM_PROJECT',
  SEARCH_DATA_TABLE_PROJECT: 'SEARCH_DATA_TABLE_PROJECT',

  SET_MODAL_FORM_MENU_PROJECT: 'SET_MODAL_FORM_MENU_PROJECT',
  SET_MENU_PROJECT: 'SET_MENU_PROJECT',

  ONCHANGE_TECH_STACKS: 'ONCHANGE_TECH_STACKS',
  ONCHANGE_LIST_MENU_PROJECT: 'ONCHANGE_LIST_MENU_PROJECT'
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

  [EVENT_PROJECT.ONCHANGE_TECH_STACKS]: string[]

  [EVENT_PROJECT.ONCHANGE_LIST_MENU_PROJECT]: {
    action: TTypeActionData
    menuProject: TMenuProject
  }
}

export default EVENT_PROJECT
