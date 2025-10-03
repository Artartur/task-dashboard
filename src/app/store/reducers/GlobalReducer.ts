import { IGlobalReducerActions, IGlobalState } from "@/interfaces/global.types";

export function GlobalReducer(state: IGlobalState, action: IGlobalReducerActions) {
  switch (action.type) {
    case 'CREATE_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        showCreateTaskModal: false
      };
    case 'SET_SHOW_CREATE_TASK_MODAL':
      return { ...state, showCreateTaskModal: action.payload };
    default:
      return state;
  }
}
