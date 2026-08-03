import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

import {
  getOrganizadores,
  getOrganizador,
  createOrganizador,
  updateOrganizador,
  deleteOrganizador,
} from "../controllers/OrganizadorController.js";

const router = Router();

router.get("/organizadores", getOrganizadores);
router.get("/organizadores/:id", getOrganizador);
router.post("/organizadores", authMiddleware, adminMiddleware, createOrganizador);
router.put("/organizadores/:id", authMiddleware, adminMiddleware, updateOrganizador);
router.delete("/organizadores/:id", authMiddleware, adminMiddleware, deleteOrganizador);

export default router;