import { OrganizadorModel } from "../models/OrganizadorModel.js";

// Obtener todos los organizadores
export const getOrganizadores = async (req, res) => {
  try {
    const organizadores = await OrganizadorModel.findAll();

    return res.status(200).json(organizadores);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener los organizadores",
      detalle: error.message,
    });
  }
};

// Obtener organizador por ID
export const getOrganizador = async (req, res) => {
  try {
    const { id } = req.params;

    const organizador = await OrganizadorModel.findByPk(id);

    if (!organizador) {
      return res.status(404).json({
        error: "Organizador no encontrado",
      });
    }

    return res.status(200).json(organizador);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener el organizador",
      detalle: error.message,
    });
  }
};

// Crear organizador
export const createOrganizador = async (req, res) => {
  try {
    const {
      identificacion,
      nombres,
      apellidos,
      correo,
      telefono,
      cargo,
    } = req.body;

    if (
      !identificacion ||
      !nombres ||
      !apellidos ||
      !correo ||
      !cargo
    ) {
      return res.status(400).json({
        error: "Faltan datos obligatorios",
      });
    }

    const organizador = await OrganizadorModel.create({
      identificacion,
      nombres,
      apellidos,
      correo,
      telefono,
      cargo,
    });

    return res.status(201).json(organizador);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear el organizador",
      detalle: error.message,
    });
  }
};

// Actualizar organizador
export const updateOrganizador = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      identificacion,
      nombres,
      apellidos,
      correo,
      telefono,
      cargo,
    } = req.body;

    const organizador = await OrganizadorModel.findByPk(id);

    if (!organizador) {
      return res.status(404).json({
        error: "Organizador no encontrado",
      });
    }

    await organizador.update({
      identificacion,
      nombres,
      apellidos,
      correo,
      telefono,
      cargo,
    });

    return res.status(200).json(organizador);
  } catch (error) {
    return res.status(500).json({
      error: "Error al actualizar el organizador",
      detalle: error.message,
    });
  }
};

// Eliminar organizador
export const deleteOrganizador = async (req, res) => {
  try {
    const { id } = req.params;

    const organizador = await OrganizadorModel.findByPk(id);

    if (!organizador) {
      return res.status(404).json({
        error: "Organizador no encontrado",
      });
    }

    await organizador.destroy();

    return res.status(200).json({
      info: "Organizador eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar el organizador",
      detalle: error.message,
    });
  }
};