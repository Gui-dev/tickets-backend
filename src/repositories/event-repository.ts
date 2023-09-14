import { Event } from '@prisma/client'
import { IEventRepository } from '../contracts/repositories/event-repository'
import { ICreateEvent } from '../dtos/create-event'
import { prisma } from '../services/prisma'
import { IFindByLocationAndDate } from '../dtos/find-by-location-and-date'

export class EventRepository implements IEventRepository {
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

  public async create(data: ICreateEvent): Promise<Event> {
    const event = await prisma.event.create({
      data: {
        ...data,
      },
    })

    return event
  }
}
