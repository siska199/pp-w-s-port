import React, { createContext, useReducer } from 'react';

export const ACTION_TYPE_SKILL = {
  SET_MODAL_FORM_SKILL: 'SET_MODAL_FORM_SKILL',
} as const;

export enum TTypeActionModalFormSkill {
  EDIT = 'EDIT',
  ADD = 'ADD',
}

/*-----------------------------------------------------------------------------------------*/
interface TSkillState {
  modalFormSkill: {
    isShow: boolean;
    action: TTypeActionModalFormSkill;
  };
}

type TSkillAction = {
  type: typeof ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL;
  payload: Partial<TSkillState['modalFormSkill']>;
};

interface TSkillContext {
  state: TSkillState;
  dispatch: React.Dispatch<TSkillAction>;
}

/*---------------------------------------------------------------------------------------- */

const initialValue = {
  modalFormSkill: {
    isShow: false,
    action: TTypeActionModalFormSkill.ADD,
  },
};

const defaultDispatch: React.Dispatch<TSkillAction> = () => initialValue;

export const skillContext = createContext<TSkillContext>({
  state: initialValue,
  dispatch: defaultDispatch,
});

const reducer = (state: TSkillState, action: TSkillAction) => {
  switch (action.type) {
    case ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL:
      return {
        ...state,
        modalFormSkill: {
          ...state.modalFormSkill,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const SkillContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <skillContext.Provider value={{ state, dispatch }}>
      {children}
    </skillContext.Provider>
  );
};
