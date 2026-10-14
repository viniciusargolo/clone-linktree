import { type User } from "../generated/prisma";

import { prisma } from "../lib/prisma"

interface Theme {
    id: number;
    theme: string;
    user: User;
    userId: number;
}

class AppearanceService {

    async getTheme(userId: string) {
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

    async setTheme(setTheme: Theme, userIdFromToken: string) {

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

    async updateTheme(theme: string, userId: string){

        if(!theme) {
            throw new Error("Erro. Escolha o tema novamente.")
        }

        const updatedTheme = await prisma.appearance.upsert({
            where: { userId },
            update: { theme },
            create: { theme, userId },
            select: { id: true, theme: true, userId: true }
        })

        if(!updatedTheme) throw new Error("Não foi possível alterar o tema.")

        return updatedTheme
    }

}

export default new AppearanceService()