import { z } from 'zod';

export const createResidentSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    middleName: z.string().optional(),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    suffix: z.string().optional(),
    
    dateOfBirth: z.string().datetime({ message: "Invalid date format. Use YYYY-MM-DD" }),
    
    gender: z.enum(["MALE", "FEMALE", "OTHER"], { message: "Gender must be MALE, FEMALE, or OTHER" }),
    
    civilStatus: z.enum(["SINGLE", "MARRIED", "WIDOWED", "DIVORCED", "SEPARATED"]),
    
    occupation: z.string().optional(),
    contactNumber: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    
    purokId: z.string().min(1, "Purok ID is required"),
    
    houseNumber: z.string().optional(),
    street: z.string().optional(),
    
    voterStatus: z.boolean().optional().default(false),
    isHouseholdHead: z.boolean().optional().default(false),
});

export const updateResidentSchema = createResidentSchema.partial();