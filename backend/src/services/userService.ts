import { PrismaClient } from "../generated/prisma"
import type { userData } from "../utils/userTypes"
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

class UserService {

    async getProfile(userId: number) {
        const user = await prisma.user.findUnique({ 
            where: { id: userId },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                bio: true,
                avatarUrl: true,
                plan: true,
                createdAt: true,
                updatedAt: true,
                appearance: true,
                links:  { 
                    select: {
                        id: true,
                        title: true,
                        url: true,
                        clicks: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            }
        })

        if (!user) {
            throw new Error(`Usuário não encontrado.`)
        }

        return user
    }

    async findAll() {
        return await prisma.user.findMany()
    }

    async create(userData: userData) {

        const { id, name, bio, email, username, password, avatarUrl } = userData

        if (!name || !email || !username || !password) {
            throw new Error("Os campos nome, nome de usuário, e-mail e senha são obrigatórios.")
        }

        const emailAlreadyExists = await prisma.user.findUnique({ where: { email } })
        if (emailAlreadyExists) {
            throw new Error("Já existe um usuário cadastrado com este e-mail.")
        }
        
        const user = await prisma.user.create({
            data: {
                id,
                name,
                bio,
                email,
                username,
                password,
                avatarUrl,
            },
            include: {
                appearance: true
            }
        })

        return user
    }

    async update(userId: number, updateData: { name?: string; bio?: string; avatarUrl?: string }) {
        const userExists = await prisma.user.findUnique({ where: { id: userId } })
        if (!userExists) {
            throw new Error("Usuário não encontrado.")
        }

        if(updateData.name === userExists.name ) {
            throw new Error(`Você já está usando o nome "${updateData.name}".`)
        }
        
        if(updateData.bio === userExists.bio) {
            throw new Error(`Você já está usando a bio "${updateData.bio}"`)
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: updateData.name,
                bio: updateData.bio,
                avatarUrl: updateData.avatarUrl
            },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                avatarUrl: true,
                links: true,
                appearance: true
            }
        })

        return updatedUser
    }

    async changePassword(userId: number, currentPassword: string, newPassword: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if(!user) {
            throw new Error("Usuário não encontrado.")
        }   
        
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
        if(!isPasswordValid) {
            throw new Error("A senha atual não confere.")
        }

        if(!newPassword) {
            throw new Error("A nova senha não pode ficar vazia.")
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10)

        await prisma.user.update({
            where: { id: userId },
            data: { password: newHashedPassword }
        })
    }

    async delete(userId: number) {
        const userExists = await prisma.user.findUnique({ where: { id: userId } })
        if (!userExists) {
            throw new Error("Usuário não encontrado.")
        }

        await prisma.user.delete({ where: { id: userId } })
        return
    }
}

export default new UserService()