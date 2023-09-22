import { Event } from '@prisma/client'

import { IEventRepository } from '../../contracts/repositories/event-repository'
import { ICreateEvent } from '../../dtos/create-event'
import { IFindByLocationAndDate } from '../../dtos/find-by-location-and-date'
import { IFindEventByCategoryDTO } from '../../dtos/find-event-by-category-dto'
import { IFindEventByCityDTO } from '../../dtos/find-event-by-city-dto'
import { IFindEventByLocationDTO } from '../../dtos/find-event-by-location-dto'
import { randomUUID } from 'crypto'
import { IFindEventByNameDTO } from '../../dtos/find-event-by-name-dto'
import { IFindEventByIdDTO } from '../../dtos/find-event-by-id-dto'

export class EventRepositoryInMemory implements IEventRepository {
  public events = new Map()

  public async findEventById(data: IFindEventByIdDTO): Promise<Event | null> {
    const event = Array.from(this.events.entries())
      .map((eventsArray) => {
        const id = eventsArray[0]
        const data = eventsArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter((event: Event) => {
        return event.id === data.id
      })
    return event[0]
  }

  public async create(data: ICreateEvent): Promise<Event> {
    const id = randomUUID()
    this.events.set(id, data)
    const events = Array.from(this.events.entries()).map((eventsArray) => {
      const id = eventsArray[0]
      const data = eventsArray[1]

      return {
        id,
        ...data,
      }
    })
    return events[0]
  }

  public async findEventsByName(
    data: IFindEventByNameDTO,
  ): Promise<Event[] | null> {
    const events = Array.from(this.events.entries())
      .map((eventsArray) => {
        const id = eventsArray[0]
        const data = eventsArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter((event: Event) => {
        return event.title.includes(data.name)
      })
    return events
  }

  public async findByLocationAndDate(
    data: IFindByLocationAndDate,
  ): Promise<Event[] | null> {
    const events = Array.from(this.events.entries())
      .map((eventsArray) => {
        const id = eventsArray[0]
        const data = eventsArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter((event: Event) => {
        if (event.date === data.date && event.location === data.location) {
          return false
        }
        return true
      })

    return events
  }

  public async findEventsByCity(
    data: IFindEventByCityDTO,
  ): Promise<Event[] | null> {
    const events = Array.from(this.events.entries())
      .map((eventsArray) => {
        const id = eventsArray[0]
        const data = eventsArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter((event: Event) => {
        return event.city === data.city
      })

    return events
  }

  public async findEventsByLocation(
    data: IFindEventByLocationDTO,
  ): Promise<Event[] | null> {
    const events = Array.from(this.events.entries())
      .map((eventsArray) => {
        const id = eventsArray[0]
        const data = eventsArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter((event: Event) => {
        return event.location.includes(data.latitude && data.longitude)
      })

    return events
  }

  public async findEventsByCategory(
    data: IFindEventByCategoryDTO,
  ): Promise<Event[] | null> {
    const events = Array.from(this.events.entries())
      .map((eventsArray) => {
        const id = eventsArray[0]
        const data = eventsArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter((event: Event) => {
        return event.categories.includes(data.category)
      })

    return events
  }
}
