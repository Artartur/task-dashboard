import { IGlobalReducerActions, IGlobalState } from "@/interfaces/global.types";

export function GlobalReducer(state: IGlobalState, action: IGlobalReducerActions) {
  switch (action.type) {
    case 'CREATE_TASK':
      const newTask = {
        ...action.payload,
        id: crypto.randomUUID()
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
        showCreateTaskModal: false
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...action.payload.updatedTask, id: task.id }
            : task
        ),
        showEditTaskModal: false,
        selectedTask: null
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, ...action.payload.updatedTask }
            : task
        )
      };

    case 'SET_DRAGGED_TASK':
      return { ...state, draggedTask: action.payload };

    case 'SET_SELECTED_TASK':
      return { ...state, selectedTask: action.payload };

    case 'SET_SHOW_CREATE_TASK_MODAL':
      return { ...state, showCreateTaskModal: action.payload };

    case 'SET_SHOW_EDIT_TASK_MODAL':
      return { ...state, showEditTaskModal: action.payload };

    default:
      return state;
  }
}
