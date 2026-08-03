import express from "express";
import cors from "cors";

import { PORT } from "./config/config.js";
import { sequelize } from "./db/conexion.js";

// Modelos
import "./models/PonenteModel.js";
import "./models/EstadoEventoModel.js";
import "./models/TipoEventoModel.js";
import "./models/EspacioModel.js";
import "./models/CategoriaModel.js";
import "./models/OrganizadorModel.js";
import "./models/EstadoEspacioModel.js";
import "./models/EventoModel.js";
import "./models/TipoParticipanteModel.js";
import "./models/ParticipanteModel.js";
import "./models/EstadoInscripcionModel.js";
import "./models/InscripcionModel.js";
import "./models/ParticipacionPonenteModel.js";

// Seeders
import { tipoEventoSeed } from "./seeders/tipoEventoSeed.js";
import { estadoEventoSeed } from "./seeders/estadoEventoSeed.js";
import { estadoEspacioSeed } from "./seeders/estadoEspacioSeed.js";
import { tipoParticipanteSeed } from "./seeders/tipoParticipanteSeed.js";
import { estadoInscripcionSeed } from "./seeders/estadoInscripcionSeed.js";

// Routers
import ponenteRouter from "./routes/PonenteRouter.js";
import espacioRouter from "./routes/EspacioRouter.js";
import categoriaRouter from "./routes/CategoriaRouter.js";
import organizadorRouter from "./routes/OrganizadorRouter.js";
import eventoRouter from "./routes/EventoRouter.js";
import participanteRouter from "./routes/ParticipanteRouter.js";
import inscripcionRouter from "./routes/InscripcionRouter.js";
import participacionPonenteRouter from "./routes/ParticipacionPonenteRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

// Rutas
app.use("/api", ponenteRouter);
app.use("/api", espacioRouter);
app.use("/api", categoriaRouter);
app.use("/api", organizadorRouter);
app.use("/api", eventoRouter);
app.use("/api", participanteRouter);
app.use("/api", inscripcionRouter);
app.use("/api", participacionPonenteRouter);

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    mensaje: "API Sistema de Gestión de Eventos Universitarios",
  });
});

const main = async () => {
  try {
    await sequelize.authenticate();

    console.log("Base de datos conectada.");

    await sequelize.sync({ alter: false });

    await tipoEventoSeed();
    await estadoEventoSeed();
    await estadoEspacioSeed();
    await tipoParticipanteSeed();
    await estadoInscripcionSeed();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

main();