export class CustomError extends Error{
  public readonly statusCode: number
  public readonly message: string

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.message = message
  }

  public static conflict (message: string) {
    return new CustomError(409, message)
  }

  public static badRequest (message: string) {
    return new CustomError(400, message)
  }

  public static unauthorized(message: string) {
    return new CustomError(403, message)
  }

  public static internalServer() {
    return new CustomError(500, 'Internal server error')
  }
}