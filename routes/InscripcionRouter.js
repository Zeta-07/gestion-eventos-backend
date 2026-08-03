import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

import {
  getInscripciones,
  getInscripcion,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion,
} from "../controllers/InscripcionController.js";

const router = Router();

router.get("/inscripciones", getInscripciones);

router.get("/inscripciones/:id", getInscripcion);

router.post("/inscripciones", authMiddleware, adminMiddleware, createInscripcion);

router.put("/inscripciones/:id", authMiddleware, adminMiddleware, updateInscripcion);

router.delete("/inscripciones/:id", authMiddleware, adminMiddleware, deleteInscripcion);

export default router;