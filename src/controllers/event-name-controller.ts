import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { filterEventByNameValidation } from '../validations/find-event-by-name-validation'
import { FindEventByName } from '../use-cases/find-event-by-name'

export class EventNameController {
  public async index(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { name } = filterEventByNameValidation.parse(request.body)
    const findEventByName = container.resolve(FindEventByName)
    const events = await findEventByName.execute(name)
    return response.status(200).send(events)
  }
}
