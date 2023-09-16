import { FastifyReply, FastifyRequest } from 'fastify'
import { MultipartFile } from '@fastify/multipart'

import { CreateEvent } from '../use-cases/create-event'
import { createEventValidation } from '../validations/create-event-validation'
import { UploadImagesProvider } from '../providers/upload-images-provider'
import { findEventByLocationValidation } from '../validations/find-events-by-location-validation'
import { FindEventByLocation } from '../use-cases/find-event-by-location'

type IRequestParams = {
  user_id?: {
    value: string
  }
  title: {
    value: string
  }
  description: {
    value: string
  }
  categories: {
    value: string
  }
  city: {
    value: string
  }
  location: {
    value: string
  }
  coupons: {
    value: string
  }
  price: {
    value: string
  }
  sector: {
    value: string
  }
  date: {
    value: string
  }
  banner: MultipartFile
  flyers: MultipartFile[] | MultipartFile
}

export class EventController {
  public async store(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const data: IRequestParams = request.body as IRequestParams

    const banner = await UploadImagesProvider.uploadBannerImage(data.banner)
    const flyers = await UploadImagesProvider.uploadFlyersImages(data.flyers)
    const location = data.location.value.split(', ')
    const categories = data.categories.value.trim().split(', ')
    const coupons = data.coupons.value.trim().split(', ')

    const eventParse = createEventValidation.parse({
      title: data.title.value,
      description: data.description.value,
      categories,
      city: data.city.value,
      location,
      banner,
      flyers,
      coupons,
      price: Number(data.price.value),
      sector: data.sector.value,
      date: new Date(data.date.value),
    })

    const createEvent = new CreateEvent()
    const event = await createEvent.execute(eventParse)
    return response.status(201).send(event)
  }

  public async show(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { latitude, longitude } = findEventByLocationValidation.parse(
      request.query,
    )
    const findEventByLocation = new FindEventByLocation()
    const event = await findEventByLocation.execute({ latitude, longitude })
    return response.status(200).send(event)
  }
}
