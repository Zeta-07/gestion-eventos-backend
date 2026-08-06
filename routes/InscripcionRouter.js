import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOrganizadorMiddleware } from "../middlewares/adminOrganizadorMiddleware.js";

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

router.post("/inscripciones", authMiddleware, adminOrganizadorMiddleware, createInscripcion);

router.put("/inscripciones/:id", authMiddleware, adminOrganizadorMiddleware, updateInscripcion);

router.delete("/inscripciones/:id", authMiddleware, adminOrganizadorMiddleware, deleteInscripcion);

export default router;