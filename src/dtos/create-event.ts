import { MultipartFile } from '@fastify/multipart'

export interface ICreateEvent {
  user_id?: string
  title: string
  description: string
  categories: Array<string>
  city: string
  location: Array<string>
  banner: MultipartFile | string
  flyers: MultipartFile[] | MultipartFile | string[]
  coupons: Array<string>
  price: number
  sector: string
  date: Date
}
