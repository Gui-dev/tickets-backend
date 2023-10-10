import { IFindEventByLocationDTO } from '../../dtos/find-event-by-location-dto'
import { IGetCityByCoordinatesProviderDTO } from '../../dtos/get-city-by-coordinates-provider-dto'

export interface IGetCityByCoordinatesProvider {
  getCityName({
    latitude,
    longitude,
  }: IFindEventByLocationDTO): Promise<IGetCityByCoordinatesProviderDTO>
}
