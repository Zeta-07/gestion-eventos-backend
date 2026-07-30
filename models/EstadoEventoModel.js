import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const EstadoEventoModel = sequelize.define(
  "estados_evento",
  {
    id_estado_evento: {
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