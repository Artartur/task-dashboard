import { IGlobalReducerActions } from "@/interfaces/global.types";
import { ITask } from "@/interfaces/task.types";

export const createTask = (task: ITask): IGlobalReducerActions => ({
  type: 'CREATE_TASK',
  payload: task
})

export const setShowCreateTaskModal = (showCreateTaskModal: boolean): IGlobalReducerActions => ({
  type: 'SET_SHOW_CREATE_TASK_MODAL',
  payload: showCreateTaskModal
})
