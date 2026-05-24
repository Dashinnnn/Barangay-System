import { z } from 'zod';

export const registerSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password is too long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lower case letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9], "Password must contain at least one special character (!@#$%^&* etc.)"/),

    role: z.enum(["ADMIN", "CAPTAIN", "SECRETARY", "STAFF"]).optional(),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address",),
    pasword: z.string().min(1, "Password is required"),
});