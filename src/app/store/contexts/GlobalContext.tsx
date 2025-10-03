'use client';
import { createContext, ReactNode, useReducer } from "react";

import { createTask, setShowCreateTaskModal } from "../actions/GlobalActions";
import { globalInitialValues } from "../defaultValues/globalInitialValues";
import { GlobalReducer } from "../reducers/GlobalReducer";

import { IGlobal, IGlobalActions } from "@/interfaces/global.types";
import { ITask } from "@/interfaces/task.types";

export const GlobalContext = createContext<IGlobal | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(GlobalReducer, globalInitialValues);

  const actions: IGlobalActions = {
    createTask: (task: ITask) => dispatch(createTask(task)),
    setShowCreateTaskModal: (showCreateTaskModal: boolean) => dispatch(setShowCreateTaskModal(showCreateTaskModal))
  }

  return (
    <GlobalContext.Provider value={{ state, actions }}>
      {children}
    </GlobalContext.Provider>
  )
}
