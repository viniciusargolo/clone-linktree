import { Router } from "express";
import UserController from "../controllers/userController";

const userRouter = Router()

userRouter.put("/me/change-plan", UserController.updatePlan)
userRouter.delete("/me/avatar", UserController.updateAvatar)
userRouter.put("/me/change-password", UserController.updatePassword)
userRouter.get("/me", UserController.getProfile)
userRouter.put("/me", UserController.update)
userRouter.delete("/me", UserController.delete)

export default userRouter