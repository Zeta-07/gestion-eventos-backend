import { Router } from "express";

import {
  getPonentes,
  getPonente,
  createPonente,
  updatePonente,
  deletePonente,
} from "../controllers/PonenteController.js";

const router = Router();

router.get("/ponentes", getPonentes);

router.get("/ponentes/:id", getPonente);

router.post("/ponentes", createPonente);

router.put("/ponentes/:id", updatePonente);

router.delete("/ponentes/:id", deletePonente);

export default router;