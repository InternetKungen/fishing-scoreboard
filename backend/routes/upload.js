import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import { authUser } from "../middlewares/authUser.js";
import { isAuthAdmin } from "../middlewares/isAuthAdmin.js";

const uploadRouter = express.Router();

// Image upload route
uploadRouter.post("/image", authUser, isAuthAdmin, uploadImage);

export default uploadRouter;
