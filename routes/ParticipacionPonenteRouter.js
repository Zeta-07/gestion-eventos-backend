import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

import {
  getParticipacionesPonentes,
  getParticipacionPonente,
  createParticipacionPonente,
  updateParticipacionPonente,
  deleteParticipacionPonente,
} from "../controllers/ParticipacionPonenteController.js";

const router = Router();

router.get("/participacion-ponentes", getParticipacionesPonentes);

router.get("/participacion-ponentes/:id", getParticipacionPonente);

router.post("/participacion-ponentes", authMiddleware, adminMiddleware, createParticipacionPonente);

router.put("/participacion-ponentes/:id", authMiddleware, adminMiddleware, updateParticipacionPonente);

router.delete("/participacion-ponentes/:id", authMiddleware, adminMiddleware, deleteParticipacionPonente);

export default router;