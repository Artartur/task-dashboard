export interface IAuth {
  state: IAuthState;
  actions: IAuthActions;
}

export interface IAuthActions {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export interface IAuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

export type IAuthReducerActions =
  | { type: 'SET_IS_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
