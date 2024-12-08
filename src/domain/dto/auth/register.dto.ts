import { isValidEmail } from "./utils"
import slug from 'slug'

interface IValues {
  name: string
  email: string,
  password: string,
  passwordConfirmation: string
}

export class RegisterDto {
  public readonly name: string
  public readonly email: string
  public readonly password: string
  public readonly slug: string

  constructor(name: string, email: string, password: string, slug: string) {
    this.name = name
    this.email = email
    this.password = password
    this.slug = slug
  }

  public static create(body: IValues): [Object?, RegisterDto?] {
    const {name, email, password, passwordConfirmation} = body
    let errors = {} as {[key: string]: any}

    if (!name) errors.name = 'El nombre es requerido'
    if (!email) errors.email = 'El email es requerido'
    else if (!isValidEmail(email)) errors.email = 'El email no es válido'
    if (!password) errors.password = 'La contraseña es requerida'
    else if (password.length < 8) errors.password = 'La contraseña debe tener como mínimo 8 caracteres'
    if (!passwordConfirmation) errors.passwordConfirmation = 'La contraseña de confirmación es requerida'
    else if (password !== passwordConfirmation) errors.passwordConfirmation = 'Las contraseñas no son iguales'

    if (Object.values(errors).length > 0) return [errors, undefined]

    return [undefined, new RegisterDto(name, email, password, slug(name, '-'))]
  }
}