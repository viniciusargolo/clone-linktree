import { Router } from "express";
import UserController from "../controllers/userController";

const userRouter = Router()

userRouter.get("/me", UserController.getProfile)
userRouter.put("/me", UserController.update)
userRouter.put("/me/change-password", UserController.updatePassword)
userRouter.delete("/me", UserController.delete)

export default userRouter