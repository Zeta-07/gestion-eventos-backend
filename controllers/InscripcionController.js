import { Op } from "sequelize";

import { InscripcionModel } from "../models/InscripcionModel.js";
import { EventoModel } from "../models/EventoModel.js";
import { ParticipanteModel } from "../models/ParticipanteModel.js";
import { EstadoInscripcionModel } from "../models/EstadoInscripcionModel.js";

// Obtener todas las inscripciones
export const getInscripciones = async (req, res) => {
  try {
    const inscripciones = await InscripcionModel.findAll({
      include: [EventoModel, ParticipanteModel, EstadoInscripcionModel],
    });
    return res.status(200).json(inscripciones);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener las inscripciones",
      detalle: error.message,
    });
  }
};

// Obtener una inscripción por ID
export const getInscripcion = async (req, res) => {
  try {
    const { id } = req.params;

    const inscripcion = await InscripcionModel.findByPk(id, {
      include: [EventoModel, ParticipanteModel, EstadoInscripcionModel],
    });

    if (!inscripcion) {
      return res.status(404).json({
        error: "Inscripción no encontrada",
      });
    }

    return res.status(200).json(inscripcion);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener la inscripción",
      detalle: error.message,
    });
  }
};

// Crear una inscripción
export const createInscripcion = async (req, res) => {
  try {
    const { fecha_inscripcion, asistencia, id_evento, id_participante, id_estado_inscripcion } =
      req.body;

    if (!fecha_inscripcion || !id_evento || !id_participante || !id_estado_inscripcion) {
      return res.status(400).json({
        error: "Faltan datos obligatorios",
      });
    }

    const evento = await EventoModel.findByPk(id_evento);

    if (!evento) {
      return res.status(400).json({
        error: "El evento indicado no existe",
      });
    }

    const participante = await ParticipanteModel.findByPk(id_participante);

    if (!participante) {
      return res.status(400).json({
        error: "El participante indicado no existe",
      });
    }

    const estadoInscripcion = await EstadoInscripcionModel.findByPk(id_estado_inscripcion);

    if (!estadoInscripcion) {
      return res.status(400).json({
        error: "El estado de inscripción indicado no existe",
      });
    }

    // Regla de negocio: un participante no puede inscribirse dos veces en el mismo evento
    const inscripcionExistente = await InscripcionModel.findOne({
      where: { id_evento, id_participante },
    });

    if (inscripcionExistente) {
      return res.status(400).json({
        error: "El participante ya está inscrito en este evento",
      });
    }

    // Regla de negocio: no superar el cupo máximo de inscripciones confirmadas
    if (estadoInscripcion.nombre === "Confirmada") {
      const confirmadas = await InscripcionModel.count({
        where: { id_evento, id_estado_inscripcion },
      });

      if (confirmadas >= evento.capacidad_maxima) {
        return res.status(400).json({
          error: "Se alcanzó el cupo máximo de inscripciones confirmadas para este evento",
        });
      }
    }

    const inscripcion = await InscripcionModel.create({
      fecha_inscripcion,
      asistencia,
      id_evento,
      id_participante,
      id_estado_inscripcion,
    });

    return res.status(201).json(inscripcion);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear la inscripción",
      detalle: error.message,
    });
  }
};

// Actualizar una inscripción
export const updateInscripcion = async (req, res) => {
  try {
    const { id } = req.params;

    const { fecha_inscripcion, asistencia, id_evento, id_participante, id_estado_inscripcion } =
      req.body;

    const inscripcion = await InscripcionModel.findByPk(id);

    if (!inscripcion) {
      return res.status(404).json({
        error: "Inscripción no encontrada",
      });
    }

    const evento = await EventoModel.findByPk(id_evento);

    if (!evento) {
      return res.status(400).json({
        error: "El evento indicado no existe",
      });
    }

    const participante = await ParticipanteModel.findByPk(id_participante);

    if (!participante) {
      return res.status(400).json({
        error: "El participante indicado no existe",
      });
    }

    const estadoInscripcion = await EstadoInscripcionModel.findByPk(id_estado_inscripcion);

    if (!estadoInscripcion) {
      return res.status(400).json({
        error: "El estado de inscripción indicado no existe",
      });
    }

    // Regla de negocio: no puede existir otra inscripción del mismo participante en el mismo evento
    const inscripcionExistente = await InscripcionModel.findOne({
      where: {
        id_evento,
        id_participante,
        id_inscripcion: { [Op.ne]: id },
      },
    });

    if (inscripcionExistente) {
      return res.status(400).json({
        error: "El participante ya está inscrito en este evento",
      });
    }

    // Regla de negocio: no superar el cupo máximo de inscripciones confirmadas
    if (estadoInscripcion.nombre === "Confirmada") {
      const confirmadas = await InscripcionModel.count({
        where: {
          id_evento,
          id_estado_inscripcion,
          id_inscripcion: { [Op.ne]: id },
        },
      });

      if (confirmadas >= evento.capacidad_maxima) {
        return res.status(400).json({
          error: "Se alcanzó el cupo máximo de inscripciones confirmadas para este evento",
        });
      }
    }

    await inscripcion.update({
      fecha_inscripcion,
      asistencia,
      id_evento,
      id_participante,
      id_estado_inscripcion,
    });

    return res.status(200).json(inscripcion);
  } catch (error) {
    return res.status(500).json({
      error: "Error al actualizar la inscripción",
      detalle: error.message,
    });
  }
};

// Eliminar una inscripción
export const deleteInscripcion = async (req, res) => {
  try {
    const { id } = req.params;

    const inscripcion = await InscripcionModel.findByPk(id);

    if (!inscripcion) {
      return res.status(404).json({
        error: "Inscripción no encontrada",
      });
    }

    await inscripcion.destroy();

    return res.status(200).json({
      info: "Inscripción eliminada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar la inscripción",
      detalle: error.message,
    });
  }
};
