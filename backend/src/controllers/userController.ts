import { Request, Response, NextFunction } from "express"
import  UserService from "../services/userService"
import userService from "../services/userService"

class UserController {

    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = String(req.user?.userId)
            if (!userId) {
                throw new Error("Usuário não autenticado.")
            }
            const user = await UserService.getProfile(userId)
            return res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = UserService.create(req.body)
            return res.status(201).json({ message: "Usuário criado com sucesso.", user })
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userIdFromToken  = String(req.user?.userId)

            if(!userIdFromToken) {
                throw new Error("Usuário não autenticado.")
            }

            const { name, bio, avatarUrl } = req.body

            const updateUser = { name, bio, avatarUrl }
            
            const updatedUser = await UserService.update(userIdFromToken, updateUser)
            
            return res.status(200).json({ message: "Usuário atualizado com sucesso.", updatedUser })
        } catch (error) {
            next(error)
        }
    }

    async updatePassword(req: Request, res: Response, next: NextFunction) {
         try {
            const userIdFromToken = String(req.user?.userId)

            if(!userIdFromToken) {
                throw new Error("Usuário não autenticado.")
            }

            const { currentPassword, newPassword } = req.body

            await userService.changePassword(userIdFromToken, currentPassword, newPassword)
            
            return res.status(200).json({ message: "Senha alterada com sucesso." })

         } catch (error) {
            next(error)
         }
    }

    async updateAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const userIdFromToken = String(req.user?.userId)
            if(!userIdFromToken) {
                throw new Error("Usuário não autenticado.")
            }

            const { avatarUrl } = req.body
            const updatedUser = await userService.update(userIdFromToken, { avatarUrl })
            return res.status(200).json({ message: "Avatar atualizado com sucesso.", updatedUser })
        } catch (error) {
            next(error)
        }

    }

    async updatePlan(req: Request, res: Response, next: NextFunction) {
        try {
            const userIdFromToken = String(req.user?.userId)
            if(!userIdFromToken) {
                throw new Error("Usuário não autenticado.")
            }
            const plan = req.body.plan
            const updatedUser = await userService.update(userIdFromToken, plan)
            return res.status(200).json({ message: "Plano atualizado com sucesso.", updatedUser })
        } catch (error) {
            next(error)
        }
    }



    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userIdFromToken = String(req.user?.userId)

            if(!userIdFromToken) {
                throw new Error("Usuário não autenticado.")
            }

            await UserService.delete(userIdFromToken)
            
            return res.status(204).send()
        } catch (error) {
            next(error)
        }
        
    }

    
}

export default new UserController()