import axios from 'axios'

import { Event } from '@prisma/client'
import { IEventRepository } from '../contracts/repositories/event-repository'
import { ICreateEvent } from '../dtos/create-event'
import { AppError } from '../errors/app-error'
import { EventRepository } from '../repositories/event-repository'

export class CreateEvent {
  private eventRepository: IEventRepository
  constructor() {
    this.eventRepository = new EventRepository()
  }

  public async execute(data: ICreateEvent): Promise<Event> {
    const eventExists = await this.eventRepository.findByLocationAndDate({
      location: data.location,
      date: data.date,
    })

    if (eventExists) {
      throw new AppError('Event is already exists', 401)
    }

    const cityName = await this.getCityNameByCoordinates(
      data.location[0],
      data.location[1],
    )

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

  private async getCityNameByCoordinates(
    latitude: string,
    longitude: string,
  ): Promise<string> {
    const key = process.env.OPEN_CAGE_KEY
    console.log(latitude, longitude)
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${key}`,
    )

    if (!response.data) {
      throw new AppError('Erro ao informar latitude ou longitude')
    }

    const city = response.data.results[0].components.city
    return city
  }
}
