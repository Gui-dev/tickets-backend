/* eslint-disable prettier/prettier */
import { IFindEventByLocationDTO } from '../../dtos/find-event-by-location-dto'
import { IGetCityByCoordinatesProvider } from '../contracts/get-city-by-coordinates-provider'

export class GetCityByCoordinatesProviderInMemory
  implements IGetCityByCoordinatesProvider {
  public async getCityName(data: IFindEventByLocationDTO): Promise<string> {
    return 'fake city'
  }
}
