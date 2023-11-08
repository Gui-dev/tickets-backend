import { z } from 'zod'

export const createEventValidation = z.object({
  user_id: z.string().uuid().optional(),
  title: z.string().nonempty('Campo titulo é obrigatório'),
  description: z.string().nonempty('Campo descrição é obrigatório'),
  categories: z.string().array(),
  city: z.string().nonempty('Campo titulo é obrigatório'),
  location: z.array(
    z.string().nonempty('Campo latitude é obrigatório'),
    z.string().nonempty('Campo longitude é obrigatório'),
  ),
  banner: z.object({
    filename: z.string(),
    mimetype: z.string().refine((mimetype) => mimetype.startsWith('image/'), {
      message: 'O arquivo deve ser uma imagem.',
    }),
  }),
  flyers: z.array(
    z.object({
      filename: z.string(),
      mimetype: z.string().refine((mimetype) => mimetype.startsWith('image/'), {
        message: 'O arquivo deve ser uma imagem.',
      }),
    }),
  ),
  coupons: z.array(z.string().nonempty('Campo cupons é obrigatório')),
  price: z.coerce.number(),
  sector: z.string().nonempty('Campo setor é obrigatório'),
  date: z.coerce.date(),
})

export type CreateEventValidationData = z.infer<typeof createEventValidation>
