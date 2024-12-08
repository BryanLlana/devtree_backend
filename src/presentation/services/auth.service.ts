import { BcryptAdapter } from "../../config/adapter/bcrypt.adapter";
import User from "../../data/mongo/models/User";
import { RegisterDto } from "../../domain/dto/auth/register.dto";
import { CustomError } from "../../domain/errors";

export class AuthService {
  public async register(registerDto: RegisterDto) {
    const emailExists = await User.findOne({email: registerDto.email})
    if (emailExists) throw CustomError.conflict('El email ya ha sido registrado')

      try {
      const user = new User(registerDto)
      user.password = BcryptAdapter.hash(registerDto.password)
      await user.save()
      return {
        message: 'Usuario registrado correctamente'
      }
    } catch (error) {
      throw CustomError.internalServer()
    }
  }
}