import { EstadoInscripcionModel } from "../models/EstadoInscripcionModel.js";

export const estadoInscripcionSeed = async () => {
  try {
    const estados = ["Pendiente", "Confirmada", "Cancelada"];

    for (const nombre of estados) {
      await EstadoInscripcionModel.findOrCreate({
        where: { nombre },
      });
    }

    console.log("✔ Estados de inscripción cargados correctamente.");
  } catch (error) {
    console.error("Error al cargar estados de inscripción:", error);
  }
};
