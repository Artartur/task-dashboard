import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'User is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(4, 'The password must be at least 4 characters long')
})
