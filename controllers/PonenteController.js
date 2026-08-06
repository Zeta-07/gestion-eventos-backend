import { PonenteModel } from "../models/PonenteModel.js";
import { ParticipacionPonenteModel } from "../models/ParticipacionPonenteModel.js";

// Obtener todos los ponentes
export const getPonentes = async (req, res) => {
  try {
    const ponentes = await PonenteModel.findAll();
    return res.status(200).json(ponentes);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener los ponentes",
      detalle: error.message,
    });
  }
};

// Obtener un ponente por ID
export const getPonente = async (req, res) => {
  try {
    const { id } = req.params;

    const ponente = await PonenteModel.findByPk(id);

    if (!ponente) {
      return res.status(404).json({
        error: "Ponente no encontrado",
      });
    }

    return res.status(200).json(ponente);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener el ponente",
      detalle: error.message,
    });
  }
};

// Crear un nuevo ponente
export const createPonente = async (req, res) => {
  try {
    const {
      identificacion,
      nombres,
      apellidos,
      correo,
      institucion,
      especialidad,
    } = req.body;

    if (
      !identificacion ||
      !nombres ||
      !apellidos ||
      !correo ||
      !institucion ||
      !especialidad
    ) {
      return res.status(400).json({
        error: "Faltan datos obligatorios",
      });
    }

    const ponente = await PonenteModel.create({
      identificacion,
      nombres,
      apellidos,
      correo,
      institucion,
      especialidad,
    });

    return res.status(201).json(ponente);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear el ponente",
      detalle: error.message,
    });
  }
};

// Actualizar un ponente
export const updatePonente = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      identificacion,
      nombres,
      apellidos,
      correo,
      institucion,
      especialidad,
    } = req.body;

    const ponente = await PonenteModel.findByPk(id);

    if (!ponente) {
      return res.status(404).json({
        error: "Ponente no encontrado",
      });
    }

    await ponente.update({
      identificacion,
      nombres,
      apellidos,
      correo,
      institucion,
      especialidad,
    });

    return res.status(200).json(ponente);
  } catch (error) {
    return res.status(500).json({
      error: "Error al actualizar el ponente",
      detalle: error.message,
    });
  }
};

// Eliminar un ponente
export const deletePonente = async (req, res) => {
  try {
    const { id } = req.params;

    const ponente = await PonenteModel.findByPk(id);

    if (!ponente) {
      return res.status(404).json({
        error: "Ponente no encontrado",
      });
    }

    const participacionesRelacionadas = await ParticipacionPonenteModel.count({
      where: { id_ponente: id },
    });

    if (participacionesRelacionadas > 0) {
      return res.status(409).json({
        error: "No se puede eliminar el ponente porque existen participaciones de ponente asociadas.",
      });
    }

    await ponente.destroy();

    return res.status(200).json({
      info: "Ponente eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar el ponente",
      detalle: error.message,
    });
  }
};