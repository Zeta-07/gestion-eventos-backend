import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const CategoriaModel = sequelize.define(
  "categorias",
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);