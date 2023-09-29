import supertest from 'supertest'

import { app } from '../server'

describe('#Create Event END2END', () => {
  describe('#POST /events', () => {
    it('should be able to create a event', async () => {
      const response = await supertest(app.server)
        .post('/events')
        .field('title', 'fake-title')
        .field('description', 'fake-description')
        .field('city', 'fake-city')
        .field('categories', 'fake-category')
        .field('location', '-23,60005, -46,72016')
        .field('coupons', 'fake-coupon')
        .field('price', 45000)
        .field('sector', 'fake-sector')
        .field('date', new Date().toISOString())
        .attach('banner', '/Users/dracarys/Downloads/images/bruce_wayne.jpeg')
        .attach('flyers', '/Users/dracarys/Downloads/images/chocolates.jpeg')

      expect(response.statusCode).toBe(201)
    })
  })
})
