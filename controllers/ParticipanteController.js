import { ParticipanteModel } from "../models/ParticipanteModel.js";
import { TipoParticipanteModel } from "../models/TipoParticipanteModel.js";

// Obtener todos los participantes
export const getParticipantes = async (req, res) => {
  try {
    const participantes = await ParticipanteModel.findAll({
      include: [TipoParticipanteModel],
    });
    return res.status(200).json(participantes);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener los participantes",
      detalle: error.message,
    });
  }
};

// Obtener un participante por ID
export const getParticipante = async (req, res) => {
  try {
    const { id } = req.params;

    const participante = await ParticipanteModel.findByPk(id, {
      include: [TipoParticipanteModel],
    });

    if (!participante) {
      return res.status(404).json({
        error: "Participante no encontrado",
      });
    }

    return res.status(200).json(participante);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener el participante",
      detalle: error.message,
    });
  }
};

// Crear un participante
export const createParticipante = async (req, res) => {
  try {
    const {
      identificacion,
      nombres,
      apellidos,
      correo,
      telefono,
      id_tipo_participante,
    } = req.body;

    if (
      !identificacion ||
      !nombres ||
      !apellidos ||
      !correo ||
      !id_tipo_participante
    ) {
      return res.status(400).json({
        error: "Faltan datos obligatorios",
      });
    }

    const tipoParticipante = await TipoParticipanteModel.findByPk(
      id_tipo_participante
    );

    if (!tipoParticipante) {
      return res.status(400).json({
        error: "El tipo de participante indicado no existe",
      });
    }

    const participante = await ParticipanteModel.create({
      identificacion,
      nombres,
      apellidos,
      correo,
      telefono,
      id_tipo_participante,
    });

    return res.status(201).json(participante);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear el participante",
      detalle: error.message,
    });
  }
};

// Actualizar un participante
export const updateParticipante = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      identificacion,
      nombres,
      apellidos,
      correo,
      telefono,
      id_tipo_participante,
    } = req.body;

    const participante = await ParticipanteModel.findByPk(id);

    if (!participante) {
      return res.status(404).json({
        error: "Participante no encontrado",
      });
    }

    if (id_tipo_participante) {
      const tipoParticipante = await TipoParticipanteModel.findByPk(
        id_tipo_participante
      );

      if (!tipoParticipante) {
        return res.status(400).json({
          error: "El tipo de participante indicado no existe",
        });
      }
    }

    await participante.update({
      identificacion,
      nombres,
      apellidos,
      correo,
      telefono,
      id_tipo_participante,
    });

    return res.status(200).json(participante);
  } catch (error) {
    return res.status(500).json({
      error: "Error al actualizar el participante",
      detalle: error.message,
    });
  }
};

// Eliminar un participante
export const deleteParticipante = async (req, res) => {
  try {
    const { id } = req.params;

    const participante = await ParticipanteModel.findByPk(id);

    if (!participante) {
      return res.status(404).json({
        error: "Participante no encontrado",
      });
    }

    await participante.destroy();

    return res.status(200).json({
      info: "Participante eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar el participante",
      detalle: error.message,
    });
  }
};
