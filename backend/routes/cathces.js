import express from "express";
import { authUser } from "../middlewares/authUser.js";
import {
  getUserInfo,
  updateProfile,
  updatePassword,
} from "../controllers/catchesController.js";
const catchesRouter = express.Router();

//Authenticated routes----------------
//Profile routes-----------
catchesRouter.get("/info", authUser, getUserInfo);

//update profile
catchesRouter.post("/update-profile", authUser, updateProfile);

//update password
catchesRouter.post("/update-password", authUser, updatePassword);

export default userRouter;
