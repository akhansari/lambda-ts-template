import { z } from "zod"

export const orderSchema = z.object({
    id: z.string().nanoid(),
    title: z.string().nonempty().max(100),
    amount: z.number().nonnegative(),
})
export type Order = z.infer<typeof orderSchema>

export const orderNoIdSchema = orderSchema.omit({ id: true })
