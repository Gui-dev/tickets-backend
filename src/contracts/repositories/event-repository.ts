import { Event } from '@prisma/client'
import { ICreateEvent } from '../../dtos/create-event'
import { IFindByLocationAndDate } from '../../dtos/find-by-location-and-date'

export interface IEventRepository {
  create(data: ICreateEvent): Promise<Event>
  findByLocationAndDate(data: IFindByLocationAndDate): Promise<Event[] | null>
}
