import { z } from 'zod'

export const participantsValidation = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email().nonempty('E-mail is required'),
})

export const eventIdValidation = z.object({
  id: z.string().nonempty('Id is required'),
})

export type ParticipantsValidationData = z.infer<typeof participantsValidation>
