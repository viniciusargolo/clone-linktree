import { Request, Response, NextFunction } from "express";
import publicProfileService from "../services/publicProfileService";

class PublicProfileController {
    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.params

            const userProfile =  await publicProfileService.getProfileByUsername(String(username))
            return res.status(200).json(userProfile)
        } catch (error) {
            next(error)
        }
    }
}
export default new PublicProfileController()