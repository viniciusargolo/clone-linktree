import { Router } from "express";
import AppearanceController from "../controllers/appearanceController";


const appearanceRouter = Router()

appearanceRouter.get("/me", AppearanceController.getTheme)
appearanceRouter.post("/me", AppearanceController.setTheme)
appearanceRouter.put("/:id", AppearanceController.updateTheme)

export default appearanceRouter