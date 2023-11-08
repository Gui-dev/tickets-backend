import { z } from 'zod'

export const filterEventValidation = z.object({
  name: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  category: z.string().optional(),
  radius: z.string().optional(),
  price: z.string().optional(),
  date: z.coerce.date().optional(),
})

export type FilterEventValidationData = z.infer<typeof filterEventValidation>
