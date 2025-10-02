"use client";

import { createContext, ReactNode, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";

import { setIsAuthenticated, setLoading } from "../actions/AuthActions";
import { authInitialValues } from "../defaultValues/authInitialValues";
import { AuthReducer } from "../reducers/AuthReducer";
import { IAuth, IAuthActions } from "@/interfaces/auth.types";

export const AuthContext = createContext<IAuth | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(AuthReducer, authInitialValues);
  const router = useRouter();

  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "password") {
      dispatch(setIsAuthenticated(true));
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }

    return false;
  };

  const logout = () => {
    dispatch(setIsAuthenticated(false));
    localStorage.removeItem("isAuthenticated");

    router.push("/login");
  };

  const actions: IAuthActions = {
    setIsAuthenticated: (isAuthenticated: boolean) =>
      dispatch(setIsAuthenticated(isAuthenticated)),
    setLoading: (loading: boolean) => dispatch(setLoading(loading)),
    login,
    logout,
  };

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("isAuthenticated");

      if (savedAuth === "true") {
        dispatch(setIsAuthenticated(true));
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, actions }}>
      {children}
    </AuthContext.Provider>
  );
}
