import { prisma } from "../lib/prisma"

class PublicProfileService {

    async getProfileByUsername(username: string) {
        const user = await prisma.user.findUnique({
            where: { username: username },
            include: {
                links: {
                    orderBy: { createdAt: "asc" }
                },
                appearance: {
                    select: {
                        pageBackground: true,
                        pageTextColor: true,
                        buttonBackground: true,
                        buttonTextColor: true
                    }
                }
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
            appearance: {
                pageBackground: user.appearance?.pageBackground,
                pageTextColor: user.appearance?.pageTextColor,
                buttonBackground: user.appearance?.buttonBackground,
                buttonTextColor: user.appearance?.buttonTextColor,
            },            
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