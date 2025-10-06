import { Status } from "@/validators/taskSchema";
import { ITask } from "./task.types";

export interface IColumnProps {
  bgColorOnDrag: string;
  emptyMessage: string;
  filter: string;
  onFilterChange: (value: string) => void;
  onPriorityFilterChange: (value: string) => void;
  onSortFilterChange: (value: string) => void;
  priorityFilter: string;
  sortFilter: string;
  status: Status;
  title: string;
}
