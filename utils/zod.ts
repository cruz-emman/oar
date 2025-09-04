import z from "zod"

export const SignUpSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

export const SignInSchema = SignUpSchema.pick({
    email: true,
    password: true,
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema>
export type SignInSchemaType = z.infer<typeof SignInSchema>



export const NewStudentSchema = z.object({
    studentNumber: z.string().min(2, { message: "Please enter student's number" }),
    first_name: z.string().min(2, { message: "Please enter student's first name" }),
    middle_name: z.string().optional(),
    last_name: z.string().min(2, { message: "Please enter student's last name" }),
    college: z.string().optional(),
})

export const UpdateStudentSchema = NewStudentSchema.partial();

export type NewStudentSchemaType = z.infer<typeof NewStudentSchema>
export type UpdateStudentSchemaType = z.infer<typeof UpdateStudentSchema>

export const NewRequestedSchema = z.object({
    id: z.string().optional(),
    request: z.enum([
        "TOR",
        "F9",
        "GTOR",
        "HD",
        "AV",
        "CAV",
        "CCD",
        "CDL",
        "CENR",
        "CG",
        "CGWA",
        "CMI",
        "DIP",
        "ICARD",
        "RR",
        "SSP",
        "SV"
    ]),
    date_request: z.string(), // Changed from z.coerce.string()
    due_date: z.string().optional(),
    date_printed: z.string().optional(),
    date_checked: z.string().optional(),
    date_approved: z.string().optional(),
    remarks: z.string().optional(),
    copies: z.number().min(1, { message: "At least 1 copy is required" }).default(1).optional()
});

export const UpdateRequestSchema = NewRequestedSchema.extend({
    date_request: z.string(), // Changed from z.coerce.string()
    due_date: z.string().optional().nullable(),
    date_printed: z.string().optional().nullable(),
    date_checked: z.string().optional(),
    date_approved: z.string().optional().nullable(),
    remarks: z.string().optional(),
}).partial()

export type NewRequestedSchemaType = z.infer<typeof NewRequestedSchema>
export type UpdateRequestSchemaType = z.infer<typeof UpdateRequestSchema>