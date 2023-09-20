import { inject, injectable } from 'tsyringe'
import { Event } from '@prisma/client'

import { IEventRepository } from '../contracts/repositories/event-repository'
import { IFindEventByCategoryDTO } from '../dtos/find-event-by-category-dto'
import { AppError } from '../errors/app-error'

@injectable()
export class FindEventByCategory {
  // eslint-disable-next-line no-useless-constructor, prettier/prettier
  constructor(@inject('EventRepository') private eventRepository: IEventRepository) { }

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
