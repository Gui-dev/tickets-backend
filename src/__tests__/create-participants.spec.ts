import supertest from 'supertest'

import { app } from '../server'

describe('#Create Participants END2END', () => {
  describe('#POST /events/:id/participants', () => {
    it('should be able to create an user', async () => {
      const response = await supertest(app.server)
        .post('/events/650e8fe8e7a1cd70ef4263b6/participants')
        .send({
          name: 'fake-name',
          email: 'fake-email@email.com',
        })

      expect(response.statusCode).toBe(200)
    })
  })
})
