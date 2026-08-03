import { Router } from "express";

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

router.post("/participacion-ponentes", createParticipacionPonente);

router.put("/participacion-ponentes/:id", updateParticipacionPonente);

router.delete("/participacion-ponentes/:id", deleteParticipacionPonente);

export default router;
