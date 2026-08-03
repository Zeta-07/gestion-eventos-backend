import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const UsuarioModel = sequelize.define(
  "usuarios",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    rol: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "administrador",
    },
  },
  {
    timestamps: false,
  }
);
