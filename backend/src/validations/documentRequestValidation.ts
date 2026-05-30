import { z } from 'zod';

export const createDocumentRequestSchema = z.object({
    residentId: z.string().min(1, "Resident ID is required"),

    documentTpye: z.enum([
        "BARANGAY_CLEARANCE",
        "CERTIFICATE_OF_RESIDENCY",
        "CERTIFICATE_OF_INDIGENCY",
        "CERTIFICATE_OF_BIRTH",
        "GOOD_MORAL_CHARACTER",
        "OTHER"
    ], { message: "Invalid document type" }),

    purpose: z.string()
    .min(10, "Purpose must be at least 10 characters")
    .max(500, "Purpose is too long"),

    notes: z.string().optional()
});

export const updateDocumentRequestSchema = z.object({
    status: z.enum(["PENDING", "APPROVED", "REJECTED", "RELEASED"])
        .optional,
    notes: z.string().optional(),
    reviewedBy: z.string().optional()
})