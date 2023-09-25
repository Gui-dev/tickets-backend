import { FastifyInstance } from 'fastify'

import { EventController } from './../controllers/event-controller'
import { EventCategoryController } from '../controllers/event-category-controller'
import { EventLocationController } from '../controllers/event-location-controller'

const eventController = new EventController()
const eventCategoryController = new EventCategoryController()
const eventLocationController = new EventLocationController()

export const eventRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/events', eventController.store)
  fastify.get('/events/:id', eventController.show)
  fastify.get('/events', eventLocationController.show)
  fastify.get('/events/category/:category', eventCategoryController.show)
}
