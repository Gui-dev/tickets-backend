import { z } from 'zod'

export const filterEventByNameValidation = z.object({
  name: z.string().nonempty('Name is required'),
})

export type FilterEventByNameValidationData = z.infer<
  typeof filterEventByNameValidation
>
