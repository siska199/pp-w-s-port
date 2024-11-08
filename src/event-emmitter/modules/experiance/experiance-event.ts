import { TExperiance } from '@validation/module/experiance/experiance-schema'

import { TFormFilterExperiance } from '@components/modules/experiance/experiance-list/form-filter-experiance'

import { TTypeActionModalForm } from '@typescript/global'

const EVENT_EXPERIANCE = {
  SET_MODAL_FORM_EXPERIANCE: 'SET_MODAL_FORM_EXPERIANCE',
  SET_EXPERIANCE: 'SET_EXPERIANCE',
  SEARCH_DATA_TABLE_EXPERIANCE: 'SEARCH_DATA_TABLE_EXPERIANCE'
} as const

export type TEventMapExperiance = {
  [EVENT_EXPERIANCE.SET_MODAL_FORM_EXPERIANCE]: {
    isShow: boolean
    action: TTypeActionModalForm
  }
  [EVENT_EXPERIANCE.SET_EXPERIANCE]: TExperiance
  [EVENT_EXPERIANCE.SEARCH_DATA_TABLE_EXPERIANCE]: TFormFilterExperiance
}

export default EVENT_EXPERIANCE
