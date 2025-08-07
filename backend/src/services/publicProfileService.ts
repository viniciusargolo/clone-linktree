import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

class PublicProfileService {

    async getProfileByUsername(username: string) {
        const user = await prisma.user.findUnique({
            where: { username },
            include: {
                links: {
                    orderBy: { createdAt: "asc" }
                },
                appearance: true
            }
        })

        if(!user) {
            throw new Error("Perfil não encontrado.")
        }

        const publicProfile = {
            name: user.name,
            username: user.username,
            bio: user.bio,
            avatar: user.avatarUrl,
            theme: user.appearance,
            links: user.links.map(link => ({
                linkId: link.id,
                title: link.title,
                url: link.url,
            }))
        }
        return publicProfile
    }

}

export default new PublicProfileService()