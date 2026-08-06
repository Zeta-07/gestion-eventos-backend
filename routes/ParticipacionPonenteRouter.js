import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOrganizadorMiddleware } from "../middlewares/adminOrganizadorMiddleware.js";

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

router.post("/participacion-ponentes", authMiddleware, adminOrganizadorMiddleware, createParticipacionPonente);

router.put("/participacion-ponentes/:id", authMiddleware, adminOrganizadorMiddleware, updateParticipacionPonente);

router.delete("/participacion-ponentes/:id", authMiddleware, adminOrganizadorMiddleware, deleteParticipacionPonente);

export default router;