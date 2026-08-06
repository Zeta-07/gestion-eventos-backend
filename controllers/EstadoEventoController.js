import { EstadoEventoModel } from "../models/EstadoEventoModel.js";

// Pública: devuelve todos los estados de evento disponibles
export const getEstadosEvento = async (req, res) => {
  try {
    const estados = await EstadoEventoModel.findAll({
      attributes: ["id_estado_evento", "nombre"],
    });

    return res.status(200).json(estados);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener los estados de evento",
      detalle: error.message,
    });
  }
};
