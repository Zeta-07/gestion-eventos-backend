import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

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

router.post("/ponentes", authMiddleware, adminMiddleware, createPonente);

router.put("/ponentes/:id", authMiddleware, adminMiddleware, updatePonente);

router.delete("/ponentes/:id", authMiddleware, adminMiddleware, deletePonente);

export default router;