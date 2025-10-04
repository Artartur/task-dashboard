import { z } from 'zod';

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum Status {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELED = 'CANCELED'
}

export const taskSchema = z.object({
  completedBy: z
    .date()
    .optional(),
  createdBy: z
    .date()
    .optional(),
  description: z
    .string()
    .min(1, 'Description is required.'),
  priority: z.enum(Priority),
  status: z.enum(Status),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(30, "Title can't be longer than 30 characters."),
  updatedBy: z
    .date()
    .optional()
})
