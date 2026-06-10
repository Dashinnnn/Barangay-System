import { z } from 'zod';

export const createPurokSchema = z.object({
    name: z.string()
    .min(3, "Purok name mmust be at least 3 characters")
    .max(100, "Purok name is too long"),

    description: z.string()
    .max(500, "Description is too long")
    .optional(),

    leaderName: z.string()
    .min(2, "Leader name must be at least 2 characters")
    .optional(),
    
    contactNumber: z.string()
    .regex(/^(\+63|0)?[\s-]?(\d{10}|\d{3}[\s-]?\d{3}[\s-]?\d{4})$/, "Invalid Philippine phone number")
    .optional()
});

export const updatePurokSchema = createPurokSchema.partial();
