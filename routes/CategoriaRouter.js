import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

import {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../controllers/CategoriaController.js";

const router = Router();

router.get("/categorias", getCategorias);
router.get("/categorias/:id", getCategoria);
router.post("/categorias", authMiddleware, adminMiddleware, createCategoria);
router.put("/categorias/:id", authMiddleware, adminMiddleware, updateCategoria);
router.delete("/categorias/:id", authMiddleware, adminMiddleware, deleteCategoria);

export default router;