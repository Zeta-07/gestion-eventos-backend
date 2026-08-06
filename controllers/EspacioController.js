import { EspacioModel } from "../models/EspacioModel.js";
import { EstadoEspacioModel } from "../models/EstadoEspacioModel.js";
import { EventoModel } from "../models/EventoModel.js";

// Obtener todos los espacios
export const getEspacios = async (req, res) => {
  try {
    const espacios = await EspacioModel.findAll({
      include: [EstadoEspacioModel],
    });
    return res.status(200).json(espacios);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener los espacios",
      detalle: error.message,
    });
  }
};

// Obtener un espacio por ID
export const getEspacio = async (req, res) => {
  try {
    const { id } = req.params;

    const espacio = await EspacioModel.findByPk(id, {
      include: [EstadoEspacioModel],
    });

    if (!espacio) {
      return res.status(404).json({
        error: "Espacio no encontrado",
      });
    }

    return res.status(200).json(espacio);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener el espacio",
      detalle: error.message,
    });
  }
};

// Crear un espacio
export const createEspacio = async (req, res) => {
  try {
    const {
      codigo,
      nombre,
      edificio,
      ubicacion,
      capacidad,
      id_estado_espacio,
    } = req.body;

    if (
      !codigo ||
      !nombre ||
      !edificio ||
      !ubicacion ||
      !capacidad ||
      !id_estado_espacio
    ) {
      return res.status(400).json({
        error: "Faltan datos obligatorios",
      });
    }

    const estadoEspacio = await EstadoEspacioModel.findByPk(id_estado_espacio);

    if (!estadoEspacio) {
      return res.status(400).json({
        error: "El estado de espacio indicado no existe",
      });
    }

    const espacio = await EspacioModel.create({
      codigo,
      nombre,
      edificio,
      ubicacion,
      capacidad,
      id_estado_espacio,
    });

    return res.status(201).json(espacio);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear el espacio",
      detalle: error.message,
    });
  }
};

// Actualizar un espacio
export const updateEspacio = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      codigo,
      nombre,
      edificio,
      ubicacion,
      capacidad,
      id_estado_espacio,
    } = req.body;

    const espacio = await EspacioModel.findByPk(id);

    if (!espacio) {
      return res.status(404).json({
        error: "Espacio no encontrado",
      });
    }

    if (id_estado_espacio) {
      const estadoEspacio = await EstadoEspacioModel.findByPk(id_estado_espacio);

      if (!estadoEspacio) {
        return res.status(400).json({
          error: "El estado de espacio indicado no existe",
        });
      }
    }

    await espacio.update({
      codigo,
      nombre,
      edificio,
      ubicacion,
      capacidad,
      id_estado_espacio,
    });

    return res.status(200).json(espacio);
  } catch (error) {
    return res.status(500).json({
      error: "Error al actualizar el espacio",
      detalle: error.message,
    });
  }
};

// Eliminar un espacio
export const deleteEspacio = async (req, res) => {
  try {
    const { id } = req.params;

    const espacio = await EspacioModel.findByPk(id);

    if (!espacio) {
      return res.status(404).json({
        error: "Espacio no encontrado",
      });
    }

    const eventosRelacionados = await EventoModel.count({
      where: { id_espacio: id },
    });

    if (eventosRelacionados > 0) {
      return res.status(409).json({
        error: "No se puede eliminar el espacio porque existen eventos asociados.",
      });
    }

    await espacio.destroy();

    return res.status(200).json({
      info: "Espacio eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar el espacio",
      detalle: error.message,
    });
  }
};