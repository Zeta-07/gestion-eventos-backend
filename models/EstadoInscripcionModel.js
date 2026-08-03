import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const EstadoInscripcionModel = sequelize.define(
  "estados_inscripcion",
  {
    id_estado_inscripcion: {
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
