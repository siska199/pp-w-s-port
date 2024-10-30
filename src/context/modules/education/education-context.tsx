import { createContext, useCallback, useReducer } from 'react'

import { extractValueFromForm } from '@lib/helper/function'
import {
  initialFormEducation,
  TFormEducation
} from '@lib/validation/module/education/education-schema'
import { TTypeActionModalForm } from '@typescript/global.d'

/*CONSTANTS-----------------------------------------------------------------------------------------*/
export const ACTION_TYPE_EDUCATION = {
  SET_MODAL_FORM_EDUCATION: 'SET_MODAL_FORM_EDUCATION',
  SET_EDUCATION: 'SET_EDUCATION'
} as const

/*TYPESCRIPT-----------------------------------------------------------------------------------------*/
interface TEducationState {
  modalFormEducation: {
    isShow: boolean
    action: TTypeActionModalForm
  }
  education: TFormEducation
}

type TEducationAction =
  | {
      type: typeof ACTION_TYPE_EDUCATION.SET_MODAL_FORM_EDUCATION
      payload: TEducationState['modalFormEducation']
    }
  | {
      type: typeof ACTION_TYPE_EDUCATION.SET_EDUCATION
      payload: TEducationState['education']
    }

interface TEducationContext extends TEducationState {
  handleToggleModalFormEducation: (payload: TEducationState['modalFormEducation']) => void
  handelSetEducation: (payload: TEducationState['education']) => void
}

/*REDUCER-----------------------------------------------------------------------------------------*/
const initialState: TEducationState = {
  modalFormEducation: {
    isShow: false,
    action: TTypeActionModalForm.ADD
  },
  education: extractValueFromForm({ ...initialFormEducation })
}

export const educationContext = createContext<TEducationContext>({
  ...initialState,
  handleToggleModalFormEducation: () => null,
  handelSetEducation: () => null
})

const reducer = (state: TEducationState, action: TEducationAction) => {
  const currState = state
  switch (action.type) {
    case ACTION_TYPE_EDUCATION.SET_MODAL_FORM_EDUCATION:
      currState.modalFormEducation = {
        ...currState.modalFormEducation,
        ...action.payload
      }
      if (action.payload.action === TTypeActionModalForm.ADD) {
        currState.education = initialState.education
      }
      return {
        ...currState
      }
    case ACTION_TYPE_EDUCATION.SET_EDUCATION:
      return {
        ...currState
      }
  }
}

/*PROVIDER-----------------------------------------------------------------------------------------*/

export const EducationContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleToggleModalFormEducation = useCallback(
    (payload: TEducationState['modalFormEducation']) =>
      dispatch({
        type: ACTION_TYPE_EDUCATION.SET_MODAL_FORM_EDUCATION,
        payload: payload
      }),
    []
  )

  const handelSetEducation = useCallback(
    (payload: TEducationState['education']) =>
      dispatch({
        type: ACTION_TYPE_EDUCATION.SET_EDUCATION,
        payload
      }),
    []
  )

  return (
    <educationContext.Provider
      value={{
        ...state,
        handleToggleModalFormEducation,
        handelSetEducation
      }}
    >
      {children}
    </educationContext.Provider>
  )
}
