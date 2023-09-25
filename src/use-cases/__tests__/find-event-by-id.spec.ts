import { EventRepositoryInMemory } from '../../repositories/in-memory/event-repository-in-memory'
import { FindEventById } from '../find-event-by-id'
import { CreateEvent } from '../create-event'
import { GetCityByCoordinatesProviderInMemory } from '../../providers/in-memory/get-city-by-coordinates-provider-in-memory'
import { ICreateEvent } from '../../dtos/create-event'
// import { AppError } from '../../errors/app-error'
import { UploadImagesProviderInMemory } from '../../providers/in-memory/upload-images-provider-in-memory'

let fakeEventRepositoryInMemory: EventRepositoryInMemory
let findEventById: FindEventById
let createEvent: CreateEvent
let getCityByCoordinatesProviderInMemory: GetCityByCoordinatesProviderInMemory
let uploadImagesProviderInMemory: UploadImagesProviderInMemory

describe('# Find event by category', () => {
  const event: ICreateEvent = {
    title: 'fake-title',
    description: 'fake-description',
    city: 'fake-city',
    categories: ['fake-category'],
    location: ['1.48327483729', '1.237821739'],
    coupons: ['fake-coupon'],
    price: 45000,
    sector: 'fake-sector',
    date: new Date(),
    banner: 'http://fake-url/image.jepg',
    flyers: ['http://fake-url/image.jepg'],
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
    findEventById = new FindEventById(fakeEventRepositoryInMemory)
  })

  it('should be able return an event by id', async () => {
    const eventResponse = await createEvent.execute(event)
    const result = await findEventById.execute({ id: eventResponse.id })

    expect(eventResponse).toEqual(result)
  })

  // it('should not be possible to return an event by category', async () => {
  //   const category = 'fake-category'

  //   await expect(
  //     findEventByCategory.execute({ category }),
  //   ).rejects.toBeInstanceOf(AppError)
  // })
})
