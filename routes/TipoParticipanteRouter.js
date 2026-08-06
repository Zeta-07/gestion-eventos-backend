import { Router } from "express";

import { getTiposParticipante } from "../controllers/TipoParticipanteController.js";

const router = Router();

// Pública: no requiere autenticación
router.get("/tipos-participante", getTiposParticipante);

export default router;
