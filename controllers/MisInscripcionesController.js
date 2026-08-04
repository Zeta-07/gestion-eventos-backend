import { InscripcionModel } from "../models/InscripcionModel.js";
import { EventoModel } from "../models/EventoModel.js";
import { EstadoInscripcionModel } from "../models/EstadoInscripcionModel.js";
import { validarInscripcion } from "../helpers/inscripcionValidacion.js";

// Autoservicio: inscribirse en un evento. El id_participante NUNCA se lee del
// body: se obtiene del JWT (req.usuario.id_participante) puesto por authMiddleware.
export const crearMiInscripcion = async (req, res) => {
  try {
    const id_participante = req.usuario.id_participante;
    const { id_evento } = req.body;

    if (!id_evento) {
      return res.status(400).json({
        error: "Faltan datos obligatorios",
      });
    }

    // En autoservicio la inscripción queda Confirmada al momento de inscribirse
    const estadoConfirmada = await EstadoInscripcionModel.findOne({
      where: { nombre: "Confirmada" },
    });

    if (!estadoConfirmada) {
      return res.status(400).json({
        error: "El estado de inscripción indicado no existe",
      });
    }

    // Mismas reglas de negocio que usa el panel de administración:
    // existencia del evento, inscripción duplicada y cupo máximo
    const errorValidacion = await validarInscripcion({
      id_evento,
      id_participante,
      id_estado_inscripcion: estadoConfirmada.id_estado_inscripcion,
    });

    if (errorValidacion) {
      return res.status(400).json(errorValidacion);
    }

    const inscripcion = await InscripcionModel.create({
      fecha_inscripcion: new Date().toISOString().slice(0, 10),
      asistencia: false,
      id_evento,
      id_participante,
      id_estado_inscripcion: estadoConfirmada.id_estado_inscripcion,
    });

    return res.status(201).json(inscripcion);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear la inscripción",
      detalle: error.message,
    });
  }
};

// Autoservicio: consultar SOLO las inscripciones del participante autenticado
export const getMisInscripciones = async (req, res) => {
  try {
    const inscripciones = await InscripcionModel.findAll({
      where: { id_participante: req.usuario.id_participante },
      include: [EventoModel, EstadoInscripcionModel],
    });

    return res.status(200).json(inscripciones);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener las inscripciones",
      detalle: error.message,
    });
  }
};

// Autoservicio: cancelar una inscripción propia.
// Si la inscripción existe pero NO pertenece al participante autenticado,
// responde 404 para no revelar su existencia.
export const deleteMiInscripcion = async (req, res) => {
  try {
    const { id } = req.params;

    const inscripcion = await InscripcionModel.findOne({
      where: {
        id_inscripcion: id,
        id_participante: req.usuario.id_participante,
      },
    });

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
