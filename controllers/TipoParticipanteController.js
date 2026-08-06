import { TipoParticipanteModel } from "../models/TipoParticipanteModel.js";

// Pública: devuelve todos los tipos de participante disponibles para el registro
export const getTiposParticipante = async (req, res) => {
  try {
    const tipos = await TipoParticipanteModel.findAll({
      attributes: ["id_tipo_participante", "nombre"],
    });

    return res.status(200).json(tipos);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener los tipos de participante",
      detalle: error.message,
    });
  }
};
