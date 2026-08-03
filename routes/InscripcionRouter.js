import { Router } from "express";

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

router.post("/inscripciones", createInscripcion);

router.put("/inscripciones/:id", updateInscripcion);

router.delete("/inscripciones/:id", deleteInscripcion);

export default router;
