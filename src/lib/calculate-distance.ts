import { ICalculateDistance } from './contracts/calculate-distance'

/* eslint-disable prettier/prettier */
export class CalculateDistance implements ICalculateDistance {
  public calculate(
    lat2: number,
    lon2: number,
    lat1: number,
    lon1: number,
  ): number {
    const R = 6371 // km
    // has a problem with the .toRad() method below.
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return d
  }

  public deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }
}
