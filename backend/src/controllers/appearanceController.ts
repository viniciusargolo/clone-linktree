import { Request, Response, NextFunction } from "express";
import AppearanceService from "../services/appearanceService";
import { isValidTheme, type Theme } from "../types/theme"

class AppearanceController {

    async getTheme(req: Request, res: Response, next: NextFunction){
        try {
            const userIdFromToken = req.user?.userId
            if(!userIdFromToken) {
                res.status(401).json({ message: "Você não está autenticado" })
            }
            const theme = await AppearanceService.getTheme(String(userIdFromToken))
            return res.status(200).json(theme)
        } catch (error) {
            next(error)
        }
    }

    async updateTheme(req: Request, res: Response, next: NextFunction) {
        try {
            const { pageBackground, pageTextColor, buttonBackground, buttonTextColor } = req.body

            const userIdFromToken = req.user?.userId
            if(!userIdFromToken) {
                throw new Error("Usuário não autenticado.")
            }

            const theme: Theme = {
                pageBackground,
                pageTextColor,
                buttonBackground,
                buttonTextColor
            }

            if (!isValidTheme(theme)) {
                return res.status(400).json({ message: "Cores inválidas. Use o formato #rrggbb." })
            }

            const updatedAppearance = await AppearanceService.updateTheme(theme, userIdFromToken)
            return res.status(200).json({ message: "Tema alterado com sucesso.", updatedAppearance })
        } catch (error) {
            next(error)
        }
    }
}

export default new AppearanceController()