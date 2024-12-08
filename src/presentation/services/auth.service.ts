import { BcryptAdapter } from "../../config/adapter/bcrypt.adapter";
import User from "../../data/mongo/models/User";
import { LoginDto } from "../../domain/dto/auth/login.dto";
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

  public async login(loginDto: LoginDto) {
    const emailExists = await User.findOne({email: loginDto.email})
    if (!emailExists) throw CustomError.conflict('El email no ha sido registrado')
    if (!BcryptAdapter.compare(loginDto.password, emailExists.password)) throw CustomError.unauthorized('La contraseña es incorrecta')
      
    return {
      message: 'Usuario auntenticado correctamente'
    }
  }
}