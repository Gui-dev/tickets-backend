import { inject, injectable } from 'tsyringe'
import { Event } from '@prisma/client'

import { IEventRepository } from '../contracts/repositories/event-repository'
import { ICreateEvent } from '../dtos/create-event'
import { AppError } from '../errors/app-error'
import { IGetCityByCoordinatesProvider } from '../providers/contracts/get-city-by-coordinates-provider'
import { IUploadImagesProvider } from '../providers/contracts/upload-images-provider'

@injectable()
export class CreateEvent {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,
    @inject('GetCityByCoordinatesProvider')
    private getCityNameByCoordinatesProvider: IGetCityByCoordinatesProvider,
    @inject('UploadImagesProvider')
    private uploadImagesProvider: IUploadImagesProvider,
  ) {}

  public async execute(data: ICreateEvent): Promise<Event> {
    const eventExists = await this.eventRepository.findByLocationAndDate({
      location: data.location,
      date: data.date,
    })

    if (eventExists && eventExists?.length > 0) {
      throw new AppError('Event is already exists', 409)
    }

    const { city, address } =
      await this.getCityNameByCoordinatesProvider.getCityName({
        latitude: data.location[0],
        longitude: data.location[1],
      })

    const banner = await this.uploadImagesProvider.uploadBannerImage(
      data.banner,
    )
    const flyers = await this.uploadImagesProvider.uploadFlyersImages(
      data.banner,
    )

    const eventParse: ICreateEvent = {
      ...data,
      city,
      address,
      banner,
      flyers,
    }

    const event = await this.eventRepository.create(eventParse)
    if (!event) {
      throw new AppError('Erro ao criar evento')
    }

    return event
  }
}
