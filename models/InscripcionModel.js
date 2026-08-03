import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const InscripcionModel = sequelize.define(
  "inscripciones",
  {
    id_inscripcion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    fecha_inscripcion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    asistencia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    id_evento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_participante: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_estado_inscripcion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
