import supertest from 'supertest'

import { app } from '../server'

describe('#Find Event By Category END2END', () => {
  describe('#GET events/category/:category', () => {
    it('should be able to return an event by category', async () => {
      const response = await supertest(app.server).get('/events/category/rock')

      expect(response.statusCode).toBe(200)
    })
  })
})
