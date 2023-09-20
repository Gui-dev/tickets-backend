import { container } from 'tsyringe'

import { EventRepository } from './../repositories/event-repository'
import { IEventRepository } from './../contracts/repositories/event-repository'

container.registerSingleton<IEventRepository>(
  'EventRepository',
  EventRepository,
)
