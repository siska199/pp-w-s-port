import { createContext, useReducer } from 'react'

import { extractValueFromForm } from '@lib/helper'
import {
  initialFormExperiance,
  TFormExperiance
} from '@lib/validation/module/experiance/experiance-schema'
import { TTypeActionModalForm } from '@typescript/global.d'

export const ACTION_TYPE_EXPERIANCE = {
  SET_MODAL_FORM_EXPERIANCE: 'SET_MODAL_FORM_EXPERIANCE',
  SET_EXPERIANCE: 'SET_EXPERIANCE'
} as const

interface TExperianceState {
  modalFormExperiance: {
    isShow: boolean
    action: TTypeActionModalForm
  }
  experiance: TFormExperiance
}

type TExperianceAction =
  | {
      type: typeof ACTION_TYPE_EXPERIANCE.SET_MODAL_FORM_EXPERIANCE
      payload: Partial<TExperianceState['modalFormExperiance']>
    }
  | {
      type: typeof ACTION_TYPE_EXPERIANCE.SET_EXPERIANCE
      payload: TExperianceState['experiance']
    }

interface TExperianceContext {
  state: TExperianceState
  dispatch: React.Dispatch<TExperianceAction>
}

//----------------------------------------------------------------------------------
const initialState: TExperianceState = {
  modalFormExperiance: {
    isShow: false,
    action: TTypeActionModalForm.ADD
  },
  experiance: extractValueFromForm(initialFormExperiance)
}
const initialDisaptch: React.Dispatch<TExperianceAction> = () => initialState

export const experianceContext = createContext<TExperianceContext>({
  state: initialState,
  dispatch: initialDisaptch
})

const reducer = (state: TExperianceState, action: TExperianceAction) => {
  switch (action.type) {
    case ACTION_TYPE_EXPERIANCE.SET_MODAL_FORM_EXPERIANCE:
      return {
        ...state,
        modalFormExperiance: {
          ...state.modalFormExperiance,
          ...action.payload
        }
      }
    case ACTION_TYPE_EXPERIANCE.SET_EXPERIANCE:
      return {
        ...state,
        experiance: {
          ...action.payload
        }
      }
    default:
      return state
  }
}

export const ExperianceContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <experianceContext.Provider value={{ state, dispatch }}>{children}</experianceContext.Provider>
  )
}
