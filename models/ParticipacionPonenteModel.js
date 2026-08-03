import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const ParticipacionPonenteModel = sequelize.define(
  "participacion_ponentes",
  {
    id_participacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    tema_presentacion: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    duracion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_evento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_ponente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
