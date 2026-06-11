import { z } from 'zod';

export const createBlotterCaseSchema = z.object({
    title: z.string().min(5, "Case title must be at least 5 characters"),
    incidentType: z.enum([
        "PHYSICAL_INJURY", 
        "ORAL_DEFAMATION", 
        "THEFT", 
        "TRESPASSING",
        "NUISANCE",
        "PROPERTY_DAMAGE",
        "DOMESTIC_DISPUTE",
        "NOISE_COMPLAINT",
        "DEBT_COLLECTION",
        "ESTAFA",
        "OTHERS"
    ]),
    incidentDate: z.string().datetime({ message: "Invalid date format" }),
    indicentTime: z.string().optional(),
    incidentPlace: z.string().min(5),
    summary: z.string().min(20, "Summary must be at least 20 characters"),
    remarks: z.string().optional(),

    complainants: z.array(z.string()).min(1, "At least one complainant is required"),
    respondents: z.array(z.string()).min(1, "At least 1 respondent is required"),
    witnesses: z.array(z.string()).optional().default([]),

    filedById: z.string().min(1),
    assignedToId: z.string().optional(),

});

export const updateBlotterCaseSchema = z.object({
    status: z.enum([
        "FILED", 
        "UUNDER_MEDIATOR", 
        "PENDING_HEARING", 
        "SETTLED", "UNSETTLED", 
        "REFERRED_TO_COURT", 
        "DISMISSED","ARCHIEVED"
    ]).optional(),

    priority: z.enum([
        "LOW", 
        "NORMAL", 
        "HIGH", 
        "URGENT"
    ]).optional()
});