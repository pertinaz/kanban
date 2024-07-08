import express from "express";

import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../controllers/profileController";
import authMiddleware from "../middlewares/authMiddleware";
import validateRequest from "../middlewares/validateRequest";

const profileRouter = express.Router();

profileRouter.use(authMiddleware);

profileRouter.get("/profile", getUserProfile);
profileRouter.put("/profile", validateRequest, updateUserProfile);
profileRouter.delete("/profile", deleteUserAccount);

export default profileRouter;
