import { Event } from '@prisma/client'

import { IEventRepository } from '../contracts/repositories/event-repository'
import { ICreateEvent } from '../dtos/create-event'
import { prisma } from '../services/prisma'
import { IFindByLocationAndDate } from '../dtos/find-by-location-and-date'
import { IFindEventByCityDTO } from '../dtos/find-event-by-city-dto'
import { IFindEventByLocationDTO } from '../dtos/find-event-by-location-dto'
import { IFindEventByCategoryDTO } from '../dtos/find-event-by-category-dto'
import { IFindEventByNameDTO } from '../dtos/find-event-by-name-dto'
import { IFindEventByIdDTO } from '../dtos/find-event-by-id-dto'
import { IUpdateEventUserIdDTO } from '../dtos/update-event-user-id-dto'
import { IFilterEventsDTO } from '../dtos/filter-events-dto'

export class EventRepository implements IEventRepository {
  public async filterEvents(data: IFilterEventsDTO): Promise<Event[]> {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    const events = await prisma.event.findMany({
      where: {
        OR: [
          {
            title: {
              contains: data.name,
            },
          },
          {
            date: {
              gte: currentDate,
            },
          },
          {
            categories: {
              has: data.category,
            },
          },
          {
            price: {
              lte: data.price,
            },
          },
        ],
      },
    })

    return events
  }

  public async findMainEvents(): Promise<Event[]> {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: currentDate,
        },
      },
      take: 4,
    })
    return events
  }

  public async findEventById(data: IFindEventByIdDTO): Promise<Event | null> {
    const event = await prisma.event.findUnique({
      where: {
        id: data.id,
      },
    })

    return event
  }

  public async findEventsByName({
    name,
  }: IFindEventByNameDTO): Promise<Event[]> {
    const events = await prisma.event.findMany({
      where: {
        OR: [
          {
            title: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            address: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            city: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            categories: {
              has: name,
            },
          },
        ],
      },
    })

    return events
  }

  public async findByLocationAndDate(
    data: IFindByLocationAndDate,
  ): Promise<Event[] | null> {
    const event = await prisma.event.findMany({
      where: {
        location: {
          equals: data.location,
        },
        date: {
          gte: new Date(data.date),
          lte: new Date(new Date(data.date).getTime() + 24 * 60 * 60 * 1000),
        },
      },
    })

    return event
  }

  public async findEventsByCity({
    city,
  }: IFindEventByCityDTO): Promise<Event[]> {
    const events = await prisma.event.findMany({
      where: {
        city,
      },
    })

    return events
  }

  public async findEventsByLocation(
    data: IFindEventByLocationDTO,
  ): Promise<Event[]> {
    const events = await prisma.event.findMany({
      where: {
        location: {
          has: data.latitude,
        },
        AND: {
          location: {
            has: data.longitude,
          },
        },
      },
    })

    return events
  }

  public async findEventsByCategory({
    category,
  }: IFindEventByCategoryDTO): Promise<Event[] | null> {
    const events = await prisma.event.findMany({
      where: {
        categories: {
          has: category,
        },
      },
    })

    return events
  }

  public async create(data: ICreateEvent): Promise<Event> {
    const event = await prisma.event.create({
      data: {
        ...data,
        banner: data.banner as string,
        flyers: data.flyers as string[],
      },
    })

    return event
  }

  public async updateEventUserId({
    event_id,
    user_id,
  }: IUpdateEventUserIdDTO): Promise<Event> {
    const event = await prisma.event.update({
      where: {
        id: event_id,
      },
      data: {
        user_id,
      },
      include: {
        participants: true,
      },
    })

    return event
  }
}
