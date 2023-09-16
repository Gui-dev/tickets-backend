export interface ICalculateDistance {
  calculate(lat2: number, lon2: number, lat1: number, lon1: number): number
  deg2rad(deg: number): number
}
