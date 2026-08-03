import { Router } from "express";

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

router.post("/participantes", createParticipante);

router.put("/participantes/:id", updateParticipante);

router.delete("/participantes/:id", deleteParticipante);

export default router;
