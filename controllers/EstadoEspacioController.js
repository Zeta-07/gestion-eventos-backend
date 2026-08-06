import { EstadoEspacioModel } from "../models/EstadoEspacioModel.js";

// Pública: devuelve todos los estados de espacio disponibles
export const getEstadosEspacio = async (req, res) => {
  try {
    const estados = await EstadoEspacioModel.findAll({
      attributes: ["id_estado_espacio", "nombre"],
    });

    return res.status(200).json(estados);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener los estados de espacio",
      detalle: error.message,
    });
  }
};
