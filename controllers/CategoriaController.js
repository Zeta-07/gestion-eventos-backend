import { CategoriaModel } from "../models/CategoriaModel.js";
import { EventoModel } from "../models/EventoModel.js";

// Obtener todas las categorías
export const getCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaModel.findAll();
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener las categorías",
      detalle: error.message,
    });
  }
};

// Obtener una categoría por ID
export const getCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await CategoriaModel.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        error: "Categoría no encontrada",
      });
    }

    return res.status(200).json(categoria);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener la categoría",
      detalle: error.message,
    });
  }
};

// Crear categoría
export const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({
        error: "Faltan datos obligatorios",
      });
    }

    const categoria = await CategoriaModel.create({
      nombre,
      descripcion,
    });

    return res.status(201).json(categoria);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear la categoría",
      detalle: error.message,
    });
  }
};

// Actualizar categoría
export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const { nombre, descripcion } = req.body;

    const categoria = await CategoriaModel.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        error: "Categoría no encontrada",
      });
    }

    await categoria.update({
      nombre,
      descripcion,
    });

    return res.status(200).json(categoria);
  } catch (error) {
    return res.status(500).json({
      error: "Error al actualizar la categoría",
      detalle: error.message,
    });
  }
};

// Eliminar categoría
export const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await CategoriaModel.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        error: "Categoría no encontrada",
      });
    }

    const eventosRelacionados = await EventoModel.count({
      where: { id_categoria: id },
    });

    if (eventosRelacionados > 0) {
      return res.status(409).json({
        error: "No se puede eliminar la categoría porque existen eventos asociados.",
      });
    }

    await categoria.destroy();

    return res.status(200).json({
      info: "Categoría eliminada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar la categoría",
      detalle: error.message,
    });
  }
};