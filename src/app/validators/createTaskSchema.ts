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

export const createTaskSchema = z.object({
  createdBy: z.date().optional(),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(Priority),
  status: z.enum(Status),
  title: z.string().min(1, 'Title is required'),
})
