import { container } from 'tsyringe'

import { EventRepository } from './../repositories/event-repository'
import { IEventRepository } from './../contracts/repositories/event-repository'

import { IGetCityByCoordinatesProvider } from './../providers/contracts/get-city-by-coordinates-provider'
import { GetCityByCoordinatesProvider } from '../providers/get-city-by-coordinates-provider'

import { UploadImagesProvider } from '../providers/upload-images-provider'
import { IUploadImagesProvider } from '../providers/contracts/upload-images-provider'

import { UserRepository } from '../repositories/user-repository'
import { IUserRepository } from '../contracts/repositories/user.repository'

import { ICalculateDistance } from '../lib/contracts/calculate-distance'
import { CalculateDistance } from '../lib/calculate-distance'

container.registerSingleton<IEventRepository>(
  'EventRepository',
  EventRepository,
)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IGetCityByCoordinatesProvider>(
  'GetCityByCoordinatesProvider',
  GetCityByCoordinatesProvider,
)

container.registerSingleton<IUploadImagesProvider>(
  'UploadImagesProvider',
  UploadImagesProvider,
)

container.registerSingleton<ICalculateDistance>(
  'CalculateDistance',
  CalculateDistance,
)
