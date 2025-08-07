import {  Request, Response, NextFunction } from "express";
import LinkService from "../services/linkService";

class LinkController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const findAll = await LinkService.getLinks()
            return res.status(200).json({ message: "Listagem de todos os links.", findAll})
        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const userIdFromToken = req.user?.userId
            if(!userIdFromToken) {
                throw new Error("Usuário não autenticado.")
            }
            const link = await LinkService.create(req.body, userIdFromToken)
            return res.status(201).json({ message: "Link criado com sucesso.", link })
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const linkIdInt = parseInt(id, 10)
            const userIdFromToken = req.user?.userId
            if(!userIdFromToken) {
                throw new Error("Usuário não autenticado.")
            }
            const linkData = req.body
            const updateLink = await LinkService.update(linkIdInt, userIdFromToken, linkData)
            return res.status(201).json({ message: "Alteração no link feito com sucesso.", updateLink })
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const userIdFromToken = req.user?.userId
            if(!userIdFromToken) {
                throw new Error("Usuário não autenticado.")
            }
            const linkId = parseInt(id, 10)
            const deletedLink = await LinkService.delete(linkId, userIdFromToken)
            return res.status(200).json({ message: "Link excluído com sucesso.", deletedLink })
        } catch (error) {
            next(error)
        }
    }
}

export default new LinkController()