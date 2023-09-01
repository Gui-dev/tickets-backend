export class AppError {
  public message: string
  public statusCode: Number

  constructor(message: string, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}
