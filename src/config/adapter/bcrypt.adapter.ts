import bcryptjs, { genSaltSync } from 'bcryptjs'

export class BcryptAdapter {
  public static hash (password: string) {
    const salt = genSaltSync(10)
    return bcryptjs.hashSync(password, salt)
  }

  public static compare (password: string, passwordHashed: string) {
    return bcryptjs.compareSync(password, passwordHashed)
  }
}