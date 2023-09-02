export interface ICreateEvent {
  title: string
  description: string
  categories: Array<string>
  city: string
  location: Array<string>
  banner: string
  flyers: Array<string>
  coupons: Array<string>
  amount: number
  sector: string
  date: Date
}
