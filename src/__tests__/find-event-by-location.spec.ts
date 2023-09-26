import supertest from 'supertest'

import { app } from '../server'

describe('#Find Event By Location END2END', () => {
  describe('#GET /events?latitude=-23,60005&longitude=-46,72016', () => {
    it('should be able to return an event by location', async () => {
      const response = await supertest(app.server).get(
        '/events?latitude=-23.60005&longitude=-46.72016',
      )

      expect(response.statusCode).toBe(200)
    })
  })
})
