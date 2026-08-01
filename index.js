import express from "express";
import cors from "cors";

import { PORT } from "./config/config.js";
import { sequelize } from "./db/conexion.js";

// Modelos
import "./models/PonenteModel.js";
import "./models/EstadoEventoModel.js";
import "./models/TipoEventoModel.js";
import "./models/EspacioModel.js";

// Seeders
import { tipoEventoSeed } from "./seeders/tipoEventoSeed.js";
import { estadoEventoSeed } from "./seeders/estadoEventoSeed.js";

// Routers
import ponenteRouter from "./router/ponenteRouter.js";
import espacioRouter from "./router/espacioRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

// Rutas
app.use("/api", ponenteRouter);
app.use("/api", espacioRouter);

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

    await sequelize.sync();

    await tipoEventoSeed();
    await estadoEventoSeed();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

main();