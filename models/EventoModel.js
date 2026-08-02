import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const EventoModel = sequelize.define(
  "eventos",
  {
    id_evento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    codigo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    capacidad_maxima: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_espacio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_organizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_tipo_evento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_estado_evento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
