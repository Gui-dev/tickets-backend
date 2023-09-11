import { z } from 'zod'

export const createEventValidation = z.object({
  user_id: z.string().uuid().optional(),
  title: z.string().nonempty('Campo titulo é obrigatório'),
  description: z.string().nonempty('Campo descrição é obrigatório'),
  categories: z.string().array(),
  city: z.string().nonempty('Campo titulo é obrigatório'),
  location: z.array(
    z.coerce.number({
      invalid_type_error: 'Campo latitude é obrigatório',
      required_error: 'Campo latitude é obrigatório',
    }),
    z.coerce.number({
      invalid_type_error: 'Campo longitude é obrigatório',
      required_error: 'Campo longitude é obrigatório',
    }),
  ),
  banner: z.string().nonempty('Url da imagem do banner é obrigatório'),
  flyers: z.array(
    z.string().nonempty('Urls da imagem dos flyers é obrigatório'),
  ),
  coupons: z.array(z.string().nonempty('Campo cupons é obrigatório')),
  price: z.coerce.number(),
  sector: z.string().nonempty('Campo setor é obrigatório'),
  date: z.coerce.date(),
})

export type CreateEventValidationData = z.infer<typeof createEventValidation>
