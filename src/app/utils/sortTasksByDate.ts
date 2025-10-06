import { ITask } from "@/interfaces/task.types";

export const sortTasksByDate = (tasks: ITask[], sortOrder: string) => {
  if (!sortOrder) return tasks;

  return [...tasks].sort((a, b) => {
    const dateA = a.createdBy ? new Date(a.createdBy).getTime() : 0;
    const dateB = b.createdBy ? new Date(b.createdBy).getTime() : 0;

    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else if (sortOrder === 'oldest') {
      return dateA - dateB;
    }
    return 0;
  });
};
