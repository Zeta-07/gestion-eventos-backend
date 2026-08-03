import { TipoParticipanteModel } from "../models/TipoParticipanteModel.js";

export const tipoParticipanteSeed = async () => {
  try {
    const tipos = ["Estudiante", "Docente", "Empleado"];

    for (const nombre of tipos) {
      await TipoParticipanteModel.findOrCreate({
        where: { nombre },
      });
    }

    console.log("✔ Tipos de participante cargados correctamente.");
  } catch (error) {
    console.error("Error al cargar tipos de participante:", error);
  }
};
