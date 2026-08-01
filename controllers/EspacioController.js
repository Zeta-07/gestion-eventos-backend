import { EspacioModel } from "../models/EspacioModel.js";


export const getEspacios = async (req, res) => {
  try {
    const espacios = await EspacioModel.findAll();

    res.status(200).json(espacios);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los espacios",
      error: error.message,
    });
  }
};

export const getEspacio = async (req, res) => {
  try {
    const { id } = req.params;

    const espacio = await EspacioModel.findByPk(id);

    if (!espacio) {
      return res.status(404).json({
        mensaje: "Espacio no encontrado",
      });
    }

    res.status(200).json(espacio);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el espacio",
      error: error.message,
    });
  }
};

export const createEspacio = async (req, res) => {
  try {
    const espacio = await EspacioModel.create(req.body);

    res.status(201).json({
      mensaje: "Espacio creado correctamente",
      espacio,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el espacio",
      error: error.message,
    });
  }
};


export const updateEspacio = async (req, res) => {
  try {
    const { id } = req.params;

    const espacio = await EspacioModel.findByPk(id);

    if (!espacio) {
      return res.status(404).json({
        mensaje: "Espacio no encontrado",
      });
    }

    await espacio.update(req.body);

    res.status(200).json({
      mensaje: "Espacio actualizado correctamente",
      espacio,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el espacio",
      error: error.message,
    });
  }
};


export const deleteEspacio = async (req, res) => {
  try {
    const { id } = req.params;

    const espacio = await EspacioModel.findByPk(id);

    if (!espacio) {
      return res.status(404).json({
        mensaje: "Espacio no encontrado",
      });
    }

    await espacio.destroy();

    res.status(200).json({
      mensaje: "Espacio eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el espacio",
      error: error.message,
    });
  }
};