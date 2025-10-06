'use client';

import {
  createContext,
  ReactNode,
  useEffect,
  useReducer
} from "react";

import {
  createTask,
  deleteTask,
  editTask,
  setDraggedTask,
  setDragOverColumn,
  setSelectedTask,
  setShowCreateTaskModal,
  setShowEditTaskModal,
  updateTask
} from "../actions/GlobalActions";
import { globalInitialValues } from "../defaultValues/globalInitialValues";
import { GlobalReducer } from "../reducers/GlobalReducer";

import { IGlobal, IGlobalActions } from "@/interfaces/global.types";
import { ITask } from "@/interfaces/task.types";
import { getStoredTasks, STORAGE_KEY } from "@/utils/getStoredTasks";

export const GlobalContext = createContext<IGlobal | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(GlobalReducer, globalInitialValues, getStoredTasks);

  const actions: IGlobalActions = {
    createTask: (task: ITask) =>
      dispatch(createTask(task)),

    deleteTask: (taskId: string) =>
      dispatch(deleteTask(taskId)),

    editTask: (taskId: string, updatedTask: ITask) =>
      dispatch(editTask(taskId, updatedTask)),

    updateTask: (taskId: string, updatedTask: Partial<ITask>) =>
      dispatch(updateTask(taskId, updatedTask)),

    setDraggedTask: (task: ITask | null) =>
      dispatch(setDraggedTask(task)),

    setDragOverColumn: (dragOverColumn: string | null) =>
      dispatch(setDragOverColumn(dragOverColumn)),

    setSelectedTask: (task: ITask | null) =>
      dispatch(setSelectedTask(task)),

    setShowCreateTaskModal: (showCreateTaskModal: boolean) =>
      dispatch(setShowCreateTaskModal(showCreateTaskModal)),

    setShowEditTaskModal: (showEditTaskModal: boolean) =>
      dispatch(setShowEditTaskModal(showEditTaskModal)),
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
      } catch (error) {
        alert(`Erro ao salvar tarefas no localStorage: ${error}`)
      }
    }
  }, [state.tasks]);

  return (
    <GlobalContext.Provider value={{ state, actions }}>
      {children}
    </GlobalContext.Provider>
  )
}
