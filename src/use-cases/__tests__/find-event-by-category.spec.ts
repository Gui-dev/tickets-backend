import { EventRepositoryInMemory } from '../../repositories/in-memory/event-repository-in-memory'
import { FindEventByCategory } from '../find-event-by-category'
import { CreateEvent } from '../create-event'
import { GetCityByCoordinatesProviderInMemory } from '../../providers/in-memory/get-city-by-coordinates-provider-in-memory'
import { ICreateEvent } from '../../dtos/create-event'
import { AppError } from '../../errors/app-error'
import { UploadImagesProviderInMemory } from '../../providers/in-memory/upload-images-provider-in-memory'

let fakeEventRepositoryInMemory: EventRepositoryInMemory
let findEventByCategory: FindEventByCategory
let createEvent: CreateEvent
let getCityByCoordinatesProviderInMemory: GetCityByCoordinatesProviderInMemory
let uploadImagesProviderInMemory: UploadImagesProviderInMemory

describe('# Find event by category', () => {
  const event: ICreateEvent = {
    title: 'fake-title',
    description: 'fake-description',
    city: 'fake-city',
    address: 'fake-address',
    categories: ['fake-category'],
    location: ['1.48327483729', '1.237821739'],
    coupons: ['fake-coupon'],
    price: 45000,
    sector: 'fake-sector',
    date: new Date(),
    banner: '/Users/dracarys/Downloads/bruce_wayne.jpeg',
    flyers: ['/Users/dracarys/Downloads/chocolates.jpeg'],
  }

  beforeEach(() => {
    fakeEventRepositoryInMemory = new EventRepositoryInMemory()
    getCityByCoordinatesProviderInMemory =
      new GetCityByCoordinatesProviderInMemory()
    uploadImagesProviderInMemory = new UploadImagesProviderInMemory()

    createEvent = new CreateEvent(
      fakeEventRepositoryInMemory,
      getCityByCoordinatesProviderInMemory,
      uploadImagesProviderInMemory,
    )
    findEventByCategory = new FindEventByCategory(fakeEventRepositoryInMemory)
  })

  it('should be able return an array of events by category', async () => {
    await createEvent.execute(event)
    const category = 'fake-category'
    const result = await findEventByCategory.execute({ category })

    expect(result[0].categories[0]).toEqual(category)
  })

  it('should not be possible to return an event by category', async () => {
    const category = 'fake-category'

    await expect(
      findEventByCategory.execute({ category }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
