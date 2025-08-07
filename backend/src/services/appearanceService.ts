import { PrismaClient, type User } from "../generated/prisma";

interface Theme {
    id: number;
    theme: string;
    user: User;
    userId: number;
}

const prisma = new PrismaClient()

class AppearanceService {

    async getTheme(userId: number) {
        const userTheme = await prisma.appearance.findUnique({
            where: { userId },
            select: {
                id: true,
                theme: true,
                userId: true
            }
        })
        return userTheme
    }

    async setTheme(setTheme: Theme, userIdFromToken: number) {

        if(!setTheme) {
            throw new Error("Você precisa escolher um tema.")
        }

        const limitTheme = await prisma.appearance.count({
            where: { userId: userIdFromToken }
        })

        if(limitTheme) {
            throw new Error("Você não pode criar mais um tema, só alterar.")
        }

        const definedTheme = await prisma.appearance.create({
            data: {
                theme: setTheme.theme,
                userId: userIdFromToken
            }
        })

        return definedTheme
    }

    async updateTheme(theme: string, userId: number){

        if(!theme) {
            throw new Error("Você precisa passar o tema.")
        }

        const updatedTheme = await prisma.appearance.update({
            where: {
                userId
            },
            data: {
                theme
            },
            select: {
                id: true,
                theme: true,
                userId: true
            }
        })

        return updatedTheme
    }

}

export default new AppearanceService()