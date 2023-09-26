import supertest from 'supertest'

import { app } from '../server'

describe('#Find Event By ID END2END', () => {
  describe('#GET /events/:id', () => {
    it('should be able to return an event by id', async () => {
      const response = await supertest(app.server).get(
        '/events/650e8fe8e7a1cd70ef4263b6',
      )

      expect(response.statusCode).toBe(200)
    })
  })
})
