import { ITask } from "./task.types";

export interface IGlobal {
  state: IGlobalState;
  actions: IGlobalActions;
}

export interface IGlobalActions {
  createTask: (task: ITask) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, updatedTask: ITask) => void;
  updateTask: (taskId: string, updatedTask: Partial<ITask>) => void;
  setDraggedTask: (task: ITask | null) => void;
  setDragOverColumn: (dragOverColumn: string | null) => void;
  setSelectedTask: (task: ITask | null) => void;
  setShowCreateTaskModal: (showCreateTaskModal: boolean) => void;
  setShowEditTaskModal: (showEditTaskModal: boolean) => void;
}

export interface IGlobalState {
  showCreateTaskModal: boolean;
  showEditTaskModal: boolean;
  selectedTask: ITask | null;
  draggedTask: ITask | null;
  dragOverColumn: string | null;
  tasks: ITask[];
}

export type IGlobalReducerActions =
  | { type: 'CREATE_TASK'; payload: ITask }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'EDIT_TASK'; payload: { taskId: string; updatedTask: ITask } }
  | { type: 'UPDATE_TASK'; payload: { taskId: string; updatedTask: Partial<ITask> } }
  | { type: 'SET_DRAGGED_TASK'; payload: ITask | null }
  | { type: 'SET_DRAG_OVER_COLUMN'; payload: string | null }
  | { type: 'SET_SELECTED_TASK'; payload: ITask | null }
  | { type: 'SET_SHOW_CREATE_TASK_MODAL'; payload: boolean }
  | { type: 'SET_SHOW_EDIT_TASK_MODAL'; payload: boolean }
