import { FastifyReply, FastifyRequest } from 'fastify'

import { findEventByLocationValidation } from '../validations/find-events-by-location-validation'
import { FindEventByLocation } from '../use-cases/find-event-by-location'

export class EventLocationController {
  public async show(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { latitude, longitude } = findEventByLocationValidation.parse(
      request.query,
    )
    const findEventByLocation = new FindEventByLocation()
    const event = await findEventByLocation.execute({ latitude, longitude })
    return response.status(200).send(event)
  }
}
