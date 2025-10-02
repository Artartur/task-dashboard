import { IAuthReducerActions, IAuthState } from "@/interfaces/auth.types";

export function AuthReducer(state: IAuthState, action: IAuthReducerActions) {
  switch (action.type) {
    case 'SET_IS_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
