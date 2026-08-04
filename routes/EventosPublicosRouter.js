import { Router } from "express";

import { getEventosPublicos } from "../controllers/EventosPublicosController.js";

const router = Router();

// Pública: no requiere autenticación
router.get("/eventos-publicos", getEventosPublicos);

export default router;
