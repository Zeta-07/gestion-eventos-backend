import { Router } from "express";

import { login, registrar, registrarParticipante } from "../controllers/AuthController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = Router();

router.post("/auth/login", login);

// Pública: registro autoservicio de participantes
router.post("/auth/registro-participante", registrarParticipante);

// Protegida: solo un administrador autenticado puede crear nuevos usuarios
router.post("/auth/registrar", authMiddleware, adminMiddleware, registrar);

export default router;