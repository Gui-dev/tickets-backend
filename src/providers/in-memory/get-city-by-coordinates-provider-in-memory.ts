/* eslint-disable prettier/prettier */
import { IFindEventByLocationDTO } from '../../dtos/find-event-by-location-dto'
import { IGetCityByCoordinatesProviderDTO } from '../../dtos/get-city-by-coordinates-provider-dto'
import { IGetCityByCoordinatesProvider } from '../contracts/get-city-by-coordinates-provider'

export class GetCityByCoordinatesProviderInMemory
  implements IGetCityByCoordinatesProvider
{
  public async getCityName(
    data: IFindEventByLocationDTO,
  ): Promise<IGetCityByCoordinatesProviderDTO> {
    return {
      city: 'fake-city',
      address: 'fake-address',
    }
  }
}
