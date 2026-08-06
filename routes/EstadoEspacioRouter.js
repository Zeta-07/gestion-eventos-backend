import { Router } from "express";

import { getEstadosEspacio } from "../controllers/EstadoEspacioController.js";

const router = Router();

// Pública: no requiere autenticación
router.get("/estados-espacio", getEstadosEspacio);

export default router;
