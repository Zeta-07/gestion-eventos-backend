import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

import {
  getParticipantes,
  getParticipante,
  createParticipante,
  updateParticipante,
  deleteParticipante,
} from "../controllers/ParticipanteController.js";

const router = Router();

router.get("/participantes", getParticipantes);

router.get("/participantes/:id", getParticipante);

router.post("/participantes", authMiddleware, adminMiddleware, createParticipante);

router.put("/participantes/:id", authMiddleware, adminMiddleware, updateParticipante);

router.delete("/participantes/:id", authMiddleware, adminMiddleware, deleteParticipante);

export default router;