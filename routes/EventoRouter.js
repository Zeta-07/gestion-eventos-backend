import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOrganizadorMiddleware } from "../middlewares/adminOrganizadorMiddleware.js";

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
router.post("/eventos", authMiddleware, adminOrganizadorMiddleware, createEvento);
router.put("/eventos/:id", authMiddleware, adminOrganizadorMiddleware, updateEvento);
router.delete("/eventos/:id", authMiddleware, adminOrganizadorMiddleware, deleteEvento);

export default router;