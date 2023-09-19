import { FastifyInstance } from 'fastify'

import { EventController } from './../controllers/event-controller'
import { EventCategoryController } from '../controllers/event-category-controller'

const eventController = new EventController()
const eventCategoryController = new EventCategoryController()

export const eventRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/events', eventController.store)
  fastify.get('/events', eventController.show)
  fastify.get('/events/category/:category', eventCategoryController.show)
}
