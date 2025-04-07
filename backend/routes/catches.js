// routes/catchesRouter.ts
import express from "express";
import { authUser } from "../middlewares/authUser.js";
import {
  getAllCatches,
  getMyCatches,
  addCatch,
  deleteCatch,
} from "../controllers/catchesController.js";

const catchesRouter = express.Router();

// Get alla fångster (för progress/top 3/historik)
catchesRouter.get("/", getAllCatches);

// Mina fångster (kräver inloggning)
catchesRouter.get("/me", authUser, getMyCatches);

// Lägg till en ny fångst
catchesRouter.post("/", authUser, addCatch);

// Ta bort en fångst
catchesRouter.delete("/:id", authUser, deleteCatch);

export default catchesRouter;
