import { inject, injectable } from 'tsyringe'
import { Event } from '@prisma/client'

import { IEventRepository } from '../contracts/repositories/event-repository'
import { IFindEventByIdDTO } from '../dtos/find-event-by-id-dto'
import { AppError } from '../errors/app-error'

@injectable()
export class FindEventById {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository,
  ) {}

  public async execute({ id }: IFindEventByIdDTO): Promise<Event> {
    const event = await this.eventRepository.findEventById({ id })

    if (!event) {
      throw new AppError('Event not found', 404)
    }

    return event
  }
}
