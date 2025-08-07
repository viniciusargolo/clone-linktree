import { Router } from "express";
import publicProfileController from "../controllers/publicProfileController";


const publicRouter = Router()

publicRouter.get("/:username", publicProfileController.getProfile)

export default publicRouter