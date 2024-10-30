import React, { createContext, useCallback, useReducer } from 'react'

import { extractValueFromForm } from '@lib/helper/function'
import { initialFormSkill, TFormSkill } from '@lib/validation/module/skill/skill-schema'
import { TTypeActionModalForm } from '@typescript/global.d'
/*CONSTANTS-----------------------------------------------------------------------------------------*/

export const ACTION_TYPE_SKILL = {
  SET_MODAL_FORM_SKILL: 'SET_MODAL_FORM_SKILL',
  SET_MODAL_DETAIL_SKILL: 'SET_MODAL_DETAIL_SKILL:',
  SET_SKILL: 'SET_SKILL'
} as const

/*TYPESCRIPT-----------------------------------------------------------------------------------------*/
interface TSkillState {
  modalFormSkill: {
    isShow: boolean
    action: TTypeActionModalForm
  }
  skill: TFormSkill
}

type TSkillAction =
  | {
      type: typeof ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL
      payload: Partial<TSkillState['modalFormSkill']>
    }
  | {
      type: typeof ACTION_TYPE_SKILL.SET_SKILL
      payload: TSkillState['skill']
    }

interface TSkillContext extends TSkillState {
  handleToggleModalFormSkill: (payload: TSkillState['modalFormSkill']) => void
  handelSetSkill: (payload: TSkillState['skill']) => void
}
/*REDUCER---------------------------------------------------------------------------------------- */

const initialState: TSkillState = {
  modalFormSkill: {
    isShow: false,
    action: TTypeActionModalForm.ADD
  },
  skill: extractValueFromForm({ ...initialFormSkill })
}

export const skillContext = createContext<TSkillContext>({
  ...initialState,
  handleToggleModalFormSkill: () => null,
  handelSetSkill: () => null
})

const reducer = (state: TSkillState, action: TSkillAction) => {
  const currState = state
  switch (action.type) {
    case ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL:
      currState.modalFormSkill = {
        ...currState.modalFormSkill,
        ...action.payload
      }
      if (action.payload.action === TTypeActionModalForm.ADD) {
        currState.skill = initialState.skill
      }
      return {
        ...currState
      }
    case ACTION_TYPE_SKILL.SET_SKILL:
      currState.skill = { ...action.payload }
      return {
        ...currState
      }
    default:
      return currState
  }
}

/*PROVIDER---------------------------------------------------------------------------------------- */
export const SkillContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleToggleModalFormSkill = useCallback(
    (payload: TSkillState['modalFormSkill']) =>
      dispatch({
        type: ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL,
        payload: payload
      }),
    []
  )

  const handelSetSkill = useCallback(
    (payload: TSkillState['skill']) =>
      dispatch({
        type: ACTION_TYPE_SKILL.SET_SKILL,
        payload
      }),
    []
  )

  return (
    <skillContext.Provider
      value={{
        ...state,
        handleToggleModalFormSkill,
        handelSetSkill
      }}
    >
      {children}
    </skillContext.Provider>
  )
}
