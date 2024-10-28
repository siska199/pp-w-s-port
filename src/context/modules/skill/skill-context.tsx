import React, { createContext, useReducer } from 'react'

import { extractValueFromForm } from '@lib/helper'
import { initialFormSkill, TFormSkill } from '@lib/validation/module/skill/skill-schema'
import { TTypeActionModalForm } from '@typescript/global.d'

export const ACTION_TYPE_SKILL = {
  SET_MODAL_FORM_SKILL: 'SET_MODAL_FORM_SKILL',
  SET_MODAL_DETAIL_SKILL: 'SET_MODAL_DETAIL_SKILL:',
  SET_SKILL: 'SET_SKILL'
} as const

/*-----------------------------------------------------------------------------------------*/
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

interface TSkillContext {
  state: TSkillState
  dispatch: React.Dispatch<TSkillAction>
}

/*---------------------------------------------------------------------------------------- */

const initialState: TSkillState = {
  modalFormSkill: {
    isShow: false,
    action: TTypeActionModalForm.ADD
  },
  skill: extractValueFromForm({ ...initialFormSkill })
}

const defaultDispatch: React.Dispatch<TSkillAction> = () => initialState

export const skillContext = createContext<TSkillContext>({
  state: initialState,
  dispatch: defaultDispatch
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

export const SkillContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)

  return <skillContext.Provider value={{ state, dispatch }}>{children}</skillContext.Provider>
}
