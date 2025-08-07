import { Request, Response, NextFunction } from "express";
import AuthService from "../services/authService";

class AuthController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await AuthService.register(req.body)
            return res.status(201).json({ message: "Usuário registrado com sucesso.", user})
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { user, token} = await AuthService.login(req.body)
            return res.status(200).json({ message: "Login bem-sucedido.", user, token })
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController()