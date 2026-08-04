import { EventoModel } from "../models/EventoModel.js";
import { CategoriaModel } from "../models/CategoriaModel.js";
import { EspacioModel } from "../models/EspacioModel.js";
import { OrganizadorModel } from "../models/OrganizadorModel.js";
import { TipoEventoModel } from "../models/TipoEventoModel.js";
import { EstadoEventoModel } from "../models/EstadoEventoModel.js";

// Pública: devuelve únicamente los eventos con estado "Abierto".
// El ID del estado se obtiene por nombre para no hardcodear valores numéricos.
export const getEventosPublicos = async (req, res) => {
  try {
    const estadoAbierto = await EstadoEventoModel.findOne({
      where: { nombre: "Abierto" },
    });

    if (!estadoAbierto) {
      return res.status(404).json({
        error: "No se encontró el estado de evento Abierto",
      });
    }

    const eventos = await EventoModel.findAll({
      where: { id_estado_evento: estadoAbierto.id_estado_evento },
      include: [
        CategoriaModel,
        EspacioModel,
        OrganizadorModel,
        TipoEventoModel,
        EstadoEventoModel,
      ],
    });

    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener los eventos",
      detalle: error.message,
    });
  }
};
