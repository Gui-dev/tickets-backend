import Fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'

import { userRoutes } from './routes/user'
import { AppError } from './errors/app-error'

const app = Fastify()
const PORT = 3333 || process.env.PORT

app.register(cors, {
  origin: true,
})

app.register(userRoutes)

app.setErrorHandler(function (error, request, reply) {
  if (error instanceof AppError) {
    // Log error
    console.log(error)
    // Send error response
    reply.status(error.statusCode!).send({ error: error.message })
  } else if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    // Log error
    console.log(error)
    // Send error response
    reply.status(error.statusCode!).send({ error: error.message })
  } else {
    // fastify will use parent error handler to handle this
    reply.status(500).send({ error: error.message })
  }
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
