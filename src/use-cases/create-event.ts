import { Event } from '@prisma/client'
import { IEventRepository } from '../contracts/repositories/event-repository'
import { ICreateEvent } from '../dtos/create-event'
import { AppError } from '../errors/app-error'
import { EventRepository } from '../repositories/event-repository'

export class CreateEvent {
  private eventRepository: IEventRepository
  constructor() {
    this.eventRepository = new EventRepository()
  }

  public async execute(data: ICreateEvent): Promise<Event> {
    const event = await this.eventRepository.create(data)
    if (!event) {
      throw new AppError('Erro ao criar evento')
    }

    return event
  }
}
