import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

import {
  getEventos,
  getEvento,
  createEvento,
  updateEvento,
  deleteEvento,
} from "../controllers/EventoController.js";

const router = Router();

router.get("/eventos", getEventos);
router.get("/eventos/:id", getEvento);
router.post("/eventos", authMiddleware, adminMiddleware, createEvento);
router.put("/eventos/:id", authMiddleware, adminMiddleware, updateEvento);
router.delete("/eventos/:id", authMiddleware, adminMiddleware, deleteEvento);

export default router;