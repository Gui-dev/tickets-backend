import { Event } from '@prisma/client'
import { ICreateEvent } from '../../dtos/create-event'
import { IFindByLocationAndDate } from '../../dtos/find-by-location-and-date'
import { IFindEventByLocationDTO } from '../../dtos/find-event-by-location-dto'
import { IFindEventByCityDTO } from '../../dtos/find-event-by-city-dto'
import { IFindEventByCategoryDTO } from '../../dtos/find-event-by-category-dto'
import { IFindEventByNameDTO } from '../../dtos/find-event-by-name-dto'
import { IFindEventByIdDTO } from '../../dtos/find-event-by-id-dto'
import { IUpdateEventUserIdDTO } from '../../dtos/update-event-user-id-dto'

export interface IEventRepository {
  create(data: ICreateEvent): Promise<Event>
  findMainEvents(): Promise<Event[]>
  filterEvents(): Promise<Event[]>
  findEventById(data: IFindEventByIdDTO): Promise<Event | null>
  findByLocationAndDate(data: IFindByLocationAndDate): Promise<Event[] | null>
  findEventsByCity(data: IFindEventByCityDTO): Promise<Event[] | null>
  findEventsByLocation(data: IFindEventByLocationDTO): Promise<Event[] | null>
  findEventsByCategory(data: IFindEventByCategoryDTO): Promise<Event[] | null>
  findEventsByName(data: IFindEventByNameDTO): Promise<Event[]>
  updateEventUserId(data: IUpdateEventUserIdDTO): Promise<Event>
}
