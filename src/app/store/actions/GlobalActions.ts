import { IGlobalReducerActions } from "@/interfaces/global.types";
import { ITask } from "@/interfaces/task.types";

export const createTask = (task: ITask): IGlobalReducerActions => ({
  type: 'CREATE_TASK',
  payload: task
});

export const deleteTask = (taskId: string): IGlobalReducerActions => ({
  type: 'DELETE_TASK',
  payload: taskId
});

export const editTask = (taskId: string, updatedTask: ITask): IGlobalReducerActions => ({
  type: 'EDIT_TASK',
  payload: { taskId, updatedTask }
});

export const updateTask = (taskId: string, updatedTask: Partial<ITask>): IGlobalReducerActions => ({
  type: 'UPDATE_TASK',
  payload: { taskId, updatedTask }
});

export const setShowCreateTaskModal = (showCreateTaskModal: boolean): IGlobalReducerActions => ({
  type: 'SET_SHOW_CREATE_TASK_MODAL',
  payload: showCreateTaskModal
});

export const setShowEditTaskModal = (showEditTaskModal: boolean): IGlobalReducerActions => ({
  type: 'SET_SHOW_EDIT_TASK_MODAL',
  payload: showEditTaskModal
});

export const setDraggedTask = (task: ITask | null): IGlobalReducerActions => ({
  type: 'SET_DRAGGED_TASK',
  payload: task
});

export const setSelectedTask = (task: ITask | null): IGlobalReducerActions => ({
  type: 'SET_SELECTED_TASK',
  payload: task
});
