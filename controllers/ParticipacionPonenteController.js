import { ParticipacionPonenteModel } from "../models/ParticipacionPonenteModel.js";
import { EventoModel } from "../models/EventoModel.js";
import { PonenteModel } from "../models/PonenteModel.js";

// Obtener todas las participaciones de ponentes
export const getParticipacionesPonentes = async (req, res) => {
  try {
    const participaciones = await ParticipacionPonenteModel.findAll();
    return res.status(200).json(participaciones);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener las participaciones de ponentes",
      detalle: error.message,
    });
  }
};

// Obtener una participación por ID
export const getParticipacionPonente = async (req, res) => {
  try {
    const { id } = req.params;

    const participacion = await ParticipacionPonenteModel.findByPk(id);

    if (!participacion) {
      return res.status(404).json({
        error: "Participación de ponente no encontrada",
      });
    }

    return res.status(200).json(participacion);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener la participación de ponente",
      detalle: error.message,
    });
  }
};

// Crear una participación de ponente
export const createParticipacionPonente = async (req, res) => {
  try {
    const { tema_presentacion, hora_inicio, duracion, id_evento, id_ponente } = req.body;

    if (!tema_presentacion || !hora_inicio || !duracion || !id_evento || !id_ponente) {
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

    const ponente = await PonenteModel.findByPk(id_ponente);

    if (!ponente) {
      return res.status(400).json({
        error: "El ponente indicado no existe",
      });
    }

    // Nota: un mismo ponente puede tener varias presentaciones en el mismo evento,
    // por lo que aquí no se valida unicidad evento-ponente (decisión del equipo).

    const participacion = await ParticipacionPonenteModel.create({
      tema_presentacion,
      hora_inicio,
      duracion,
      id_evento,
      id_ponente,
    });

    return res.status(201).json(participacion);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear la participación de ponente",
      detalle: error.message,
    });
  }
};

// Actualizar una participación de ponente
export const updateParticipacionPonente = async (req, res) => {
  try {
    const { id } = req.params;

    const { tema_presentacion, hora_inicio, duracion, id_evento, id_ponente } = req.body;

    const participacion = await ParticipacionPonenteModel.findByPk(id);

    if (!participacion) {
      return res.status(404).json({
        error: "Participación de ponente no encontrada",
      });
    }

    const evento = await EventoModel.findByPk(id_evento);

    if (!evento) {
      return res.status(400).json({
        error: "El evento indicado no existe",
      });
    }

    const ponente = await PonenteModel.findByPk(id_ponente);

    if (!ponente) {
      return res.status(400).json({
        error: "El ponente indicado no existe",
      });
    }

    await participacion.update({
      tema_presentacion,
      hora_inicio,
      duracion,
      id_evento,
      id_ponente,
    });

    return res.status(200).json(participacion);
  } catch (error) {
    return res.status(500).json({
      error: "Error al actualizar la participación de ponente",
      detalle: error.message,
    });
  }
};

// Eliminar una participación de ponente
export const deleteParticipacionPonente = async (req, res) => {
  try {
    const { id } = req.params;

    const participacion = await ParticipacionPonenteModel.findByPk(id);

    if (!participacion) {
      return res.status(404).json({
        error: "Participación de ponente no encontrada",
      });
    }

    await participacion.destroy();

    return res.status(200).json({
      info: "Participación de ponente eliminada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar la participación de ponente",
      detalle: error.message,
    });
  }
};
