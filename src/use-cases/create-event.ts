import { Event } from '@prisma/client'
import { IEventRepository } from '../contracts/repositories/event-repository'
import { ICreateEvent } from '../dtos/create-event'
import { AppError } from '../errors/app-error'
import { EventRepository } from '../repositories/event-repository'
import { GetCityByCoordinatesProvider } from './../providers/get-city-by-coordinates-provider'
import { IGetCityByCoordinatesProvider } from '../providers/contracts/get-city-by-coordinates-provider'

export class CreateEvent {
  private eventRepository: IEventRepository
  private getCityNameByCoordinatesProvider: IGetCityByCoordinatesProvider
  constructor() {
    this.eventRepository = new EventRepository()
    this.getCityNameByCoordinatesProvider = new GetCityByCoordinatesProvider()
  }

  public async execute(data: ICreateEvent): Promise<Event> {
    const eventExists = await this.eventRepository.findByLocationAndDate({
      location: data.location,
      date: data.date,
    })

    if (eventExists && eventExists?.length > 0) {
      throw new AppError('Event is already exists', 409)
    }

    const cityName = await this.getCityNameByCoordinatesProvider.getCityName({
      latitude: data.location[0],
      longitude: data.location[1],
    })

    const eventParse: ICreateEvent = {
      ...data,
      city: cityName,
    }

    const event = await this.eventRepository.create(eventParse)
    if (!event) {
      throw new AppError('Erro ao criar evento')
    }

    return event
  }
}
