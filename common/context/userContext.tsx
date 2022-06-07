import { createContext, FC, useContext, useReducer } from "react";

export type User = {
  uid: string;
  displayName: string;
  email: string;
  isEmailVerified: boolean;
};

export type UserContextState = {
  user: User | null;
  isLoading: "idle" | "pending" | "success" | "error";
};

export enum UserContextActions {
  SetLoading = "set-loading",
  SetUserDisplayName = "set-user-display-name",
  SignInUser = "sing-in-user",
  SignOutUser = "sign-out-user",
}

const initialState: UserContextState = {
  user: null,
  isLoading: "idle",
};

const UserContext = createContext<
  { state: UserContextState; dispatch: Dispatch } | undefined
>(undefined);

type SetLoadingAction = {
  payload: "idle" | "pending" | "success" | "error";
  type: UserContextActions.SetLoading;
};

type SetUserDisplayName = {
  payload: string;
  type: UserContextActions.SetUserDisplayName;
};

type SignInUser = {
  payload: User;
  type: UserContextActions.SignInUser;
};
type SignOutUser = {
  type: UserContextActions.SignOutUser;
};

type Action = SetLoadingAction | SetUserDisplayName | SignInUser | SignOutUser;

type Dispatch = (action: Action) => void;

function userReducer(
  state: UserContextState,
  action: Action
): UserContextState {
  switch (action.type) {
    case UserContextActions.SetLoading: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case UserContextActions.SetUserDisplayName: {
      if (!state.user) {
        return state;
      }

      return {
        ...state,
        user: {
          ...state.user,
          displayName: action.payload,
        },
      };
    }

    case UserContextActions.SignInUser: {
      return {
        ...state,
        user: action.payload,
        isLoading: "success",
      };
    }

    case UserContextActions.SignOutUser: {
      return {
        ...state,
        user: null,
        isLoading: "success",
      };
    }

    default: {
      return state;
    }
  }
}

export const UserContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useCreateCarRentalContext must be used within a CountProvider"
    );
  }
  return context;
};
