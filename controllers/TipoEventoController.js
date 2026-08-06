import { TipoEventoModel } from "../models/TipoEventoModel.js";

// Pública: devuelve todos los tipos de evento disponibles
export const getTiposEvento = async (req, res) => {
  try {
    const tipos = await TipoEventoModel.findAll({
      attributes: ["id_tipo_evento", "nombre"],
    });

    return res.status(200).json(tipos);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener los tipos de evento",
      detalle: error.message,
    });
  }
};
