import { Priority, Status } from "@/validators/createTaskSchema";

export interface ITask {
  createdBy?: Date;
  description: string;
  id?: string;
  title: string;
  priority: Priority;
  status: Status;
}
