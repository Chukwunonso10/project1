import z from "zod"

export const postSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, { message: "min of 1 title is required" }).max(20, { message: "maximum of 12 title is required" }).optional(),
    body: z.string({ message: "min of 1 title is required" })
})

export type inputTypes = z.infer<typeof postSchema>
