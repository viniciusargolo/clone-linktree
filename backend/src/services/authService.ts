import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type { userCredentials, userData } from "../utils/userTypes";


const prisma = new PrismaClient()

class AuthService {

    async register(userData: userData) {
        const { name, username, email, password } = userData

        if (!name || !username || !email || !password) {
            throw new Error("Os campos nome, nome de usuário, email e senha são obrigatórios.")
        }

        const userExists = await prisma.user.findFirst(
            { 
                where: {
                    OR: [
                        { email },
                        { username }
                    ]
                }
            }
        )
        if (userExists) {
            if (userExists.email === email) {
                throw new Error("E-mail já está sendo utilizado.")
            } else {
                throw new Error("Nome de usuário não está disponível.")
            }
        }
        
        const hashPass = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                username,
                password: hashPass
            }
        })
        const { password: _, ...userWithoutPassword} = newUser
        return userWithoutPassword
    }

    async login(credentials: { emailOrUsername: string; password: string }) {
        const { emailOrUsername, password } = credentials


        if (!credentials) {
            throw new Error("Você precisa preencher os campos.")
        }

        const userRegistered = await prisma.user.findFirst({ 
            where: {
                OR: [
                    { email: { contains: emailOrUsername }},
                    { username: { contains: emailOrUsername }}
                ]
            } 
    })
        if (!userRegistered) {
            throw new Error("Credenciais inválidas.")
        }

        const isPasswordValid = await bcrypt.compare(password, userRegistered.password)
        if (!isPasswordValid) {
            throw new Error("Credenciais inválidas.")
        }

        const jwt_secret = process.env.JWT_SECRET
        if (!jwt_secret) {
            throw new Error("FATAL ERROR: JWT_SECRET não foi definido no .env!")
        }

        const token = jwt.sign(
            { userId: userRegistered.id, email: userRegistered.email, username: userRegistered.username },
            jwt_secret,
            { expiresIn: "1h" }
        )
        const { password: _, ...userWithoutPassword} = userRegistered
        return { user: userWithoutPassword, token }
    }
}

export default new AuthService()