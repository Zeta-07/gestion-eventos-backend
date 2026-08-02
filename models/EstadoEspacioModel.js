import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const EstadoEspacioModel = sequelize.define(
  "estados_espacio",
  {
    id_estado_espacio: {
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