import { AuthService } from "../services/auth.service";
import { AuthController } from "./controller";
import { Router } from "express";

export class AuthRoutes {
  public static get routes(): Router {
    const router = Router();
    const authService = new AuthService()
    const controller = new AuthController(authService);

    router.post('/register', controller.register);

    return router;
  }
}