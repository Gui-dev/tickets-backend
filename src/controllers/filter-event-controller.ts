import { FastifyReply, FastifyRequest } from 'fastify'

import { filterEventValidation } from '../validations/filter-event-validation'

export class FilterEventController {
  public async index(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const data = filterEventValidation.parse(request.query)
    return response.status(200).send(data)
  }
}
