import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { participanteMiddleware } from "../middlewares/participanteMiddleware.js";

import {
  crearMiInscripcion,
  getMisInscripciones,
  deleteMiInscripcion,
} from "../controllers/MisInscripcionesController.js";

const router = Router();

router.post("/mis-inscripciones", authMiddleware, participanteMiddleware, crearMiInscripcion);

router.get("/mis-inscripciones", authMiddleware, participanteMiddleware, getMisInscripciones);

router.delete("/mis-inscripciones/:id", authMiddleware, participanteMiddleware, deleteMiInscripcion);

export default router;
