import { PrismaClient } from "../generated/prisma"
import type { CreateLinkData } from "../utils/userTypes"

const prisma = new PrismaClient()


class LinkService {

    async getLinks() {
       return await prisma.link.findMany()
    }

    async create(linkData: CreateLinkData, ownerId: number) {
        const { title, url } = linkData

        if (!title || !url) {
            throw new Error("Os campos título e url são obrigatórios.")
        }
        
        const link = await prisma.link.create({
            data: {
                title,
                url,
                ownerId
            }
        })
        
        return link
    }

    async update(linkId: number, userId: number, linkData: { title?: string; url?: string }) {
        const linkExists = await prisma.link.findUnique({ where: { id: linkId } })
        if (!linkExists) {
            throw new Error("Link não encontrado.")
        }

        const updatedLink = await prisma.link.update({
            where: {
                    id: linkId,
                    ownerId: userId
                },            
            data: {
                title: linkData.title,
                url: linkData.url
            },
            select: {
                id: true,
                title: true,
                url: true,
                clicks: true,
                owner: true,
                ownerId: true     
            }
        })
        return updatedLink
    }

    async delete(linkId: number, userId: number) {
        const linkExists = await prisma.link.findUnique({ where: { id: linkId, ownerId: userId } })
        if (!linkExists) {
            throw new Error("Link não encontrado.")
        }

        await prisma.link.delete({
            where: { id: linkId }
        })
        return
    }
}

export default new LinkService()