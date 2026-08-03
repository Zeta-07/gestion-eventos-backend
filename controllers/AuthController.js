import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UsuarioModel } from "../models/UsuarioModel.js";
import { JWT_SECRET } from "../config/config.js";

// Iniciar sesión: valida credenciales y devuelve un token JWT
export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({
        error: "Faltan datos obligatorios",
      });
    }

    const usuario = await UsuarioModel.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(401).json({
        error: "Correo o contraseña incorrectos",
      });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      return res.status(401).json({
        error: "Correo o contraseña incorrectos",
      });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al iniciar sesión",
      detalle: error.message,
    });
  }
};

// Registrar un nuevo usuario (queda protegido: solo un administrador autenticado puede crear otros usuarios)
export const registrar = async (req, res) => {
  try {
    const { nombres, apellidos, correo, password, rol } = req.body;

    if (!nombres || !apellidos || !correo || !password) {
      return res.status(400).json({
        error: "Faltan datos obligatorios",
      });
    }

    const existente = await UsuarioModel.findOne({ where: { correo } });

    if (existente) {
      return res.status(400).json({
        error: "Ya existe un usuario registrado con ese correo",
      });
    }

    const passwordHasheado = await bcrypt.hash(password, 10);

    const usuario = await UsuarioModel.create({
      nombres,
      apellidos,
      correo,
      password: passwordHasheado,
      rol: rol || "administrador",
    });

    return res.status(201).json({
      id_usuario: usuario.id_usuario,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      rol: usuario.rol,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al registrar el usuario",
      detalle: error.message,
    });
  }
};
