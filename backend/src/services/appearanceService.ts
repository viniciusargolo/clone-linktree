import { prisma } from "../lib/prisma"
import { DEFAULT_THEME, type Theme } from "../types/theme";

class AppearanceService {

    async getTheme(userId: string) {
        const appearance = await prisma.appearance.findUnique({
            where: { userId },
            select: {                
                pageBackground: true,
                pageTextColor: true,
                buttonBackground: true,
                buttonTextColor: true,
            }
        })

        const theme: Theme = {
            pageBackground: appearance?.pageTextColor ?? DEFAULT_THEME.pageBackground,
            pageTextColor: appearance?.pageTextColor ?? DEFAULT_THEME.pageTextColor,
            buttonBackground: appearance?.buttonBackground ?? DEFAULT_THEME.buttonBackground,
            buttonTextColor: appearance?.buttonTextColor ?? DEFAULT_THEME.buttonTextColor
        }

        return { appearance }
    }

    async updateTheme(theme: Theme, userId: string){

        const updatedTheme = await prisma.appearance.upsert({
            where: { userId },
            update: { 
                pageBackground: theme.pageBackground,
                pageTextColor: theme.pageTextColor,
                buttonBackground: theme.buttonBackground,
                buttonTextColor: theme.buttonTextColor
             },
            create: { 
                pageBackground: theme.pageBackground,
                pageTextColor: theme.pageTextColor,
                buttonBackground: theme.buttonBackground,
                buttonTextColor: theme.buttonTextColor,
                userId 
            },
            select: { 
                pageBackground: true,
                pageTextColor: true,
                buttonBackground: true,
                buttonTextColor: true,
            }
        })

        return updatedTheme
    }

}

export default new AppearanceService()