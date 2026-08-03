import bcrypt from "bcryptjs";

import { UsuarioModel } from "../models/UsuarioModel.js";

// Crea un usuario administrador por defecto si todavía no existe ninguno.
// Cambien la contraseña apenas puedan iniciar sesión con ella.
export const usuarioSeed = async () => {
  try {
    const correoAdmin = "admin@espam.edu.ec";

    const existente = await UsuarioModel.findOne({
      where: { correo: correoAdmin },
    });

    if (!existente) {
      const passwordHasheado = await bcrypt.hash("Admin123!", 10);

      await UsuarioModel.create({
        nombres: "Administrador",
        apellidos: "Sistema",
        correo: correoAdmin,
        password: passwordHasheado,
        rol: "administrador",
      });
    }

    console.log("✔ Usuario administrador verificado.");
  } catch (error) {
    console.error("Error al cargar el usuario administrador:", error);
  }
};
