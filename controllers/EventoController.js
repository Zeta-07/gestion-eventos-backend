import { EventoModel } from "../models/EventoModel.js";
import { CategoriaModel } from "../models/CategoriaModel.js";
import { EspacioModel } from "../models/EspacioModel.js";
import { OrganizadorModel } from "../models/OrganizadorModel.js";
import { TipoEventoModel } from "../models/TipoEventoModel.js";
import { EstadoEventoModel } from "../models/EstadoEventoModel.js";

// Verifica que todas las FKs referenciadas por un evento existan
const validarReferencias = async ({
  id_categoria,
  id_espacio,
  id_organizador,
  id_tipo_evento,
  id_estado_evento,
}) => {
  const [categoria, espacio, organizador, tipoEvento, estadoEvento] =
    await Promise.all([
      CategoriaModel.findByPk(id_categoria),
      EspacioModel.findByPk(id_espacio),
      OrganizadorModel.findByPk(id_organizador),
      TipoEventoModel.findByPk(id_tipo_evento),
      EstadoEventoModel.findByPk(id_estado_evento),
    ]);

  if (!categoria) return "La categoría indicada no existe";
  if (!espacio) return "El espacio indicado no existe";
  if (!organizador) return "El organizador indicado no existe";
  if (!tipoEvento) return "El tipo de evento indicado no existe";
  if (!estadoEvento) return "El estado de evento indicado no existe";

  return null;
};

// Obtener todos los eventos
export const getEventos = async (req, res) => {
  try {
    const eventos = await EventoModel.findAll({
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

// Obtener un evento por ID
export const getEvento = async (req, res) => {
  try {
    const { id } = req.params;

    const evento = await EventoModel.findByPk(id, {
      include: [
        CategoriaModel,
        EspacioModel,
        OrganizadorModel,
        TipoEventoModel,
        EstadoEventoModel,
      ],
    });

    if (!evento) {
      return res.status(404).json({
        error: "Evento no encontrado",
      });
    }

    return res.status(200).json(evento);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener el evento",
      detalle: error.message,
    });
  }
};

// Crear un evento
export const createEvento = async (req, res) => {
  try {
    const {
      codigo,
      nombre,
      descripcion,
      fecha,
      hora_inicio,
      hora_fin,
      capacidad_maxima,
      id_categoria,
      id_espacio,
      id_organizador,
      id_tipo_evento,
      id_estado_evento,
    } = req.body;

    if (
      !codigo ||
      !nombre ||
      !fecha ||
      !hora_inicio ||
      !hora_fin ||
      !capacidad_maxima ||
      !id_categoria ||
      !id_espacio ||
      !id_organizador ||
      !id_tipo_evento ||
      !id_estado_evento
    ) {
      return res.status(400).json({
        error: "Faltan datos obligatorios",
      });
    }

    const errorReferencia = await validarReferencias({
      id_categoria,
      id_espacio,
      id_organizador,
      id_tipo_evento,
      id_estado_evento,
    });

    if (errorReferencia) {
      return res.status(400).json({
        error: errorReferencia,
      });
    }

    const evento = await EventoModel.create({
      codigo,
      nombre,
      descripcion,
      fecha,
      hora_inicio,
      hora_fin,
      capacidad_maxima,
      id_categoria,
      id_espacio,
      id_organizador,
      id_tipo_evento,
      id_estado_evento,
    });

    return res.status(201).json(evento);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear el evento",
      detalle: error.message,
    });
  }
};

// Actualizar un evento
export const updateEvento = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      codigo,
      nombre,
      descripcion,
      fecha,
      hora_inicio,
      hora_fin,
      capacidad_maxima,
      id_categoria,
      id_espacio,
      id_organizador,
      id_tipo_evento,
      id_estado_evento,
    } = req.body;

    const evento = await EventoModel.findByPk(id);

    if (!evento) {
      return res.status(404).json({
        error: "Evento no encontrado",
      });
    }

    const errorReferencia = await validarReferencias({
      id_categoria,
      id_espacio,
      id_organizador,
      id_tipo_evento,
      id_estado_evento,
    });

    if (errorReferencia) {
      return res.status(400).json({
        error: errorReferencia,
      });
    }

    await evento.update({
      codigo,
      nombre,
      descripcion,
      fecha,
      hora_inicio,
      hora_fin,
      capacidad_maxima,
      id_categoria,
      id_espacio,
      id_organizador,
      id_tipo_evento,
      id_estado_evento,
    });

    return res.status(200).json(evento);
  } catch (error) {
    return res.status(500).json({
      error: "Error al actualizar el evento",
      detalle: error.message,
    });
  }
};

// Eliminar un evento
export const deleteEvento = async (req, res) => {
  try {
    const { id } = req.params;

    const evento = await EventoModel.findByPk(id);

    if (!evento) {
      return res.status(404).json({
        error: "Evento no encontrado",
      });
    }

    await evento.destroy();

    return res.status(200).json({
      info: "Evento eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar el evento",
      detalle: error.message,
    });
  }
};
