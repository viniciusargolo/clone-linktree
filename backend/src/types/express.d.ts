declare namespace Express {
    export interface Request {
        user?: {
            userId: String,
            plan: string
        }
    }

}