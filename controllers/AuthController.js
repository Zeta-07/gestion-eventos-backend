import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UsuarioModel } from "../models/UsuarioModel.js";
import { ParticipanteModel } from "../models/ParticipanteModel.js";
import { TipoParticipanteModel } from "../models/TipoParticipanteModel.js";
import { JWT_SECRET } from "../config/config.js";
import { sequelize } from "../db/conexion.js";

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

    // Si el usuario es participante, se incluye su id_participante en el JWT
    // (solo si tiene un participante vinculado a su cuenta de login)
    let id_participante = null;

    if (usuario.rol === "participante") {
      const participante = await ParticipanteModel.findOne({
        where: { id_usuario: usuario.id_usuario },
      });

      id_participante = participante ? participante.id_participante : null;
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        correo: usuario.correo,
        rol: usuario.rol,
        ...(id_participante ? { id_participante } : {}),
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
        ...(id_participante ? { id_participante } : {}),
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

// Registro público de participantes: crea la cuenta de login (rol "participante")
// y el participante dentro de UNA misma transacción. Si algo falla, hace rollback.
export const registrarParticipante = async (req, res) => {
  try {
    const { identificacion, nombres, apellidos, correo, telefono, password } = req.body;

    if (!identificacion || !nombres || !apellidos || !correo || !password) {
      return res.status(400).json({
        error: "Faltan datos obligatorios",
      });
    }

    const resultado = await sequelize.transaction(async (t) => {
      // Validaciones de correo dentro de la transacción, antes de crear nada
      const usuarioExistente = await UsuarioModel.findOne({
        where: { correo },
        transaction: t,
      });

      if (usuarioExistente) {
        return { error: "Ya existe un usuario registrado con ese correo" };
      }

      const participanteExistente = await ParticipanteModel.findOne({
        where: { correo },
        transaction: t,
      });

      if (participanteExistente) {
        return { error: "Ya existe un participante registrado con ese correo" };
      }

      const tipoParticipante = await TipoParticipanteModel.findOne({
        where: { nombre: "Estudiante" },
        transaction: t,
      });

      if (!tipoParticipante) {
        return { error: "El tipo de participante indicado no existe" };
      }

      const passwordHasheado = await bcrypt.hash(password, 10);

      const usuario = await UsuarioModel.create(
        {
          nombres,
          apellidos,
          correo,
          password: passwordHasheado,
          rol: "participante",
        },
        { transaction: t }
      );

      const participante = await ParticipanteModel.create(
        {
          identificacion,
          nombres,
          apellidos,
          correo,
          telefono,
          id_tipo_participante: tipoParticipante.id_tipo_participante,
          id_usuario: usuario.id_usuario,
        },
        { transaction: t }
      );

      return { usuario, participante };
    });

    if (resultado.error) {
      return res.status(400).json({
        error: resultado.error,
      });
    }

    return res.status(201).json({
      id_usuario: resultado.usuario.id_usuario,
      id_participante: resultado.participante.id_participante,
      nombres: resultado.usuario.nombres,
      apellidos: resultado.usuario.apellidos,
      correo: resultado.usuario.correo,
      rol: resultado.usuario.rol,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al registrar el participante",
      detalle: error.message,
    });
  }
};
