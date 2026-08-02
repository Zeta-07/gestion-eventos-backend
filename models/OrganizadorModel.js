import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const OrganizadorModel = sequelize.define(
  "organizadores",
  {
    id_organizador: {
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

    cargo: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);