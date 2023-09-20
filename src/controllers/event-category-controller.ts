import { FastifyReply, FastifyRequest } from 'fastify'

import { findEventByCategoryValidation } from '../validations/find-event-by-category-validation'
import { FindEventByCategory } from '../use-cases/find-event-by-category'
import { container } from 'tsyringe'

export class EventCategoryController {
  public async show(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { category } = findEventByCategoryValidation.parse(request.params)
    const findEventByCategory = container.resolve(FindEventByCategory)
    const events = await findEventByCategory.execute({ category })
    return response.status(200).send(events)
  }
}
