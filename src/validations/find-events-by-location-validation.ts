import { z } from 'zod'

export const findEventByLocationValidation = z.object({
  latitude: z.string().nonempty('Latitude é obrigatória'),
  longitude: z.string().nonempty('Longitude é obrigatória'),
})
