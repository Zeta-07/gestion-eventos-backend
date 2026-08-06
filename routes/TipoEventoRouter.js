import { Router } from "express";

import { getTiposEvento } from "../controllers/TipoEventoController.js";

const router = Router();

// Pública: no requiere autenticación
router.get("/tipos-evento", getTiposEvento);

export default router;
