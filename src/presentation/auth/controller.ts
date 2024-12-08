import { RegisterDto } from '../../domain/dto/auth/register.dto';
import { CustomError } from '../../domain/errors';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../../domain/dto/auth/login.dto';

export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }

  public register = (req: Request, res: Response) => {
    const [errors, registerDto] = RegisterDto.create(req.body)
    if (errors) return res.status(400).json({errors})

    this.authService.register(registerDto)
      .then(message => res.status(200).json(message))
      .catch(error => this.handleError(error, res))
  }

  public login = (req: Request, res: Response) => {
    const [errors, loginDto] = LoginDto.create(req.body)
    if (errors) return res.status(400).json({errors})
    this.authService.login(loginDto)
      .then(message => res.status(200).json(message))
      .catch(error => this.handleError(error, res))
  }
}