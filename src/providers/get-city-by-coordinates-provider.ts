import axios from 'axios'

import { AppError } from '../errors/app-error'
import { IGetCityByCoordinatesProvider } from './contracts/get-city-by-coordinates-provider'
import { IFindEventByLocationDTO } from '../dtos/find-event-by-location-dto'

export class GetCityByCoordinatesProvider
  // eslint-disable-next-line prettier/prettier
  implements IGetCityByCoordinatesProvider {
  public async getCityName({
    latitude,
    longitude,
  }: IFindEventByLocationDTO): Promise<string> {
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
