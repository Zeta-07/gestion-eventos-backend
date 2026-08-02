import { Router } from "express";

import {
  getEspacios,
  getEspacio,
  createEspacio,
  updateEspacio,
  deleteEspacio,
} from "../controllers/EspacioController.js";

const router = Router();

router.get("/espacios", getEspacios);

router.get("/espacios/:id", getEspacio);

router.post("/espacios", createEspacio);

router.put("/espacios/:id", updateEspacio);

router.delete("/espacios/:id", deleteEspacio);

export default router;