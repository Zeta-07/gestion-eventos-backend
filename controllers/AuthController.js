import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UsuarioModel } from "../models/UsuarioModel.js";
import { ParticipanteModel } from "../models/ParticipanteModel.js";
import { OrganizadorModel } from "../models/OrganizadorModel.js";
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

    // Si el usuario es organizador, se incluye su id_organizador en el JWT
    // (solo si tiene un organizador vinculado a su cuenta de login)
    let id_organizador = null;

    if (usuario.rol === "organizador") {
      const organizador = await OrganizadorModel.findOne({
        where: { id_usuario: usuario.id_usuario },
      });

      id_organizador = organizador ? organizador.id_organizador : null;
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        correo: usuario.correo,
        rol: usuario.rol,
        ...(id_participante ? { id_participante } : {}),
        ...(id_organizador ? { id_organizador } : {}),
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
        ...(id_organizador ? { id_organizador } : {}),
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

    let usuario;

    if (rol === "organizador") {
      // El organizador debe existir previamente (creado desde el módulo de
      // Organizadores): aquí solo se crea la cuenta de login y se vincula.
      const resultado = await sequelize.transaction(async (t) => {
        const organizador = await OrganizadorModel.findOne({
          where: { correo },
          transaction: t,
        });

        if (!organizador) {
          return {
            error:
              "No existe un organizador registrado con ese correo. Créalo primero desde el módulo de Organizadores.",
          };
        }

        if (organizador.id_usuario !== null) {
          return { error: "Ese organizador ya tiene una cuenta vinculada." };
        }

        const usuarioNuevo = await UsuarioModel.create(
          {
            nombres,
            apellidos,
            correo,
            password: passwordHasheado,
            rol,
          },
          { transaction: t }
        );

        organizador.id_usuario = usuarioNuevo.id_usuario;
        await organizador.save({ transaction: t });

        return { usuario: usuarioNuevo };
      });

      if (resultado.error) {
        return res.status(400).json({
          error: resultado.error,
        });
      }

      usuario = resultado.usuario;
    } else {
      usuario = await UsuarioModel.create({
        nombres,
        apellidos,
        correo,
        password: passwordHasheado,
        rol: rol || "administrador",
      });
    }

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
    const {
      identificacion,
      nombres,
      apellidos,
      correo,
      telefono,
      password,
      id_tipo_participante,
    } = req.body;

    if (
      !identificacion ||
      !nombres ||
      !apellidos ||
      !correo ||
      !password ||
      !id_tipo_participante
    ) {
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

      if (participanteExistente && participanteExistente.id_usuario !== null) {
        return { error: "Ya existe un participante registrado con ese correo" };
      }

      const tipoParticipante = await TipoParticipanteModel.findByPk(
        id_tipo_participante,
        { transaction: t }
      );

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

      // Si el admin ya creó el participante (sin cuenta de login), no se crea uno
      // nuevo: solo se vincula el id_usuario creado, conservando los datos oficiales.
      let participante;

      if (participanteExistente) {
        participante = participanteExistente;
        participante.id_usuario = usuario.id_usuario;
        await participante.save({ transaction: t });
      } else {
        participante = await ParticipanteModel.create(
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
      }

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
