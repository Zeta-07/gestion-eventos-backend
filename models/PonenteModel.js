import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const PonenteModel = sequelize.define(
  "ponentes",
  {
    id_ponente: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
    institucion: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    especialidad: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);