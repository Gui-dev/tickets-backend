import { inject, injectable } from 'tsyringe'

import { IEventRepository } from '../contracts/repositories/event-repository'
import { IFilterEventsDTO } from '../dtos/filter-events-dto'
import { AppError } from '../errors/app-error'
import { Event } from '@prisma/client'

@injectable()
export class FilterEvents {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository,
  ) {}

  public async execute(data: IFilterEventsDTO): Promise<Event[]> {
    const events = await this.eventRepository.filterEvents(data)

    if (events.length === 0) {
      throw new AppError('Event not found', 404)
    }

    return events
  }
}
