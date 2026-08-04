import { Op } from "sequelize";

import { InscripcionModel } from "../models/InscripcionModel.js";
import { EventoModel } from "../models/EventoModel.js";
import { ParticipanteModel } from "../models/ParticipanteModel.js";
import { EstadoInscripcionModel } from "../models/EstadoInscripcionModel.js";

// Reglas de negocio compartidas entre el panel de administración y el
// autoservicio de participantes:
//   1. El evento debe existir.
//   2. El participante debe existir.
//   3. El estado de inscripción debe existir.
//   4. El participante no puede inscribirse dos veces en el mismo evento.
//   5. No se puede superar el cupo máximo de inscripciones confirmadas.
//
// Retorna null si la inscripción es válida, o { error } con el mensaje.
// Si se pasa id_inscripcionExcluida, esa inscripción se ignora en las
// validaciones de duplicado y cupo (necesario al actualizar).
export const validarInscripcion = async ({
  id_evento,
  id_participante,
  id_estado_inscripcion,
  id_inscripcionExcluida = null,
}) => {
  const evento = await EventoModel.findByPk(id_evento);

  if (!evento) {
    return { error: "El evento indicado no existe" };
  }

  const participante = await ParticipanteModel.findByPk(id_participante);

  if (!participante) {
    return { error: "El participante indicado no existe" };
  }

  const estadoInscripcion = await EstadoInscripcionModel.findByPk(
    id_estado_inscripcion
  );

  if (!estadoInscripcion) {
    return { error: "El estado de inscripción indicado no existe" };
  }

  // Regla de negocio: un participante no puede inscribirse dos veces en el mismo evento
  const whereDuplicado = { id_evento, id_participante };

  if (id_inscripcionExcluida) {
    whereDuplicado.id_inscripcion = { [Op.ne]: id_inscripcionExcluida };
  }

  const inscripcionExistente = await InscripcionModel.findOne({
    where: whereDuplicado,
  });

  if (inscripcionExistente) {
    return { error: "El participante ya está inscrito en este evento" };
  }

  // Regla de negocio: no superar el cupo máximo de inscripciones confirmadas
  if (estadoInscripcion.nombre === "Confirmada") {
    const whereConfirmadas = { id_evento, id_estado_inscripcion };

    if (id_inscripcionExcluida) {
      whereConfirmadas.id_inscripcion = { [Op.ne]: id_inscripcionExcluida };
    }

    const confirmadas = await InscripcionModel.count({
      where: whereConfirmadas,
    });

    if (confirmadas >= evento.capacidad_maxima) {
      return {
        error: "Se alcanzó el cupo máximo de inscripciones confirmadas para este evento",
      };
    }
  }

  return null;
};
