import { z } from "zod"

export const noteFormSchema = z.object({
  note: z.string().min(10).max(500),
})
