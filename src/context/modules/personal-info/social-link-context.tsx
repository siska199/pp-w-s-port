import { createContext, useReducer } from 'react';

export const ACTION_TYPE_SOCIAL_LINK = {
  ONCHANGE_SOCIAL_LINKS: 'ONCHANGE_SOCIAL_LINKS',
} as const;

/*-------------------------------------------------------------------------- */

export interface TSocialLink {
  name: string;
  image: string;
  placeholder: string;
  defaultValue?: string;
}

interface TSocialLinkState {
  socialLinks: {
    label: string;
    value: string;
  }[];
  selectedSocialLinks: TSocialLink[];
}

type TSocialLinkAction = {
  type: typeof ACTION_TYPE_SOCIAL_LINK.ONCHANGE_SOCIAL_LINKS;
  payload: TSocialLink[];
};

export interface TSocialLinkContext {
  state: TSocialLinkState;
  dispatch: React.Dispatch<TSocialLinkAction>;
}
/*---------------------------------------------------------------------------------------- */

const initialValue = {
  socialLinks: [],
  selectedSocialLinks: [],
};

const defaultDispatch: React.Dispatch<TSocialLinkAction> = () => initialValue;

export const socialLinkContext = createContext<TSocialLinkContext>({
  state: initialValue,
  dispatch: defaultDispatch,
});

const reducer = (state: TSocialLinkState, action: TSocialLinkAction) => {
  switch (action.type) {
    case ACTION_TYPE_SOCIAL_LINK.ONCHANGE_SOCIAL_LINKS:
      return {
        ...state,
        selectedSocialLinks: [...action.payload],
      };
    default:
      return state;
  }
};

export const SocialLinkContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <socialLinkContext.Provider value={{ state, dispatch }}>
      {children}
    </socialLinkContext.Provider>
  );
};
