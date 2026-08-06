import { Router } from "express";

import { getEstadosInscripcion } from "../controllers/EstadoInscripcionController.js";

const router = Router();

// Pública: no requiere autenticación
router.get("/estados-inscripcion", getEstadosInscripcion);

export default router;
