import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import {
  participantsValidation,
  eventIdValidation,
} from '../validations/participants-validation'
import { CreateParticipants } from '../use-cases/create-participants'

export class ParticipantsController {
  public async store(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { id } = eventIdValidation.parse(request.params)
    const { name, email } = participantsValidation.parse(request.body)
    const createParticipants = container.resolve(CreateParticipants)
    const eventWithUser = await createParticipants.execute({
      event_id: id,
      name,
      email,
    })

    return response.status(200).send(eventWithUser)
  }
}
