import { container } from 'tsyringe'

import { EventRepository } from './../repositories/event-repository'
import { IEventRepository } from './../contracts/repositories/event-repository'

import { IGetCityByCoordinatesProvider } from './../providers/contracts/get-city-by-coordinates-provider'
import { GetCityByCoordinatesProvider } from '../providers/get-city-by-coordinates-provider'

import { UploadImagesProvider } from '../providers/upload-images-provider'
import { IUploadImagesProvider } from '../providers/contracts/upload-images-provider'

container.registerSingleton<IEventRepository>(
  'EventRepository',
  EventRepository,
)

container.registerSingleton<IGetCityByCoordinatesProvider>(
  'GetCityByCoordinatesProvider',
  GetCityByCoordinatesProvider,
)

container.registerSingleton<IUploadImagesProvider>(
  'UploadImagesProvider',
  UploadImagesProvider,
)
