import { Router } from "express";
import linkController from "../controllers/linkController";

const linkRouter = Router()
 
linkRouter.get("/", linkController.findAll)
linkRouter.post("/", linkController.create)
linkRouter.put("/:id", linkController.update)
linkRouter.delete("/:id", linkController.delete)


export default linkRouter