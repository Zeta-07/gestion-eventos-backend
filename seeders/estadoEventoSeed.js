import { EstadoEventoModel } from "../models/EstadoEventoModel.js";

export const estadoEventoSeed = async () => {
  try {
    const cantidad = await EstadoEventoModel.count();

    if (cantidad === 0) {
      await EstadoEventoModel.bulkCreate([
        { nombre: "Planificado" },
        { nombre: "Abierto" },
        { nombre: "Finalizado" },
        { nombre: "Cancelado" },
      ]);

      console.log("✔ Estados de evento cargados.");
    } else {
      console.log("✔ Estados de evento ya existen.");
    }
  } catch (error) {
    console.error("Error al cargar estados de evento:", error);
  }
};