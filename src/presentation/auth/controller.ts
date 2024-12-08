import { RegisterDto } from '../../domain/dto/auth/register.dto';
import { CustomError } from '../../domain/errors';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

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
      .then(user => res.status(200).json({user}))
      .catch(error => this.handleError(error, res))
  }
}