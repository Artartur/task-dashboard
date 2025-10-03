import { IGlobalState } from "@/interfaces/global.types"
import { ITask } from "@/interfaces/task.types"
import { Priority, Status } from "@/validators/createTaskSchema"

export const taskInitialValues: ITask = {
  description: '',
  title: '',
  priority: Priority.MEDIUM,
  status: Status.PENDING
}

export const globalInitialValues: IGlobalState = {
  showCreateTaskModal: false,
  tasks: []
}
