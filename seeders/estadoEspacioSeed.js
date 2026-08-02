import { EstadoEspacioModel } from "../models/EstadoEspacioModel.js";

export const estadoEspacioSeed = async () => {
  try {
    const estados = [
      "Disponible",
      "Ocupado",
      "Mantenimiento",
    ];

    for (const nombre of estados) {
      await EstadoEspacioModel.findOrCreate({
        where: { nombre },
      });
    }

    console.log("✔ Estados de espacio cargados correctamente.");
  } catch (error) {
    console.error("Error al cargar estados de espacio:", error);
  }
};