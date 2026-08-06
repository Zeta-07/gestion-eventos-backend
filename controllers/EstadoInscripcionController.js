import { EstadoInscripcionModel } from "../models/EstadoInscripcionModel.js";

// Pública: devuelve todos los estados de inscripción disponibles
export const getEstadosInscripcion = async (req, res) => {
  try {
    const estados = await EstadoInscripcionModel.findAll({
      attributes: ["id_estado_inscripcion", "nombre"],
    });

    return res.status(200).json(estados);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener los estados de inscripción",
      detalle: error.message,
    });
  }
};
