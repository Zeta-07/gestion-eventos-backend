import { EstadoEventoModel } from "../models/EstadoEventoModel.js";

export const estadoEventoSeed = async () => {
  try {

    const estados = [
      "Planificado",
      "Abierto",
      "Finalizado",
      "Cancelado",
    ];

    for (const nombre of estados) {

      await EstadoEventoModel.findOrCreate({
        where: { nombre },
      });

    }

    console.log("✔ Estados de evento cargados correctamente.");

  } catch (error) {

    console.error("Error al cargar estados de evento:", error);

  }
};