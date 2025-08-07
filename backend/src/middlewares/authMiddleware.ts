import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next:NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({ message: "Acesso negado. Nenhum token fornecido." })
    }

    const parts = authHeader.split(" ")

    if(parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Token mal formatado." })
    }

    const token = parts[1]

    try {
        const jwtSecret = process.env.JWT_SECRET
        if(!jwtSecret) {
            throw new Error("Segredo JWT não configurado no servidor.")
        }
        
        const decodedPayload = jwt.verify(token, jwtSecret)
        
        if (typeof decodedPayload === 'object' && decodedPayload !== null && 'userId' in decodedPayload) {
            
            req.user = {
                userId: Number(decodedPayload.userId),
                plan: String(decodedPayload.plan)
            };

            return next();
        } else {
            throw new Error('Payload do token é inválido.');
        }

    } catch (err) {
        return res.status(401).json({ message: "Token inválido ou expirado." })
    }
}