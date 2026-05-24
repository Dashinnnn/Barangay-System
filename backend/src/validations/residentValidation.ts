import { z } from  'zod';

export const createResidentSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    middleName: z.string().optional(),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    suffix: z.string().optional(),
    dateOfBirth: z.string().datetime({message: "Invalid format"}),
    gender: z.enum([ "MALE", "FEMALE", "OTHERS" ]),
    civilStatus: z.enum([ "SINGLE", "MARRIED", "WIDOWED", "DIVORCED", "SEPARATED" ]),
    occupation: z.string().optional(),
    contactNumber: z.string().optional(),
    email: z.string().email().optional(),
    purok: z.string().min(1, "Purok is required"),
    houseNumber: z.string().optional(),
    street: z.string().optional(),
    voterStatus: z.boolean().optional().default(false),
    isHouseholdHead: z.boolean().optional().default(false),
});