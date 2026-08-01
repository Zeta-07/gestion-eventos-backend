import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const TipoEventoModel = sequelize.define(
  "tipos_evento",
  {
    id_tipo_evento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);