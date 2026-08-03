import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/config.js";

// Verifica el token JWT enviado en el header Authorization: Bearer <token>
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Token no proporcionado",
      });
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, JWT_SECRET);

    req.usuario = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido o expirado",
    });
  }
};
