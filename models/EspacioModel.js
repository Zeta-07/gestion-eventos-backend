import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const EspacioModel = sequelize.define(
  "espacios",
  {
    id_espacio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    codigo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    edificio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    ubicacion: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_estado_espacio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);