import { Event } from '@prisma/client'
import { ICreateEvent } from '../../dtos/create-event'

export interface IEventRepository {
  create(data: ICreateEvent): Promise<Event>
}
