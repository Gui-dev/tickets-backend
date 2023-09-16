import { FastifyInstance } from 'fastify'

import { EventController } from './../controllers/event-controller'

const eventController = new EventController()

export const eventRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/events', eventController.store)
  fastify.get('/events', eventController.show)
}
