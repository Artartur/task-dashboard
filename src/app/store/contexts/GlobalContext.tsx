'use client';
import {
  createContext,
  ReactNode,
  useReducer
} from "react";

import {
  createTask,
  deleteTask,
  editTask,
  setSelectedTask,
  setShowCreateTaskModal,
  setShowEditTaskModal
} from "../actions/GlobalActions";
import { globalInitialValues } from "../defaultValues/globalInitialValues";
import { GlobalReducer } from "../reducers/GlobalReducer";

import { IGlobal, IGlobalActions } from "@/interfaces/global.types";
import { ITask } from "@/interfaces/task.types";

export const GlobalContext = createContext<IGlobal | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(GlobalReducer, globalInitialValues);

  const actions: IGlobalActions = {
    createTask: (task: ITask) =>
      dispatch(createTask(task)),

    deleteTask: (taskId: string) =>
      dispatch(deleteTask(taskId)),

    editTask: (taskId: string, updatedTask: ITask) =>
      dispatch(editTask(taskId, updatedTask)),

    setSelectedTask: (task: ITask | null) =>
      dispatch(setSelectedTask(task)),

    setShowCreateTaskModal: (showCreateTaskModal: boolean) =>
      dispatch(setShowCreateTaskModal(showCreateTaskModal)),

    setShowEditTaskModal: (showEditTaskModal: boolean) =>
      dispatch(setShowEditTaskModal(showEditTaskModal)),
  }

  return (
    <GlobalContext.Provider value={{ state, actions }}>
      {children}
    </GlobalContext.Provider>
  )
}
