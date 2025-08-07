import { Request, Response, NextFunction } from "express";
import AppearanceService from "../services/appearanceService";


class AppearanceController {

    async getTheme(req: Request, res: Response, next: NextFunction){
        try {
            const userIdFromToken = req.user?.userId
            if(!userIdFromToken) {
                throw new Error("Você não está autenticado")
            }
            const theme = await AppearanceService.getTheme(userIdFromToken)
            return res.status(200).json(theme)
        } catch (error) {
            next(error)
        }
    }

    async setTheme(req: Request, res: Response, next: NextFunction){
        try {
            const { theme } = req.body
            const userIdFromToken = req.user?.userId
            if(!userIdFromToken) {
                throw new Error("Usuário não autenticado.")
            }
            const appearance = await AppearanceService.setTheme(theme, userIdFromToken)
            
            return res.status(200).json({ message: "Tema definido com sucesso.", appearance })
        } catch (error) {
            next(error)
        }
    }

    async updateTheme(req: Request, res: Response, next: NextFunction) {
        try {
            const { theme } = req.body
            // const { id } = req.params
            // const themeId = parseInt(id, 10)
            const userIdFromToken = req.user?.userId
            if(!userIdFromToken) {
                throw new Error("Usuário não autenticado.")
            }

            const updatedAppearance = await AppearanceService.updateTheme(theme, userIdFromToken)
            return res.status(200).json({ message: "Tema alterado com sucesso.", updatedAppearance })
        } catch (error) {
            next(error)
        }
    }
}

export default new AppearanceController()