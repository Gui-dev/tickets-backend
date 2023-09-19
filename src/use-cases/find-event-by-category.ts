import { Event } from '@prisma/client'

import { IEventRepository } from '../contracts/repositories/event-repository'
import { IFindEventByCategoryDTO } from '../dtos/find-event-by-category-dto'
import { AppError } from '../errors/app-error'
import { EventRepository } from '../repositories/event-repository'

export class FindEventByCategory {
  private eventRepository: IEventRepository

  constructor() {
    this.eventRepository = new EventRepository()
  }

  public async execute({
    category,
  }: IFindEventByCategoryDTO): Promise<Event[]> {
    const events = await this.eventRepository.findEventsByCategory({ category })

    if (!events || events.length === 0) {
      throw new AppError('No events found')
    }

    return events
  }
}
