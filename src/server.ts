import Fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import { ZodError } from 'zod'
import 'dotenv/config'

import { AppError } from './errors/app-error'
import { userRoutes } from './routes/user.routes'
import { eventRoutes } from './routes/event.routes'

export const app = Fastify()

export const main = () => {
  const PORT = 3333 || process.env.PORT

  app.register(multipart, { attachFieldsToBody: true })
  app.register(cors, {
    origin: true,
  })

  app.register(eventRoutes)
  app.register(userRoutes)

  app.setErrorHandler(function (error, _request, reply) {
    if (error instanceof AppError) {
      console.log(error)
      return reply.status(error.statusCode!).send({ error: error.message })
    }

    if (error instanceof ZodError) {
      const toSend = {
        message: 'Validation error',
        errors: JSON.parse(error.message),
        statusCode: error.statusCode || 400,
      }
      return reply.code(toSend.statusCode).send(toSend)
    }
    console.log('ERROR: ', error)
    return reply.status(500).send({ error: 'Internal server error' })
  })

  app
    .listen({
      port: PORT,
      host: '0.0.0.0',
    })
    .then(() => {
      console.log('🚀 Server running on http://localhost:3333')
    })
    .catch((error) => {
      console.log(error)
    })
}

main()
