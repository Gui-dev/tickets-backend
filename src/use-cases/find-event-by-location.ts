import { IEventRepository } from '../contracts/repositories/event-repository'
import { IFindEventByLocationDTO } from '../dtos/find-event-by-location-dto'
import { AppError } from '../errors/app-error'
import { CalculateDistance } from '../lib/calculate-distance'
import { ICalculateDistance } from '../lib/contracts/calculate-distance'
import { IGetCityByCoordinatesProvider } from '../providers/contracts/get-city-by-coordinates-provider'
import { GetCityByCoordinatesProvider } from '../providers/get-city-by-coordinates-provider'
import { EventRepository } from '../repositories/event-repository'

export class FindEventByLocation {
  private eventRepository: IEventRepository
  private getCityNameByCoordinatesProvider: IGetCityByCoordinatesProvider
  private calculateDistance: ICalculateDistance

  constructor() {
    this.eventRepository = new EventRepository()
    this.getCityNameByCoordinatesProvider = new GetCityByCoordinatesProvider()
    this.calculateDistance = new CalculateDistance()
  }

  public async execute({ latitude, longitude }: IFindEventByLocationDTO) {
    const city = await this.getCityNameByCoordinatesProvider.getCityName({
      latitude,
      longitude,
    })
    const eventsByCity = await this.eventRepository.findEventsByCity({ city })

    const eventWithRadius = eventsByCity?.filter((event) => {
      const distance = this.calculateDistance.calculate(
        Number(latitude),
        Number(longitude),
        Number(event.location[0]),
        Number(event.location[1]),
      )
      return distance <= 3
    })

    if (!eventWithRadius || eventWithRadius.length === 0) {
      throw new AppError('Error, any event found')
    }

    return eventWithRadius
  }
}
