import { globalInitialValues } from "@/store/defaultValues/globalInitialValues";

export const STORAGE_KEY = 'tasks';

export const getStoredTasks = () => {
  if (typeof window === 'undefined') return globalInitialValues;

  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      const tasksWithDates = parsedTasks.map((task: any) => ({
        ...task,
        createdBy: task.createdBy ? new Date(task.createdBy) : undefined
      }));
      return {
        ...globalInitialValues,
        tasks: tasksWithDates
      };
    }
  } catch (error) {
    alert(`Erro ao carregar tarefas do localStorage: ${error}`);
  }

  return globalInitialValues;
}
