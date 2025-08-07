import express, { Application } from "express";
import morgan from "morgan";
import routes from "../src/routes"
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors"

class App {
    public app: Application

    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.errorHandler()
    }
    
    private middlewares(): void {
        this.app.use(cors())
        this.app.use(morgan('combined'))
        this.app.use(express.json())
    }

    private routes(): void {
        this.app.use(routes)
    }

    private errorHandler(): void {
        this.app.use(errorHandler)
    }
     
}

export default new App().app