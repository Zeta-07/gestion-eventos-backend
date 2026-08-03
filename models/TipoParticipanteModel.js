import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const TipoParticipanteModel = sequelize.define(
  "tipos_participante",
  {
    id_tipo_participante: {
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
