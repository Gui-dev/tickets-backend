import { FastifyInstance } from 'fastify'

import { EventController } from './../controllers/event-controller'
import { EventCategoryController } from '../controllers/event-category-controller'
import { EventLocationController } from '../controllers/event-location-controller'
import { ParticipantsController } from '../controllers/participants-controller'
import { EventNameController } from '../controllers/event-name-controller'

const eventController = new EventController()
const eventCategoryController = new EventCategoryController()
const eventLocationController = new EventLocationController()
const participantsController = new ParticipantsController()
const eventNameController = new EventNameController()

export const eventRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/events', eventController.store)
  fastify.get('/events', eventController.index)
  fastify.get('/events/:id', eventController.show)
  fastify.get('/events/location', eventLocationController.show)
  fastify.get('/events/category/:category', eventCategoryController.show)
  fastify.get('/events/filter', eventCategoryController.show)
  fastify.post('/events/filter/name', eventNameController.index)

  fastify.post('/events/:id/participants', participantsController.store)
}
