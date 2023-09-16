import { IFindEventByLocationDTO } from '../../dtos/find-event-by-location-dto'

export interface IGetCityByCoordinatesProvider {
  getCityName({ latitude, longitude }: IFindEventByLocationDTO): Promise<string>
}
