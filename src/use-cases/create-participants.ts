import { inject, injectable } from 'tsyringe'
import { Event } from '@prisma/client'

import { IEventRepository } from '../contracts/repositories/event-repository'
import { IUserRepository } from '../contracts/repositories/user.repository'
import { ICreateParticipantsDTO } from '../dtos/create-participants-dto'
import { AppError } from '../errors/app-error'

@injectable()
export class CreateParticipants {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute({
    event_id,
    name,
    email,
  }: ICreateParticipantsDTO): Promise<Event> {
    const event = await this.eventRepository.findEventById({ id: event_id })

    if (!event) {
      throw new AppError('Event not found', 404)
    }

    const userExists = await this.userRepository.findUserByEmail(email)

    if (userExists) {
      const updateEvent = await this.eventRepository.updateEventUserId({
        event_id: event.id,
        user_id: userExists.id,
      })

      return updateEvent
    }

    const user = await this.userRepository.create({ name, email })
    const updateEvent = await this.eventRepository.updateEventUserId({
      event_id: event.id,
      user_id: user.id,
    })

    return updateEvent
  }
}
