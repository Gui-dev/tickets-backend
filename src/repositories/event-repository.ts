import { Event } from '@prisma/client'
import { IEventRepository } from '../contracts/repositories/event-repository'
import { ICreateEvent } from '../dtos/create-event'
import { prisma } from '../services/prisma'

export class EventRepository implements IEventRepository {
  public async create(data: ICreateEvent): Promise<Event> {
    const event = await prisma.event.create({
      data: {
        ...data,
      },
    })

    return event
  }
}
