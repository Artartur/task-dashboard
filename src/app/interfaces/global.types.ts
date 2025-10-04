import { ITask } from "./task.types";

export interface IGlobal {
  state: IGlobalState;
  actions: IGlobalActions;
}

export interface IGlobalActions {
  createTask: (task: ITask) => void;
  editTask: (taskId: string, updatedTask: ITask) => void;
  setSelectedTask: (task: ITask | null) => void;
  setShowCreateTaskModal: (showCreateTaskModal: boolean) => void;
  setShowEditTaskModal: (showEditTaskModal: boolean) => void;
}

export interface IGlobalState {
  showCreateTaskModal: boolean;
  showEditTaskModal: boolean;
  selectedTask: ITask | null;
  tasks: ITask[];
}

export type IGlobalReducerActions =
  | { type: 'CREATE_TASK'; payload: ITask }
  | { type: 'EDIT_TASK'; payload: { taskId: string; updatedTask: ITask } }
  | { type: 'SET_SELECTED_TASK'; payload: ITask | null }
  | { type: 'SET_SHOW_CREATE_TASK_MODAL'; payload: boolean }
  | { type: 'SET_SHOW_EDIT_TASK_MODAL'; payload: boolean }
