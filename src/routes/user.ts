import { FastifyInstance } from 'fastify'

export const userRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/', (req, res) => {
    res.send('Hello World User')
  })
}
