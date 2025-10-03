import { ITask } from "./task.types";

export interface IGlobal {
  state: IGlobalState;
  actions: IGlobalActions;
}

export interface IGlobalActions {
  setShowCreateTaskModal: (showCreateTaskModal: boolean) => void;
  createTask: (task: ITask) => void;
}

export interface IGlobalState {
  showCreateTaskModal: boolean;
  tasks: ITask[];
}

export type IGlobalReducerActions =
  | { type: 'SET_SHOW_CREATE_TASK_MODAL'; payload: boolean }
  | { type: 'CREATE_TASK'; payload: ITask }
