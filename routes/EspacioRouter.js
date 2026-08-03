import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

import {
  getEspacios,
  getEspacio,
  createEspacio,
  updateEspacio,
  deleteEspacio,
} from "../controllers/EspacioController.js";

const router = Router();

router.get("/espacios", getEspacios);

router.get("/espacios/:id", getEspacio);

router.post("/espacios", authMiddleware, adminMiddleware, createEspacio);

router.put("/espacios/:id", authMiddleware, adminMiddleware, updateEspacio);

router.delete("/espacios/:id", authMiddleware, adminMiddleware, deleteEspacio);

export default router;