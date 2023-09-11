export interface ICreateEvent {
  user_id?: string
  title: string
  description: string
  categories: Array<string>
  city: string
  location: Array<number>
  banner: string
  flyers: Array<string>
  coupons: Array<string>
  price: number
  sector: string
  date: Date
}
