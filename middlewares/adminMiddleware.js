// Debe usarse siempre DESPUÉS de authMiddleware, ya que depende de req.usuario
// (el payload del token) para conocer el rol del usuario autenticado.
export const adminMiddleware = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== "administrador") {
    return res.status(403).json({
      error: "No tienes permisos para realizar esta acción",
    });
  }

  next();
};
