import { inject, injectable } from 'tsyringe'

import { Event } from '@prisma/client'
import { IEventRepository } from '../contracts/repositories/event-repository'
import { AppError } from '../errors/app-error'

@injectable()
export class FindEvents {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository,
  ) {}

  public async execute(): Promise<Event[]> {
    const events = await this.eventRepository.findMainEvents()

    if (events.length === 0) {
      throw new AppError('Events not found')
    }

    return events
  }
}
