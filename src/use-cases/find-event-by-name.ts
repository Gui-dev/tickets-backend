import { inject, injectable } from 'tsyringe'
import { IEventRepository } from '../contracts/repositories/event-repository'
import { AppError } from '../errors/app-error'
import { Event } from '@prisma/client'

@injectable()
export class FindEventByName {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository,
  ) {}

  public async execute(name: string): Promise<Event[]> {
    const events = await this.eventRepository.findEventsByName({ name })

    if (events.length === 0) {
      throw new AppError('Events not found', 404)
    }

    return events
  }
}
