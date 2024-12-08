interface IValues {
  email: string,
  password: string
}

export class LoginDto {
  public readonly email: string
  public readonly password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }

  public static create(body: IValues): [Object?, LoginDto?] {
    const {email, password} = body
    const errors = {} as {[key: string]: any}

    if (!email) errors.email = 'El email es requerido'
    if (!password) errors.password = 'La contraseña es requerida'

    if (Object.values(errors).length > 0) return [errors, undefined]
    return [undefined, new LoginDto(email, password)]
  }
}