import { TipoEventoModel } from "../models/TipoEventoModel.js";

export const tipoEventoSeed = async () => {
  try {

    const tipos = [
      "Académico",
      "Cultural",
      "Deportivo",
    ];

    for (const nombre of tipos) {

      await TipoEventoModel.findOrCreate({
        where: { nombre },
      });

    }

    console.log("✔ Tipos de evento cargados correctamente.");

  } catch (error) {

    console.error("Error al cargar tipos de evento:", error);

  }
};