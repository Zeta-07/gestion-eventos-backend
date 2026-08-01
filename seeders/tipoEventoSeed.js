import { TipoEventoModel } from "../models/TipoEventoModel.js";

export const tipoEventoSeed = async () => {
  try {
    const cantidad = await TipoEventoModel.count();

    if (cantidad === 0) {
      await TipoEventoModel.bulkCreate([
        { nombre: "Académico" },
        { nombre: "Cultural" },
        { nombre: "Deportivo" },
      ]);

      console.log("✔ Tipos de evento cargados.");
    } else {
      console.log("✔ Tipos de evento ya existen.");
    }
  } catch (error) {
    console.error("Error al cargar tipos de evento:", error);
  }
};