import { Router } from "express";

import { getEstadosEvento } from "../controllers/EstadoEventoController.js";

const router = Router();

// Pública: no requiere autenticación
router.get("/estados-evento", getEstadosEvento);

export default router;
