import { z } from 'zod'

export const findEventByCategoryValidation = z.object({
  category: z.string().nonempty('Category is required'),
})

export type FindEventByCategoryValidationData = z.infer<
  typeof findEventByCategoryValidation
>
