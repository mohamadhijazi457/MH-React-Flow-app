"use client";
import { z } from 'zod';

const schema = z.object({ 
  nodeType: z.enum(['User', 'Habit']),
  userInfo: z.string().min(3, { message: "Username must be at least 3 characters long" })
                      .max(50, { message: "Username cannot be more than 50 characters long" })
                      .optional(),
  habitInfo: z.enum(['Football', 'Gaming', 'Reading', 'Gymnastics']).optional()
});

export default schema;
