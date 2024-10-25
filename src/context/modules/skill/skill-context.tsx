import { skillDefaultValues, TFormSkill } from '@lib/validation/module/skill/skill-schema'
import React, { createContext, useReducer } from 'react'

export const ACTION_TYPE_SKILL = {
  SET_MODAL_FORM_SKILL: 'SET_MODAL_FORM_SKILL',
  SET_MODAL_DETAIL_SKILL: 'SET_MODAL_DETAIL_SKILL:',
  SET_SKILL: 'SET_SKILL'
} as const

export enum TTypeActionModalFormSkill {
  EDIT = 'EDIT',
  ADD = 'ADD'
}

/*-----------------------------------------------------------------------------------------*/
interface TSkillState {
  modalFormSkill: {
    isShow: boolean
    action: TTypeActionModalFormSkill
  }
  modalDetailSkill: {
    isShow: boolean
  }
  skill: TFormSkill
}

type TSkillAction =
  | {
      type: typeof ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL
      payload: Partial<TSkillState['modalFormSkill']>
    }
  | {
      type: typeof ACTION_TYPE_SKILL.SET_MODAL_DETAIL_SKILL
      payload: TSkillState['modalDetailSkill']
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

const initialValue: TSkillState = {
  modalFormSkill: {
    isShow: false,
    action: TTypeActionModalFormSkill.ADD
  },
  modalDetailSkill: {
    isShow: false
  },
  skill: skillDefaultValues
}

const defaultDispatch: React.Dispatch<TSkillAction> = () => initialValue

export const skillContext = createContext<TSkillContext>({
  state: initialValue,
  dispatch: defaultDispatch
})

const reducer = (state: TSkillState, action: TSkillAction) => {
  switch (action.type) {
    case ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL:
      return {
        ...state,
        modalFormSkill: {
          ...state.modalFormSkill,
          ...action.payload
        }
      }
    case ACTION_TYPE_SKILL.SET_MODAL_DETAIL_SKILL:
      return {
        ...state,
        modalDetailSkill: {
          ...state.modalDetailSkill,
          ...action.payload
        }
      }
    case ACTION_TYPE_SKILL.SET_SKILL:
      return {
        ...state,
        skill: {
          ...action.payload
        }
      }
    default:
      return state
  }
}

export const SkillContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialValue)

  return <skillContext.Provider value={{ state, dispatch }}>{children}</skillContext.Provider>
}
