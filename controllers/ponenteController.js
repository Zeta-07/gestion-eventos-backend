import { PonenteModel } from "../models/PonenteModel.js";

// Obtener todos los ponentes
export const getPonentes = async (req, res) => {
  try {
    const ponentes = await PonenteModel.findAll();

    res.status(200).json(ponentes);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los ponentes",
      error: error.message,
    });
  }
};

// Obtener un ponente por ID
export const getPonente = async (req, res) => {
  try {
    const { id } = req.params;

    const ponente = await PonenteModel.findByPk(id);

    if (!ponente) {
      return res.status(404).json({
        mensaje: "Ponente no encontrado",
      });
    }

    res.status(200).json(ponente);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el ponente",
      error: error.message,
    });
  }
};

// Crear un nuevo ponente
export const createPonente = async (req, res) => {
  try {
    const ponente = await PonenteModel.create(req.body);

    res.status(201).json({
      mensaje: "Ponente creado correctamente",
      ponente,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el ponente",
      error: error.message,
    });
  }
};

// Actualizar un ponente
export const updatePonente = async (req, res) => {
  try {
    const { id } = req.params;

    const ponente = await PonenteModel.findByPk(id);

    if (!ponente) {
      return res.status(404).json({
        mensaje: "Ponente no encontrado",
      });
    }

    await ponente.update(req.body);

    res.status(200).json({
      mensaje: "Ponente actualizado correctamente",
      ponente,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el ponente",
      error: error.message,
    });
  }
};

// Eliminar un ponente
export const deletePonente = async (req, res) => {
  try {
    const { id } = req.params;

    const ponente = await PonenteModel.findByPk(id);

    if (!ponente) {
      return res.status(404).json({
        mensaje: "Ponente no encontrado",
      });
    }

    await ponente.destroy();

    res.status(200).json({
      mensaje: "Ponente eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el ponente",
      error: error.message,
    });
  }
};