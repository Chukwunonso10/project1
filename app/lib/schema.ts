import z from "zod"

export const postSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, { message: "min of 1 title is required" }).max(20, { message: "maximum of 12 title is required" }).optional(),
    body: z.string({ message: "min of 1 title is required" })
})

export type inputTypes = z.infer<typeof postSchema>

export const signInSchema = z.object({
    id: z.string().optional(),
    userName: z.string().min(1, { message: "Username must not be less than 1 character" }).max(20, { message: "Username must not be greater than 20 characters" }),
    PhoneNumber: z.string().min(1, { message: "Phone number is required" }).max(20, { message: "Phone number must not be greater than 20 characters" }).optional(),
    email: z.string().email({ message: "invalid email format" })
})

export type signInType = z.infer<typeof signInSchema>