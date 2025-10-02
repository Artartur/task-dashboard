import { IAuthReducerActions } from "@/interfaces/auth.types";

export const setIsAuthenticated = (isAuthenticated: boolean): IAuthReducerActions => ({
  type: 'SET_IS_AUTHENTICATED',
  payload: isAuthenticated
});

export const setLoading = (loading: boolean): IAuthReducerActions => ({
  type: 'SET_LOADING',
  payload: loading
});
