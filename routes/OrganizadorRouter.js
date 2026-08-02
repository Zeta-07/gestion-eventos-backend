import { Router } from "express";

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
router.post("/organizadores", createOrganizador);
router.put("/organizadores/:id", updateOrganizador);
router.delete("/organizadores/:id", deleteOrganizador);

export default router;