import { z } from 'zod'

export const findEventByIdValidation = z.object({
  id: z.string().nonempty('Id is required'),
})

export type FindEventByIdValidationData = z.infer<
  typeof findEventByIdValidation
>
