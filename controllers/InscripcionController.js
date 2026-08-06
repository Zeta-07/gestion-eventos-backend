import { InscripcionModel } from "../models/InscripcionModel.js";
import { EventoModel } from "../models/EventoModel.js";
import { ParticipanteModel } from "../models/ParticipanteModel.js";
import { EstadoInscripcionModel } from "../models/EstadoInscripcionModel.js";
import { validarInscripcion } from "../helpers/inscripcionValidacion.js";

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

    // Los organizadores solo pueden inscribir sobre sus propios eventos
    if (req.usuario.rol === "organizador") {
      const evento = await EventoModel.findByPk(id_evento);

      if (!evento || evento.id_organizador !== req.usuario.id_organizador) {
        return res.status(403).json({
          error: "No puedes modificar eventos de otro organizador",
        });
      }
    }

    const errorValidacion = await validarInscripcion({
      id_evento,
      id_participante,
      id_estado_inscripcion,
    });

    if (errorValidacion) {
      return res.status(400).json(errorValidacion);
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

    // Los organizadores solo pueden modificar inscripciones de sus propios eventos
    if (req.usuario.rol === "organizador") {
      const evento = await EventoModel.findByPk(inscripcion.id_evento);

      if (!evento || evento.id_organizador !== req.usuario.id_organizador) {
        return res.status(403).json({
          error: "No puedes modificar eventos de otro organizador",
        });
      }

      // Si el body cambia el evento, el nuevo también debe pertenecerle
      if (id_evento && id_evento !== inscripcion.id_evento) {
        const eventoNuevo = await EventoModel.findByPk(id_evento);

        if (
          !eventoNuevo ||
          eventoNuevo.id_organizador !== req.usuario.id_organizador
        ) {
          return res.status(403).json({
            error: "No puedes modificar eventos de otro organizador",
          });
        }
      }
    }

    const errorValidacion = await validarInscripcion({
      id_evento,
      id_participante,
      id_estado_inscripcion,
      id_inscripcionExcluida: id,
    });

    if (errorValidacion) {
      return res.status(400).json(errorValidacion);
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

    // Los organizadores solo pueden eliminar inscripciones de sus propios eventos
    if (req.usuario.rol === "organizador") {
      const evento = await EventoModel.findByPk(inscripcion.id_evento);

      if (!evento || evento.id_organizador !== req.usuario.id_organizador) {
        return res.status(403).json({
          error: "No puedes modificar eventos de otro organizador",
        });
      }
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
