import { Router } from "express"
import userRouter from "./user.routes"
import authRouter from "./auth.routes"
import linkRouter from "./link.routes"
import { authMiddleware } from "../middlewares/authMiddleware"
import publicRouter from "./public.routes"
import appearanceRouter from "./appearance.routes"

const routes = Router()

routes.use("/auth", authRouter)

routes.use("/manage/profile", authMiddleware, userRouter)
routes.use("/manage/links", authMiddleware, linkRouter)
routes.use("/manage/appearance", authMiddleware, appearanceRouter)

routes.use("/", publicRouter)

export default routes