import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const ParticipanteModel = sequelize.define(
  "participantes",
  {
    id_participante: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    identificacion: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    correo: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },

    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    id_tipo_participante: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);
